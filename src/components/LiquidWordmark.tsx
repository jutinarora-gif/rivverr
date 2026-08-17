"use client";

import { useEffect, useRef, useState } from "react";
import { isLiteMotionDevice } from "@/hooks/use-lite-motion";

const VERT = `
attribute vec2 p;
varying vec2 v;
void main() {
  v = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_intensity;
uniform vec2 u_mouse;
uniform vec2 u_res;
uniform vec3 u_ink;
uniform vec3 u_edge;

void main() {
  vec2 uv = vec2(v.x, 1.0 - v.y);
  float t = u_time;

  vec2 d;
  d.x = 0.0045 * sin(uv.y * 7.0 + t * 0.75) + 0.0022 * sin(uv.y * 18.0 - t * 1.25);
  d.y = 0.0032 * sin(uv.x * 6.0 + t * 0.6) + 0.0016 * sin(uv.x * 14.0 + t * 1.05);

  float asp = u_res.x / max(u_res.y, 1.0);
  vec2 diff = vec2((uv.x - u_mouse.x) * asp, uv.y - u_mouse.y);
  float dist = length(diff);
  float ring = exp(-dist * 5.0) * sin(dist * 26.0 - t * 3.2);
  d += normalize(diff + 0.0001) * ring * 0.075 * u_intensity;

  float a1 = texture2D(u_tex, uv + d).a;
  float a2 = texture2D(u_tex, uv + d * 1.35).a;
  float a3 = texture2D(u_tex, uv + d * 0.7).a;

  float edge = clamp(a2 - a1, 0.0, 1.0) + clamp(a3 - a1, 0.0, 1.0);
  float alpha = clamp(max(a1, edge * 0.85), 0.0, 1.0);
  vec3 col = mix(u_edge, u_ink, clamp(a1 / max(alpha, 0.001), 0.0, 1.0));
  gl_FragColor = vec4(col * alpha, alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

type RGB = [number, number, number];

export function LiquidWordmark({
  text = "RIVVERR",
  ink = [0.051, 0.216, 0.259],
  edge = [0.302, 0.518, 0.467],
  height = "clamp(6rem, 21vw, 20rem)",
  italic = false,
  staticSize,
}: {
  text?: string;
  ink?: RGB;
  edge?: RGB;
  height?: string;
  italic?: boolean;
  /** Font size used for the still wordmark on touch devices. */
  staticSize?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isLiteMotionDevice()) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      tex: gl.getUniformLocation(prog, "u_tex"),
      time: gl.getUniformLocation(prog, "u_time"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      res: gl.getUniformLocation(prog, "u_res"),
      ink: gl.getUniformLocation(prog, "u_ink"),
      edge: gl.getUniformLocation(prog, "u_edge"),
    };

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1i(u.tex, 0);
    gl.uniform3f(u.ink, ink[0], ink[1], ink[2]);
    gl.uniform3f(u.edge, edge[0], edge[1], edge[2]);

    const text2d = document.createElement("canvas");
    const ctx = text2d.getContext("2d")!;

    let w = 0;
    let h = 0;

    const paint = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      text2d.width = w;
      text2d.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      try {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "-0.04em";
      } catch {
        /* older browsers */
      }
      let size = h;
      const target = w * 0.92;
      const fontOf = (s: number) =>
        `${italic ? "italic " : ""}800 ${s}px "Bricolage Grotesque", "Work Sans", sans-serif`;
      ctx.font = fontOf(size);
      const m = ctx.measureText(text);
      if (m.width > 0) size = Math.min(size * (target / m.width), h * 1.15);
      ctx.font = fontOf(size);
      ctx.fillText(text, w / 2, h / 2 + size * 0.03);

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text2d);
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h);
    };

    let fontsReady = false;
    document.fonts?.ready.then(() => {
      fontsReady = true;
      paint();
    });
    paint();
    setLive(true);

    const ro = new ResizeObserver(() => paint());
    ro.observe(wrap);

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    let intensity = 0;
    let targetIntensity = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = (e.clientY - rect.top) / rect.height;
      targetIntensity = 1;
    };
    const onLeave = () => {
      targetIntensity = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;
      intensity += (targetIntensity - intensity) * 0.05;
      if (!fontsReady && t > 1.5) {
        fontsReady = true;
        paint();
      }
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.intensity, intensity);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, italic, ink.join(","), edge.join(",")]);

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height }}>
      <span
        aria-hidden={live}
        className={`headline absolute inset-0 flex items-center justify-center whitespace-nowrap text-center text-foreground transition-opacity duration-500 ${
          italic ? "italic" : ""
        }`}
        style={{
          fontSize: staticSize ?? `min(${height}, ${Math.floor(150 / Math.max(text.length, 1))}vw)`,
          fontWeight: 800,
          opacity: live ? 0 : 1,
        }}
      >
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  );
}

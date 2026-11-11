import { useEffect, useRef } from 'react';
import { fitCanvas, prefersReducedMotion } from '../lib/motion';

const ORBS = [
  { x: 0.05, y: 0.12, r: 62, speed: 1 },
  { x: 0.95, y: 0.88, r: 76, speed: -0.8 },
  { x: 0.96, y: 0.16, r: 34, speed: 1.5 },
  { x: 0.04, y: 0.86, r: 30, speed: -1.3 },
];
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Page background: lavender gradient, drifting blobs, white curves and slow-spinning dot spheres. */
export default function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let ctx = fitCanvas(canvas, W, H);
    const mouse = { x: 0, y: 0 };
    const reduce = prefersReducedMotion();
    const orbs = ORBS.map((o) => ({ ...o, n: Math.round(o.r * 3.9), phase: Math.random() * Math.PI * 2, depth: 0.4 + o.r / 70 }));
    let raf = 0;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      ctx = fitCanvas(canvas, W, H);
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / W - 0.5;
      mouse.y = e.clientY / H - 0.5;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove);

    const frame = (t: number) => {
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        for (const o of orbs) {
          const cx = o.x * W + Math.sin(t / 4200 + o.phase) * 16 - mouse.x * 24 * o.depth;
          const cy = o.y * H + Math.cos(t / 5200 + o.phase) * 20 - mouse.y * 24 * o.depth;
          const rot = o.phase + (reduce ? 0 : t * 0.00035 * o.speed);
          for (let i = 0; i < o.n; i++) {
            const y = 1 - (i / (o.n - 1)) * 2;
            const rr = Math.sqrt(1 - y * y);
            const th = GOLDEN * i + rot;
            const x = Math.cos(th) * rr;
            const z = Math.sin(th) * rr;
            const yy = y * 0.94 - z * 0.34;
            const depth = (y * 0.34 + z * 0.94 + 1) / 2;
            ctx.globalAlpha = 0.14 + depth * 0.5;
            ctx.fillStyle = depth > 0.5 ? '#5C24FF' : '#9A6AFB';
            ctx.beginPath();
            ctx.arc(cx + x * o.r, cy + yy * o.r, 0.6 + depth * 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="bg-fx pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <i className="blob blob-1" />
        <i className="blob blob-2" />
        <i className="blob blob-3" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M-40 620 C 300 520, 520 760, 900 640 S 1380 420, 1500 300" />
          <path d="M-40 700 C 360 600, 560 820, 960 700 S 1400 520, 1500 420" />
        </svg>
      </div>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
    </>
  );
}

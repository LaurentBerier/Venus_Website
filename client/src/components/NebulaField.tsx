import { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface BgStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
}

export default function NebulaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const starsRef = useRef<BgStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      const small = w < 768;
      const cloudCount = small ? 15 : 30;
      const starCount = small ? 60 : 120;

      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.3 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
      }));

      cloudsRef.current = Array.from({ length: cloudCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 100 + 30,
        hue: Math.random() > 0.5 ? 190 + Math.random() * 25 : 270 + Math.random() * 30,
        alpha: Math.random() * 0.05 + 0.015,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.004 + 0.001,
      }));
    };

    const draw = (time: number) => {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(8, 10, 18, 0.93)';
      ctx.fillRect(0, 0, w, h);

      for (const s of starsRef.current) {
        const t = Math.sin(time * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,255,${s.alpha * (0.4 + t * 0.6)})`;
        ctx.fill();
      }

      for (const c of cloudsRef.current) {
        c.x += c.vx;
        c.y += c.vy;
        c.pulse += c.pulseSpeed;
        if (c.x < -c.size) c.x = w + c.size;
        if (c.x > w + c.size) c.x = -c.size;
        if (c.y < -c.size) c.y = h + c.size;
        if (c.y > h + c.size) c.y = -c.size;

        const a = c.alpha * (0.6 + Math.sin(c.pulse) * 0.4);
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size);
        g.addColorStop(0, `hsla(${c.hue},70%,55%,${a * 1.3})`);
        g.addColorStop(0.5, `hsla(${c.hue},60%,50%,${a * 0.4})`);
        g.addColorStop(1, `hsla(${c.hue},60%,50%,0)`);
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      const cx = w * 0.6;
      const cy = h * 0.4;
      const cs = Math.min(w, h) * 0.3;
      const cp = 0.025 + Math.sin(time * 0.001) * 0.012;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs);
      cg.addColorStop(0, `hsla(200,80%,60%,${cp * 1.3})`);
      cg.addColorStop(0.4, `hsla(260,60%,50%,${cp * 0.6})`);
      cg.addColorStop(1, 'hsla(260,60%,50%,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, cs, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    animFrameRef.current = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      io.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      data-testid="canvas-nebula"
    />
  );
}

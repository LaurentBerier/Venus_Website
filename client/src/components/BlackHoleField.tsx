import { useEffect, useRef } from 'react';

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
  alpha: number;
  drift: number;
}

interface DustStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
}

export default function BlackHoleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dustRef = useRef<DustStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cx = 0;
    let cy = 0;
    let maxR = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.5;
      cy = h * 0.5;
      maxR = Math.max(w, h) * 0.5;

      const small = w < 768;

      dustRef.current = Array.from({ length: small ? 50 : 100 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
      }));

      particlesRef.current = Array.from({ length: small ? 100 : 200 }, () => {
        const r = Math.random() * maxR * 0.8 + maxR * 0.1;
        return {
          angle: Math.random() * Math.PI * 2,
          radius: r,
          speed: (0.3 + Math.random() * 0.7) / (r * 0.012 + 1),
          size: Math.random() * 2 + 0.5,
          hue: r < maxR * 0.25 ? 25 + Math.random() * 15 : 190 + Math.random() * 20,
          alpha: Math.random() * 0.8 + 0.2,
          drift: -0.07 - Math.random() * 0.1,
        };
      });
    };

    const draw = (time: number) => {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(4, 4, 12, 0.85)';
      ctx.fillRect(0, 0, w, h);

      const eh = maxR * 0.07;

      for (const s of dustRef.current) {
        const t = Math.sin(time * s.speed + s.phase);
        const dx = s.x - cx;
        const dy = s.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fade = dist < maxR * 0.15 ? dist / (maxR * 0.15) : 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,200,230,${s.alpha * (0.3 + t * 0.7) * fade})`;
        ctx.fill();
      }

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, eh * 5);
      bg.addColorStop(0, 'rgba(0,0,0,1)');
      bg.addColorStop(0.35, 'rgba(0,0,0,0.9)');
      bg.addColorStop(0.7, 'rgba(0,0,0,0.3)');
      bg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, eh * 5, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      const rp = 0.6 + Math.sin(time * 0.002) * 0.2;
      for (let r = 1; r <= 3; r++) {
        const rr = eh * (1.3 + r * 0.9);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(190,85%,55%,${0.12 * rp / r})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const ell = 0.45;
      for (const p of particlesRef.current) {
        p.angle += p.speed * 0.012;
        p.radius += p.drift;

        if (p.radius < eh * 0.5) {
          p.radius = maxR * (0.3 + Math.random() * 0.5);
          p.angle = Math.random() * Math.PI * 2;
          p.hue = p.radius < maxR * 0.25 ? 25 + Math.random() * 15 : 190 + Math.random() * 20;
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * ell;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const glow = Math.max(0, 1 - dist / (maxR * 0.35));
        const a = p.alpha * (0.4 + glow * 0.6);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,65%,${a})`;
        ctx.fill();
      }

      const ls = eh * 3;
      const lp = 0.18 + Math.sin(time * 0.0015) * 0.06;
      const lg = ctx.createRadialGradient(cx, cy, eh * 0.3, cx, cy, ls);
      lg.addColorStop(0, `hsla(25,90%,55%,${lp})`);
      lg.addColorStop(0.4, `hsla(190,85%,50%,${lp * 0.5})`);
      lg.addColorStop(1, 'hsla(190,85%,50%,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, ls, 0, Math.PI * 2);
      ctx.fillStyle = lg;
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
      data-testid="canvas-blackhole"
    />
  );
}

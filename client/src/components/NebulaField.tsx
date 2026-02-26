import { useEffect, useRef } from 'react';

interface NebulaParticle {
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

interface BackgroundStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
}

export default function NebulaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NebulaParticle[]>([]);
  const starsRef = useRef<BackgroundStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: Math.min(count, 200) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.004 + 0.001,
      }));
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 120 + 40,
        hue: Math.random() > 0.5 ? 190 + Math.random() * 30 : 270 + Math.random() * 40,
        alpha: Math.random() * 0.06 + 0.02,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.005 + 0.002,
      }));
    };

    const draw = (time: number) => {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(8, 10, 18, 0.92)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        const t = Math.sin(time * star.twinkleSpeed + star.twinkle);
        const a = star.alpha * (0.4 + t * 0.6);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${a})`;
        ctx.fill();
      }

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        const pulseAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        const sat = p.hue > 250 ? '60%' : '80%';
        const light = p.hue > 250 ? '50%' : '55%';

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `hsla(${p.hue}, ${sat}, ${light}, ${pulseAlpha * 1.5})`);
        gradient.addColorStop(0.3, `hsla(${p.hue}, ${sat}, ${light}, ${pulseAlpha * 0.6})`);
        gradient.addColorStop(0.7, `hsla(${p.hue + 20}, ${sat}, ${light}, ${pulseAlpha * 0.2})`);
        gradient.addColorStop(1, `hsla(${p.hue}, ${sat}, ${light}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      const coreX = canvas.width * 0.6;
      const coreY = canvas.height * 0.4;
      const coreSize = Math.min(canvas.width, canvas.height) * 0.35;
      const coreGrad = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreSize);
      const corePulse = 0.03 + Math.sin(time * 0.001) * 0.015;
      coreGrad.addColorStop(0, `hsla(200, 80%, 60%, ${corePulse * 1.5})`);
      coreGrad.addColorStop(0.3, `hsla(260, 60%, 50%, ${corePulse})`);
      coreGrad.addColorStop(0.6, `hsla(290, 50%, 40%, ${corePulse * 0.5})`);
      coreGrad.addColorStop(1, 'hsla(290, 50%, 40%, 0)');
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0 });
    io.observe(canvas);

    animFrameRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      data-testid="canvas-nebula"
    />
  );
}

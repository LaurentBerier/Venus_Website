import { useEffect, useRef } from 'react';

interface OrbitalParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
  alpha: number;
  drift: number;
  trail: number;
}

interface DustStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
}

export default function BlackHoleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<OrbitalParticle[]>([]);
  const dustRef = useRef<DustStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = 0;
    let centerY = 0;
    let maxRadius = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      centerX = canvas.width * 0.5;
      centerY = canvas.height * 0.5;
      maxRadius = Math.max(canvas.width, canvas.height) * 0.5;
      initParticles();
      initDust();
    };

    const initDust = () => {
      const count = Math.floor((canvas.width * canvas.height) / 5000);
      dustRef.current = Array.from({ length: Math.min(count, 150) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
      }));
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 300 }, () => {
        const radius = Math.random() * maxRadius * 0.85 + maxRadius * 0.08;
        return {
          angle: Math.random() * Math.PI * 2,
          radius,
          speed: (0.3 + Math.random() * 0.8) / (radius * 0.015 + 1),
          size: Math.random() * 2 + 0.5,
          hue: radius < maxRadius * 0.25 ? 25 + Math.random() * 20 : 190 + Math.random() * 30,
          alpha: Math.random() * 0.8 + 0.2,
          drift: -0.08 - Math.random() * 0.12,
          trail: Math.random() * 0.3 + 0.1,
        };
      });
    };

    const draw = (time: number) => {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(4, 4, 12, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of dustRef.current) {
        const t = Math.sin(time * star.twinkleSpeed + star.twinkle);
        const a = star.alpha * (0.3 + t * 0.7);
        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fade = dist < maxRadius * 0.15 ? dist / (maxRadius * 0.15) : 1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 190, 220, ${a * fade})`;
        ctx.fill();
      }

      const eventHorizon = maxRadius * 0.06;

      const bhGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, eventHorizon * 5);
      bhGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      bhGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.95)');
      bhGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.4)');
      bhGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, eventHorizon * 5, 0, Math.PI * 2);
      ctx.fillStyle = bhGrad;
      ctx.fill();

      const ringPulse = 0.5 + Math.sin(time * 0.002) * 0.2;
      for (let r = 1; r <= 3; r++) {
        const ringRadius = eventHorizon * (1.2 + r * 0.8);
        const ringGrad = ctx.createRadialGradient(centerX, centerY, ringRadius - 3, centerX, centerY, ringRadius + 3);
        ringGrad.addColorStop(0, 'hsla(25, 90%, 55%, 0)');
        ringGrad.addColorStop(0.5, `hsla(25, 90%, 55%, ${0.08 * ringPulse / r})`);
        ringGrad.addColorStop(1, 'hsla(25, 90%, 55%, 0)');
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(190, 85%, 50%, ${0.12 * ringPulse / r})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.fillStyle = ringGrad;
        ctx.fill();
      }

      for (const p of particlesRef.current) {
        p.angle += p.speed * 0.01;
        p.radius += p.drift;

        if (p.radius < eventHorizon * 0.5) {
          p.radius = maxRadius * (0.3 + Math.random() * 0.6);
          p.angle = Math.random() * Math.PI * 2;
          p.hue = p.radius < maxRadius * 0.25 ? 25 + Math.random() * 20 : 190 + Math.random() * 30;
        }

        const ellipseRatio = 0.45;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius * ellipseRatio;

        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const proximityGlow = Math.max(0, 1 - distFromCenter / (maxRadius * 0.3));
        const finalAlpha = p.alpha * (0.3 + proximityGlow * 0.7);

        const trailAngle = p.angle - p.speed * 0.01 * 3;
        const tx = centerX + Math.cos(trailAngle) * (p.radius + p.drift * 3);
        const ty = centerY + Math.sin(trailAngle) * (p.radius + p.drift * 3) * ellipseRatio;

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsla(${p.hue}, 80%, 60%, ${finalAlpha * p.trail})`;
        ctx.lineWidth = p.size * 0.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${finalAlpha})`;
        ctx.fill();

        if (proximityGlow > 0.3) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 5);
          glow.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${finalAlpha * 0.3})`);
          glow.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
          ctx.beginPath();
          ctx.arc(x, y, p.size * 5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      const lensSize = eventHorizon * 3;
      const lens = ctx.createRadialGradient(centerX, centerY, eventHorizon, centerX, centerY, lensSize);
      const lensPulse = 0.15 + Math.sin(time * 0.0015) * 0.05;
      lens.addColorStop(0, `hsla(25, 90%, 55%, ${lensPulse})`);
      lens.addColorStop(0.4, `hsla(190, 85%, 50%, ${lensPulse * 0.5})`);
      lens.addColorStop(1, 'hsla(190, 85%, 50%, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, lensSize, 0, Math.PI * 2);
      ctx.fillStyle = lens;
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
      data-testid="canvas-blackhole"
    />
  );
}

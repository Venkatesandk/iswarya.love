"use client";
import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; type: 'star'|'glow' }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numParticles; i++) {
        const isStar = Math.random() > 0.2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isStar ? Math.random() * 1.5 : Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.3 - 0.1,
          alpha: Math.random(),
          type: isStar ? 'star' : 'glow'
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        if (p.type === 'star') {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 107, 139, ${p.alpha * 0.5})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FF2A6D';
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        // Reset if out of bounds
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        
        // Twinkle
        if (p.type === 'star') {
          p.alpha += (Math.random() - 0.5) * 0.05;
          if (p.alpha < 0.1) p.alpha = 0.1;
          if (p.alpha > 1) p.alpha = 1;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}

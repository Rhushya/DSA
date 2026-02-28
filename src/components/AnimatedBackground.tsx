'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };
        let scrollY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            baseY: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            baseOpacity: number;
            pulseSpeed: number;
            pulseOffset: number;
            layer: number; // depth for parallax

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.size = Math.random() * 2.5 + 0.5;
                this.baseOpacity = Math.random() * 0.45 + 0.1;
                this.opacity = this.baseOpacity;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseOffset = Math.random() * Math.PI * 2;
                this.layer = Math.random() * 0.5 + 0.5; // 0.5 – 1.0 depth
            }

            update(w: number, h: number, time: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Pulse opacity
                this.opacity = this.baseOpacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;

                // Pulse size subtly
                const sizeOscillation = Math.sin(time * this.pulseSpeed * 0.5 + this.pulseOffset) * 0.3;

                // Mouse interaction — gentle repel with attract ring
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    if (dist < 80) {
                        // Repel close particles
                        const force = (80 - dist) / 80 * 0.4;
                        this.vx += (dx / dist) * force;
                        this.vy += (dy / dist) * force;
                    } else {
                        // Gentle attract for outer ring — creates orbit effect
                        const force = (dist - 80) / 100 * 0.02;
                        this.vx -= (dx / dist) * force;
                        this.vy -= (dy / dist) * force;
                    }
                }

                // Dampen velocity
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Wrap around edges
                if (this.x < -10) this.x = w + 10;
                if (this.x > w + 10) this.x = -10;
                if (this.y < -10) this.y = h + 10;
                if (this.y > h + 10) this.y = -10;

                this._renderSize = Math.max(0.3, this.size + sizeOscillation);
            }

            _renderSize: number = 0;

            draw(ctx: CanvasRenderingContext2D) {
                // Parallax offset based on scroll
                const parallaxY = scrollY * (1 - this.layer) * 0.15;
                const drawY = this.y + parallaxY;

                ctx.beginPath();
                ctx.arc(this.x, drawY, this._renderSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.fill();

                // Add glow for larger particles
                if (this._renderSize > 1.8) {
                    ctx.beginPath();
                    ctx.arc(this.x, drawY, this._renderSize * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * 0.15})`;
                    ctx.fill();
                }
            }

            getDrawY(): number {
                return this.y + scrollY * (1 - this.layer) * 0.15;
            }
        }

        const init = () => {
            resize();
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 160);
            particles = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height));
        };

        const drawConnections = (ctx: CanvasRenderingContext2D) => {
            for (let i = 0; i < particles.length; i++) {
                const pi = particles[i];
                const piY = pi.getDrawY();
                for (let j = i + 1; j < particles.length; j++) {
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = piY - pj.getDrawY();
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 22500) { // 150^2
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / 150) * 0.14;
                        ctx.beginPath();
                        ctx.moveTo(pi.x, piY);
                        ctx.lineTo(pj.x, pj.getDrawY());
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Mouse connections — draw lines from mouse to nearby particles
            if (mouse.x > 0 && mouse.y > 0) {
                for (let i = 0; i < particles.length; i++) {
                    const dx = mouse.x - particles[i].x;
                    const dy = mouse.y - particles[i].getDrawY();
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        const opacity = (1 - dist / 200) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(particles[i].x, particles[i].getDrawY());
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }
        };

        let time = 0;
        const animate = () => {
            if (!ctx || !canvas) return;
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(canvas.width, canvas.height, time);
                p.draw(ctx);
            });

            drawConnections(ctx);
            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', handleScroll, { passive: true });

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="animated-bg-canvas"
            aria-hidden="true"
        />
    );
}

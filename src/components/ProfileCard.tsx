import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
    @keyframes pulse-green {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      } as Record<string, string>;

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const rect = shell.getBoundingClientRect();
    tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
  }, [tiltEngine]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEngine) return;

    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);

    const shell = shellRef.current;
    if (!shell) return;

    shell.classList.add('entering');

    const rect = shell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tiltEngine.setImmediate(x - ANIMATION_CONFIG.INITIAL_X_OFFSET, y - ANIMATION_CONFIG.INITIAL_Y_OFFSET);
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    tiltEngine.setTarget(x, y);

    enterTimerRef.current = window.setTimeout(() => {
      shell.classList.remove('entering');
    }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
  }, [tiltEngine]);

  const handlePointerLeave = useCallback(() => {
    if (!tiltEngine) return;
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);

    const shell = shellRef.current;
    if (!shell) return;

    tiltEngine.toCenter();

    leaveRafRef.current = requestAnimationFrame(() => {
      tiltEngine.cancel();
    });
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (!tiltEngine || !enableMobileTilt) return;

    const beta = (event.beta || 0) - ANIMATION_CONFIG.DEVICE_BETA_OFFSET;
    const gamma = event.gamma || 0;

    const x = clamp(round(gamma * mobileTiltSensitivity + 50, 1), 0, 100);
    const y = clamp(round(beta * mobileTiltSensitivity + 50, 1), 0, 100);

    const shell = shellRef.current;
    if (!shell) return;

    const width = shell.clientWidth || 1;
    const height = shell.clientHeight || 1;

    tiltEngine.setTarget((x / 100) * width, (y / 100) * height);
  }, [tiltEngine, enableMobileTilt, mobileTiltSensitivity]);

  useEffect(() => {
    if (!enableMobileTilt) return;

    if ((DeviceOrientationEvent as any)?.requestPermission) {
      (DeviceOrientationEvent as any).requestPermission().then((permission: string) => {
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation);
  }, [enableMobileTilt, handleDeviceOrientation]);

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
      }
    };
  }, []);

  const cardRadius = isMobile ? '50%' : '30px';

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
      '--behind-glow-size': behindGlowSize ?? '50%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '0',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-radius': cardRadius,
      '--sunpillar-1': 'hsl(2, 100%, 73%)',
      '--sunpillar-2': 'hsl(53, 100%, 69%)',
      '--sunpillar-3': 'hsl(93, 100%, 69%)',
      '--sunpillar-4': 'hsl(176, 100%, 76%)',
      '--sunpillar-5': 'hsl(228, 100%, 74%)',
      '--sunpillar-6': 'hsl(283, 100%, 73%)',
      '--sunpillar-clr-1': 'var(--sunpillar-1)',
      '--sunpillar-clr-2': 'var(--sunpillar-2)',
      '--sunpillar-clr-3': 'var(--sunpillar-3)',
      '--sunpillar-clr-4': 'var(--sunpillar-4)',
      '--sunpillar-clr-5': 'var(--sunpillar-5)',
      '--sunpillar-clr-6': 'var(--sunpillar-6)'
    } as React.CSSProperties),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  const shineStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1px)',
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) calc(var(--space, 40px) * 1),
        var(--sunpillar-clr-2) calc(var(--space, 40px) * 2),
        var(--sunpillar-clr-3) calc(var(--space, 40px) * 3),
        var(--sunpillar-clr-4) calc(var(--space, 40px) * 4),
        var(--sunpillar-clr-5) calc(var(--space, 40px) * 5),
        var(--sunpillar-clr-6) calc(var(--space, 40px) * 6),
        var(--sunpillar-clr-1) calc(var(--space, 40px) * 7)
      ),
      repeating-linear-gradient(
        -45deg,
        #0e152e 0%,
        hsl(180, 10%, 60%) 3.8%,
        hsl(180, 29%, 66%) 4.5%,
        hsl(180, 10%, 60%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0, 0%, 0%, 0.1) 12%,
        hsla(0, 0%, 0%, 0.15) 20%,
        hsla(0, 0%, 0%, 0.25) 120%
      )
    `.replace(/\s+/g, ' '),
    backgroundBlendMode: 'color-dodge, normal, normal, normal',
    backgroundSize: '500% 500%, 300% 300%, 200% 200%',
    backgroundPosition: '0 var(--background-y), var(--background-x) var(--background-y), center',
    filter: 'brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2)) saturate(calc(0.5 + var(--pointer-from-center)))',
    mixBlendMode: 'luminosity',
    zIndex: 3,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none',
    opacity: 0.4
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsl(248, 25%, 80%) 12%,
      hsla(207, 40%, 30%, 0.8) 90%
    )`,
    mixBlendMode: 'overlay',
    filter: 'brightness(0.8) contrast(1.2)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none',
    opacity: 0.3
  };

  const sectionStyle: React.CSSProperties = isMobile
    ? {
        height: '60svh',
        maxHeight: '420px',
        aspectRatio: '1/1',
        borderRadius: '50%',
        backgroundBlendMode: 'color-dodge, normal, normal, normal',
        boxShadow:
          'rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px',
        transition: 'transform 1s ease',
        transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
        background: 'rgba(0, 0, 0, 0.9)',
        backfaceVisibility: 'hidden',
        overflow: 'hidden'
      }
    : {
        height: '80svh',
        maxHeight: '540px',
        aspectRatio: '0.718',
        borderRadius: cardRadius,
        backgroundBlendMode: 'color-dodge, normal, normal, normal',
        boxShadow:
          'rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px',
        transition: 'transform 1s ease',
        transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
        background: 'rgba(0, 0, 0, 0.9)',
        backfaceVisibility: 'hidden'
      };

  const mainImageStyle: React.CSSProperties = isMobile
    ? {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backfaceVisibility: 'hidden',
        pointerEvents: 'none'
      }
    : {
        transformOrigin: '50% 100%',
        transform:
          'translateX(calc(-35% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scale(1.15) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))',
        borderRadius: cardRadius,
        backfaceVisibility: 'hidden'
      };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={cardStyle}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px) saturate(1.1)',
            opacity: 'calc(0.8 * var(--card-opacity))'
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1] group">
        <section
          className="grid relative"
          style={sectionStyle}
          onMouseEnter={handlePointerEnter}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1'
            }}
          >
            <div style={shineStyle} />
            <div style={glareStyle} />

            <div
              className="overflow-visible"
              style={{
                mixBlendMode: 'luminosity',
                transform: 'translateZ(2px)',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none'
              }}
            >
              <img
                className="absolute"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                style={mainImageStyle}
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />

            </div>

            {/* Status Badge */}
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[10]"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '6px 12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'auto'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  animation: 'pulse-green 2s ease-in-out infinite'
                }}
              />
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '500' }}>Available for work</span>
            </div>

            <div
              className="max-h-full overflow-hidden text-center relative z-[5] flex flex-col justify-between p-6"
              style={{
                transform:
                  'translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)',
                mixBlendMode: 'luminosity',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                display: 'flex'
              }}
            >
              {/* Name and Title */}
              <div className="w-full flex flex-col pt-8">
                <h3
                  className="font-semibold m-0"
                  style={{
                    fontSize: 'min(5svh, 3em)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    pointerEvents: 'auto'
                  }}
                >
                  <span style={{ color: '#fff' }}>Shubham</span>
                  <span style={{ color: '#84cc16', fontSize: 'min(5svh, 3em)' }}>Pandey</span>
                </h3>
                <p
                  className="font-semibold whitespace-nowrap mx-auto"
                  style={{
                    fontSize: '16px',
                    margin: '8px auto 0',
                    color: '#d1d5db',
                    display: 'block',
                    pointerEvents: 'auto'
                  }}
                >
                  {title}
                </p>
              </div>

              {/* Stats Section */}
              <div
                className="w-full flex justify-around items-center gap-4 py-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '20px',
                  pointerEvents: 'auto',
                  marginBottom: '24px'
                }}
              >
                {/* Stat 1 */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>2+</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Years Exp.</div>
                </div>

                {/* Stat 2 */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{'</>'}</div>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>20+</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Projects</div>
                </div>

                {/* Stat 3 */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>10+</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Happy Clients</div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleContactClick}
                className="w-full border-none rounded-full px-6 py-3"
                style={{
                  background: '#f5f5f5',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.transform = 'scale(1.05)';
                  btn.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.transform = 'scale(1)';
                  btn.style.boxShadow = 'none';
                }}
              >
                Get in Touch
                <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;

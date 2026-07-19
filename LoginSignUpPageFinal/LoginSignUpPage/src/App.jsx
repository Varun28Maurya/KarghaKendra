// Quick: disable TypeScript checking for this large demo file to avoid
// many strict-type errors while keeping the runtime behavior intact.
// Remove this once you add proper types or split components into typed files.
// @ts-nocheck

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import backgroundLight from "./assets/background-light.png";
import backgroundDark from "./assets/background-dark.png";

import eyesShowL from "./assets/ESD.png";
import eyesShowD from "./assets/ESL.png";

import eyesHideL from "./assets/EHD.png";
import eyesHideD from "./assets/EHL.png";

import logoLight from "./assets/LogoDark.png";
import logoDark from "./assets/LogoLight.png";
const T = {
  light: {
    bg: "#F5EFE3",
    surface: "#FFF8EE",
    border: "#D6C3A5",
    text: "#3B2418",
    textSec: "#6B5846",
    btn: "#8A4B2A",
    btnText: "#FFF8EE",
    accent: "#B8612C",
    gold: "#C99A52",
    frame: "#9A7450",
    innerShadow: "rgba(59,36,24,0.18)",
    outerShadow: "rgba(59,36,24,0.38)",
    thread: "201,154,82",
    inputBg: "rgba(255,248,238,0.55)",
    wovenA: "139,107,79",
    wovenB: "201,154,82",
    divider: "rgba(59,36,24,0.12)",
  },
  dark: {
    bg: "#1F1712",
    surface: "#36261D",
    border: "#5A4334",
    text: "#F3E7D3",
    textSec: "#D5C2AA",
    btn: "#A76436",
    btnText: "#1F1712",
    accent: "#D38A45",
    gold: "#C8A45C",
    frame: "#7A5535",
    innerShadow: "rgba(0,0,0,0.42)",
    outerShadow: "rgba(0,0,0,0.62)",
    thread: "200,164,92",
    inputBg: "rgba(20,12,8,0.4)",
    wovenA: "90,67,52",
    wovenB: "200,164,92",
    divider: "rgba(243,231,211,0.1)",
  },
};

// ── Global styles: fonts + keyframes ───────────────────────────────────────

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Quicksand:wght@400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; }

      html, body, #root { height: 100%; }

      button, a, input, label, [role="button"] { cursor: none; }

      @keyframes float-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .kk-side-art { transition: opacity 0.5s ease; }

      :root {
        --input-padding: 12px 16px;
        --input-padding-password: 12px 44px 12px 16px;
      }

      @media (pointer: coarse) {
        button, a, input, label, [role="button"] { cursor: auto; }
      }

      input::placeholder { color: inherit; opacity: 0.5; }

      /* Respect reduced-motion preference */
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}

// ── Background (unchanged imagery, lighter overlay so it stays the hero) ──

function BackgroundLayer({ theme }) {
  const isLight = theme === "light";
  const dur = "600ms";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${backgroundLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transition: `opacity ${dur} ease`,
          opacity: isLight ? 1 : 0,
          willChange: "opacity",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${backgroundDark})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transition: `opacity ${dur} ease`,
          opacity: isLight ? 0 : 1,
          willChange: "opacity",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLight ? T.light.bg : T.dark.bg,
          mixBlendMode: "multiply",
          opacity: isLight ? 0.06 : 0.16,
          transition: `opacity ${dur} ease`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── Needle Cursor + Stitched Thread Trail ───────────────────────────────────

function NeedleCursor({ theme }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const rafRef = useRef(0);
  const themeRef = useRef(theme);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  themeRef.current = theme;
  const trailDuration = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      pointsRef.current = pointsRef.current.filter((p) => now - p.t < trailDuration);
      const pts = pointsRef.current;

      if (pts.length > 1) {
        const rgb = themeRef.current === "light" ? "201,154,82" : "200,164,92";
        let dist = 0;

        for (let i = 1; i < pts.length; i++) {
          const age = (now - pts[i].t) / trailDuration;
          const alpha = (1 - age) * 0.8;

          const dx = pts[i].x - pts[i - 1].x;
          const dy = pts[i].y - pts[i - 1].y;
          const segmentDist = Math.hypot(dx, dy);

          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);

          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "butt";

          ctx.lineDashOffset = -dist;
          ctx.setLineDash([8, 8]);
          ctx.stroke();

          dist += segmentDist;
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const track = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    };
    window.addEventListener("mousemove", track);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", track);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997 }}
      />
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: "translate(-3px, -26px)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="needle-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EFEFEF" />
              <stop offset="45%" stopColor="#C2C2C2" />
              <stop offset="100%" stopColor="#8A8A8A" />
            </linearGradient>
          </defs>
          <path
            d="M23 3 L5 23 L6.5 25.5 L25.5 6.5 Z"
            fill="url(#needle-grad)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.3"
          />
          <ellipse
            cx="22"
            cy="5"
            rx="2.8"
            ry="1.4"
            transform="rotate(-45 22 5)"
            fill="none"
            stroke="#CCCCCC"
            strokeWidth="1.1"
          />
          <line x1="23" y1="3" x2="16" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
        </svg>
      </div>
    </>
  );
}

// ── Logo (crossfades between light/dark theme artwork) ─────────────────────

function Logo({ theme, pulse }) {
  const isLight = theme === "light";
  const size = "clamp(120px, 20vh, 180px)";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
        transform: pulse ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.4s ease",
        filter: `drop-shadow(0 4px 14px ${T[theme].outerShadow})`,
      }}
    >
      <img
        src={logoLight}
        alt="KarghaKendra"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "opacity 600ms ease",
          opacity: isLight ? 1 : 0,
        }}
      />
      <img
        src={logoDark}
        alt=""
        aria-hidden={isLight}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "opacity 600ms ease",
          opacity: isLight ? 0 : 1,
        }}
      />
    </div>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────

function ThemeToggle({ theme, onToggle, c }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Toggle theme"
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: `1px solid ${hov ? c.gold : c.border}`,
        background: hov ? `${c.surface}CC` : "transparent",
        color: c.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: hov ? `0 4px 20px ${c.outerShadow}` : "none",
      }}
    >
      {theme === "light" ? (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="4.5" stroke={c.text} strokeWidth="1.5" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={10 + Math.cos(r) * 6.5}
                y1={10 + Math.sin(r) * 6.5}
                x2={10 + Math.cos(r) * 8.5}
                y2={10 + Math.sin(r) * 8.5}
                stroke={c.text}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M 14.5 10 A 5.5 5.5 0 1 1 10 4.5 A 4 4 0 0 0 14.5 10 Z"
            stroke={c.text}
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

// ── Mandala Watermark (for button hover) ────────────────────────────────────

function MandalaWatermark() {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  const outerPetals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden" }}
    >
      <g transform="translate(50,50)" fill="none" stroke="white">
        <circle r="44" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.5" />
        {outerPetals.map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <ellipse
              key={a}
              cx={Math.cos(r) * 34}
              cy={Math.sin(r) * 34}
              rx="3"
              ry="6"
              transform={`rotate(${a} ${Math.cos(r) * 34} ${Math.sin(r) * 34})`}
              strokeWidth="0.5"
              opacity="0.35"
            />
          );
        })}
        <circle r="28" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.45" />
        {petals.map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <ellipse
              key={a}
              cx={Math.cos(r) * 18}
              cy={Math.sin(r) * 18}
              rx="4.5"
              ry="10"
              transform={`rotate(${a} ${Math.cos(r) * 18} ${Math.sin(r) * 18})`}
              strokeWidth="0.6"
              opacity="0.4"
            />
          );
        })}
        <circle r="12" strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity="0.5" />
        {petals.map((a) => {
          const r = (a * Math.PI) / 180;
          return <circle key={a} cx={Math.cos(r) * 6} cy={Math.sin(r) * 6} r="1" fill="white" opacity="0.5" />;
        })}
        <circle r="3" fill="white" opacity="0.4" />
        <circle r="1.5" fill="white" opacity="0.6" />
      </g>
    </svg>
  );
}

// ── Block Print Button ─────────────────────────────────────────────────────

function BlockPrintButton({ children, onClick, c, fullWidth = false, secondary = false }) {
  const [state, setState] = useState("idle");

  const bg = secondary ? "transparent" : c.btn;
  const color = secondary ? c.accent : c.btnText;
  const border = secondary ? `1px solid ${c.accent}` : "none";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("idle")}
      onMouseDown={() => setState("active")}
      onMouseUp={() => setState("hover")}
      style={{
        position: "relative",
        overflow: "hidden",
        width: fullWidth ? "100%" : "auto",
        padding: "11px 26px",
        background: bg,
        color,
        border,
        borderRadius: "10px",
        fontFamily: "Quicksand, sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        transition: "transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease",
        transform:
          state === "active" ? "scale(0.97)" : state === "hover" ? "translateY(-1px)" : "translateY(0) scale(1)",
        boxShadow:
          state === "active"
            ? "inset 0 3px 6px rgba(0,0,0,0.18)"
            : state === "hover" && !secondary
              ? `0 10px 22px ${c.outerShadow}`
              : secondary
                ? "none"
                : `0 3px 10px ${c.innerShadow}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: state === "hover" ? 0.12 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <MandalaWatermark />
      </div>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

// ── Stitched Input ──────────────────────────────────────────────────────────

function EnvelopeIcon({ color }) {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M3 5.5 L10 11 L17 5.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ color }) {
  return (
    <svg width="16" height="17" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M6.5 9 V6.5 a3.5 3.5 0 0 1 7 0 V9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="13.2" r="1.15" fill={color} />
    </svg>
  );
}

function StitchedInput({ id, type, value, onChange, onTyping, c, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const iconColor = focused ? c.accent : c.textSec;

  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 15,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            transition: "opacity 0.2s ease",
          }}
        >
          {type === "password" ? <LockIcon color={iconColor} /> : <EnvelopeIcon color={iconColor} />}
        </div>
        <input
          id={id}
          type={type === "password" ? (show ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            onChange(e.target.value);
            onTyping();
          }}
          style={{
            width: "100%",
            padding: type === "password" ? "12px 44px 12px 42px" : "12px 16px 12px 42px",
            height: "46px",
            background: c.inputBg,
            border: `1px solid ${error ? "#E05555" : focused ? c.accent : c.border}`,
            borderRadius: "12px",
            color: c.text,
            fontFamily: "Quicksand, sans-serif",
            fontSize: "14.5px",
            fontWeight: 500,
            outline: "none",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            backdropFilter: "blur(6px)",
            boxShadow: focused ? `0 0 0 3px ${c.outerShadow}22` : "none",
          }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            aria-label={show ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 28,
              height: 28,
              padding: 0,
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {(() => {
              const isLight = c === T.light;
              const height = 20;
              const width = 40;
              return (
                <>
                  <img src={eyesShowL} alt="" style={{ position: "absolute", width, height, transition: "opacity 200ms ease", opacity: isLight && !show ? 1 : 0, pointerEvents: "none" }} />
                  <img src={eyesHideL} alt="" style={{ position: "absolute", width, height, transition: "opacity 200ms ease", opacity: isLight && show ? 1 : 0, pointerEvents: "none" }} />
                  <img src={eyesShowD} alt="" style={{ position: "absolute", width, height, transition: "opacity 200ms ease", opacity: !isLight && !show ? 1 : 0, pointerEvents: "none" }} />
                  <img src={eyesHideD} alt="" style={{ position: "absolute", width, height, transition: "opacity 200ms ease", opacity: !isLight && show ? 1 : 0, pointerEvents: "none" }} />
                </>
              );
            })()}
          </button>
        )}
      </div>
      {error && (
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#E05555", fontFamily: "Quicksand, sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────

function Divider({ c }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "14px 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${c.border})` }} />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: c.textSec,
          textTransform: "uppercase",
        }}
      >
        or
      </span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${c.border})` }} />
    </div>
  );
}

// ── Login Form (floats directly over the background — no heavy card) ──────

function LoginForm({ c, onTyping, onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.includes("@")) errs.email = "Please enter a valid email address";
    if (password.length < 8) errs.password = "Password must be at least 8 characters";
    setErrors(errs);
  };

  return (
    <form
    onSubmit={handleSubmit}
    style={{
      animation: "float-in 0.5s ease both",
      background: `${c.surface}26`,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: `1px solid ${c.border}55`,
      borderRadius: "18px",
      padding: "18px 20px 16px", // ↓ reduced from "30px 22px 28px"
      boxShadow: `0 12px 32px ${c.outerShadow}22`,
    }}
    >
      <StitchedInput
        id="login-email"
        type="email"
        value={email}
        onChange={setEmail}
        onTyping={onTyping}
        c={c}
        placeholder="you@example.com"
        error={errors.email}
      />
      <StitchedInput
        id="login-pw"
        type="password"
        value={password}
        onChange={setPassword}
        onTyping={onTyping}
        c={c}
        placeholder="••••••••"
        error={errors.password}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "none" }}>
          <div
            onClick={() => setRemember((r) => !r)}
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: `1.5px solid ${remember ? c.accent : c.border}`,
              background: remember ? c.accent : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            {remember && (
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M1 4 L4 7 L10 1" stroke={c.btnText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500, color: c.textSec }}>Remember me</span>
        </label>
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "13px",
            fontWeight: 600,
            color: c.accent,
            fontFamily: "Quicksand, sans-serif",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: "3px",
          }}
        >
          Forgot password?
        </button>
      </div>

      <BlockPrintButton c={c} fullWidth onClick={handleSubmit}>
        Login
      </BlockPrintButton>

      <Divider c={c} />

      <p style={{ textAlign: "center", fontSize: "13.5px", color: c.textSec, margin: 0 }}>
        {"Don't have an account? "}
        <button
          type="button"
          onClick={onFlip}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: c.accent,
            fontWeight: 700,
            fontSize: "13.5px",
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

// ── Signup Form (mirrors LoginForm's icon-input, borderless style) ────────

function UserIcon({ color }) {
  return (
    <svg width="16" height="17" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6.5" r="3.5" stroke={color} strokeWidth="1.4" />
      <path d="M3.5 17 C4.2 12.8 6.8 10.8 10 10.8 C13.2 10.8 15.8 12.8 16.5 17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── Role icons (Weaver / Admin / Brand / Government) ──────────────────────

function WeaverIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke={color} strokeWidth="1.3" />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={10 - Math.cos((a * Math.PI) / 180) * 6.5}
          y1={10 - Math.sin((a * Math.PI) / 180) * 6.5}
          x2={10 + Math.cos((a * Math.PI) / 180) * 6.5}
          y2={10 + Math.sin((a * Math.PI) / 180) * 6.5}
          stroke={color}
          strokeWidth="0.9"
          opacity="0.75"
        />
      ))}
      <circle cx="10" cy="10" r="1.6" fill={color} />
    </svg>
  );
}

function AdminIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5 L16 5 V9.5 C16 13.5 13.4 16.4 10 17.5 C6.6 16.4 4 13.5 4 9.5 V5 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7.3 9.8 L9.2 11.6 L12.8 8" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.5 2.5 L17 9 C17.5 9.5 17.5 10.4 17 10.9 L10.9 17 C10.4 17.5 9.5 17.5 9 17 L2.5 10.5 V4.5 C2.5 3.4 3.4 2.5 4.5 2.5 Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="6.5" r="1.4" fill={color} />
    </svg>
  );
}

function GovernmentIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5 L17 6.5 H3 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="4" y1="8.5" x2="4" y2="15" stroke={color} strokeWidth="1.3" />
      <line x1="8" y1="8.5" x2="8" y2="15" stroke={color} strokeWidth="1.3" />
      <line x1="12" y1="8.5" x2="12" y2="15" stroke={color} strokeWidth="1.3" />
      <line x1="16" y1="8.5" x2="16" y2="15" stroke={color} strokeWidth="1.3" />
      <line x1="2.5" y1="15" x2="17.5" y2="15" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="2.5" y1="17.3" x2="17.5" y2="17.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const ROLES = [
  { id: "weaver", label: "Weaver", Icon: WeaverIcon },
  { id: "admin", label: "Admin", Icon: AdminIcon },
  { id: "brand", label: "Brand", Icon: BrandIcon },
  { id: "government", label: "Government", Icon: GovernmentIcon },
];

function RoleSelector({ value, onChange, c, error }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <span
        style={{
          display: "block",
          marginBottom: "6px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: c.textSec,
          fontFamily: "Quicksand, sans-serif",
        }}
      >
        I am joining as
      </span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
        {ROLES.map(({ id, label, Icon }) => {
          const selected = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={selected}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 11px",
                background: selected ? `${c.accent}1f` : c.inputBg,
                border: `1px solid ${selected ? c.accent : error ? "#E05555" : c.border}`,
                borderRadius: "11px",
                color: selected ? c.accent : c.textSec,
                fontFamily: "Quicksand, sans-serif",
                fontSize: "12.5px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              <Icon color={selected ? c.accent : c.textSec} />
              {label}
            </button>
          );
        })}
      </div>
      {error && (
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#E05555", fontFamily: "Quicksand, sans-serif" }}>{error}</p>
      )}
    </div>
  );
}

function SignupForm({ c, onTyping, onFlip }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = "Please enter your full name";
    if (!email.includes("@")) errs.email = "Please enter a valid email address";
    if (password.length < 8) errs.password = "Password must be at least 8 characters";
    if (confirm !== password) errs.confirm = "Passwords do not match";
    if (!role) errs.role = "Please select a role";
    setErrors(errs);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        animation: "float-in 0.5s ease both",
        background: `${c.surface}26`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${c.border}55`,
        borderRadius: "18px",
        padding: "14px 16px 12px",
        boxShadow: `0 12px 32px ${c.outerShadow}22`,
      }}
    >
      <div
  style={{
    textAlign: "center",
    marginTop: "-8px",
    marginBottom: "6px",
  }}
>
        <h2
          style={{
            fontFamily: "Amita, serif",
            fontSize: "17px",
            fontWeight: 700,
            color: c.text,
            margin: "0 0 2px",
            letterSpacing: "0.02em",
          }}
        >
          Join KarghaKendra
        </h2>
        <p style={{ fontFamily: "Quicksand, sans-serif", fontSize: "11px", color: c.textSec, margin: 0, opacity: 0.85 }}>
          Weave your story into our fabric
        </p>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <UserIcon color={c.textSec} />
          </div>
          <input
            id="su-name"
            type="text"
            value={name}
            placeholder="Full name"
            onChange={(e) => {
              setName(e.target.value);
              onTyping();
            }}
            style={{
              width: "100%",
              padding: "10px 14px 10px 40px",
              height: "40px",
              background: c.inputBg,
              border: `1px solid ${errors.name ? "#E05555" : c.border}`,
              borderRadius: "12px",
              color: c.text,
              fontFamily: "Quicksand, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              outline: "none",
              backdropFilter: "blur(6px)",
            }}
          />
        </div>
        {errors.name && (
          <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#E05555", fontFamily: "Quicksand, sans-serif" }}>{errors.name}</p>
        )}
      </div>

      <RoleSelector value={role} onChange={setRole} c={c} error={errors.role} />

      <StitchedInput id="su-email" type="email" value={email} onChange={setEmail} onTyping={onTyping} c={c} placeholder="you@example.com" error={errors.email} />
      <StitchedInput id="su-pw" type="password" value={password} onChange={setPassword} onTyping={onTyping} c={c} placeholder="Enter Password" error={errors.password} />
      <StitchedInput id="su-cpw" type="password" value={confirm} onChange={setConfirm} onTyping={onTyping} c={c} placeholder="Confirm password" error={errors.confirm} />

      <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", cursor: "none" }}>
        <div
          onClick={() => setAgreed((a) => !a)}
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            flexShrink: 0,
            marginTop: 1,
            border: `1.5px solid ${agreed ? c.accent : c.border}`,
            background: agreed ? c.accent : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {agreed && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 4 L4 7 L10 1" stroke={c.btnText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span style={{ fontSize: "11px", fontWeight: 500, color: c.textSec, lineHeight: 1.4 }}>
          I agree to the{" "}
          <span style={{ color: c.accent, textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "3px" }}>
            Terms of Service
          </span>{" "}
          and{" "}
          <span style={{ color: c.accent, textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "3px" }}>
            Privacy Policy
          </span>
        </span>
      </label>

      <BlockPrintButton c={c} fullWidth onClick={handleSubmit}>
        Create Account
      </BlockPrintButton>

      <p style={{ textAlign: "center", fontSize: "12px", color: c.textSec, margin: "8px 0 0" }}>
        Already a member?{" "}
        <button
          type="button"
          onClick={onFlip}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: c.accent,
            fontWeight: 700,
            fontSize: "13.5px",
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

// ── Auth Card (flips between Login and Signup faces) ──────────────────────

function AuthCard({ c, onTyping, flipped, onFlip }) {
  const [flipping, setFlipping] = useState(false);

  const handleFlip = useCallback(() => {
    if (flipping) return;
    setFlipping(true);
    onFlip();
    setTimeout(() => setFlipping(false), 640);
  }, [flipping, onFlip]);

  const faceStyle = {
    gridArea: "1 / 1 / 1 / 1",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div style={{ perspective: "1400px", width: "100%" }}>
      <div
        style={{
          display: "grid",
          width: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: "transform 0.64s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div style={{ ...faceStyle, transform: "rotateY(0deg)", zIndex: flipped ? 0 : 2, visibility: flipping || !flipped ? "visible" : "hidden" }}>
          <LoginForm c={c} onTyping={onTyping} onFlip={handleFlip} />
        </div>
        <div style={{ ...faceStyle, transform: "rotateY(180deg)", visibility: flipping || flipped ? "visible" : "hidden" }}>
          <SignupForm c={c} onTyping={onTyping} onFlip={handleFlip} />
        </div>
      </div>
    </div>
  );
}

// ── Small leaf glyph (flanks the subtitle, mirrored on the right) ─────────

function LeafGlyph({ c, mirrored }) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      style={{ transform: mirrored ? "scaleX(-1)" : "none", flexShrink: 0 }}
    >
      <line x1="0" y1="6" x2="12" y2="6" stroke={c.gold} strokeWidth="1" opacity="0.75" />
      <path d="M12,6 C15,3.5 17,4 19,2" stroke={c.gold} strokeWidth="1" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M12,6 C15,8.5 17,8 19,10" stroke={c.gold} strokeWidth="1" fill="none" opacity="0.8" strokeLinecap="round" />
      <circle cx="12" cy="6" r="1.3" fill={c.gold} />
    </svg>
  );
}

// ── Hero copy ──────────────────────────────────────────────────────────────

function HeroCopy({ c, theme, pulse, flipped }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 360, marginBottom: flipped ? "clamp(8px, 1.5vh, 12px)" : 0, transition: "margin-bottom 0.6s ease" }}>
      <div style={{ marginBottom: flipped ? "10px" : "20px", transition: "margin-bottom 0.6s ease" }}>
        <Logo theme={theme} pulse={pulse} />
      </div>
      <h1
        style={{
          fontFamily: "Amita, serif",
          fontSize: "clamp(30px, 4vw, 40px)",
          fontWeight: 700,
          color: c.text,
          margin: 0,
          letterSpacing: "0.02em",
          lineHeight: 1.1,
        }}
      >
        KarghaKendra
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          margin: "8px 0 0",
        }}
      >
        <LeafGlyph c={c} />
        <p
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: c.textSec,
            margin: 0,
          }}
        >
          The Handloom Marketplace
        </p>
        <LeafGlyph c={c} mirrored />
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState("light");
  const [typingBoost, setTypingBoost] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const typingTimeout = useRef();

  const c = T[theme];

  const handleTyping = useCallback(() => {
    setTypingBoost(true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setTypingBoost(false), 900);
  }, []);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      <GlobalStyle />
      <BackgroundLayer theme={theme} />
      <NeedleCursor theme={theme} />
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))} c={c} />

      <main
      style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: flipped ? "flex-start" : "space-around",
        alignItems: "center",
        padding: flipped
          ? "0px 20px 20px"
          : "clamp(40px, 8vh, 60px) 20px",
        gap: flipped
          ? "0px"
          : "clamp(14px, 2.5vh, 20px)",
        transition: "padding 0.6s ease, justify-content 0.6s ease, gap 0.6s ease",
      }}
    >
      <HeroCopy
        c={c}
        theme={theme}
        pulse={typingBoost}
        flipped={flipped}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <AuthCard
          c={c}
          onTyping={handleTyping}
          flipped={flipped}
          onFlip={handleFlip}
        />
      </div>
    </main>
    </div>
  );
}
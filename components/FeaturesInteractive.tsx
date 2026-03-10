"use client";
import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Placeholder screen components (will be replaced with real screenshots)
function ScreenRecord() {
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF6EF", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 12px", overflowY: "auto" }}>
      {/* X close button */}
      <div style={{ alignSelf: "flex-start", fontSize: 14, color: "#4A4540", marginBottom: "auto" }}>✕</div>
      {/* Prompt card */}
      <div style={{ width: "100%", padding: "12px 16px", borderRadius: 14, backgroundColor: "rgba(107,143,113,0.06)", border: "1px solid rgba(107,143,113,0.12)", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#6B8F71", marginBottom: 6 }}>Today's Reflection</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: "#2C3E2D", lineHeight: 1.4 }}>"What did you learn about yourself today?"</div>
      </div>
      {/* Orb with concentric rings */}
      <div style={{ position: "relative", width: 130, height: 130, marginBottom: 10 }}>
        {/* Outermost ring */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "rgba(107,143,113,0.06)" }} />
        {/* Middle ring */}
        <div style={{ position: "absolute", inset: 15, borderRadius: "50%", backgroundColor: "rgba(107,143,113,0.08)" }} />
        {/* Inner ring */}
        <div style={{ position: "absolute", inset: 30, borderRadius: "50%", backgroundColor: "rgba(107,143,113,0.12)" }} />
        {/* Core orb */}
        <div style={{ position: "absolute", inset: 40, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.9) 0%, #7BA882 35%, #6B8F71 60%, rgba(107,143,113,0.4) 100%)", boxShadow: "0 4px 20px rgba(107,143,113,0.3)" }} />
        {/* Highlight */}
        <div style={{ position: "absolute", top: 44, left: 52, width: 12, height: 10, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.7)" }} />
      </div>
      {/* Tap to begin */}
      <div style={{ fontSize: 11, color: "#8A8078", marginBottom: "auto" }}>Tap to begin</div>
      {/* Private by default */}
      <div style={{ fontSize: 9, color: "#B8A99A" }}>Private by default.</div>
    </div>
  );
}

function ScreenRelease() {
  const moods = [
    { name: "Calm", color: "#B8A4D4" },
    { name: "Happy", color: "#F4C430" },
    { name: "Sad", color: "#003153" },
    { name: "Anxious", color: "#B0B7C3" },
    { name: "Reflective", color: "#B97A95" },
    { name: "Grateful", color: "#F6B7A9" },
    { name: "Tired", color: "#9FB3C8" },
    { name: "Stressed", color: "#C47A6D" },
    { name: "Hopeful", color: "#7FB77E" },
    { name: "Neutral", color: "#E6DDCF" },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF6EF", display: "flex", flexDirection: "column", padding: "32px 16px 10px", overflowY: "auto" }}>
      {/* Audio player card */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "12px 14px", borderRadius: 14, backgroundColor: "rgba(107,143,113,0.06)", border: "1px solid rgba(107,143,113,0.1)", marginBottom: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#6B8F71", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="#fff"><path d="M3 1.5v11l9-5.5z" /></svg>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 2, alignItems: "center", height: 16, overflow: "hidden" }}>
            {[3,4,6,5,8,6,9,7,10,6,8,5,9,7,6,8,5,7,4,8,6,5,3,5,7,6].map((h, i) => (
              <div key={i} style={{ width: 2.5, height: h, backgroundColor: "#6B8F71", borderRadius: 1.5, opacity: 0.4 }} />
            ))}
          </div>
          <div style={{ fontSize: 8, color: "#8A8078", marginTop: 3 }}>0:00</div>
        </div>
        <span style={{ fontSize: 9, color: "#8A8078" }}>1×</span>
      </div>
      {/* Add a title */}
      <div style={{ fontSize: 11, color: "#B8A99A", fontStyle: "italic", paddingBottom: 6, borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: 8 }}>Add a title (optional)</div>
      {/* MOOD section */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "#8A8078", marginBottom: 5 }}>Mood</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        {moods.map((m) => (
          <div key={m.name} style={{ padding: "4px 8px", borderRadius: 14, backgroundColor: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", fontSize: 9, color: "#6B6560", display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: m.color }} />
            {m.name}
          </div>
        ))}
      </div>
      {/* NOTES section */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "#8A8078", marginBottom: 4 }}>Notes</div>
      <div style={{ padding: "8px 10px", borderRadius: 10, backgroundColor: "rgba(107,143,113,0.04)", border: "1px solid rgba(107,143,113,0.08)", minHeight: 36, marginBottom: 8 }}>
        <div style={{ fontSize: 9, color: "#B8A99A" }}>Anything else on your mind?</div>
      </div>
      {/* PHOTO section */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "#8A8078", marginBottom: 4 }}>Photo</div>
      <div style={{ padding: "8px 10px", borderRadius: 10, border: "1px dashed rgba(107,143,113,0.2)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8A99A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16l5-5 4 4 4-4 5 5" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
        <span style={{ fontSize: 9, color: "#B8A99A" }}>Add a photo</span>
      </div>
      {/* Time Capsule toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.05)", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#4A4540" }}>Time Capsule</div>
          <div style={{ fontSize: 7, color: "#8A8078" }}>Seal this entry until a future date</div>
        </div>
        <div style={{ width: 28, height: 16, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.08)", position: "relative" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: 2, left: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
        </div>
      </div>
      {/* Save entry button */}
      <div style={{ padding: "10px 0", borderRadius: 12, backgroundColor: "#6B8F71", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#fff" }}>Save entry</div>
    </div>
  );
}

function ScreenEntry() {
  const entryDays: Record<number, string> = {
    1: "#F4C430", 2: "#B8A4D4", 3: "#7FB77E", 4: "#F6B7A9", 5: "#C47A6D",
    6: "#B97A95", 7: "#7FB77E", 8: "#9FB3C8", 9: "#6B8F71"
  };
  const weeks = [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,0,0,0,0]];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF6EF", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 12px 0" }}>
        {/* Greeting + avatar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#2C3E2D", lineHeight: 1.2 }}>Good evening</div>
            <div style={{ fontSize: 8, color: "#6B8F71", marginTop: 3 }}>✦ 9-day streak</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ position: "relative" }}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAGNklEQVR42p1YW28cSRU+36mq7rn09NgzsR0bJ3ayASW7QtoVKwRCSPDCv+Qn8MILQohFXB4QK4WVyAqhZEnYLNmNvY7t8Vw801318dBtz3imxx5TT61S1Tl1bt85XyM7eyEiAOTaRfL6A5cSZk9eI9ZC5AaRIiKiFIoQAuBS9OX3rIIbbSgVr3iUqH7fnKErai0Vr7QAiIAigYSICJa8YDVpVLnNhcJuAACmDqDcehF66zuKORMxl3ecJiQClycXyVt56SKepWLyitNZJKEIIAArBVNEqP+Poy4DTIrI/LshN4QPIiKWittaO82jRQWzO7OOWdB96xivmL0MFBHv/fl4vHiFFEXgFW/zOlvLtVowVDXz+dn5UGcw59LZdrYkWV2iJThYa0VVKAzee3+D9RCo9sfn4yybE1ikup3drBQUSGetiBwcvzsd9J21nSRNWy0JzPIMQCmBRWmVycVAsTg4Pu4mLZLlflnDgNCWvsVS9zrnDk+Of/u3v74++CYIrWozru9vb//w8Qebne60hFTzbFJ4LHgfRdFx7+To7PTh5pb3uQimuiGkIO+/WKY2eA81vdHgl7/5dW8waNZqqqqAAgysxfHPP/pYoc9ePo+j6L3t3ff3HxYFJqpng/6fn3223d18srVloxqMmbPHLtNK0rlI6o3f/eUPR71eN00ZghZoKXDO+hA+efppJ233BmekvPn28N3Z6Qd771H49uT4X69fWWt31jr5ZOzixmXYCnARCPL+F5VabRT9+7+vn33xojccng0Ho/EEEFV1xjpr1BiIeAajWGskp8O+D16AWlSz1vgQmnH8/t6jrUYDzJvrG6UnAouoEmKFlBnUpSBIcHHt08//8as//r4R1QejYZbnZFALQJ2ayLk4ipu1WrPWsMbkwe90NzLvx9lEACGbUby/fW+j1cr6p/UkFZYYJ4CgLHE7izUUiNCoGQ6Hf/rsaVpvfnN05EOII2uMCSQZMjIPfjg+Pz3rGcA5G0dRo9ZImw2jNnau217bu7vbTVp5/x0ExrnChSoQoVBCRT+GkGJUh8Ohgfn66IiB1uh4MomdW0/TtVaa1OrOWgggQgYKjRrnXC2O15PWnXY3bbWd+Lx3AIWL6tbFIgSUmBonWBwEgBBCmiQn/bPxZBI560N4vPfgu3v762k7cpFVVYECRlUhCjVGVY2qFl0ao5PsvKfGgTZqNNVYMkwzGJcTyExpC0UYNK69/OrLN98eWmOc0Z99/KN727uaj2Q8wngAGLFWjKNzhAkmkGokJ4PmY0xGoFfrEIJrNOJGiwzLRp8ZzRB6iuo/X70ajcfdNP3FT366mzSzLz832cRZZyIHNSHPABEAxqhaGAM1lBAAtQ7WiTCqNZrtTpFrSxTPwaRCvH9zeMgQfvzhRw/rUf/535O0Xet01aiLY1tPSPHjEUV8noXcCwMhqg5WravZKI4arbieqNpqrQXyLww2Sp8fHB/t797/8O7W6PnT7nf22xs7UdL2k3H/7X/Gw69tPTEuZsjjZgvWihqIqlFRY2wUJ2sMAcZIVacvOsR8HRfeDgzjPP/B9x7j7cv1+4+2HjyJWusUQrWWdkbHB2pM3O4ODr/Kz/uKoHRQIxQEGpeocTRLOycVqLRYRIIP6+21e7FGtnb30fejZhryrIBuG9fTnQcUEYZ059Gk/y4bnFKCqlXjXKNl6q351suiimfQAhARy0WwBu5vbCbMOvefxI00zyZQLaGOgbkv818Rp3eiZJ15LhAYW0AfFuaQym5gFyNvjd3rdhL1zTt3vc+mgSiCggIAGEj6HIBax/ItAXM9/2IOrxpvr+4W5+5tbsXM1UY+zwVTHjalK0WPAaSAwTl0WGFCW4wx8+A3und8NgkhFP6F6pVhixQAnJ09WD3Sctn+YlYLhDTGmgLqLh59hQ8W7wCFUow+CMJK3csMRpFcs52x+Fjgn7PUtJJTXY3W/KA4vVWmA+1KHLWYqq4ZC4FZpsQZW6vk8zqaWsG1cfP/gpJF4nr+AsjqTALX/ZnAxVBOVGtdZAG3p6kzPijEUUqOBAoCwZWIz2qKr2W6BabggjqvyD51RQND1U+aC4osuAARKmQ1Urd6jMHSqZUOqSQEnMaW83n9P+mIF8kV/Q+iAAAAAElFTkSuQmCC" width="22" height="22" style={{ borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", fontSize: 4, color: "#fff", backgroundColor: "#6B8F71", borderRadius: 3, padding: "0.5px 3px", fontWeight: 700 }}>PRO</div>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#8A8078", fontWeight: 600 }}>K</div>
          </div>
        </div>

        {/* Morning / Evening cards */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <div style={{ flex: 1, padding: "8px 10px", borderRadius: 10, backgroundColor: "rgba(107,143,113,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFD166" stroke="none"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FFD166" strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 5.5, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", color: "#6B8F71" }}>Morning Intention</span>
            </div>
            <div style={{ fontSize: 8, color: "#4A4540" }}>Be patient with myself today</div>
          </div>
          <div style={{ flex: 1, padding: "8px 10px", borderRadius: 10, backgroundColor: "rgba(184,165,220,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#C4A0E0"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
              <span style={{ fontSize: 5.5, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", color: "#6B8F71" }}>Evening Reflection</span>
            </div>
            <div style={{ fontSize: 8, color: "#4A4540" }}>I chose courage over comfort</div>
          </div>
        </div>

        {/* Calendar card */}
        <div style={{ padding: "10px 10px 8px", borderRadius: 14, backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 4px" }}>
            <span style={{ fontSize: 10, color: "#8A8078" }}>‹</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#2C3E2D" }}>March 2026</span>
            <span style={{ fontSize: 10, color: "#8A8078" }}>›</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
            {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 5, fontWeight: 600, color: "#B8A99A", letterSpacing: 0.3 }}>{d}</div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 3 }}>
              {week.map((day, di) => (
                <div key={di} style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: 20 }}>
                  {day > 0 && (
                    <>
                      <div style={{
                        fontSize: 8, lineHeight: 1,
                        color: day === 9 ? "#fff" : "#4A4540",
                        width: 16, height: 16,
                        borderRadius: "50%",
                        backgroundColor: day === 9 ? "#6B8F71" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: day === 9 ? 600 : 400,
                      }}>{day}</div>
                      {entryDays[day] && day !== 9 && (
                        <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", backgroundColor: entryDays[day], marginTop: 1 }} />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {[
            { icon: "♫", label: "Releases", active: true },
            { icon: "☆", label: "Favorites", active: false },
            { icon: "⏱", label: "Capsules", badge: 1, active: false },
          ].map(t => (
            <div key={t.label} style={{ flex: 1, padding: "6px 0", borderRadius: 10, backgroundColor: t.active ? "rgba(107,143,113,0.06)" : "transparent", border: "1px solid rgba(0,0,0,0.05)", textAlign: "center", fontSize: 8, color: t.active ? "#6B8F71" : "#8A8078", position: "relative" }}>
              {t.icon} {t.label}
              {t.badge && <div style={{ position: "absolute", top: -3, right: 8, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#6B8F71", fontSize: 6, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.badge}</div>}
            </div>
          ))}
        </div>

        {/* Today's releases */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#2C3E2D", marginBottom: 6 }}>Today's releases</div>
      </div>

      {/* Bottom nav bar - matching screenshot */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "6px 24px 10px", borderTop: "1px solid rgba(0,0,0,0.04)", backgroundColor: "#FAF6EF" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span style={{ fontSize: 6, color: "#6B8F71", fontWeight: 600 }}>Calendar</span>
        </div>
        <div style={{ marginTop: -18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(107,143,113,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF6EF" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#6B8F71", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8078" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{ fontSize: 6, color: "#8A8078" }}>Profile</span>
        </div>
      </div>
    </div>
  );
}


function ScreenShare() {
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF6EF", display: "flex", flexDirection: "column", padding: "32px 18px 16px", overflowY: "auto" }}>
      {/* X close button */}
      <div style={{ alignSelf: "flex-end", fontSize: 14, color: "#4A4540", marginBottom: 16 }}>✕</div>
      {/* Title */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2C3E2D", fontWeight: 700, marginBottom: 8 }}>Share safely</div>
      {/* Subtitle */}
      <div style={{ fontSize: 10, color: "#8A8078", marginBottom: 14 }}>Create a private link for someone to listen.</div>
      {/* Expiration label */}
      <div style={{ fontSize: 10, fontWeight: 600, color: "#4A4540", marginBottom: 8 }}>Expiration</div>
      {/* Expiration pills - all in one row */}
      <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
        {["View once", "1 hour", "24 hours", "7 days"].map((opt, i) => (
          <div key={opt} style={{ padding: "5px 8px", borderRadius: 14, backgroundColor: i === 0 ? "#6B8F71" : "rgba(0,0,0,0.03)", border: i === 0 ? "none" : "1px solid rgba(0,0,0,0.08)", fontSize: 8, color: i === 0 ? "#fff" : "#6B6560", fontWeight: i === 0 ? 600 : 400, whiteSpace: "nowrap" }}>{opt}</div>
        ))}
      </div>
      {/* Info banner */}
      <div style={{ padding: "10px 12px", borderRadius: 10, backgroundColor: "rgba(107,143,113,0.1)", display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <span style={{ fontSize: 10, color: "#6B8F71" }}>⏱</span>
        <span style={{ fontSize: 9, color: "#6B8F71" }}>Link will expire after one view</span>
      </div>
      {/* Create share link button */}
      <div style={{ padding: "12px 0", borderRadius: 14, backgroundColor: "#6B8F71", color: "#fff", textAlign: "center", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Create share link</div>
      {/* Cancel button */}
      <div style={{ padding: "12px 0", borderRadius: 14, backgroundColor: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "#4A4540", textAlign: "center", fontSize: 12 }}>Cancel</div>
    </div>
  );
}

function ScreenTimeCapsule() {
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF2EC", display: "flex", flexDirection: "column", padding: "32px 18px 12px", overflowY: "auto" }}>
      {/* Time and mood */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <div style={{ fontSize: 8, color: "#A09080" }}>12:12 AM</div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#B8A4D4" }} />
          <span style={{ fontSize: 8, color: "#A09080" }}>Calm ›</span>
        </div>
      </div>
      {/* Title */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: "#4A3A30", marginBottom: 16 }}>Note to my future self 💌</div>
      {/* Lock icon */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ display: "inline-block", width: 28, height: 32 }}>
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
            <rect x="4" y="14" width="20" height="16" rx="3" fill="#C49A7A" />
            <path d="M9 14V10a5 5 0 0110 0v4" stroke="#C49A7A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* Message to Future You */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#4A3A30", textAlign: "center", marginBottom: 4 }}>Message to Future You</div>
      {/* Unlock date */}
      <div style={{ fontSize: 10, color: "#C47A6D", textAlign: "center", marginBottom: 8 }}>Unlocks June 7, 2026</div>
      {/* Description */}
      <div style={{ fontSize: 9, color: "#8A8078", textAlign: "center", lineHeight: 1.5, marginBottom: 12, padding: "0 10px" }}>This entry is sealed until its unlock date. Come back then to revisit your thoughts.</div>
      {/* Let Go with feather icon */}
      <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C49A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
        <span style={{ fontSize: 10, color: "#C49A7A" }}>Let Go</span>
      </div>
    </div>
  );
}

// Pro screens
function ScreenTranscriptReflection() {
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #FAF6EF 0%, #F5F0E6 100%)", display: "flex", flexDirection: "column", gap: 10, padding: "32px 18px", overflowY: "auto" }}>
      {/* Transcript section */}
      <div style={{ padding: "14px 16px", borderRadius: 14, backgroundColor: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#8A8078" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 6h6M5 8.5h4" /></svg>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#8A8078" }}>Transcript</span>
        </div>
        <div style={{ fontSize: 11, color: "#4A4540", lineHeight: 1.65 }}>
          I realized I've been carrying this weight for weeks and I never told anyone. Saying it out loud just now... I actually feel lighter.
        </div>
      </div>
      {/* AI Reflection section */}
      <div style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(184,165,220,0.12)", border: "1px solid rgba(184,165,220,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "#6B8F71" }}>✦</span>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 12, color: "#6B8F71" }}>AI Reflection</span>
        </div>
        <div style={{ fontSize: 11, color: "#4A4540", lineHeight: 1.65, fontStyle: "italic" }}>
          There's something powerful happening here — you're learning that some things don't need to be solved. They just need to be said. The relief you're feeling isn't weakness. It's release.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <div style={{ padding: "4px 10px", borderRadius: 8, backgroundColor: "rgba(107,143,113,0.08)", border: "1px solid rgba(107,143,113,0.12)", fontSize: 10, color: "#6B8F71", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>Share Reflection</div>
        </div>
      </div>
      <div style={{ fontSize: 9, color: "#B8A99A", lineHeight: 1.5, marginTop: 2 }}>AI reflections are for personal awareness only and are not a substitute for professional mental health support.</div>
    </div>
  );
}

function ScreenNightSky() {
  // 28 entries: 8 favorites (gold), 4 time capsules (ring + bigger), rest mood colors
  const entries = [
    { color: "#A8D8EA", fav: false, capsule: false, size: 12 },
    { color: "#FFD166", fav: true, capsule: false, size: 14 },
    { color: "#C77DFF", fav: false, capsule: false, size: 10 },
    { color: "#F4A261", fav: false, capsule: true, size: 12 },
    { color: "#FFD166", fav: true, capsule: false, size: 15 },
    { color: "#B7E4C7", fav: false, capsule: false, size: 11 },
    { color: "#FF6B6B", fav: false, capsule: false, size: 12 },
    { color: "#FFD166", fav: true, capsule: false, size: 13 },
    { color: "#6B9FD4", fav: false, capsule: true, size: 11 },
    { color: "#CED4DA", fav: false, capsule: false, size: 10 },
    { color: "#FFD166", fav: true, capsule: false, size: 14 },
    { color: "#E07A5F", fav: false, capsule: false, size: 11 },
    { color: "#ADB5BD", fav: false, capsule: true, size: 11 },
    { color: "#FFD166", fav: true, capsule: false, size: 13 },
    { color: "#A8D8EA", fav: false, capsule: false, size: 12 },
    { color: "#FFD166", fav: true, capsule: true, size: 14 },
    { color: "#C77DFF", fav: false, capsule: false, size: 10 },
    { color: "#B7E4C7", fav: false, capsule: false, size: 12 },
    { color: "#FF6B6B", fav: false, capsule: false, size: 10 },
    { color: "#F4A261", fav: false, capsule: false, size: 13 },
    { color: "#6B9FD4", fav: false, capsule: false, size: 11 },
    { color: "#A8D8EA", fav: false, capsule: false, size: 12 },
    { color: "#E07A5F", fav: false, capsule: false, size: 10 },
    { color: "#CED4DA", fav: false, capsule: false, size: 10 },
    { color: "#C77DFF", fav: false, capsule: false, size: 11 },
    { color: "#B7E4C7", fav: false, capsule: false, size: 13 },
    { color: "#FFD166", fav: true, capsule: false, size: 12 },
    { color: "#FF6B6B", fav: false, capsule: false, size: 10 },
  ];
  // Hand-placed positions for natural scattered look across the full sky
  const positions = [
    { x: 48, y: 18 }, { x: 72, y: 8 }, { x: 28, y: 12 }, { x: 85, y: 22 },
    { x: 15, y: 25 }, { x: 58, y: 28 }, { x: 38, y: 35 }, { x: 78, y: 38 },
    { x: 8, y: 42 }, { x: 52, y: 44 }, { x: 90, y: 48 }, { x: 22, y: 50 },
    { x: 65, y: 52 }, { x: 42, y: 58 }, { x: 82, y: 60 }, { x: 12, y: 62 },
    { x: 55, y: 66 }, { x: 30, y: 70 }, { x: 75, y: 72 }, { x: 48, y: 76 },
    { x: 18, y: 78 }, { x: 88, y: 80 }, { x: 62, y: 84 }, { x: 35, y: 86 },
    { x: 8, y: 88 }, { x: 78, y: 90 }, { x: 50, y: 93 }, { x: 25, y: 95 },
  ];
  const moodDots = ["#A8D8EA","#FFD166","#C77DFF","#F4A261","#B7E4C7","#FF6B6B","#6B9FD4","#CED4DA","#E07A5F","#ADB5BD","#A8D8EA","#C77DFF","#B7E4C7","#FF6B6B"];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #1A1040 0%, #0C0A1E 25%, #0E0D1A 60%, #0C1520 100%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 10px 6px", position: "relative", overflowX: "hidden", overflowY: "auto" }}>
      {/* Nebula gradients */}
      <div style={{ position: "absolute", top: -10, left: -15, width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,80,180,0.12) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: 30, right: -20, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, rgba(50,120,140,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "30%", left: "20%", width: 50, height: 50, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,60,60,0.05) 0%, transparent 70%)" }} />
      {/* Shooting star */}
      <div style={{ position: "absolute", top: "16%", left: "4%", width: 32, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)", transform: "rotate(-20deg)", zIndex: 1 }} />
      {/* Header with nav arrows */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", zIndex: 2, marginBottom: 2 }}>
        <div style={{ width: 18, height: 18, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "rgba(255,255,255,0.4)" }}>‹</div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 6, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(196,181,216,0.5)", marginBottom: 1 }}>✦ Your Night Sky</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: "#fff", fontWeight: 700 }}>February 2026</div>
        </div>
        <div style={{ width: 18, height: 18, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "rgba(255,255,255,0.4)" }}>›</div>
      </div>
      {/* Star field */}
      <div style={{ flex: 1, width: "100%", position: "relative", zIndex: 1 }}>
        {/* 40 tiny background stars */}
        {[...Array(40)].map((_, i) => (
          <div key={`bg${i}`} style={{ position: "absolute", top: `${(i * 31 + 7) % 98}%`, left: `${(i * 47 + 3) % 98}%`, width: 0.5 + (i % 3) * 0.4, height: 0.5 + (i % 3) * 0.4, borderRadius: "50%", backgroundColor: `rgba(255,255,255,${0.06 + (i % 4) * 0.03})` }} />
        ))}
        {/* Constellation lines between adjacent stars */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {positions.map((p, i) => {
            if (i === 0) return null;
            const prev = positions[i - 1];
            return <line key={i} x1={`${prev.x}%`} y1={`${prev.y}%`} x2={`${p.x}%`} y2={`${p.y}%`} stroke="rgba(180,170,220,0.12)" strokeWidth="0.8" />;
          })}
        </svg>
        {/* Entry orbs */}
        {entries.map((e, i) => {
          const p = positions[i];
          const c = e.fav ? "#FFD166" : e.color;
          const sz = e.capsule ? e.size * 1.4 : e.size;
          const outerSz = sz + 8;
          return (
            <div key={i} style={{ position: "absolute", top: `${p.y}%`, left: `${p.x}%`, transform: "translate(-50%, -50%)" }}>
              {/* Outer glow */}
              <div style={{ position: "absolute", inset: -(sz * 1.2), borderRadius: "50%", background: `radial-gradient(circle, ${c}15 0%, transparent 70%)` }} />
              {/* Extra halo for favorites */}
              {e.fav && <>
                <div style={{ position: "absolute", inset: -(sz * 1.5), borderRadius: "50%", background: `radial-gradient(circle, ${c}0a 0%, transparent 70%)` }} />
              </>}
              {/* Mid halo */}
              <div style={{ width: outerSz, height: outerSz, borderRadius: "50%", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${c}18 0%, transparent 60%)` }} />
                {/* Star body - 3D glass ball */}
                <div style={{ position: "absolute", inset: (outerSz - sz) / 2, borderRadius: "50%", background: `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.8) 0%, ${c} 35%, ${c}99 60%, rgba(0,0,0,0.4) 100%)`, boxShadow: `inset 0 -${sz * 0.2}px ${sz * 0.4}px rgba(0,0,0,0.3), inset 0 ${sz * 0.15}px ${sz * 0.3}px ${c}50` }} />
                {/* Specular highlight */}
                <div style={{ position: "absolute", top: (outerSz - sz) / 2 + sz * 0.15, left: (outerSz - sz) / 2 + sz * 0.2, width: sz * 0.3, height: sz * 0.22, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 100%)" }} />
                {/* Time capsule ring */}
                {e.capsule && (
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-15deg)", width: outerSz + 4, height: outerSz * 0.3, borderRadius: "50%", border: "1px solid rgba(200,180,100,0.4)" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Bottom section */}
      {/* Slider */}
      <div style={{ width: "92%", height: 4, borderRadius: 2, backgroundColor: "rgba(107,143,113,0.15)", position: "relative", zIndex: 1, marginBottom: 4 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", borderRadius: 2, backgroundColor: "rgba(107,143,113,0.25)" }} />
        <div style={{ position: "absolute", right: -2, top: -5, width: 14, height: 14, borderRadius: "50%", backgroundColor: "#6B8F71", boxShadow: "0 0 8px rgba(107,143,113,0.5)" }} />
      </div>

      {/* Stats row with dividers */}
      <div style={{ display: "flex", alignItems: "stretch", zIndex: 1, marginBottom: 3, width: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1 }}>28</div>
          <div style={{ fontSize: 5, color: "rgba(255,255,255,0.3)", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2 }}>Entries</div>
        </div>
        <div style={{ width: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1 }}>7</div>
          <div style={{ fontSize: 5, color: "rgba(255,255,255,0.3)", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2 }}>Streak</div>
        </div>
        <div style={{ width: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1 }}>Happy</div>
          <div style={{ fontSize: 5, color: "rgba(255,255,255,0.3)", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2 }}>Felt Most</div>
        </div>
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", gap: 5, width: "100%", zIndex: 1 }}>
        <div style={{ flex: 1, padding: "5px 0", borderRadius: 10, backgroundColor: "rgba(107,143,113,0.12)", border: "1px solid rgba(107,143,113,0.25)", textAlign: "center", fontSize: 7, color: "#6B8F71", fontWeight: 600 }}>✦ AI Reflection</div>
        <div style={{ flex: 1, padding: "5px 0", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", fontSize: 7, color: "rgba(255,255,255,0.4)" }}>Final Thoughts</div>
      </div>
    </div>
  );
}

function ScreenStarSessions() {
  const sessions = [
    { name: "The Unfinished Star", desc: "What you haven't said out loud yet", color: "#C4A0E0" },
    { name: "Light From the Past", desc: "A conversation with who you were", color: "#E0C060" },
    { name: "The Dark Sky", desc: "What you protect yourself from", color: "#70B0D8" },
    { name: "Orbit", desc: "The people in your constellation", color: "#E09060" },
    { name: "First Light", desc: "The turning point of your month", color: "#90C890" },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #18102E 0%, #110C22 40%, #0E0A1C 100%)", display: "flex", flexDirection: "column", padding: "32px 12px 8px", position: "relative", overflowY: "auto" }}>
      {/* Background stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${3 + (i * 29) % 94}%`, left: `${2 + (i * 43) % 96}%`, width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, borderRadius: "50%", backgroundColor: `rgba(255,255,255,${0.06 + (i % 3) * 0.04})` }} />
      ))}
      {/* Back arrow */}
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6, zIndex: 1 }}>‹</div>
      {/* Eyebrow */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(230,190,100,0.7)", zIndex: 1, marginBottom: 2 }}>✦ Star Sessions</div>
      {/* Title */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#fff", fontWeight: 700, zIndex: 1, lineHeight: 1.1, marginBottom: 4 }}>Guided journeys</div>
      {/* Subtitle */}
      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", zIndex: 1, marginBottom: 10, lineHeight: 1.5 }}>Each session is a conversation with yourself. Your answers become stars in your night sky.</div>
      {/* Session cards */}
      {sessions.map(s => (
        <div key={s.name} style={{ padding: "10px 10px 8px", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 6, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            {/* 3D glass marble orb with frosted ring */}
            <div style={{ width: 40, height: 40, borderRadius: "50%", position: "relative", flexShrink: 0 }}>
              {/* Frosted glass outer ring */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", backdropFilter: "blur(4px)" }} />
              {/* Ambient glow */}
              <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)` }} />
              {/* Main sphere body - slightly inset from the glass ring */}
              <div style={{ position: "absolute", inset: 5, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, ${s.color} 0%, ${s.color}cc 50%, ${s.color}40 80%, rgba(0,0,0,0.35) 100%)`, boxShadow: `0 2px 6px rgba(0,0,0,0.4), inset 0 -3px 6px rgba(0,0,0,0.3), inset 0 3px 5px ${s.color}60` }} />
              {/* White highlight spot */}
              <div style={{ position: "absolute", top: 8, left: 12, width: 9, height: 7, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)" }} />
              {/* Small bright dot */}
              <div style={{ position: "absolute", top: 11, left: 15, width: 3, height: 2.5, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.8)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: s.color, marginBottom: 1 }}>{s.name}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
            </div>
          </div>
          {/* Bottom row: time + dots */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>~4 min · 4 prompts</div>
            <div style={{ display: "flex", gap: 3 }}>
              {[0,1,2,3].map(d => (
                <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: `${s.color}70` }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenWaveBreathing() {
  const patterns = [
    { name: "Box Breathing", desc: "Four equal breaths, steady and grounding.", timing: "4s · 4s · 4s · 4s", dots: 4 },
    { name: "4-7-8", desc: "Slow your mind. Let calm take over.", timing: "4s · 7s · 8s", dots: 3 },
    { name: "Wave Breathing", desc: "Rhythmic and effortless. Let the wave carry you.", timing: "5s · 5s", dots: 2 },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #161412 0%, #0E0C0A 100%)", display: "flex", flexDirection: "column", padding: "32px 12px 10px", position: "relative", overflowY: "auto" }}>
      {/* Floating particles */}
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${3 + (i * 27) % 94}%`, left: `${2 + (i * 41) % 96}%`, width: i % 5 === 0 ? 2.5 : 1.5, height: i % 5 === 0 ? 2.5 : 1.5, borderRadius: "50%", backgroundColor: `rgba(107,143,113,${0.06 + (i % 3) * 0.04})` }} />
      ))}
      {/* Back arrow */}
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6, zIndex: 1 }}>‹</div>
      {/* Eyebrow */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(107,143,113,0.6)", zIndex: 1, marginBottom: 2 }}>✦ Calm Breathing</div>
      {/* Title */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#fff", fontWeight: 700, zIndex: 1, lineHeight: 1.1, marginBottom: 3 }}>Breathe with intention</div>
      {/* Subtitle */}
      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", zIndex: 1, marginBottom: 12 }}>1 minute session</div>
      {/* Pattern cards */}
      {patterns.map((p) => (
        <div key={p.name} style={{ padding: "10px 10px 8px", borderRadius: 14, backgroundColor: "rgba(107,143,113,0.04)", border: "1px solid rgba(107,143,113,0.1)", marginBottom: 8, zIndex: 1 }}>
          {/* Top row: dot + name + progress dots */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#6B8F71" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(180,220,200,0.9)" }}>{p.name}</span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(p.dots)].map((_, d) => (
                <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(107,143,113,0.5)" }} />
              ))}
            </div>
          </div>
          {/* Description */}
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", marginBottom: 4, lineHeight: 1.5 }}>{p.desc}</div>
          {/* Timing */}
          <div style={{ fontSize: 8, color: "rgba(107,143,113,0.6)" }}>{p.timing}</div>
        </div>
      ))}
    </div>
  );
}

function ScreenMoodInsights() {
  const days = [
    { day: "Mon", color: "#B8A4D4", entries: 1 },
    { day: "Tue", color: "#F4C430", entries: 2 },
    { day: "Wed", color: "#B97A95", entries: 1 },
    { day: "Thu", color: "#7FB77E", entries: 1 },
    { day: "Fri", color: "#F6B7A9", entries: 3 },
    { day: "Sat", color: "#9FB3C8", entries: 1 },
    { day: "Sun", color: "#F4C430", entries: 2 },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #161218 0%, #0E0C10 100%)", display: "flex", flexDirection: "column", padding: "32px 10px 8px", overflowY: "auto", position: "relative" }}>
      {/* Background stars */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${5 + (i * 29) % 90}%`, left: `${3 + (i * 43) % 94}%`, width: 1.5, height: 1.5, borderRadius: "50%", backgroundColor: `rgba(255,255,255,${0.04 + (i % 3) * 0.03})` }} />
      ))}
      {/* Back arrow */}
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 2, zIndex: 1 }}>‹</div>
      {/* Header */}
      <div style={{ textAlign: "center", zIndex: 1, marginBottom: 2 }}>
        <div style={{ fontSize: 6, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(184,165,202,0.6)", marginBottom: 1 }}>✦ Week in Stars</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 12, color: "#fff", fontWeight: 700 }}>Week in Stars</div>
      </div>
      {/* Week navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1, marginBottom: 6, padding: "0 4px" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>‹</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: "#fff" }}>This Week</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>Mar 8 – Mar 14</div>
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>›</span>
      </div>
      {/* Day orbs row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 2px", zIndex: 1, marginBottom: 2 }}>
        {days.map(d => (
          <div key={d.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            {/* Filled orb with glass ring */}
            <div style={{ width: 22, height: 22, borderRadius: "50%", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }} />
              <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, ${d.color} 0%, ${d.color}cc 50%, ${d.color}40 80%, rgba(0,0,0,0.3) 100%)`, boxShadow: `0 0 6px ${d.color}50, inset 0 -2px 3px rgba(0,0,0,0.3), inset 0 2px 2px ${d.color}60` }} />
              <div style={{ position: "absolute", top: 5, left: 7, width: 4, height: 3, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 100%)" }} />
              {d.entries > 1 && (
                <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(107,143,113,0.9)", fontSize: 5, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{d.entries}</div>
              )}
            </div>
            <span style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>{d.day}</span>
          </div>
        ))}
      </div>
      {/* Stats card */}
      <div style={{ display: "flex", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", zIndex: 1, marginBottom: 5 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7px 0", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>11</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>entries</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7px 0", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>✦ 7</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>day streak</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>Happy</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>felt most</div>
        </div>
      </div>
      {/* Weekly Reflection card - with actual reflection content */}
      <div style={{ padding: "8px 10px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", zIndex: 1, marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#B8A4D4" }}>✦ Weekly Reflection</div>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>1 of 2 used</div>
        </div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontStyle: "italic" }}>You started the week quietly, sitting with your thoughts. By midweek something shifted — you began naming what you actually needed. Friday was a release. You let yourself feel joy without questioning it. That's growth you can feel.</div>
      </div>
      {/* Intentions card */}
      <div style={{ padding: "8px 10px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", zIndex: 1 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Your Intentions & Reflections</div>
        {[
          { day: "Mon", am: "Show up for myself first", pm: "I spoke up when it mattered" },
          { day: "Tue", am: "Speak kindly to myself", pm: "I chose rest over guilt" },
          { day: "Wed", am: "Sit with the discomfort", pm: "The hard conversation helped" },
          { day: "Thu", am: "Let go of what I can't control", pm: "I forgave myself today" },
          { day: "Fri", am: "Celebrate how far I've come", pm: "This week changed something" },
        ].map((r, i) => (
          <div key={r.day} style={{ paddingBottom: 4, borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <div style={{ padding: "2px 4px", borderRadius: 4, backgroundColor: "rgba(255,255,255,0.06)", fontSize: 5, color: "rgba(255,255,255,0.35)", minWidth: 18, textAlign: "center" }}>{r.day}</div>
              <svg width="7" height="7" viewBox="0 0 24 24" fill="#FFD166" stroke="none"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FFD166" strokeWidth="2" strokeLinecap="round"/></svg>
              <div style={{ fontSize: 6, color: "rgba(255,209,102,0.5)" }}>{r.am}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 26 }}>
              <svg width="7" height="7" viewBox="0 0 24 24" fill="#C4A0E0"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
              <div style={{ fontSize: 6, color: "rgba(196,160,224,0.5)" }}>{r.pm}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenAchievements() {
  const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>;
  const Planet = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-30 12 12)"/></svg>;
  const Fitness = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5L4 4M17.5 6.5L20 4M6.5 17.5L4 20M17.5 17.5L20 20"/><circle cx="12" cy="12" r="5"/></svg>;
  const Trophy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17c-2.76 0-5-2.24-5-5V4h10v8c0 2.76-2.24 5-5 5zm-7-8V5H3v4a4 4 0 003 3.87V12zm14 0V5h-2v4a4 4 0 003 3.87V12zM9 20h6v2H9z"/></svg>;
  const Flame = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.42 0-8-3.58-8-8 0-4 3.58-8 8-12 4.42 4 8 8 8 12 0 4.42-3.58 8-8 8z"/></svg>;
  const Calendar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
  const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg>;
  const Diamond = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10z"/></svg>;
  const Palette = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.24-.26-.37-.61-.37-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>;
  const Sparkle = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z"/><path d="M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75z" opacity="0.7"/></svg>;
  const Moon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>;
  const Mic = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>;
  const Hourglass = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2h12M6 22h12M7 2v4l5 6-5 6v4M17 2v4l-5 6 5 6v4"/></svg>;
  const Water = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z"/></svg>;
  const featured = [
    { Icon: Star, name: "First Release", color: "#F4C430" },
    { Icon: Flame, name: "7-Day Streak", color: "#E8723A" },
    { Icon: Trophy, name: "100 Entries", color: "#F4C430" },
    { Icon: Check, name: "Perfect Month", color: "#8FA88E" },
    { Icon: Mic, name: "Voice Champion", color: "#C47A6D" },
    { Icon: Water, name: "Calm Breather", color: "#B97A95" },
    { Icon: Moon, name: "Night Owl", color: "#9FB3C8" },
    { Icon: Hourglass, name: "Time Traveler", color: "#F4C430" },
    { Icon: Sparkle, name: "1 Year", color: "#F4C430" },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "#FAF6EF", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 14px 10px", overflowY: "auto" }}>
      {/* Title */}
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: "#2C3E2D", marginBottom: 10 }}>Achievements</div>
      {/* Progress ring */}
      <div style={{ position: "relative", width: 56, height: 56, marginBottom: 14 }}>
        <svg width="56" height="56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(107,143,113,0.12)" strokeWidth="3" />
          <circle cx="28" cy="28" r="24" fill="none" stroke="#6B8F71" strokeWidth="3" strokeDasharray="151 151" strokeLinecap="round" transform="rotate(-90 28 28)" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2C3E2D" }}>20</div>
          <div style={{ fontSize: 5, color: "#8A8078", marginTop: -1 }}>of 20</div>
        </div>
      </div>
      {/* 3x3 Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, width: "100%" }}>
        {featured.map((a) => (
          <div key={a.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 4px 6px", borderRadius: 12, backgroundColor: `${a.color}10`, border: `1px solid ${a.color}18` }}>
            <div style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: `${a.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color, boxShadow: `0 0 8px ${a.color}25` }}>
              <a.Icon />
            </div>
            <div style={{ fontSize: 6, color: "#4A4540", textAlign: "center", fontWeight: 500, lineHeight: 1.2 }}>{a.name}</div>
          </div>
        ))}
      </div>
      {/* Bottom text */}
      <div style={{ fontSize: 7, color: "#B8A99A", marginTop: 8 }}>+ 11 more to discover</div>
    </div>
  );
}

function ScreenPhotoAlbum() {
  const photos = [
    { img: "/photos/album-1.png", date: "Mar 8, 9:12 PM" },
    { img: "/photos/album-2.jpeg", date: "Mar 7, 6:45 PM" },
    { img: "/photos/album-3.jpg", date: "Mar 6, 11:30 AM" },
    { img: "/photos/album-4.jpeg", date: "Mar 5, 8:15 AM" },
    { img: "/photos/album-5.jpeg", date: "Mar 4, 3:22 PM" },
    { img: "/photos/album-6.jpeg", date: "Mar 3, 10:08 PM" },
    { img: "/photos/album-7.jpeg", date: "Mar 2, 7:33 AM" },
    { img: "/photos/album-8.jpeg", date: "Mar 1, 5:50 PM" },
    { img: "/photos/album-9.jpeg", date: "Mar 1, 9:41 AM" },
  ];
  return (
    <div className="hide-scrollbar" style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #141214 0%, #0C0A0E 100%)", display: "flex", flexDirection: "column", padding: "32px 8px 8px", position: "relative", overflowY: "auto" }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${5 + (i * 31) % 90}%`, left: `${3 + (i * 47) % 94}%`, width: 1.5, height: 1.5, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }} />
      ))}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 4, zIndex: 1, padding: "0 4px" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>‹</div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 6, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>✦ Memories</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: "#fff", fontWeight: 700 }}>March 2026 ›</div>
          <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)" }}>9 photos</div>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, flex: 1, zIndex: 1 }}>
        {photos.map((p, i) => (
          <div key={i} style={{ borderRadius: 6, overflow: "hidden", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", flex: 1, overflow: "hidden" }}>
              <img src={p.img} loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", imageRendering: "auto", filter: "contrast(1.05) saturate(1.1)" }} />
            </div>
            <div style={{ padding: "2px 0", textAlign: "center", fontSize: 4.5, color: "rgba(255,255,255,0.3)", backgroundColor: "transparent" }}>{p.date}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px 0", zIndex: 1 }}>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>‹ Prev</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)" }}>1 / 1</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>Next ›</div>
      </div>
    </div>
  );
}



const FREE_STEPS = [
  { id: "record", label: "Record", desc: "Tap and talk", Screen: ScreenRecord },
  { id: "release", label: "Fill it out", desc: "Mood, title, notes", Screen: ScreenRelease },
  { id: "entry", label: "Dashboard", desc: "Your home base", Screen: ScreenEntry },
  { id: "share", label: "Share", desc: "Expiring links", Screen: ScreenShare },
  { id: "capsule", label: "Time Capsule", desc: "Seal for later", Screen: ScreenTimeCapsule },
  { id: "achievements", label: "Achievements", desc: "Earn badges", Screen: ScreenAchievements },
];

const PRO_STEPS = [
  { id: "reflection", label: "Transcript & AI Reflection", desc: "Your words, reflected back", Screen: ScreenTranscriptReflection },
  { id: "sessions", label: "Star Sessions", desc: "Guided journeys", Screen: ScreenStarSessions },
  { id: "breathing", label: "Calm Breathing", desc: "Breathe with intention", Screen: ScreenWaveBreathing },
  { id: "insights", label: "AI Mood Insights", desc: "Weekly patterns", Screen: ScreenMoodInsights },
  { id: "album", label: "Memories", desc: "Your photo journal", Screen: ScreenPhotoAlbum },
  { id: "nightsky", label: "Night Sky", desc: "Your constellation", Screen: ScreenNightSky },
];

export default function FeaturesInteractive() {
  const [activeId, setActiveId] = useState("record");
  const [sectionRef, sectionInView] = useInView(0.05);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const allSteps = [...FREE_STEPS, ...PRO_STEPS];

  // Auto-play: advance every 5 seconds when in view and not paused
  useEffect(() => {
    if (!sectionInView || paused) {
      clearInterval(autoplayTimer.current);
      return;
    }
    autoplayTimer.current = setInterval(() => {
      setActiveId(prev => {
        const idx = allSteps.findIndex(s => s.id === prev);
        const next = (idx + 1) % allSteps.length;
        return allSteps[next].id;
      });
    }, 5000);
    return () => clearInterval(autoplayTimer.current);
  }, [sectionInView, paused]);

  // Manual click: pause for 15 seconds then resume
  function handleTabClick(id: string) {
    setActiveId(id);
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 15000);
  }

  const activeStep = allSteps.find(s => s.id === activeId);
  const ActiveScreen = activeStep?.Screen || ScreenRecord;
  const isProActive = PRO_STEPS.some(s => s.id === activeId);

  function TabButton({ step, side }: { step: { id: string; label: string; desc: string; Screen: React.ComponentType }; side: string }) {
    const isActive = activeId === step.id;
    const isPro = PRO_STEPS.some(s => s.id === step.id);
    const accentColor = isPro ? "#B8A5CA" : "#6B8F71";
    return (
      <button
        onClick={() => handleTabClick(step.id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: isMobile ? "8px 12px" : "10px 16px",
          borderRadius: 0,
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "all 0.25s ease",
          outline: "none",
          fontFamily: "'Manrope', sans-serif",
          textAlign: side === "left" ? "right" : "left",
          width: isMobile ? "auto" : "100%",
          flexShrink: 0,
          flexDirection: !isMobile && side === "left" ? "row-reverse" : "row",
          position: "relative",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 400, color: isActive ? "#2C3E2D" : "#B8A99A", transition: "all 0.2s", whiteSpace: "nowrap" }}>{step.label}</div>
          {!isMobile && <div style={{ fontSize: 11, color: isActive ? "rgba(44,62,45,0.5)" : "rgba(138,128,120,0.3)", marginTop: 2, transition: "color 0.2s" }}>{step.desc}</div>}
        </div>
        {/* Underline */}
        <div style={{
          position: "absolute",
          bottom: 2,
          left: side === "left" ? "auto" : 16,
          right: side === "left" ? 16 : "auto",
          width: isActive ? "40%" : "0%",
          height: 2,
          borderRadius: 1,
          backgroundColor: accentColor,
          transition: "width 0.3s ease",
          boxShadow: isActive ? `0 0 6px ${accentColor}40` : "none",
        }} />
      </button>
    );
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      backgroundColor: "#FAF6EF",
      fontFamily: "'Manrope', -apple-system, sans-serif",
      padding: isMobile ? "48px 0 60px" : "80px 40px 100px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        @keyframes screenFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes phoneFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 20px 60px rgba(0,0,0,0.1); } 50% { box-shadow: 0 24px 70px rgba(0,0,0,0.15), 0 0 30px rgba(107,143,113,0.08); } }
        @keyframes glowPulsePro { 0%, 100% { box-shadow: 0 20px 60px rgba(23,16,58,0.15); } 50% { box-shadow: 0 24px 70px rgba(23,16,58,0.2), 0 0 30px rgba(184,165,202,0.1); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <div
        ref={sectionRef}
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 32 : 48,
          padding: "0 24px",
          opacity: sectionInView ? 1 : 0,
          transform: sectionInView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#6B8F71", marginBottom: 16 }}>Features</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 28 : 42, color: "#2C3E2D", lineHeight: 1.15 }}>
          Everything you need to{" "}
          <span style={{ fontStyle: "italic", color: "#6B8F71" }}>feel heard.</span>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      {isMobile && (
        <div style={{ opacity: sectionInView ? 1 : 0, transition: "opacity 0.6s ease 0.2s", padding: "0 20px" }}>
          {/* Phone centered */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div style={{ maxWidth: 280, width: "100%", height: 520, borderRadius: 32, border: "3px solid #2C3E2D", overflow: "hidden", position: "relative", animation: "phoneFloat 4s ease-in-out infinite, " + (isProActive ? "glowPulsePro" : "glowPulse") + " 4s ease-in-out infinite" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, backgroundColor: "#2C3E2D", borderRadius: "0 0 12px 12px", zIndex: 10 }} />
              {isProActive && (
                <div style={{ position: "absolute", top: 6, right: 8, zIndex: 11, display: "flex", alignItems: "center", gap: 2, padding: "2px 6px", borderRadius: 6, backgroundColor: "rgba(184,165,202,0.15)", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: 6, color: "#B8A5CA" }}>✦</span>
                  <span style={{ fontSize: 5, fontWeight: 700, color: "#B8A5CA", letterSpacing: 0.5 }}>PRO</span>
                </div>
              )}
              <div key={activeId} style={{ width: "100%", height: "100%", animation: "screenFade 0.4s ease" }}>
                <ActiveScreen />
              </div>
            </div>
          </div>
          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 16, padding: "0 20px" }}>
            {allSteps.map((s, i) => {
              const isPro = PRO_STEPS.some(p => p.id === s.id);
              return <div key={s.id} onClick={() => handleTabClick(s.id)} style={{ width: s.id === activeId ? 12 : 4, height: 4, borderRadius: 2, backgroundColor: s.id === activeId ? (isPro ? "#B8A5CA" : "#6B8F71") : "rgba(0,0,0,0.1)", transition: "all 0.3s ease", cursor: "pointer" }} />;
            })}
          </div>

          {/* Feature label + nav arrows */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 6, padding: "0 20px" }}>
            <button onClick={() => { const idx = allSteps.findIndex(s => s.id === activeId); handleTabClick(allSteps[(idx - 1 + allSteps.length) % allSteps.length].id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#8A8078", padding: 8 }}>‹</button>
            <div style={{ textAlign: "center", minWidth: 140 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#2C3E2D" }}>{activeStep?.label}</span>

              </div>
              <div style={{ fontSize: 11, color: "#8A8078", marginTop: 2 }}>{activeStep?.desc}</div>
            </div>
            <button onClick={() => { const idx = allSteps.findIndex(s => s.id === activeId); handleTabClick(allSteps[(idx + 1) % allSteps.length].id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#8A8078", padding: 8 }}>›</button>
          </div>
        </div>
      )}

      {/* ── DESKTOP LAYOUT ── */}
      {!isMobile && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          maxWidth: 960,
          margin: "0 auto",
          opacity: sectionInView ? 1 : 0,
          transform: sectionInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s",
        }}>
          {/* Left: Free */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>

            {FREE_STEPS.map(s => <TabButton key={s.id} step={s} side="left" />)}
          </div>

          {/* Center: Phone */}
          <div style={{ flexShrink: 0, maxWidth: 300, width: "100%" }}>
            <div style={{
              maxWidth: 300,
              width: "100%",
              height: 580,
              borderRadius: 36,
              border: "3px solid #2C3E2D",
              overflow: "hidden",
              position: "relative",
              animation: `phoneFloat 4s ease-in-out infinite, ${isProActive ? "glowPulsePro" : "glowPulse"} 4s ease-in-out infinite`,
              transition: "all 0.5s ease",
            }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, backgroundColor: "#2C3E2D", borderRadius: "0 0 14px 14px", zIndex: 10 }} />
              {isProActive && (
                <div style={{ position: "absolute", top: 8, right: 10, zIndex: 11, display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 8, backgroundColor: "rgba(184,165,202,0.15)", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: 8, color: "#B8A5CA" }}>✦</span>
                  <span style={{ fontSize: 7, fontWeight: 700, color: "#B8A5CA", letterSpacing: 0.5 }}>PRO</span>
                </div>
              )}
              <div key={activeId} style={{ width: "100%", height: "100%", animation: "screenFade 0.4s ease" }}>
                <ActiveScreen />
              </div>
            </div>
          </div>

          {/* Right: Pro */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>

            {PRO_STEPS.map(s => <TabButton key={s.id} step={s} side="right" />)}
          </div>
        </div>
      )}
    </div>
  );
}

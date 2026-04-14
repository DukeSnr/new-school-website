import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1.1em",height:"1.1em"}}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:"0.75em",height:"0.75em"}}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:"1.2em",height:"1.2em"}}>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:"1.2em",height:"1.2em"}}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1.5em",height:"1.5em"}}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1.4em",height:"1.4em"}}>
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1.4em",height:"1.4em"}}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1em",height:"1em"}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1em",height:"1em"}}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"1em",height:"1em"}}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

// ─── COLOUR TOKENS (change these to restyle the whole site) ──────────────────
const C = {
  primary:   "#1a3a5c",   // deep navy — main brand colour
  accent:    "#c8a85a",   // gold — CTA buttons, highlights
  accentHov: "#b8962a",
  light:     "#f5f2ed",   // warm off-white background
  dark:      "#111827",   // near-black for dark sections
  text:      "#2d2d2d",
  muted:     "#6b7280",
  white:     "#ffffff",
  topBar:    "#1a3a5c",   // utility bar background
  navBg:     "#ffffff",   // main nav background
  navText:   "#1a3a5c",
  dropBg:    "#1a3a5c",
  dropText:  "#ffffff",
};

// ─── NAV DATA ────────────────────────────────────────────────────────────────
const NAV = [
  {
    label: "Our School",
    children: [
      { label: "About Us",            href: "#" },
      { label: "Leadership Team",     href: "#" },
      { label: "Accreditations",      href: "#" },
    ],
  },
  {
    label: "Education & Learning",
    children: [
      { label: "Curriculum Overview", href: "#" },
      { label: "Early Childhood",     href: "#" },
      { label: "Extra-Murals",        href: "#" },
    ],
  },
  {
    label: "School Life",
    children: [
      { label: "Sports",              href: "#" },
      { label: "Arts & Culture",      href: "#" },
      { label: "Community Service",   href: "#" },
      { label: "Gallery",             href: "#" },
    ],
  },
  {
    label: "Applications",
    children: [
      { label: "Application Process", href: "#" },
      { label: "Fees & Funding",      href: "#" },
      { label: "Open Days",           href: "#" },
      { label: "FAQs",                href: "#" },
    ],
  },
  
];

// ─── HERO SLIDES ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    bg: "linear-gradient(135deg, #1a3a5c 0%, #2d5f8a 50%, #1a3a5c 100%)",
    emoji: "🎓",
    tag: "Premium Education",
    title: "Inspiring Excellence\nin Every Child",
    sub: "Providing a holistic education to students from 18 months to 5 years old, grounded in academic rigour, creativity and character.",
  },
  {
    bg: "linear-gradient(135deg, #2d5235 0%, #3d6b45 50%, #1e3a21 100%)",
    emoji: "🌟",
    tag: "Academic Achievement",
    title: "Where Curiosity\nBecomes Mastery",
    sub: "Our vibrant educators are handpicked for their specialist knowledge and passion for shaping the enquiring minds of tomorrow.",
  },
  {
    bg: "linear-gradient(135deg, #3d2a1a 0%, #7a4f2d 50%, #2d1e0f 100%)",
    emoji: "🏆",
    tag: "Arts & Culture",
    title: "Unlocking Talent\nBuilding Character",
    sub: "From robotics to performing arts, our purpose-built facilities give every student the platform to discover and pursue their passion.",
  },
];

// ─── FEATURES ────────────────────────────────────────────────────────────────
const FEATURES = [
  { emoji:"🏅", title:"Selects the Best of the Best", desc:"Dynamic and passionate teachers and coaches are handpicked for their specialist knowledge and offered at all levels and in all aspects of the school." },
  { emoji:"💛", title:"Respects the Well-Being of Children", desc:"Our schools create numerous opportunities for students to become well-rounded, happy individuals who simply love school and their school experience." },
  { emoji:"🎨", title:"A Highly Creative Environment", desc:"Students are encouraged to uncover their latent talents and excel with passion and enthusiasm in the creative and performing arts." },
  { emoji:"🌍", title:"Internationally Recognised Qualifications", desc:"Our schools ensure all students are adequately and resourcefully equipped to confront life's challenges in a globally competitive world." },
  { emoji:"🤝", title:"Success in the Heart of the Community", desc:"Each school is individually developed and designed to complement its surrounding environment and engage meaningfully with the local community." },
  { emoji:"🏫", title:"Appeals to a Broad-Based Community", desc:"A non-denominational and co-educational approach makes our schools accessible and welcoming to all segments of the community." },
  { emoji:"✨", title:"A Vibrant Alternative to Traditional Schooling", desc:"With its unique philosophy, each school is exciting in its own right — its fresh, modern approach stands out boldly against traditional offerings." },
  { emoji:"⭐", title:"Strong Reputation for Excellence", desc:"Each school is committed to maintaining a superlative reputation synonymous with academic, cultural and sporting excellence." },
];

// ═══════════════════════════════════════════════════════════════════
// UTILITY BAR (top strip)
// ═══════════════════════════════════════════════════════════════════
const TopBar = ({ onSearchClick }) => (
  <div style={{
    background: C.topBar,
    color: C.white,
    padding: "0.45rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    letterSpacing: "0.02em",
  }}>
    <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
      <span style={{ display:"flex", alignItems:"center", gap:"0.35rem", opacity:0.8 }}>
        <PhoneIcon/> 011 123 4567
      </span>
      <span style={{ opacity:0.4 }}>|</span>
      <span style={{ opacity:0.8 }}>drmarcialebambo@gmail.com</span>
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:"1.2rem" }}>
      <div style={{ display:"flex", gap:"0.8rem" }}>
        {["Facebook","Instagram","LinkedIn"].map(s => (
          <a key={s} href="#" style={{
            color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:"0.75rem",
            letterSpacing:"0.04em", transition:"color 0.2s",
          }}
          onMouseEnter={e=>e.target.style.color="#fff"}
          onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.6)"}
          >{s}</a>
        ))}
      </div>
      <span style={{ opacity:0.4 }}>|</span>
      <button onClick={onSearchClick} style={{
        background:"none", border:"none", color:"rgba(255,255,255,0.75)",
        cursor:"pointer", display:"flex", alignItems:"center", gap:"0.3rem",
        fontSize:"0.8rem", padding:0,
      }}>
        <SearchIcon/> Search
      </button>
      <a href="#" style={{
        background: C.accent,
        color: C.dark,
        padding:"0.35rem 1rem",
        borderRadius:"2px",
        textDecoration:"none",
        fontWeight:700,
        fontSize:"0.75rem",
        letterSpacing:"0.06em",
        textTransform:"uppercase",
        transition:"background 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.background=C.accentHov}
      onMouseLeave={e=>e.currentTarget.style.background=C.accent}
      >Contact Us</a>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN NAV with DROPDOWNS
// ═══════════════════════════════════════════════════════════════════
const MainNav = ({ scrolled }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const leaveTimer = useRef(null);

  const handleEnter = (idx) => {
    clearTimeout(leaveTimer.current);
    setOpenMenu(idx);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <nav style={{
      background: C.navBg,
      borderBottom: scrolled ? "none" : `1px solid rgba(0,0,0,0.08)`,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none",
      position: "relative",
      zIndex: 200,
      transition: "box-shadow 0.3s",
    }}>
      <div style={{
        maxWidth:"1280px", margin:"0 auto",
        padding:"0 2rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        height:"72px",
      }}>
        {/* Logo */}
        <a href="#" style={{
          textDecoration:"none",
          display:"flex", flexDirection:"column", lineHeight:1.1,
        }}>
          <span style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"1.6rem", fontWeight:700, color:C.primary,
            letterSpacing:"-0.01em",
          }}></span>
          <span style={{fontSize:"0.65rem", color:C.accent, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600}}>
            House of Excellence
          </span>
        </a>

        {/* Desktop Nav */}
        <ul style={{
          display:"flex", alignItems:"center", gap:0,
          listStyle:"none", margin:0, padding:0,
        }} className="desktop-nav">
          {NAV.map((item, idx) => (
            <li key={item.label}
              style={{ position:"relative" }}
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
            >
              <button style={{
                background:"none", border:"none", cursor:"pointer",
                display:"flex", alignItems:"center", gap:"0.3rem",
                padding:"0 1.1rem", height:"72px",
                color: openMenu === idx ? C.accent : C.navText,
                fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.03em",
                textTransform:"uppercase",
                borderBottom: openMenu === idx ? `3px solid ${C.accent}` : "3px solid transparent",
                transition:"all 0.2s",
                whiteSpace:"nowrap",
              }}>
                {item.label} <ChevronDownIcon/>
              </button>

              {/* Dropdown */}
              <div style={{
                position:"absolute", top:"100%", left:"50%",
                transform:"translateX(-50%)",
                background: C.dropBg,
                minWidth:"220px",
                boxShadow:"0 12px 40px rgba(0,0,0,0.25)",
                opacity: openMenu === idx ? 1 : 0,
                pointerEvents: openMenu === idx ? "all" : "none",
                transform: openMenu === idx
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-8px)",
                transition:"all 0.22s cubic-bezier(0.16,1,0.3,1)",
                zIndex:300,
              }}>
                {/* top gold bar */}
                <div style={{height:"3px", background:C.accent}}/>
                {item.children.map((child, ci) => (
                  <a key={child.label} href={child.href} style={{
                    display:"block",
                    padding:"0.85rem 1.4rem",
                    color: C.dropText,
                    textDecoration:"none",
                    fontSize:"0.83rem",
                    fontWeight:400,
                    letterSpacing:"0.02em",
                    borderBottom: ci < item.children.length-1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    transition:"all 0.15s",
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.background="rgba(255,255,255,0.1)";
                    e.currentTarget.style.paddingLeft="1.8rem";
                    e.currentTarget.style.color=C.accent;
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.style.background="transparent";
                    e.currentTarget.style.paddingLeft="1.4rem";
                    e.currentTarget.style.color=C.dropText;
                  }}
                  >{child.label}</a>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Enquire CTA */}
        <a href="#" className="desktop-nav" style={{
          background:C.primary, color:"#fff",
          padding:"0.65rem 1.4rem", borderRadius:"2px",
          textDecoration:"none", fontWeight:700,
          fontSize:"0.78rem", letterSpacing:"0.08em",
          textTransform:"uppercase", transition:"background 0.2s", whiteSpace:"nowrap",
        }}
        onMouseEnter={e=>e.currentTarget.style.background=C.accent}
        onMouseLeave={e=>e.currentTarget.style.background=C.primary}
        >Enquire Now</a>

        {/* Mobile hamburger */}
        <button className="mobile-nav-btn" onClick={()=>setMobileOpen(!mobileOpen)} style={{
          background:"none", border:"none", cursor:"pointer",
          color:C.primary, display:"none",
        }}>
          {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background:C.primary, color:"#fff",
          position:"absolute", top:"100%", left:0, right:0,
          zIndex:300, padding:"1rem 0", boxShadow:"0 20px 40px rgba(0,0,0,0.3)",
        }}>
          {NAV.map((item, idx) => (
            <div key={item.label}>
              <button onClick={()=>setMobileExpanded(mobileExpanded===idx?null:idx)} style={{
                width:"100%", background:"none", border:"none",
                color:"#fff", fontSize:"0.9rem", fontWeight:600,
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"0.85rem 1.5rem", cursor:"pointer", letterSpacing:"0.04em",
                textTransform:"uppercase", borderBottom:"1px solid rgba(255,255,255,0.08)",
              }}>
                {item.label}
                <span style={{transform: mobileExpanded===idx ? "rotate(180deg)":"rotate(0deg)", transition:"0.2s"}}>
                  <ChevronDownIcon/>
                </span>
              </button>
              {mobileExpanded === idx && (
                <div style={{background:"rgba(0,0,0,0.2)"}}>
                  {item.children.map(ch => (
                    <a key={ch.label} href={ch.href} style={{
                      display:"block", padding:"0.65rem 2.5rem",
                      color:"rgba(255,255,255,0.8)", textDecoration:"none",
                      fontSize:"0.85rem", borderBottom:"1px solid rgba(255,255,255,0.05)",
                    }}>{ch.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{padding:"1rem 1.5rem"}}>
            <a href="#" style={{
              display:"block", textAlign:"center",
              background:C.accent, color:C.dark,
              padding:"0.85rem", borderRadius:"2px",
              textDecoration:"none", fontWeight:700,
              fontSize:"0.85rem", letterSpacing:"0.08em", textTransform:"uppercase",
            }}>Enquire Now</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ═══════════════════════════════════════════════════════════════════
// HERO SLIDER
// ═══════════════════════════════════════════════════════════════════
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + SLIDES.length) % SLIDES.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{
      position:"relative", height:"88vh", minHeight:"560px",
      overflow:"hidden", background:slide.bg,
      transition:"background 0.8s ease",
      display:"flex", alignItems:"center",
    }}>
      {/* Geometric pattern overlay */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
        pointerEvents:"none",
      }}/>
      {/* Subtle grid lines */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize:"60px 60px",
        pointerEvents:"none",
      }}/>

      {/* Content */}
      <div style={{
        maxWidth:"1280px", margin:"0 auto", padding:"0 4rem",
        width:"100%",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(20px)" : "translateY(0)",
        transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{maxWidth:"680px"}}>
          <div style={{
            display:"inline-block",
            background:"rgba(200,168,90,0.2)",
            border:"1px solid rgba(200,168,90,0.4)",
            color:C.accent,
            padding:"0.35rem 1rem",
            borderRadius:"2px",
            fontSize:"0.72rem",
            fontWeight:700,
            letterSpacing:"0.2em",
            textTransform:"uppercase",
            marginBottom:"1.5rem",
          }}>{slide.tag}</div>

          <h1 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(2.8rem, 5.5vw, 4.8rem)",
            fontWeight:700,
            color:"#ffffff",
            lineHeight:1.1,
            letterSpacing:"-0.02em",
            marginBottom:"1.5rem",
            whiteSpace:"pre-line",
          }}>{slide.title}</h1>

          <p style={{
            fontSize:"1.1rem",
            color:"rgba(255,255,255,0.75)",
            lineHeight:1.75,
            marginBottom:"2.5rem",
            maxWidth:"540px",
          }}>{slide.sub}</p>

          <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
            <a href="#" style={{
              background:C.accent, color:C.dark,
              padding:"1rem 2.2rem", borderRadius:"2px",
              textDecoration:"none", fontWeight:700,
              fontSize:"0.85rem", letterSpacing:"0.1em",
              textTransform:"uppercase", transition:"all 0.2s",
              display:"inline-block",
            }}
            onMouseEnter={e=>e.currentTarget.style.background=C.accentHov}
            onMouseLeave={e=>e.currentTarget.style.background=C.accent}
            >Enquire Now</a>
            <a href="#" style={{
              background:"transparent", color:"#fff",
              border:"2px solid rgba(255,255,255,0.4)",
              padding:"1rem 2.2rem", borderRadius:"2px",
              textDecoration:"none", fontWeight:600,
              fontSize:"0.85rem", letterSpacing:"0.1em",
              textTransform:"uppercase", transition:"all 0.2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.9)";e.currentTarget.style.background="rgba(255,255,255,0.08)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";e.currentTarget.style.background="transparent"}}
            >Book an Open Day</a>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button onClick={()=>go(-1)} style={{
        position:"absolute", left:"1.5rem", top:"50%", transform:"translateY(-50%)",
        background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
        border:"1px solid rgba(255,255,255,0.25)", color:"#fff",
        width:"48px", height:"48px", borderRadius:"50%",
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", transition:"all 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.3)"}
      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
      ><ChevronLeftIcon/></button>
      <button onClick={()=>go(1)} style={{
        position:"absolute", right:"1.5rem", top:"50%", transform:"translateY(-50%)",
        background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
        border:"1px solid rgba(255,255,255,0.25)", color:"#fff",
        width:"48px", height:"48px", borderRadius:"50%",
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", transition:"all 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.3)"}
      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
      ><ChevronRightIcon/></button>

      {/* Dot indicators */}
      <div style={{
        position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)",
        display:"flex", gap:"0.6rem",
      }}>
        {SLIDES.map((_,i) => (
          <button key={i} onClick={()=>setCurrent(i)} style={{
            width: i===current ? "28px" : "8px",
            height:"8px", borderRadius:"4px",
            background: i===current ? C.accent : "rgba(255,255,255,0.4)",
            border:"none", cursor:"pointer", padding:0,
            transition:"all 0.3s",
          }}/>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ABOUT / INTRO SECTION
// ═══════════════════════════════════════════════════════════════════
const AboutSection = () => (
  <section style={{
    background:C.white, padding:"5rem 2rem",
  }}>
    <div style={{maxWidth:"1280px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center"}}>
      <div>
        <div style={{
          display:"inline-block",
          borderLeft:`4px solid ${C.accent}`,
          paddingLeft:"1rem",
          marginBottom:"1.5rem",
        }}>
          <span style={{
            fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
            textTransform:"uppercase", color:C.accent,
          }}>Inspiring Excellence</span>
        </div>
        <h2 style={{
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:"clamp(2rem,3.5vw,2.8rem)",
          fontWeight:700, color:C.primary,
          lineHeight:1.15, letterSpacing:"-0.02em",
          marginBottom:"1.5rem",
        }}>
          WHY CHOOSE US?
        </h2>
        <p style={{fontSize:"1rem", color:C.muted, lineHeight:1.85, marginBottom:"1.25rem"}}>
          We provide a holistic education to students from 3 months old to Grade 12. The three key pillars of our educational approach are based on lateral thinking, comprehension and the innovative application of skills and concepts.
        </p>
        <p style={{fontSize:"1rem", color:C.muted, lineHeight:1.85, marginBottom:"2rem"}}>
          Our vibrant teachers are carefully selected for their specialist knowledge, excellent qualifications and outstanding rapport with students. They are passionate and motivated, striving daily to shape enquiring minds and develop young talent.
        </p>
        <a href="#" style={{
          display:"inline-flex", alignItems:"center", gap:"0.5rem",
          color:C.primary, fontWeight:700, fontSize:"0.85rem",
          letterSpacing:"0.08em", textTransform:"uppercase",
          textDecoration:"none", borderBottom:`2px solid ${C.accent}`,
          paddingBottom:"2px", transition:"color 0.2s",
        }}
        onMouseEnter={e=>e.currentTarget.style.color=C.accent}
        onMouseLeave={e=>e.currentTarget.style.color=C.primary}
        >Discover Our Story →</a>
      </div>

      {/* Stats block */}
      <div>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem",
        }}>
          {[
            { n:"1,200+", l:"Students Enrolled" },
            { n:"98%",    l:"Parent Satisfaction" },
            { n:"25yr",   l:"Years of Excellence" },
            { n:"1:8",    l:"Educator Ratio" },
          ].map(s => (
            <div key={s.l} style={{
              background:C.light,
              border:`1px solid rgba(0,0,0,0.06)`,
              borderTop:`3px solid ${C.accent}`,
              padding:"2rem 1.5rem",
              textAlign:"center",
            }}>
              <div style={{
                fontFamily:"'Playfair Display', Georgia, serif",
                fontSize:"2.5rem", fontWeight:700, color:C.primary,
                lineHeight:1, marginBottom:"0.5rem",
              }}>{s.n}</div>
              <div style={{fontSize:"0.78rem", color:C.muted, letterSpacing:"0.06em", textTransform:"uppercase", fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════
// VIDEO SECTION
// ═══════════════════════════════════════════════════════════════════
const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{background:C.light, padding:"5rem 2rem"}}>
      <div style={{maxWidth:"960px", margin:"0 auto", textAlign:"center"}}>
        <div style={{
          fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
          textTransform:"uppercase", color:C.accent, marginBottom:"1rem",
        }}>See Us in Action</div>
        <h2 style={{
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:"clamp(1.8rem,3vw,2.5rem)",
          fontWeight:700, color:C.primary,
          lineHeight:1.2, marginBottom:"2.5rem",
        }}>Experience the YourSchool Difference</h2>

        {/* Video Thumbnail */}
        <div
          onClick={() => setPlaying(true)}
          style={{
            position:"relative", borderRadius:"4px", overflow:"hidden",
            background:`linear-gradient(135deg, ${C.primary} 0%, #2d5f8a 100%)`,
            aspectRatio:"16/9",
            cursor:"pointer",
            boxShadow:"0 30px 80px rgba(0,0,0,0.2)",
          }}
        >
          {/* Thumbnail mockup */}
          <div style={{
            position:"absolute", inset:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:"1rem",
          }}>
            <div style={{fontSize:"6rem", opacity:0.3}}>🏫</div>
          </div>
          {/* Play button overlay */}
          <div style={{
            position:"absolute", inset:0,
            background:"rgba(0,0,0,0.35)",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:"1rem",
            transition:"background 0.2s",
          }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.5)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.35)"}
          >
            <div style={{
              width:"80px", height:"80px",
              background:C.accent,
              borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontSize:"1.8rem",
              boxShadow:"0 8px 30px rgba(200,168,90,0.5)",
              paddingLeft:"4px",
              transition:"transform 0.2s",
            }}>
              <PlayIcon/>
            </div>
            <span style={{
              color:"#fff", fontSize:"0.85rem", letterSpacing:"0.12em",
              textTransform:"uppercase", fontWeight:600,
            }}>Watch Our School Story</span>
          </div>

          {!playing && (
            <div style={{
              position:"absolute", bottom:"1.5rem", left:"1.5rem",
              background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
              borderRadius:"2px", padding:"0.4rem 1rem",
              color:"#fff", fontSize:"0.78rem", fontWeight:600,
              border:"1px solid rgba(255,255,255,0.2)",
            }}>3:42 min</div>
          )}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════
// OPEN DAYS SECTION
// ═══════════════════════════════════════════════════════════════════
const OpenDaysSection = () => (
  <section style={{
    background: C.primary,
    padding:"5rem 2rem",
    color:"#fff",
  }}>
    <div style={{maxWidth:"1280px", margin:"0 auto"}}>
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center",
      }}>
        <div>
          <div style={{
            fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
            textTransform:"uppercase", color:C.accent, marginBottom:"1rem",
          }}>Reserve Your Spot</div>
          <h2 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(2rem,3.5vw,2.8rem)",
            fontWeight:700, lineHeight:1.15,
            letterSpacing:"-0.02em", marginBottom:"1.5rem",
          }}>
            Discover Our Schools<br/>First-Hand
          </h2>
          <p style={{
            fontSize:"1rem", color:"rgba(255,255,255,0.7)",
            lineHeight:1.8, marginBottom:"2rem", maxWidth:"440px",
          }}>
            Experience our vibrant school community, see us in action and discover how our academic curriculum and purpose-built facilities can help maximise your child's fullest potential.
          </p>
          <p style={{
            fontSize:"0.9rem", color:C.accent, fontWeight:700,
            letterSpacing:"0.06em", textTransform:"uppercase",
            marginBottom:"1.2rem",
          }}>Upcoming Open Days:</p>
          {["15 February 2025","22 March 2025","10 May 2025"].map(d=>(
            <div key={d} style={{
              display:"flex", alignItems:"center", gap:"1rem",
              marginBottom:"0.6rem",
              fontSize:"0.9rem", color:"rgba(255,255,255,0.8)",
            }}>
              <span style={{
                width:"8px", height:"8px", background:C.accent,
                borderRadius:"50%", flexShrink:0,
              }}/>
              {d}
            </div>
          ))}
        </div>

       
// ═══════════════════════════════════════════════════════════════════
// FOUNDER QUOTE SECTION
// ═══════════════════════════════════════════════════════════════════
const QuoteSection = () => (
  <section style={{
    background:C.dark,
    padding:"6rem 2rem",
    textAlign:"center",
    position:"relative",
    overflow:"hidden",
  }}>
    <div style={{
      position:"absolute", inset:0,
      background:`radial-gradient(ellipse at 50% 50%, rgba(200,168,90,0.08) 0%, transparent 70%)`,
      pointerEvents:"none",
    }}/>
    <div style={{maxWidth:"780px", margin:"0 auto", position:"relative"}}>
      <div style={{
        fontSize:"6rem", lineHeight:1,
        color:C.accent, opacity:0.2,
        fontFamily:"Georgia, serif",
        marginBottom:"-1.5rem",
      }}>"</div>
      <div style={{
        fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em",
        textTransform:"uppercase", color:C.accent, marginBottom:"2rem",
      }}>A Few Words From Our Founder</div>
      <blockquote style={{
        fontFamily:"'Playfair Display', Georgia, serif",
        fontSize:"clamp(1.2rem,2.5vw,1.65rem)",
        fontWeight:400, fontStyle:"italic",
        color:"rgba(255,255,255,0.85)",
        lineHeight:1.75,
        marginBottom:"2.5rem",
        letterSpacing:"0.01em",
      }}>
        The strength and consistency of our educational principles are largely due to the solid foundation laid by a strong team of skilled and experienced educators. With a holistic curriculum focused on academic excellence, sport, and the performing and creative arts, the individuality of every student is unlocked.
      </blockquote>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem",
      }}>
        <div style={{flex:1, maxWidth:"80px", height:"1px", background:`rgba(200,168,90,0.4)`}}/>
        <div>
          <div style={{color:"#fff", fontWeight:700, fontSize:"0.9rem", letterSpacing:"0.06em"}}>
            Dr. Thandi Nkosi
          </div>
          <div style={{
            color:C.accent, fontSize:"0.75rem",
            letterSpacing:"0.12em", textTransform:"uppercase", marginTop:"0.2rem",
          }}>Founder & Principal</div>
        </div>
        <div style={{flex:1, maxWidth:"80px", height:"1px", background:`rgba(200,168,90,0.4)`}}/>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════
// FEATURES CAROUSEL
// ═══════════════════════════════════════════════════════════════════
const FeaturesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const total = FEATURES.length;
  const maxStart = total - perPage;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxStart, c + 1));
  const visible = FEATURES.slice(current, current + perPage);

  return (
    <section style={{background:C.white, padding:"5rem 2rem"}}>
      <div style={{maxWidth:"1280px", margin:"0 auto"}}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"flex-end",
          marginBottom:"3rem", flexWrap:"wrap", gap:"1rem",
        }}>
          <div>
            <div style={{
              fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
              textTransform:"uppercase", color:C.accent, marginBottom:"0.8rem",
            }}>Why Choose Us</div>
            <h2 style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:"clamp(1.8rem,3vw,2.5rem)",
              fontWeight:700, color:C.primary,
              lineHeight:1.15, letterSpacing:"-0.02em",
            }}>What Sets Us Apart</h2>
          </div>
          <div style={{display:"flex", gap:"0.75rem"}}>
            <button onClick={prev} disabled={current===0} style={{
              width:"44px", height:"44px", borderRadius:"2px",
              background: current===0 ? C.light : C.primary,
              border:`1px solid ${current===0 ? "rgba(0,0,0,0.1)" : C.primary}`,
              color: current===0 ? C.muted : "#fff",
              cursor: current===0 ? "default" : "pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s",
            }}><ChevronLeftIcon/></button>
            <button onClick={next} disabled={current>=maxStart} style={{
              width:"44px", height:"44px", borderRadius:"2px",
              background: current>=maxStart ? C.light : C.primary,
              border:`1px solid ${current>=maxStart ? "rgba(0,0,0,0.1)" : C.primary}`,
              color: current>=maxStart ? C.muted : "#fff",
              cursor: current>=maxStart ? "default" : "pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s",
            }}><ChevronRightIcon/></button>
          </div>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:`repeat(${perPage}, 1fr)`,
          gap:"1.5rem",
          transition:"all 0.4s",
        }}>
          {visible.map((f, i) => (
            <div key={f.title} style={{
              border:`1px solid rgba(0,0,0,0.08)`,
              borderTop:`4px solid ${C.accent}`,
              padding:"2rem",
              background:C.white,
              transition:"all 0.25s",
              cursor:"default",
            }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.1)";e.currentTarget.style.transform="translateY(-4px)"}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)"}}
            >
              {/* Photo placeholder */}
              <div style={{
                height:"180px",
                background:`linear-gradient(135deg, ${C.primary}22 0%, ${C.primary}08 100%)`,
                borderRadius:"2px",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"4rem", marginBottom:"1.5rem",
              }}>{f.emoji}</div>
              <h3 style={{
                fontFamily:"'Playfair Display', Georgia, serif",
                fontSize:"1.1rem", fontWeight:700,
                color:C.primary, marginBottom:"0.75rem",
                lineHeight:1.3,
              }}>{f.title}</h3>
              <p style={{
                fontSize:"0.875rem", color:C.muted,
                lineHeight:1.75,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{display:"flex", justifyContent:"center", gap:"0.5rem", marginTop:"2rem"}}>
          {Array.from({length: maxStart+1}).map((_,i) => (
            <button key={i} onClick={()=>setCurrent(i)} style={{
              width: i===current ? "24px" : "8px",
              height:"8px", borderRadius:"4px",
              background: i===current ? C.primary : "rgba(0,0,0,0.15)",
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.3s",
            }}/>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PARTNERSHIP BANNER
// ═══════════════════════════════════════════════════════════════════
const PartnershipSection = () => (
  <section style={{
    background:C.light,
    padding:"4rem 2rem",
    borderTop:`1px solid rgba(0,0,0,0.06)`,
  }}>
    <div style={{
      maxWidth:"960px", margin:"0 auto",
      display:"flex", alignItems:"center", gap:"3rem",
      flexWrap:"wrap",
    }}>
      <div style={{
        fontSize:"3rem",
        background:C.primary,
        width:"80px", height:"80px",
        display:"flex", alignItems:"center", justifyContent:"center",
        borderRadius:"2px", flexShrink:0,
      }}>🌐</div>
      <div style={{flex:1, minWidth:"280px"}}>
        <div style={{
          fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
          textTransform:"uppercase", color:C.accent, marginBottom:"0.5rem",
        }}>Proud Member</div>
        <h3 style={{
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:"1.3rem", fontWeight:700,
          color:C.primary, marginBottom:"0.5rem",
        }}>An Internationally Affiliated School</h3>
        <p style={{fontSize:"0.9rem", color:C.muted, lineHeight:1.7}}>
          YourSchool is a proud member of a leading global premium schools group operating across multiple continents, educating students across a global network of schools.
        </p>
      </div>
      <a href="#" style={{
        background:C.primary, color:"#fff",
        padding:"0.85rem 2rem", borderRadius:"2px",
        textDecoration:"none", fontWeight:700,
        fontSize:"0.8rem", letterSpacing:"0.08em",
        textTransform:"uppercase", flexShrink:0,
        transition:"background 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.background=C.accent}
      onMouseLeave={e=>e.currentTarget.style.background=C.primary}
      >Read More</a>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════
const Footer = () => (
  <footer style={{background:C.dark, color:"rgba(255,255,255,0.7)"}}>
    <div style={{maxWidth:"1280px", margin:"0 auto", padding:"4rem 2rem 2rem"}}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr 1fr 1.5fr",
        gap:"3rem",
        marginBottom:"3rem",
        flexWrap:"wrap",
      }}>
        {/* Brand */}
        <div>
          <div style={{marginBottom:"1rem"}}>
            <span style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:"1.5rem", fontWeight:700, color:"#fff",
            }}>YourSchool</span>
            <br/>
            <span style={{fontSize:"0.65rem", color:C.accent, letterSpacing:"0.2em", textTransform:"uppercase"}}>
              House of Excellence
            </span>
          </div>
          <p style={{fontSize:"0.85rem", lineHeight:1.8, marginBottom:"1.5rem", maxWidth:"280px"}}>
            Providing a holistic, world-class education to students from 3 months to Grade 12.
          </p>
          <div style={{display:"flex", gap:"0.75rem"}}>
            {[<FacebookIcon/>, <InstagramIcon/>].map((icon, i) => (
              <a key={i} href="#" style={{
                width:"36px", height:"36px",
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:"2px",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"rgba(255,255,255,0.6)", textDecoration:"none",
                transition:"all 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=C.accent;e.currentTarget.style.color=C.dark}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.6)"}}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 style={{color:"#fff", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.2rem"}}>
            Useful Links
          </h4>
          {["About Us","Curriculum","Open Days","Careers","Enquire Now"].map(l=>(
            <a key={l} href="#" style={{
              display:"block", color:"rgba(255,255,255,0.6)",
              textDecoration:"none", fontSize:"0.85rem",
              marginBottom:"0.6rem", transition:"color 0.2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.color=C.accent}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.6)"}
            >{l}</a>
          ))}
        </div>

        {/* Policies */}
        <div>
          <h4 style={{color:"#fff", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.2rem"}}>
            Legal
          </h4>
          {["Privacy Policy","Terms & Conditions","Cookie Policy","POPI Act"].map(l=>(
            <a key={l} href="#" style={{
              display:"block", color:"rgba(255,255,255,0.6)",
              textDecoration:"none", fontSize:"0.85rem",
              marginBottom:"0.6rem", transition:"color 0.2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.color=C.accent}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.6)"}
            >{l}</a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop:"1px solid rgba(255,255,255,0.08)",
        paddingTop:"1.5rem",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:"1rem",
        fontSize:"0.78rem", color:"rgba(255,255,255,0.35)",
      }}>
        <div>© {new Date().getFullYear()} YourSchool House of Excellence. All rights reserved.</div>
        <div style={{display:"flex", gap:"1.5rem"}}>
          {["Privacy Policy","Terms & Conditions","Cookie Policy"].map(l=>(
            <a key={l} href="#" style={{color:"rgba(255,255,255,0.35)", textDecoration:"none"}}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════
// SEARCH OVERLAY
// ═══════════════════════════════════════════════════════════════════
const SearchOverlay = ({ open, onClose }) => {
  const [query, setQuery] = useState("");

  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"rgba(10,20,35,0.97)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"2rem",
    }}>
      <button onClick={onClose} style={{
        position:"absolute", top:"2rem", right:"2rem",
        background:"none", border:"none", color:"rgba(255,255,255,0.6)",
        cursor:"pointer", fontSize:"1.5rem",
      }}><CloseIcon/></button>
      <div style={{
        fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em",
        textTransform:"uppercase", color:C.accent, marginBottom:"2rem",
      }}>Search Our Site</div>
      <div style={{width:"100%", maxWidth:"600px", position:"relative"}}>
        <input
          autoFocus
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="What are you looking for?"
          style={{
            width:"100%", background:"transparent",
            border:"none", borderBottom:`2px solid ${C.accent}`,
            padding:"1rem 0", color:"#fff",
            fontSize:"1.8rem", outline:"none",
            fontFamily:"'Playfair Display', Georgia, serif",
          }}
        />
        <button style={{
          position:"absolute", right:0, top:"50%", transform:"translateY(-50%)",
          background:"none", border:"none", color:C.accent, cursor:"pointer",
          fontSize:"1.5rem",
        }}><SearchIcon/></button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{fontFamily:"'Source Serif 4', Georgia, serif", background:C.white}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Serif+4:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f5f2ed; }
        ::-webkit-scrollbar-thumb { background: #1a3a5c; border-radius: 2px; }
        html { scroll-behavior: smooth; }

        /* sticky header wrapper */
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 500;
        }

        /* hide/show desktop vs mobile nav items */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
      `}</style>

      {/* STICKY HEADER = TopBar + MainNav */}
      <div className="sticky-header">
        <TopBar onSearchClick={() => setSearchOpen(true)} />
        <MainNav scrolled={scrolled} />
      </div>

      {/* PAGE CONTENT */}
      <HeroSlider />
      <AboutSection />
      <VideoSection />
      <OpenDaysSection />
      <QuoteSection />
      <FeaturesCarousel />
      <PartnershipSection />
      <Footer />

      {/* SEARCH OVERLAY */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

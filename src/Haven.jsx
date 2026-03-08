import { useState, createContext, useContext } from "react";

const C = {
  emerald:      "#059669",
  emeraldDark:  "#047857",
  emeraldDeep:  "#065F46",
  emeraldLight: "#D1FAE5",
  emeraldBg:    "#ECFDF5",
  yellow:       "#FCD34D",
  yellowDark:   "#D97706",
  amberLight:   "#FEF3C7",
  openBg:       "#ECFDF5",
  openText:     "#047857",
  closedBg:     "#F1F5F9",
  closedText:   "#475569",
  white:        "#FFFFFF",
  cream:        "#FAFDF9",
  slate50:      "#F8FAFC",
  slate100:     "#F1F5F9",
  slate200:     "#E2E8F0",
  slate300:     "#CBD5E1",
  slate400:     "#94A3B8",
  slate600:     "#475569",
  slate700:     "#334155",
  slate800:     "#1E293B",
  overlay:      "rgba(0,0,0,0.45)",
};

const DC = {
  emerald:      "#059669",
  emeraldDark:  "#34D399",
  emeraldDeep:  "#065F46",
  emeraldLight: "#064E3B",
  emeraldBg:    "#064E3B",
  yellow:       "#FCD34D",
  yellowDark:   "#FBBF24",
  amberLight:   "#451A03",
  openBg:       "#064E3B",
  openText:     "#34D399",
  closedBg:     "#1E293B",
  closedText:   "#94A3B8",
  white:        "#1E293B",
  cream:        "#0F172A",
  slate50:      "#1E293B",
  slate100:     "#334155",
  slate200:     "#475569",
  slate300:     "#64748B",
  slate400:     "#94A3B8",
  slate600:     "#CBD5E1",
  slate700:     "#E2E8F0",
  slate800:     "#F1F5F9",
  overlay:      "rgba(0,0,0,0.65)",
};

const ColorContext = createContext(C);

const AUDIENCE_STYLE = {
  "Anyone":     { bg:"#F1F5F9", text:"#475569", icon:"👤" },
  "Women":      { bg:"#FDF2F8", text:"#9D174D", icon:"👩" },
  "Youth/Kids": { bg:"#EFF6FF", text:"#1D4ED8", icon:"🧒" },
  "Senior":     { bg:"#FFFBEB", text:"#92400E", icon:"👴" },
  "Men":        { bg:"#F0FDF4", text:"#166534", icon:"👨" },
};

const SUBTYPE_MAP = {
  all:       [],
  shelter:   ["All", "Emergency", "Transitional"],
  food:      ["All", "Food Bank", "Hot Meals", "Pantry"],
  education: ["All", "GED / Literacy", "Job Training", "Youth Programs"],
};

const MOCK_SERVICES = [
  { id:1,  name:"St Matthews House",                  description:"Emergency transitional housing with SOBER requirement. Provides food and essential resources for individuals in crisis.",   audience:["Anyone"],             phone:"(239) 774-0500", open:false, openTime:"9:00 AM Tomorrow",  distance:0.3, category:"shelter",   subtype:"emergency",      rating:4.1, reviews:58,  address:"2001 Airport Rd S, Naples, FL 34112",        likes:34,  dislikes:4,  website:"https://www.stmatthewshouse.org"          },
  { id:2,  name:"Providence House",                   description:"Self-sufficiency program with transitional housing, personalized goal strategies, and life skill classes.",                 audience:["Women","Youth/Kids"], phone:"(239) 692-8779", open:false, openTime:"9:00 AM Tomorrow",  distance:0.8, category:"shelter",   subtype:"transitional",   rating:4.5, reviews:112, address:"3580 Thomasson Dr, Naples, FL 34112",         likes:87,  dislikes:6,  website:"https://www.providencehousenaples.org"     },
  { id:3,  name:"Children's Home Society of Florida", description:"Independent and transitional living, counseling and more services for youth in Southwest Florida.",                         audience:["Youth/Kids"],         phone:"(239) 334-0222", open:true,  openTime:null,                distance:1.2, category:"shelter",   subtype:"transitional",   rating:4.3, reviews:76,  address:"4220 Executive Dr, Naples, FL 34119",         likes:61,  dislikes:3,  website:"https://www.chsfl.org"                    },
  { id:4,  name:"Harry Chapin Food Bank",             description:"Food pantry, hot meals and grocery assistance for families and individuals in need across Southwest Florida.",             audience:["Anyone"],             phone:"(239) 334-7007", open:true,  openTime:null,                distance:1.5, category:"food",      subtype:"food bank",      rating:4.7, reviews:203, address:"3760 Fowler St, Fort Myers, FL 33901",         likes:156, dislikes:8,  website:"https://www.harrychapinfoodbank.org"       },
  { id:5,  name:"Senior Friendship Centers",          description:"Meals, transportation, social programs and health services designed specifically for senior citizens.",                    audience:["Senior"],             phone:"(239) 332-0561", open:true,  openTime:null,                distance:2.1, category:"food",      subtype:"hot meals",      rating:4.6, reviews:89,  address:"1494 Orange Ave, Fort Myers, FL 33901",        likes:72,  dislikes:2,  website:"https://www.seniorfriendhshipcenters.org"  },
  { id:6,  name:"Immokalee Community School",         description:"Adult literacy, GED preparation, job training and workforce development programs for low-income adults.",                  audience:["Anyone"],             phone:"(239) 657-4130", open:true,  openTime:null,                distance:2.4, category:"education", subtype:"ged / literacy", rating:4.4, reviews:47,  address:"701 Immokalee Dr, Immokalee, FL 34142",        likes:39,  dislikes:1,  website:"https://www.immokaleecommschool.org"       },
  { id:7,  name:"Salvation Army Emergency Lodge",     description:"Emergency shelter providing safe overnight accommodation and meals for individuals and families in crisis.",               audience:["Anyone"],             phone:"(239) 334-8687", open:true,  openTime:null,                distance:2.7, category:"shelter",   subtype:"emergency",      rating:3.9, reviews:134, address:"2041 Colonial Blvd, Fort Myers, FL 33907",     likes:98,  dislikes:21, website:"https://www.salvationarmyusa.org"          },
  { id:8,  name:"Women's Transitional Housing",       description:"Safe transitional housing for women escaping domestic violence, offering counseling and life skills support.",            audience:["Women"],              phone:"(239) 775-1101", open:false, openTime:"8:00 AM Tomorrow",  distance:3.1, category:"shelter",   subtype:"transitional",   rating:4.8, reviews:62,  address:"1435 5th Ave S, Naples, FL 34102",             likes:53,  dislikes:2,  website:"https://www.naplesshelter.org"             },
  { id:9,  name:"Naples Community Food Pantry",       description:"Weekly food distribution providing fresh produce, canned goods and household essentials to families in need.",            audience:["Anyone"],             phone:"(239) 262-7600", open:false, openTime:"10:00 AM Tomorrow", distance:3.4, category:"food",      subtype:"pantry",         rating:4.5, reviews:91,  address:"3000 Goodlette-Frank Rd, Naples, FL 34103",    likes:74,  dislikes:5,  website:"https://www.naplesfoodpantry.org"          },
  { id:10, name:"Youth Haven",                        description:"Residential care, counseling and transitional living programs for at-risk youth and young adults ages 11–21.",            audience:["Youth/Kids"],         phone:"(239) 649-7494", open:true,  openTime:null,                distance:3.8, category:"education", subtype:"youth programs", rating:4.6, reviews:38,  address:"5867 Whitaker Rd, Naples, FL 34112",           likes:31,  dislikes:1,  website:"https://www.youthhaven.org"                },
  { id:11, name:"Goodwill Job Training Center",       description:"Free job training, resume building and employment placement services for low-income individuals.",                        audience:["Anyone"],             phone:"(239) 210-1200", open:true,  openTime:null,                distance:4.1, category:"education", subtype:"job training",   rating:4.3, reviews:55,  address:"4511 Tamiami Trail E, Naples, FL 34112",       likes:44,  dislikes:3,  website:"https://www.goodwill.org"                  },
  { id:12, name:"Catholic Charities Food Bank",       description:"Free groceries and pantry supplies distributed weekly to low-income families regardless of faith background.",           audience:["Anyone"],             phone:"(239) 455-2655", open:true,  openTime:null,                distance:4.5, category:"food",      subtype:"food bank",      rating:4.6, reviews:77,  address:"2210 Santa Barbara Blvd, Naples, FL 34116",    likes:65,  dislikes:4,  website:"https://www.catholiccharitiesdioceseofvenice.org" },
];

const CATEGORIES = [
  { id:"all",       label:"All",       icon:"🗂"  },
  { id:"shelter",   label:"Housing",   icon:"🏠"  },
  { id:"food",      label:"Food",      icon:"🍽"  },
  { id:"education", label:"Education", icon:"📚"  },
];

const SUGGESTED_LOCATIONS = [
  "Naples, FL", "Fort Myers, FL", "Bonita Springs, FL",
  "Marco Island, FL", "Immokalee, FL", "Cape Coral, FL",
  "Estero, FL", "Golden Gate, FL",
];

// ─── Location Modal ───────────────────────────────────────────────────────────
function LocationModal({ onSelect, onClose }) {
  const C = useContext(ColorContext);
  const [query, setQuery]       = useState("");
  const [locating, setLocating] = useState(false);

  const filtered = query.length > 0
    ? SUGGESTED_LOCATIONS.filter(l => l.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTED_LOCATIONS;

  const handleGPS = () => {
    setLocating(true);
    setTimeout(() => { setLocating(false); onSelect("Current Location — Naples, FL"); }, 1500);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", flexDirection:"column" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:C.overlay }} />
      <div style={{
        position:"relative", zIndex:1, background:C.white,
        borderRadius:"0 0 24px 24px", overflow:"hidden",
        boxShadow:"0 8px 40px rgba(0,0,0,0.18)",
        maxWidth:430, width:"100%", margin:"0 auto",
      }}>
        {/* Header */}
        <div style={{
          background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
          padding:"16px 16px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <span style={{ color:C.white, fontSize:17, fontWeight:800 }}>
            Choose City / Zip for Services
          </span>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.2)", border:"none", color:C.white,
            width:32, height:32, borderRadius:"50%", fontSize:16,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800,
          }}>✕</button>
        </div>

        {/* Search */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderBottom:`1px solid ${C.slate200}` }}>
          <span style={{ fontSize:18, color:C.slate400 }}>🔍</span>
          <input autoFocus placeholder="Search City Name or Zip Code" value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ flex:1, border:"none", outline:"none", fontSize:15, color:C.slate800, background:"transparent" }} />
          {query.length > 0 && (
            <button onClick={() => setQuery("")} style={{ background:"none", border:"none", color:C.slate400, fontSize:18, cursor:"pointer", padding:0 }}>✕</button>
          )}
        </div>

        {/* GPS row */}
        <button onClick={handleGPS} disabled={locating} style={{
          width:"100%", display:"flex", alignItems:"center", gap:12,
          padding:"14px 16px", background: locating ? C.slate100 : C.white,
          border:"none", borderBottom:`1px solid ${C.slate100}`,
          cursor: locating ? "not-allowed" : "pointer", textAlign:"left",
        }}>
          <span style={{ width:38, height:38, borderRadius:10, background:C.emeraldLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>📍</span>
          <span style={{ fontSize:15, fontWeight:800, color:C.emerald }}>
            {locating ? "Getting your location..." : "Current Location"}
          </span>
        </button>

        {/* City list */}
        <div style={{ maxHeight:280, overflowY:"auto" }}>
          {filtered.map((place, i) => (
            <button key={i} onClick={() => onSelect(place)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"13px 16px", background:C.white, border:"none",
              borderBottom:`1px solid ${C.slate100}`, cursor:"pointer", textAlign:"left",
            }}>
              <span style={{ width:38, height:38, borderRadius:10, background:C.slate100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>🏙</span>
              <span style={{ fontSize:14, color:C.slate700 }}>{place}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding:"24px 16px", textAlign:"center", color:C.slate400, fontSize:14 }}>No results for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }) {
  const C = useContext(ColorContext);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize:12, color: i <= Math.round(rating) ? C.yellowDark : C.slate200 }}>★</span>
      ))}
      <span style={{ fontSize:12, color:C.slate600, fontWeight:700 }}>{rating.toFixed(1)}</span>
      <span style={{ fontSize:11, color:C.slate400 }}>({reviews} Google reviews)</span>
    </div>
  );
}

// ─── Audience Chip ────────────────────────────────────────────────────────────
function AudienceChip({ label }) {
  const C = useContext(ColorContext);
  const s = AUDIENCE_STYLE[label] || { bg:C.slate100, text:C.slate600, icon:"👤" };
  return (
    <span style={{ background:s.bg, color:s.text, fontSize:11, fontWeight:700, padding:"3px 10px 3px 7px", borderRadius:20, display:"inline-flex", alignItems:"center", gap:4 }}>
      <span style={{ fontSize:12 }}>{s.icon}</span>{label}
    </span>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service }) {
  const C = useContext(ColorContext);
  const accent = service.category === "shelter" ? C.emerald : service.category === "food" ? C.yellowDark : "#6366F1";
  const [likes, setLikes]       = useState(service.likes);
  const [dislikes, setDislikes] = useState(service.dislikes);
  const [voted, setVoted]       = useState(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${service.name}\n📌 ${service.address}\n📞 ${service.phone}\n🌐 ${service.website}`;
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (voted === "like")         { setLikes(l => l - 1); setVoted(null); }
    else if (voted === "dislike") { setDislikes(d => d - 1); setLikes(l => l + 1); setVoted("like"); }
    else                          { setLikes(l => l + 1); setVoted("like"); }
  };
  const handleDislike = () => {
    if (voted === "dislike")   { setDislikes(d => d - 1); setVoted(null); }
    else if (voted === "like") { setLikes(l => l - 1); setDislikes(d => d + 1); setVoted("dislike"); }
    else                       { setDislikes(d => d + 1); setVoted("dislike"); }
  };

  const mapsUrl = `https://maps.google.com/maps?daddr=${encodeURIComponent(service.address)}`;

  return (
    <div style={{ background:C.white, margin:"0 12px 10px", borderRadius:14, overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.07)", border:`1px solid ${C.slate100}` }}>
      <div style={{ height:3, background:accent }} />
      <div style={{ padding:"11px 12px" }}>

        {/* Row 1 — Name + Address on left, icons on right spanning both lines */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <div style={{ flex:1, paddingRight:10 }}>
            <h3 style={{ color:C.slate800, fontSize:14, fontWeight:800, margin:"0 0 3px", lineHeight:1.3 }}>
              {service.name}
            </h3>
            <a href={mapsUrl} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:4, textDecoration:"none" }}>
              <span style={{ fontSize:11 }}>📌</span>
              <span style={{ fontSize:12, color:C.emeraldDark, textDecoration:"underline", textDecorationStyle:"dotted", textUnderlineOffset:2 }}>{service.address}</span>
            </a>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
            <div style={{ display:"flex", gap:6 }}>
              <a href={`tel:${service.phone}`} style={{ width:36, height:36, borderRadius:10, background: C.cream === "#0F172A" ? "#1E293B" : "#fff", border: C.cream === "#0F172A" ? "none" : "1.5px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#34D399" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                </svg>
              </a>
              <a href={service.website} target="_blank" rel="noreferrer" style={{ width:36, height:36, borderRadius:10, background: C.cream === "#0F172A" ? "#1E293B" : "#fff", border: C.cream === "#0F172A" ? "none" : "1.5px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
              <button onClick={handleCopy} title="Copy info" style={{ width:36, height:36, borderRadius:10, background: C.cream === "#0F172A" ? "#1E293B" : "#fff", border: C.cream === "#0F172A" ? "none" : "1.5px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}>
                {copied
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                }
              </button>
            </div>
            {copied && (
              <span style={{ fontSize:10, fontWeight:700, color:"#34D399", background:"#1E293B", padding:"2px 8px", borderRadius:20 }}>
                ✓ Copied!
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize:12, color:C.slate600, margin:"0 0 8px", lineHeight:1.55 }}>
          {service.description}
        </p>

        {/* Row 2 — Audience chips + Open/Closed + Distance */}
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:8, flexWrap:"wrap" }}>
          {service.audience.map(a => <AudienceChip key={a} label={a} />)}
          <div style={{ marginLeft:"auto", display:"flex", gap:5, flexShrink:0 }}>
            <span style={{ fontSize:11, fontWeight:700, color: service.open ? C.openText : C.closedText, background: service.open ? C.openBg : C.closedBg, padding:"2px 8px", borderRadius:20 }}>
              {service.open ? "● Open" : "● Closed"}
            </span>
            <span style={{ fontSize:11, fontWeight:700, color:C.slate600, background:C.slate100, padding:"2px 8px", borderRadius:20 }}>
              {service.distance} mi
            </span>
          </div>
        </div>

        {/* Row 3 — Google rating + Like / Dislike */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:3 }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ fontSize:11, color: i <= Math.round(service.rating) ? C.yellowDark : C.slate200 }}>★</span>
            ))}
            <span style={{ fontSize:12, color:C.slate600, fontWeight:700, marginLeft:2 }}>{service.rating.toFixed(1)}</span>
            <span style={{ fontSize:11, color:C.slate400 }}>({service.reviews})</span>
          </div>
          <div style={{ display:"flex", gap:5 }}>
            <button onClick={handleLike} style={{ display:"flex", alignItems:"center", gap:3, padding:"3px 10px", borderRadius:20, border:"none", cursor:"pointer", background: voted === "like" ? C.emeraldBg : C.slate100, color: voted === "like" ? C.emeraldDark : C.slate600, fontSize:12, fontWeight:700 }}>
              👍 {likes}
            </button>
            <button onClick={handleDislike} style={{ display:"flex", alignItems:"center", gap:3, padding:"3px 10px", borderRadius:20, border:"none", cursor:"pointer", background: voted === "dislike" ? "#FEE2E2" : C.slate100, color: voted === "dislike" ? "#DC2626" : C.slate600, fontSize:12, fontWeight:700 }}>
              👎 {dislikes}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Notification Panel ───────────────────────────────────────────────────────
const NOTIF_OPTIONS = [
  { id:"beds",     icon:"🏠", label:"Bed Availability",      desc:"Alert when shelter beds open up near you" },
  { id:"opening",  icon:"⏰", label:"Opening Soon",           desc:"30 min warning before a service opens" },
  { id:"schedule", icon:"📢", label:"Schedule Changes",       desc:"When services near you update their hours" },
  { id:"new",      icon:"📍", label:"New Services Nearby",    desc:"New resources added in your area" },
  { id:"weather",  icon:"🌧", label:"Weather Alerts",         desc:"Warm shelter alerts during bad weather" },
  { id:"closing",  icon:"🔔", label:"Closing Soon",           desc:"1 hour warning before a service closes" },
];

function NotificationPanel({ onClose, locationLabel }) {
  const C = useContext(ColorContext);
  const [email, setEmail]       = useState("");
  const [prefs, setPrefs]       = useState({ beds:true, opening:true, schedule:true, new:false, weather:true, closing:false });
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState("");

  const toggle = (id) => setPrefs(p => ({ ...p, [id]: !p[id] }));

  const handleSave = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSaved(true);
  };

  return (
    <div style={{ background:C.white, borderBottom:`1px solid ${C.slate200}`, overflow:"hidden" }}>

      {/* Panel header */}
      <div style={{ background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ color:C.white, fontSize:16, fontWeight:800 }}>🔔 Email Notifications</div>
          <div style={{ color:"rgba(255,255,255,0.65)", fontSize:11, marginTop:2 }}>Get alerts for services near you</div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:C.white, width:30, height:30, borderRadius:"50%", fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>✕</button>
      </div>

      <div style={{ padding:"14px 16px" }}>

        {saved ? (
          /* ── Success state ── */
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
            <div style={{ fontSize:15, fontWeight:800, color:C.emeraldDark, marginBottom:6 }}>You're all set!</div>
            <div style={{ fontSize:13, color:C.slate600, lineHeight:1.6 }}>
              We'll send alerts to <strong>{email}</strong>
              {locationLabel ? ` for services near ${locationLabel}` : ""}.
            </div>
            <button onClick={() => { setSaved(false); onClose(); }} style={{
              marginTop:16, padding:"10px 24px",
              background:C.emerald, color:C.white, border:"none",
              borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer",
            }}>Done</button>
          </div>
        ) : (
          <>
            {/* Location context */}
            {locationLabel && (
              <div style={{ display:"flex", alignItems:"center", gap:8, background:C.emeraldBg, borderRadius:10, padding:"8px 12px", marginBottom:14 }}>
                <span style={{ fontSize:14 }}>📍</span>
                <span style={{ fontSize:12, color:C.emeraldDark, fontWeight:600 }}>Alerts for: {locationLabel}</span>
              </div>
            )}

            {/* Email input */}
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:C.slate700, display:"block", marginBottom:6 }}>Your Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                style={{
                  width:"100%", padding:"11px 14px",
                  border:`2px solid ${error ? C.closedText : email.length > 0 ? C.emerald : C.slate200}`,
                  borderRadius:10, fontSize:14, outline:"none",
                  color:C.slate800, boxSizing:"border-box",
                }}
              />
              {error && <div style={{ fontSize:12, color:C.closedText, marginTop:4 }}>{error}</div>}
            </div>

            {/* Toggle list */}
            <div style={{ fontSize:12, fontWeight:700, color:C.slate700, marginBottom:8 }}>Notify me about:</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:16 }}>
              {NOTIF_OPTIONS.map(opt => (
                <div key={opt.id} onClick={() => toggle(opt.id)} style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"10px 12px", borderRadius:10, cursor:"pointer",
                  background: prefs[opt.id] ? C.emeraldBg : C.slate100,
                  border:`1.5px solid ${prefs[opt.id] ? C.emeraldLight : "transparent"}`,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color: prefs[opt.id] ? C.emeraldDark : C.slate700 }}>{opt.label}</div>
                      <div style={{ fontSize:11, color:C.slate400, marginTop:1 }}>{opt.desc}</div>
                    </div>
                  </div>
                  {/* Toggle switch */}
                  <div style={{
                    width:38, height:22, borderRadius:11, flexShrink:0,
                    background: prefs[opt.id] ? C.emerald : C.slate300,
                    position:"relative", transition:"background 0.2s",
                  }}>
                    <div style={{
                      position:"absolute", top:3,
                      left: prefs[opt.id] ? 19 : 3,
                      width:16, height:16, borderRadius:"50%",
                      background:C.white,
                      boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                      transition:"left 0.2s",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Save button */}
            <button onClick={handleSave} style={{
              width:"100%", padding:"13px",
              background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
              color:C.white, border:"none", borderRadius:12,
              fontSize:15, fontWeight:800, cursor:"pointer",
              boxShadow:`0 4px 14px rgba(5,150,105,0.3)`,
            }}>Save Notification Preferences</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Hamburger Menu ───────────────────────────────────────────────────────────
const HOTLINES = [
  { name:"National Crisis Line",       number:"988",          desc:"Suicide & mental health crisis" },
  { name:"211 Helpline",               number:"211",          desc:"Food, shelter & local services" },
  { name:"National DV Hotline",        number:"1-800-799-7233", desc:"Domestic violence support" },
  { name:"Runaway & Homeless Youth",   number:"1-800-786-2929", desc:"Youth in crisis" },
  { name:"SAMHSA Helpline",            number:"1-800-662-4357", desc:"Substance abuse support" },
];

const MENU_SECTIONS = [
  {
    title:"For You",
    items:[
      { icon:"⭐", label:"Saved Favorites",      desc:"Services you've bookmarked" },
      { icon:"📍", label:"Change Location",       desc:"Update your area" },
      { icon:"🔔", label:"Notification Settings", desc:"Manage email alerts" },
    ],
  },
  {
    title:"Discover",
    items:[
      { icon:"🆘", label:"National Hotlines",     desc:"Crisis & emergency lines" },
      { icon:"🗺",  label:"Map View",              desc:"See services on a map", badge:"Coming Soon" },
      { icon:"📋", label:"All Categories",         desc:"Browse every service type" },
    ],
  },
  {
    title:"Service Providers",
    items:[
      { icon:"➕", label:"List Your Service",     desc:"Register your organization",  badge:"Coming Soon" },
      { icon:"✏️", label:"Manage My Listing",     desc:"Update your service details", badge:"Coming Soon" },
    ],
  },
  {
    title:"Support",
    items:[
      { icon:"💬", label:"Give Feedback",          desc:"Help us improve Haven" },
      { icon:"❓", label:"How to Use Haven",       desc:"Quick guide for new users" },
      { icon:"🏡", label:"About Haven",            desc:"Our mission & story" },
      { icon:"🔒", label:"Privacy Policy",         desc:"How we protect your data" },
    ],
  },
];

function HamburgerMenu({ onClose, onOpenNotif, onChangeLocation }) {
  const C = useContext(ColorContext);
  const [activeScreen, setActiveScreen] = useState(null); // null | "hotlines" | "about" | "feedback" | "list"

  const handleItem = (label) => {
    if (label === "National Hotlines")      setActiveScreen("hotlines");
    else if (label === "About Haven")       setActiveScreen("about");
    else if (label === "Give Feedback")     setActiveScreen("feedback");
    else if (label === "List Your Service") setActiveScreen("list");
    else if (label === "Notification Settings") { onClose(); onOpenNotif(); }
    else if (label === "Change Location")   { onClose(); onChangeLocation(); }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:C.overlay }} />

      {/* Slide-in panel */}
      <div style={{
        position:"relative", zIndex:1,
        width:300, maxWidth:"85vw",
        background:C.white,
        height:"100%",
        display:"flex", flexDirection:"column",
        boxShadow:"4px 0 24px rgba(0,0,0,0.18)",
        overflowY:"auto",
      }}>
        {/* Menu header */}
        <div style={{
          background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
          padding:"20px 16px 16px",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:C.yellow, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏡</div>
              <div>
                <div style={{ color:C.white, fontSize:19, fontWeight:900, letterSpacing:"-0.5px" }}>Haven</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:9, letterSpacing:"1.8px", textTransform:"uppercase" }}>Help is near</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:C.white, width:30, height:30, borderRadius:"50%", fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>✕</button>
          </div>
          <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"8px 12px" }}>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:10, textTransform:"uppercase", letterSpacing:"1px", marginBottom:2 }}>Mission</div>
            <div style={{ color:C.white, fontSize:12, lineHeight:1.5 }}>Connecting people in need to food, shelter & resources nearby.</div>
          </div>
        </div>

        {/* Sub-screen: Hotlines */}
        {activeScreen === "hotlines" && (
          <div style={{ flex:1 }}>
            <button onClick={() => setActiveScreen(null)} style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"none", border:"none", borderBottom:`1px solid ${C.slate100}`, cursor:"pointer", width:"100%", textAlign:"left" }}>
              <span style={{ fontSize:16 }}>←</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.slate700 }}>National Hotlines</span>
            </button>
            {HOTLINES.map((h, i) => (
              <div key={i} style={{ padding:"14px 16px", borderBottom:`1px solid ${C.slate100}` }}>
                <div style={{ fontSize:14, fontWeight:800, color:C.slate800, marginBottom:2 }}>{h.name}</div>
                <div style={{ fontSize:12, color:C.slate400, marginBottom:8 }}>{h.desc}</div>
                <a href={`tel:${h.number}`} style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:C.emeraldBg, color:C.emeraldDark,
                  padding:"6px 14px", borderRadius:20, textDecoration:"none",
                  fontSize:13, fontWeight:800,
                }}>📞 {h.number}</a>
              </div>
            ))}
          </div>
        )}

        {/* Sub-screen: About */}
        {activeScreen === "about" && (
          <div style={{ flex:1 }}>
            <button onClick={() => setActiveScreen(null)} style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"none", border:"none", borderBottom:`1px solid ${C.slate100}`, cursor:"pointer", width:"100%", textAlign:"left" }}>
              <span style={{ fontSize:16 }}>←</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.slate700 }}>About Haven</span>
            </button>
            <div style={{ padding:"20px 16px" }}>
              <div style={{ fontSize:36, textAlign:"center", marginBottom:12 }}>🏡</div>
              <div style={{ fontSize:15, fontWeight:800, color:C.slate800, textAlign:"center", marginBottom:8 }}>Haven — Help is Near</div>
              <p style={{ fontSize:13, color:C.slate600, lineHeight:1.7, margin:"0 0 14px" }}>
                Haven is a free app that connects people in need to nearby services including emergency shelters, food banks, education programs, and more.
              </p>
              <p style={{ fontSize:13, color:C.slate600, lineHeight:1.7, margin:"0 0 14px" }}>
                We're an all-volunteer nonprofit organization. Our mission is to make it easier for anyone — regardless of their situation — to find the help they need, when they need it.
              </p>
              <div style={{ background:C.emeraldBg, borderRadius:12, padding:"12px 14px" }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.emeraldDark, marginBottom:4 }}>Coverage</div>
                <div style={{ fontSize:12, color:C.slate600, lineHeight:1.6 }}>Currently serving Southwest Florida. Expanding to more regions soon.</div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-screen: Feedback */}
        {activeScreen === "feedback" && (
          <div style={{ flex:1 }}>
            <button onClick={() => setActiveScreen(null)} style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"none", border:"none", borderBottom:`1px solid ${C.slate100}`, cursor:"pointer", width:"100%", textAlign:"left" }}>
              <span style={{ fontSize:16 }}>←</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.slate700 }}>Give Feedback</span>
            </button>
            <div style={{ padding:"16px" }}>
              <div style={{ fontSize:13, color:C.slate600, marginBottom:12, lineHeight:1.6 }}>Help us improve Haven. What's working? What's missing?</div>
              <textarea placeholder="Share your thoughts..." rows={5} style={{
                width:"100%", padding:"12px", border:`2px solid ${C.slate200}`,
                borderRadius:10, fontSize:13, outline:"none", resize:"none",
                color:C.slate800, boxSizing:"border-box", fontFamily:"inherit",
              }} />
              <button style={{
                width:"100%", marginTop:10, padding:"12px",
                background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
                color:C.white, border:"none", borderRadius:10,
                fontSize:14, fontWeight:800, cursor:"pointer",
              }}>Send Feedback</button>
            </div>
          </div>
        )}

        {/* Sub-screen: List Your Service */}
        {activeScreen === "list" && (
          <div style={{ flex:1 }}>
            <button onClick={() => setActiveScreen(null)} style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"none", border:"none", borderBottom:`1px solid ${C.slate100}`, cursor:"pointer", width:"100%", textAlign:"left" }}>
              <span style={{ fontSize:16 }}>←</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.slate700 }}>List Your Service</span>
            </button>
            <div style={{ padding:"16px" }}>
              <div style={{ fontSize:13, color:C.slate600, marginBottom:14, lineHeight:1.6 }}>Register your organization to appear in Haven and connect with people who need your help.</div>
              {["Organization Name","Contact Email","Phone Number","Address","Category"].map((field, i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:C.slate700, display:"block", marginBottom:4 }}>{field}</label>
                  <input placeholder={`Enter ${field.toLowerCase()}`} style={{
                    width:"100%", padding:"10px 12px", border:`1.5px solid ${C.slate200}`,
                    borderRadius:8, fontSize:13, outline:"none", color:C.slate800, boxSizing:"border-box",
                  }} />
                </div>
              ))}
              <button style={{
                width:"100%", marginTop:6, padding:"12px",
                background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
                color:C.white, border:"none", borderRadius:10,
                fontSize:14, fontWeight:800, cursor:"pointer",
              }}>Submit for Review</button>
              <div style={{ fontSize:11, color:C.slate400, textAlign:"center", marginTop:8 }}>All listings are reviewed before publishing</div>
            </div>
          </div>
        )}

        {/* Main menu items */}
        {!activeScreen && (
          <div style={{ flex:1 }}>
            {MENU_SECTIONS.map((section, si) => (
              <div key={si}>
                <div style={{ padding:"12px 16px 6px", fontSize:10, fontWeight:800, color:C.slate400, textTransform:"uppercase", letterSpacing:"1.2px" }}>
                  {section.title}
                </div>
                {section.items.map((item, ii) => (
                  <button key={ii} onClick={() => handleItem(item.label)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:12,
                    padding:"11px 16px", background:"none", border:"none",
                    borderBottom:`1px solid ${C.slate100}`,
                    cursor: item.badge ? "default" : "pointer", textAlign:"left",
                  }}>
                    <span style={{
                      width:36, height:36, borderRadius:10,
                      background:C.emeraldBg,
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0,
                    }}>{item.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:14, fontWeight:700, color: item.badge ? C.slate400 : C.slate800 }}>{item.label}</span>
                        {item.badge && (
                          <span style={{ fontSize:9, fontWeight:800, background:C.amberLight, color:C.yellowDark, padding:"2px 7px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize:11, color:C.slate400, marginTop:1 }}>{item.desc}</div>
                    </div>
                    {!item.badge && <span style={{ fontSize:14, color:C.slate300 }}>›</span>}
                  </button>
                ))}
              </div>
            ))}

            {/* Footer */}
            <div style={{ padding:"20px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:C.slate300 }}>Haven v1.0 POC · All-volunteer nonprofit</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function HavenApp() {
  const [dark, setDark]                     = useState(false);
  const colors                              = dark ? DC : C;
  const [showModal, setShowModal]           = useState(false);
  const [locationLabel, setLocationLabel]   = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubtype, setActiveSubtype]   = useState("All");
  const [searchQuery] = useState("");
  const [showNotif, setShowNotif]           = useState(false);
  const [showMenu, setShowMenu]             = useState(false);

  const handleSelectLocation = (label) => { setLocationLabel(label); setShowModal(false); };
  const handleCategoryChange = (cat)   => { setActiveCategory(cat); setActiveSubtype("All"); };

  const subtypePills = SUBTYPE_MAP[activeCategory] || [];

  const filtered = MOCK_SERVICES.filter(s => {
    const catMatch  = activeCategory === "all" || s.category === activeCategory;
    const subMatch  = activeSubtype === "All"  || s.subtype  === activeSubtype.toLowerCase();
    const srchMatch = searchQuery === ""
      || s.name.toLowerCase().includes(searchQuery.toLowerCase())
      || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && subMatch && srchMatch;
  });

  return (
    <ColorContext.Provider value={colors}>
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:colors.cream, fontFamily:"'Helvetica Neue', Arial, sans-serif", display:"flex", flexDirection:"column" }}>

      {/* ── HEADER ── */}
      <div style={{
        background:`linear-gradient(135deg, ${C.emeraldDeep} 0%, ${C.emerald} 100%)`,
        padding:"13px 16px", display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 14px rgba(5,150,105,0.35)",
      }}>
        <button onClick={() => setShowMenu(true)} style={{ background:"none", border:"none", color:C.white, fontSize:22, cursor:"pointer", padding:4 }}>☰</button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:C.yellow, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }}>🏡</div>
          <div style={{ lineHeight:1.1 }}>
            <span style={{ color:"#fff", fontSize:21, fontWeight:900, letterSpacing:"-0.5px" }}>Haven</span>
            <span style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:9, letterSpacing:"1.8px", textTransform:"uppercase" }}>Help is near</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button style={{ background:C.yellow, border:"none", color:C.emeraldDeep, width:34, height:34, borderRadius:9, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.emeraldDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <circle cx="9" cy="10" r="1" fill={C.emeraldDeep}/>
              <circle cx="12" cy="10" r="1" fill={C.emeraldDeep}/>
              <circle cx="15" cy="10" r="1" fill={C.emeraldDeep}/>
            </svg>
          </button>
          <button onClick={() => setShowNotif(o => !o)} style={{ background: showNotif ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)", border: showNotif ? "1.5px solid rgba(255,255,255,0.6)" : "1.5px solid transparent", color:"#fff", width:34, height:34, borderRadius:9, fontSize:17, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>🔔</button>
          <button onClick={() => setDark(d => !d)} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", width:34, height:34, borderRadius:9, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>



      {/* ── NOTIFICATION PANEL ── */}
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} locationLabel={locationLabel} />}

      {/* ── LOCATION BUTTON — single pin only ── */}
      <div style={{ background:colors.white, padding:"10px 14px", borderBottom:`1px solid ${colors.slate200}` }}>
        <button onClick={() => setShowModal(true)} style={{
          width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"11px 14px",
          background: locationLabel ? colors.emeraldBg : colors.white,
          border:`2px solid ${locationLabel ? colors.emerald : colors.slate200}`,
          borderRadius:12, cursor:"pointer",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:18 }}>📍</span>
            <span style={{ fontSize:14, color: locationLabel ? colors.emeraldDark : colors.slate400, fontWeight: locationLabel ? 700 : 400 }}>
              {locationLabel || "Choose City / Zip for Services"}
            </span>
          </div>
          <span style={{ fontSize:12, color:colors.slate400 }}>▼</span>
        </button>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div style={{
        background:colors.white, padding:"10px 14px",
        display:"flex", gap:8, overflowX:"auto",
        borderBottom:`1px solid ${colors.slate200}`,
        position:"sticky", top:57, zIndex:90,
        boxShadow:"0 2px 6px rgba(0,0,0,0.04)",
      }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"8px 16px", borderRadius:24, flexShrink:0,
              border: isActive ? "none" : `1.5px solid ${colors.slate200}`,
              background: isActive ? `linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})` : colors.white,
              color: isActive ? "#fff" : colors.slate600,
              fontSize:13, fontWeight:700, cursor:"pointer",
              boxShadow: isActive ? "0 3px 10px rgba(5,150,105,0.3)" : "none",
            }}>
              <span style={{ fontSize:15 }}>{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── DYNAMIC SUB-FILTER PILLS ── */}
      {subtypePills.length > 0 && (
        <div style={{ background:colors.slate50, padding:"8px 14px", display:"flex", gap:8, overflowX:"auto", borderBottom:`1px solid ${colors.slate100}` }}>
          {subtypePills.map(type => (
            <button key={type} onClick={() => setActiveSubtype(type)} style={{
              padding:"5px 14px", borderRadius:20, whiteSpace:"nowrap", flexShrink:0,
              border:`1.5px solid ${activeSubtype===type ? C.emerald : colors.slate200}`,
              background: activeSubtype===type ? colors.emeraldBg : colors.white,
              color: activeSubtype===type ? colors.emeraldDark : colors.slate600,
              fontSize:12, fontWeight:700, cursor:"pointer",
            }}>{type}</button>
          ))}
        </div>
      )}

      {/* ── RESULTS COUNT ── */}
      <div style={{ padding:"10px 14px 4px" }}>
        <span style={{ fontSize:12, color:colors.slate400, fontWeight:500 }}>
          {locationLabel ? `${filtered.length} services found · nearest first` : "👆 Set your location to find nearby help"}
        </span>
      </div>

      {/* ── SERVICE LIST ── */}
      <div style={{ flex:1, paddingTop:6, paddingBottom:24 }}>
        {!locationLabel ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"50px 32px", textAlign:"center", gap:16 }}>
            <div style={{ fontSize:58 }}>🗺</div>
            <p style={{ color:colors.slate400, fontSize:15, margin:0, lineHeight:1.7, maxWidth:260 }}>
              Tell us where you are and we'll find the help closest to you
            </p>
            <button onClick={() => setShowModal(true)} style={{
              padding:"13px 30px",
              background:`linear-gradient(135deg, ${C.emeraldDeep}, ${C.emerald})`,
              color:"#fff", border:"none", borderRadius:12,
              fontSize:15, fontWeight:800, cursor:"pointer",
              boxShadow:`0 4px 16px rgba(5,150,105,0.35)`,
            }}>Set My Location</button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:"60px 32px", textAlign:"center" }}>
            <div style={{ fontSize:48 }}>🔍</div>
            <p style={{ color:colors.slate400, fontSize:15, marginTop:12 }}>No services match this filter.</p>
          </div>
        ) : (
          filtered.map(s => <ServiceCard key={s.id} service={s} />)
        )}
      </div>

      {/* ── LOCATION MODAL ── */}
      {showModal && <LocationModal onSelect={handleSelectLocation} onClose={() => setShowModal(false)} />}

      {/* ── HAMBURGER MENU ── */}
      {showMenu && (
        <HamburgerMenu
          onClose={() => setShowMenu(false)}
          onOpenNotif={() => setShowNotif(true)}
          onChangeLocation={() => setShowModal(true)}
        />
      )}
    </div>
    </ColorContext.Provider>
  );
}

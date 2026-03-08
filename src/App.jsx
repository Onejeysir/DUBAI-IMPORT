import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";

/* ===================== DATA ===================== */
const PRODUCTS = [
  { id:1,  name:"Filtre à Huile Moteur",      ref:"FHM-001", price:15000,  cat:"moteur",       badge:"hot",     badgeTxt:"Bestseller", stars:5, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=320&fit=crop", desc:"Compatible IVECO, DAF, MAN — OEM" },
  { id:2,  name:"Disque de Frein Avant",       ref:"DFA-012", price:45000,  cat:"freinage",     badge:"new",     badgeTxt:"Nouveau",    stars:5, img:"https://images.unsplash.com/photo-1625231338373-a15fbff0d02a?w=500&h=320&fit=crop", desc:"Haute résistance, origine Dubaï" },
  { id:3,  name:"Alternateur 24V 120A",        ref:"ALT-024", price:85000,  cat:"electrique",   badge:"hot",     badgeTxt:"Top Vente",  stars:4, img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=320&fit=crop", desc:"SCANIA, VOLVO, MERCEDES" },
  { id:4,  name:"Kit Embrayage Complet",       ref:"KEC-008", price:120000, cat:"transmission", badge:"promo",   badgeTxt:"−15%",       stars:5, img:"https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=500&h=320&fit=crop", desc:"Disque + plateau + butée" },
  { id:5,  name:"Amortisseur Avant Cab",       ref:"AMO-055", price:35000,  cat:"suspension",   badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=320&fit=crop", desc:"Paire avant, toutes marques" },
  { id:6,  name:"Injecteur Diesel CR",         ref:"INJ-033", price:75000,  cat:"moteur",       badge:"premium", badgeTxt:"Certifié",   stars:5, img:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=320&fit=crop", desc:"Haute pression — origine OEM" },
  { id:7,  name:"Plaquettes de Frein ×4",      ref:"PFA-022", price:22000,  cat:"freinage",     badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=320&fit=crop", desc:"Jeu complet 4 plaquettes" },
  { id:8,  name:"Batterie 12V 180Ah",          ref:"BAT-180", price:55000,  cat:"electrique",   badge:"new",     badgeTxt:"Nouveau",    stars:5, img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=320&fit=crop", desc:"Longue durée, démarrage garanti" },
  { id:9,  name:"Boîte de Vitesses BVM",       ref:"BVM-016", price:350000, cat:"transmission", badge:"premium", badgeTxt:"Premium",    stars:5, img:"https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=500&h=320&fit=crop", desc:"Reconditionnée — garantie 6 mois" },
  { id:10, name:"Barre Stabilisatrice",        ref:"BST-041", price:28000,  cat:"suspension",   badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1591293836027-e05b48473b67?w=500&h=320&fit=crop", desc:"Anti-roulis avant, renforcé" },
  { id:11, name:"Radiateur Eau Moteur",        ref:"RAD-019", price:95000,  cat:"moteur",       badge:"hot",     badgeTxt:"Stock limité",stars:4,img:"https://images.unsplash.com/photo-1596073419667-9d77d59f033f?w=500&h=320&fit=crop", desc:"Aluminium renforcé, anti-fuite" },
  { id:12, name:"Démarreur 24V 5KW",           ref:"DEM-024", price:48000,  cat:"electrique",   badge:"hot",     badgeTxt:"Top Vente",  stars:5, img:"https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&h=320&fit=crop", desc:"Moteurs Diesel 6-8L" },
  { id:13, name:"Turbocompresseur GT25",       ref:"TUR-011", price:180000, cat:"moteur",       badge:"premium", badgeTxt:"Premium",    stars:5, img:"https://images.unsplash.com/photo-1504222490345-c075b626de3b?w=500&h=320&fit=crop", desc:"Recon certifié — garantie 1 an" },
  { id:14, name:"Câble Embrayage Renforcé",    ref:"CAB-031", price:18000,  cat:"transmission", badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&h=320&fit=crop", desc:"Acier renforcé anti-rupture" },
  { id:15, name:"Pare-choc Avant Acier",       ref:"PAR-064", price:65000,  cat:"carrosserie",  badge:"new",     badgeTxt:"Nouveau",    stars:5, img:"https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&h=320&fit=crop", desc:"Acier galvanisé, universel" },
  { id:16, name:"Ressort de Suspension",       ref:"RES-028", price:32000,  cat:"suspension",   badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1611836262831-e11a8e72efad?w=500&h=320&fit=crop", desc:"Charge lourde, certifié" },
  { id:17, name:"Rétroviseur Électrique G.",   ref:"RET-052", price:25000,  cat:"carrosserie",  badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=320&fit=crop", desc:"Électrique, chauffant, universel" },
  { id:18, name:"Filtre à Air Premium",        ref:"FAM-007", price:12000,  cat:"moteur",       badge:null,      badgeTxt:null,         stars:4, img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=320&fit=crop", desc:"Filtration haute performance" },
];

const BRANDS  = ["VOLVO","SCANIA","MAN TGX","MERCEDES","DAF XF","IVECO","RENAULT","ISUZU","HINO","FUSO","FORD","SINO TRUCK"];
const FAQS    = [
  { q:"Comment passer une commande ?",          a:"Ajoutez les pièces souhaitées à votre panier, cliquez sur « Passer la commande ». Un message WhatsApp pré-rempli est généré automatiquement. Envoyez-le au 654 133 947 et notre équipe traite votre commande dans l'heure." },
  { q:"Quel est le délai de livraison ?",       a:"Nous garantissons la livraison en 48 heures après confirmation de votre commande et réception du paiement. Pour Yaoundé et Douala, un délai de 24h est souvent possible." },
  { q:"Les pièces sont-elles d'origine OEM ?",  a:"Oui. Nous importons exclusivement des pièces certifiées OEM ou des pièces aftermarket de haute qualité équivalente. Chaque pièce est vérifiée avant expédition depuis Dubaï." },
  { q:"Quels modes de paiement acceptez-vous ?",a:"Nous acceptons Orange Money, MTN Mobile Money et virements bancaires. Le paiement s'effectue lors de la confirmation de commande sur WhatsApp." },
  { q:"Puis-je retourner une pièce ?",          a:"Oui. Si une pièce ne correspond pas ou présente un défaut, nous prenons en charge le retour et le remplacement sous 7 jours suivant la réception. Contactez-nous sur WhatsApp." },
  { q:"Livrez-vous dans tout le Cameroun ?",    a:"Oui, tout le territoire camerounais. Yaoundé et Douala bénéficient du délai le plus court (24-48h). Pour les villes éloignées, comptez 48-72h maximum." },
  { q:"Comment connaître ma référence ?",       a:"Envoyez la photo de votre ancienne pièce ou le numéro de châssis sur WhatsApp. Notre équipe technique identifie gratuitement la bonne référence pour vous." },
  { q:"Quelle garantie sur les pièces ?",       a:"Garantie de 3 à 6 mois selon la catégorie. En cas de défaillance prématurée dans des conditions normales d'utilisation, nous remplaçons la pièce sans frais supplémentaires." },
];
const TESTIMONIALS = [
  { name:"Jean-Marie Nkomo",  role:"Transporteur, Douala",         init:"JN", color:"#FF6B35", text:"J'ai commandé un kit embrayage complet pour mon SCANIA. Livré en 44h, pièce d'origine, aucun problème d'installation. Je recommande fortement !", stars:5 },
  { name:"Pierre Biyong",     role:"Mécanicien, Yaoundé",          init:"PB", color:"#00C2FF", text:"Les prix sont vraiment imbattables comparé aux boutiques locales. Et la qualité est là ! Mon alternateur 24V tourne parfaitement depuis 8 mois.", stars:5 },
  { name:"Alain Mbarga",      role:"Flotte Transport, Bafoussam",  init:"AM", color:"#A855F7", text:"Service client très réactif sur WhatsApp. J'avais un doute sur la compatibilité — réponse en moins de 10 minutes, pièce correcte.", stars:5 },
  { name:"Christophe Kamga",  role:"Transport longue distance",    init:"CK", color:"#22C55E", text:"J'avais besoin d'une boîte de vitesses en urgence. Commande à 18h, livraison le lendemain à 14h. Mon camion retourné sur la route en 24h !", stars:5 },
  { name:"Emmanuel Soh",      role:"Gérant garage, Ngaoundéré",    init:"ES", color:"#F59E0B", text:"Ça fait 2 ans que je commande ici pour tous mes camions VOLVO. Jamais une pièce défectueuse, toujours la référence exacte.", stars:5 },
  { name:"Roger Fouda",       role:"Chauffeur routier, Bertoua",   init:"RF", color:"#EF4444", text:"Les disques de frein sont OEM qualité. Le process de commande via WhatsApp est super simple. Service impeccable !", stars:5 },
];
const STATS = [
  { num:"500+",  label:"Pièces en stock" },
  { num:"48H",   label:"Délai livraison" },
  { num:"3 ANS", label:"D'expérience" },
  { num:"100%",  label:"Certifiées OEM" },
  { num:"2000+", label:"Clients satisfaits" },
  { num:"7j/7",  label:"Support client" },
];
const CAT_FILTERS = [
  { id:"all",         label:"Tout voir",    icon:"🔍" },
  { id:"moteur",      label:"Moteur",       icon:"🔩" },
  { id:"freinage",    label:"Freinage",     icon:"🛑" },
  { id:"transmission",label:"Transmission", icon:"⚙️" },
  { id:"suspension",  label:"Suspension",   icon:"🔧" },
  { id:"electrique",  label:"Électrique",   icon:"⚡" },
  { id:"carrosserie", label:"Carrosserie",  icon:"🔨" },
];
const CAT_LABELS = {
  moteur:"🔩 Moteur", freinage:"🛑 Freinage", transmission:"⚙️ Transmission",
  suspension:"🔧 Suspension", electrique:"⚡ Électrique", carrosserie:"🔨 Carrosserie",
};

/* ===================== DESIGN TOKENS ===================== */
const G = {
  dark:"#07080D", dark2:"#0D1018", dark3:"#121620",
  card:"#161B26", card2:"#1C2233",
  border:"rgba(255,255,255,0.07)",
  orange:"#FF6B35", amber:"#FFAB40", cyan:"#00C2FF",
  gold:"#FFD700", green:"#00E676", red:"#FF3D57",
  chrome:"rgba(255,255,255,0.35)",
  white:"#F0F4FF",
};

/* ===================== GLOBAL STYLES (injected once) ===================== */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0D1018; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#FF6B35,#FF3D57); border-radius: 3px; }

  .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: .04em; }
  .raj   { font-family: 'Rajdhani', sans-serif; }

  @keyframes ticker       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes brands       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer      { from{background-position:-200% center} to{background-position:200% center} }
  @keyframes countUp      { from{opacity:0;transform:translateY(12px) scale(.92)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes borderPulse  { 0%,100%{border-color:rgba(255,107,53,.2)} 50%{border-color:rgba(255,107,53,.7)} }
  @keyframes pulseGlow    { 0%,100%{box-shadow:0 0 20px rgba(37,211,102,.4)} 50%{box-shadow:0 0 50px rgba(37,211,102,.7),0 0 0 14px rgba(37,211,102,.07)} }
  @keyframes float        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes cartSlide    { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastPop     { from{opacity:0;transform:translateX(-50%) translateY(60px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes badgeBounce  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.55)} }
  @keyframes menuSlide    { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

  .shimmer-text {
    background: linear-gradient(90deg,#FF6B35,#FFAB40,#FF6B35);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .grid-bg {
    background-image: linear-gradient(rgba(255,107,53,.04) 1px,transparent 1px),
                      linear-gradient(90deg,rgba(255,107,53,.04) 1px,transparent 1px);
    background-size: 70px 70px;
  }
  .hero-float { animation: float 5s ease-in-out infinite; }
  .wa-pulse   { animation: pulseGlow 3s ease-in-out infinite; }

  .nav-link {
    color:rgba(255,255,255,.5); text-decoration:none;
    font-family:'Rajdhani',sans-serif; font-weight:600; font-size:.88rem;
    letter-spacing:.06em; text-transform:uppercase; padding:8px 12px;
    border-radius:8px; transition:all .2s; white-space:nowrap;
  }
  .nav-link:hover { color:#FF6B35; background:rgba(255,107,53,.08); }

  .card-hover           { transition:all .35s; cursor:pointer; }
  .card-hover:hover     { transform:translateY(-6px); border-color:rgba(255,107,53,.3)!important; box-shadow:0 25px 60px rgba(0,0,0,.5)!important; }
  .img-zoom img         { transition:transform .5s ease; }
  .card-hover:hover .img-zoom img { transform:scale(1.07); }
  .why-hover            { transition:all .3s; }
  .why-hover:hover      { transform:translateY(-5px); border-color:rgba(255,107,53,.28)!important; }
  .t-hover              { transition:all .3s; }
  .t-hover:hover        { transform:translateY(-4px); border-color:rgba(255,107,53,.25)!important; }
  .contact-row          { transition:all .25s; }
  .contact-row:hover    { transform:translateX(4px); border-color:rgba(255,107,53,.25)!important; }
  .btn-main             { transition:all .25s; }
  .btn-main:hover       { transform:translateY(-3px); box-shadow:0 14px 40px rgba(255,107,53,.5)!important; }
  .btn-wa-lg            { transition:all .3s; }
  .btn-wa-lg:hover      { transform:translateY(-3px); box-shadow:0 14px 40px rgba(37,211,102,.45)!important; }
  .step-i               { transition:all .3s; }
  .step-i:hover         { transform:scale(1.08) rotate(4deg); border-color:rgba(255,107,53,.55)!important; }
  .brand-chip           { transition:all .3s; }
  .brand-chip:hover     { border-color:rgba(255,107,53,.4)!important; color:#FF6B35!important; }
  .faq-q                { transition:color .2s; }

  .mobile-menu-overlay  { position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:998;backdrop-filter:blur(4px);animation:fadeUp .2s ease; }
  .mobile-menu          { position:fixed;top:0;left:0;right:0;background:#0D1018;border-bottom:1px solid rgba(255,107,53,.2);z-index:999;padding:80px 1.5rem 2rem;animation:menuSlide .3s ease; }
  .mobile-menu a        { display:block;padding:14px 0;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:1.2rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.6);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.05);transition:color .2s; }
  .mobile-menu a:hover  { color:#FF6B35; }

  @media (hover:none) {
    .card-hover:hover  { transform:none; border-color:rgba(255,107,53,.3)!important; }
    .btn-main:active   { transform:scale(.97); }
    .btn-wa-lg:active  { transform:scale(.97); }
  }
`;

function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById("tp-styles")) return;
    const el = document.createElement("style");
    el.id   = "tp-styles";
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => {
      const s = document.getElementById("tp-styles");
      if (s) s.remove();
    };
  }, []);
}

/* ===================== BREAKPOINT HOOK ===================== */
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return { isMobile: w < 600, isTablet: w >= 600 && w < 1024, isDesktop: w >= 1024, w };
  });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 600, isTablet: w >= 600 && w < 1024, isDesktop: w >= 1024, w });
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ===================== UTILS ===================== */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,107,53";
}

function sendWhatsAppOrder(cart) {
  if (!cart.length) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let msg = "🛒 *COMMANDE — TruckParts Dubai*\n\n━━━━━━━━━━━━━━━━━━━━\n";
  cart.forEach((item, idx) => {
    msg += `${idx+1}. *${item.name}*\n   Réf: ${item.ref}\n   Qté: ${item.qty} × ${item.price.toLocaleString("fr-FR")} FCFA\n   ➤ ${(item.price*item.qty).toLocaleString("fr-FR")} FCFA\n\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━━━━\n💰 *TOTAL : ${total.toLocaleString("fr-FR")} FCFA*\n\n🚛 Livraison sous 48H\n📍 Merci de confirmer votre adresse de livraison.`;
  window.open("https://wa.me/237654133947?text=" + encodeURIComponent(msg), "_blank");
}

/* ===================== SHARED COMPONENTS ===================== */
function WaIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.534 5.853L0 24l6.335-1.521A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.33-1.44l-.38-.225-3.962.951.972-3.867-.248-.389A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:".6rem" }}>
      <div style={{ height:1, width:32, background:`linear-gradient(90deg,transparent,${G.orange})` }} />
      <span className="raj" style={{ color:G.orange, fontSize:".72rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase" }}>{text}</span>
      <div style={{ height:1, width:32, background:`linear-gradient(90deg,${G.orange},transparent)` }} />
    </div>
  );
}

function SectionTitle({ children, align = "center" }) {
  return (
    <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,3.8rem)", lineHeight:1, letterSpacing:".03em", marginBottom:".9rem", textAlign:align }}>
      {children}
    </h2>
  );
}

function Stars({ count, size = ".85rem" }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[0,1,2,3,4].map(i => (
        <span key={i} style={{ color: i < count ? G.amber : "rgba(255,255,255,.14)", fontSize:size }}>★</span>
      ))}
    </div>
  );
}

function GradientPrice({ price }) {
  return (
    <div className="bebas" style={{ fontSize:"1.8rem", lineHeight:1, background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
      {price.toLocaleString("fr-FR")}
    </div>
  );
}

/* ===================== HEADER ===================== */
function Header({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { isMobile, isTablet }    = useBreakpoint();
  const compact = isMobile || isTablet;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { if (!compact) setMenuOpen(false); }, [compact]);

  const navLinks = [
    ["#catalogue","Catalogue"], ["#whyus","Avantages"],
    ["#process","Commander"],   ["#temoignages","Avis"],
    ["#faq","FAQ"],             ["#contact","Contact"],
  ];

  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? "rgba(7,8,13,.97)" : "rgba(7,8,13,.85)",
        backdropFilter:"blur(24px)",
        borderBottom:`1px solid ${scrolled ? "rgba(255,107,53,.2)" : "rgba(255,255,255,.05)"}`,
        transition:"all .3s",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,.6)" : "none",
      }}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 clamp(1rem,3vw,2rem)", display:"flex", alignItems:"center", justifyContent:"space-between", height: isMobile ? 62 : 70 }}>
          {/* LOGO */}
          <a href="#hero" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
            <div style={{ width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius:9, background:"linear-gradient(135deg,#FF6B35,#FF3D57)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(255,107,53,.4)", flexShrink:0 }}>
              <svg width={isMobile ? 20 : 22} height={isMobile ? 20 : 22} viewBox="0 0 24 24" fill="white">
                <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <div className="bebas" style={{ fontSize: isMobile ? "1.5rem" : "1.7rem", lineHeight:1, color:G.white }}>
                TRUCK<span style={{ color:G.orange }}>PARTS</span>
              </div>
              {!isMobile && (
                <div className="raj" style={{ fontSize:".56rem", letterSpacing:".18em", color:G.chrome, textTransform:"uppercase", marginTop:-2, fontWeight:600 }}>
                  Import Dubaï ✈
                </div>
              )}
            </div>
          </a>

          {/* DESKTOP NAV */}
          {!compact && (
            <nav style={{ display:"flex", gap:2 }}>
              {navLinks.map(([h,l]) => <a key={h} className="nav-link" href={h}>{l}</a>)}
            </nav>
          )}

          {/* ACTIONS */}
          <div style={{ display:"flex", gap: isMobile ? ".5rem" : ".75rem", alignItems:"center" }}>
            {!isMobile && (
              <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer"
                style={{ display:"flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize: isTablet ? ".78rem" : ".84rem", letterSpacing:".06em", textTransform:"uppercase", padding: isTablet ? "8px 14px" : "9px 18px", borderRadius:8, textDecoration:"none", transition:"all .25s", boxShadow:"0 4px 16px rgba(37,211,102,.3)", whiteSpace:"nowrap" }}>
                <WaIcon size={15} />654 133 947
              </a>
            )}
            {/* Cart button */}
            <button onClick={onCartOpen}
              style={{ position:"relative", width: isMobile ? 40 : 44, height: isMobile ? 40 : 44, borderRadius:10, background:"rgba(255,255,255,.04)", border:`1px solid ${G.border}`, color:G.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", flexShrink:0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <div style={{ position:"absolute", top:-6, right:-6, background:"linear-gradient(135deg,#FF6B35,#FF3D57)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".68rem", minWidth:18, height:18, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 3px", animation:"badgeBounce .35s ease" }}>
                  {cartCount}
                </div>
              )}
            </button>

            {/* Hamburger */}
            {compact && (
              <button onClick={() => setMenuOpen(!menuOpen)}
                style={{ width:40, height:40, borderRadius:9, background:"rgba(255,255,255,.04)", border:`1px solid ${G.border}`, color:G.white, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, flexShrink:0, transition:"all .2s", padding:"10px 8px" }}>
                <span style={{ display:"block", height:2, width:20, background: menuOpen ? G.orange : G.white, borderRadius:1, transition:"all .3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "" }} />
                <span style={{ display:"block", height:2, width:14, background: menuOpen ? "transparent" : G.white, borderRadius:1, transition:"all .3s", marginLeft:-6 }} />
                <span style={{ display:"block", height:2, width:20, background: menuOpen ? G.orange : G.white, borderRadius:1, transition:"all .3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && compact && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu">
            {navLinks.map(([h,l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer"
              style={{ color:"#25D366", borderBottom:"none", marginTop:"1rem", display:"flex", alignItems:"center", gap:10, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"1.2rem", textDecoration:"none" }}>
              <WaIcon size={20} color="#25D366" />654 133 947
            </a>
          </div>
        </>
      )}
    </>
  );
}

/* ===================== TICKER ===================== */
function Ticker() {
  const items = ["🚛 LIVRAISON EXPRESS 48H","✈️ IMPORT DIRECT DUBAÏ","🔩 PIÈCES CERTIFIÉES OEM","📞 WHATSAPP : 654 133 947","💰 PRIX COMPÉTITIFS","🇦🇪 QUALITÉ DUBAÏ","⚡ STOCK DISPONIBLE","🛡️ GARANTIE INCLUSE"];
  const all = [...items, ...items];
  return (
    <div style={{ background:"linear-gradient(90deg,#8B0000,#C0392B,#FF6B35,#FFAB40,#FF6B35,#C0392B,#8B0000)", padding:"9px 0", overflow:"hidden", borderBottom:"1px solid rgba(255,107,53,.2)" }}>
      <div style={{ display:"flex", gap:"2.5rem", animation:"ticker 25s linear infinite", width:"max-content" }}>
        {all.map((item, i) => (
          <div key={i} className="raj" style={{ display:"flex", alignItems:"center", gap:7, fontWeight:700, fontSize:"clamp(.68rem,.9vw,.82rem)", letterSpacing:".1em", textTransform:"uppercase", color:"#07080D", whiteSpace:"nowrap" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== HERO ===================== */
function HeroSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const compact = isMobile || isTablet;
  return (
    <section id="hero" style={{ position:"relative", minHeight: isMobile ? "auto" : "100vh", display:"flex", alignItems:"center", overflow:"hidden", paddingTop: isMobile ? 62 : 70 }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 90% 80% at 80% 50%,rgba(255,107,53,.12),transparent 55%),radial-gradient(ellipse 50% 60% at 10% 90%,rgba(255,61,87,.08),transparent 50%),linear-gradient(180deg,#07080D,#0D1018)" }} />
      <div className="grid-bg" style={{ position:"absolute", inset:0, opacity:.5 }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:1400, margin:"0 auto", padding:`clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem)`, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: compact ? "2.5rem" : "4rem", alignItems:"center" }}>

          {/* LEFT */}
          <div style={{ animation:"fadeUp .7s ease forwards" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,107,53,.1)", border:"1px solid rgba(255,107,53,.35)", color:G.orange, padding:"6px 14px", borderRadius:8, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(.7rem,.9vw,.78rem)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"1.2rem" }}>
              🇦🇪 Import Direct Dubaï — Voie Aérienne
            </div>
            <h1 className="bebas" style={{ fontSize:"clamp(3rem,9vw,6.5rem)", lineHeight:.93, letterSpacing:".03em", marginBottom:"1.2rem" }}>
              <span style={{ display:"block", color:G.white }}>PIÈCES</span>
              <span className="shimmer-text" style={{ display:"block" }}>CAMIONS</span>
              <span style={{ display:"block", WebkitTextStroke:"1.5px rgba(240,244,255,.18)", color:"transparent" }}>PREMIUM</span>
            </h1>
            <p style={{ fontSize:"clamp(.88rem,1.5vw,1.05rem)", color:"rgba(240,244,255,.5)", lineHeight:1.75, maxWidth:500, marginBottom:"2rem" }}>
              Pièces détachées pour camions lourds importées directement depuis{" "}
              <strong style={{ color:G.orange }}>Dubaï</strong> par voie aérienne.{" "}
              Qualité OEM garantie, livraison en{" "}
              <strong style={{ color:G.cyan }}>48 heures</strong>.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".8rem", marginBottom:"2rem" }}>
              <a href="#catalogue" className="btn-main"
                style={{ display:"inline-flex", alignItems:"center", gap:9, background:"linear-gradient(135deg,#FF6B35,#FF3D57)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(.88rem,1.5vw,1rem)", letterSpacing:".06em", textTransform:"uppercase", padding:"13px 24px", borderRadius:10, textDecoration:"none", boxShadow:"0 4px 20px rgba(255,107,53,.4)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Catalogue
              </a>
              <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:9, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(.88rem,1.5vw,1rem)", letterSpacing:".06em", textTransform:"uppercase", padding:"13px 24px", borderRadius:10, textDecoration:"none", boxShadow:"0 4px 16px rgba(37,211,102,.35)" }}>
                <WaIcon size={17} />Commander WA
              </a>
            </div>

            {/* STATS */}
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile ? 2 : 4},1fr)`, gap:".6rem" }}>
              {STATS.slice(0,4).map(s => (
                <div key={s.num} style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${G.border}`, borderRadius:11, padding:"10px 8px", textAlign:"center" }}>
                  <div className="bebas" style={{ fontSize:"clamp(1.4rem,3vw,1.85rem)", background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>{s.num}</div>
                  <div className="raj" style={{ fontSize:"clamp(.58rem,.7vw,.65rem)", color:G.chrome, letterSpacing:".06em", textTransform:"uppercase", marginTop:3, fontWeight:600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — tablet+ only */}
          {!isMobile && (
            <div className={compact ? "" : "hero-float"} style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
              <div style={{ borderRadius:18, overflow:"hidden", border:"1px solid rgba(255,107,53,.2)", boxShadow:"0 30px 80px rgba(0,0,0,.65),0 0 50px rgba(255,107,53,.08)", position:"relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&h=400&fit=crop"
                  alt="Camion"
                  style={{ width:"100%", height: isTablet ? 260 : 340, objectFit:"cover", display:"block" }}
                  onError={e => { e.currentTarget.src = "https://placehold.co/700x340/121620/FF6B35?text=Import+Dubai"; }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,107,53,.2),transparent 60%)" }} />
                <div style={{ position:"absolute", bottom:16, left:16, background:"rgba(7,8,13,.92)", border:"1px solid rgba(255,107,53,.3)", backdropFilter:"blur(12px)", borderRadius:11, padding:"10px 16px", display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ fontSize:"1.4rem" }}>🇦🇪</div>
                  <div>
                    <div className="raj" style={{ fontWeight:700, fontSize:".88rem" }}>Import Dubaï</div>
                    <div style={{ fontSize:".66rem", color:G.chrome }}>Voie aérienne · Certifié OEM</div>
                  </div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".65rem" }}>
                {[["🚛","Livraison","48H"],["✈️","Import","Dubaï 🇦🇪"],["💯","Certifié","OEM"]].map(([icon,label,val]) => (
                  <div key={label} style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:13, padding:".85rem .75rem", textAlign:"center", transition:"all .3s" }}>
                    <div style={{ fontSize:"1.3rem", marginBottom:3 }}>{icon}</div>
                    <div className="raj" style={{ fontSize:".62rem", color:G.chrome, textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>{label}</div>
                    <div className="raj" style={{ fontWeight:700, fontSize:".9rem", color:G.orange, marginTop:2 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===================== STATS BAND ===================== */
function StatsBand() {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ background:"linear-gradient(90deg,rgba(255,107,53,.05),rgba(255,61,87,.05))", borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, padding:"2rem clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:`repeat(${isMobile ? 3 : 6},1fr)`, gap:"1rem" }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ textAlign:"center", animation:`countUp .6s ease ${i*.08}s both` }}>
            <div className="bebas" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", lineHeight:1, background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{s.num}</div>
            <div className="raj" style={{ fontSize:"clamp(.58rem,.7vw,.7rem)", color:G.chrome, letterSpacing:".08em", textTransform:"uppercase", marginTop:3, fontWeight:600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== WHY US ===================== */
function WhyUsSection() {
  const cards = [
    { icon:"✈️", title:"Import Voie Aérienne",    desc:"Pièces importées directement depuis Dubaï par avion cargo. Arrivée rapide sans délais maritimes.", accent:"#FF6B35" },
    { icon:"🚛", title:"Livraison 48H Garantie",  desc:"Après confirmation et paiement, votre colis en 48 heures maximum. Engagement tenu ou remboursé.",   accent:"#00C2FF" },
    { icon:"🔩", title:"Pièces Certifiées OEM",   desc:"Normes d'origine constructeur garanties. Compatibilité VOLVO, SCANIA, MAN et plus.",                 accent:"#A855F7" },
    { icon:"💰", title:"Prix Compétitifs",         desc:"Grâce à l'importation directe, tarifs bien en dessous du marché local.",                             accent:"#22C55E" },
    { icon:"📞", title:"Support WhatsApp 7j/7",   desc:"Notre équipe répond de 7h à 20h tous les jours. Devis, disponibilité, suivi — tout via WhatsApp.",    accent:"#25D366" },
    { icon:"🛡️", title:"Garantie & Retours",      desc:"Chaque pièce est couverte par une garantie. Retour et remplacement pris en charge.",                  accent:"#F59E0B" },
  ];
  return (
    <section id="whyus" style={{ background:G.dark2, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel text="Nos Atouts" />
          <SectionTitle>Pourquoi Choisir <span style={{ color:G.orange }}>TruckParts</span></SectionTitle>
          <p style={{ color:G.chrome, fontSize:"clamp(.85rem,1.2vw,1rem)", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>Votre partenaire de confiance pour pièces détachées camions au Cameroun.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(260px,100%),1fr))", gap:"1.2rem" }}>
          {cards.map((c, i) => {
            const rgb = hexToRgb(c.accent);
            return (
              <div key={i} className="why-hover" style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:16, padding:"1.7rem", position:"relative", overflow:"hidden", animation:`fadeUp .6s ease ${i*.07}s both` }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${c.accent},transparent)` }} />
                <div style={{ width:50, height:50, borderRadius:13, background:`rgba(${rgb},.1)`, border:`1px solid rgba(${rgb},.22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", marginBottom:"1rem" }}>{c.icon}</div>
                <div className="raj" style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:7 }}>{c.title}</div>
                <div style={{ fontSize:".85rem", color:"rgba(240,244,255,.45)", lineHeight:1.65 }}>{c.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== BRANDS ===================== */
function BrandsSection() {
  const all = [...BRANDS, ...BRANDS];
  return (
    <section style={{ background:G.dark, padding:"clamp(3rem,6vw,5rem) 0", borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}` }}>
      <div style={{ textAlign:"center", marginBottom:"2.5rem", padding:"0 clamp(1rem,3vw,2rem)" }}>
        <SectionLabel text="Compatibilité" />
        <SectionTitle>Marques <span style={{ color:G.orange }}>Compatibles</span></SectionTitle>
      </div>
      <div style={{ overflow:"hidden" }}>
        <div style={{ display:"flex", gap:"1.2rem", animation:"brands 22s linear infinite", width:"max-content", padding:".5rem 0" }}>
          {all.map((b, i) => (
            <div key={i} className="brand-chip" style={{ display:"flex", alignItems:"center", gap:9, background:G.card, border:`1px solid ${G.border}`, borderRadius:50, padding:"11px 20px", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".88rem", letterSpacing:".06em", color:"rgba(240,244,255,.65)", whiteSpace:"nowrap", flexShrink:0 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"linear-gradient(135deg,#FF6B35,#FF3D57)", flexShrink:0 }} />{b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CATALOGUE ===================== */
function CatalogueSection({ onAddToCart, cart }) {
  const [filter, setFilter] = useState("all");
  const { isMobile } = useBreakpoint();
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  const BADGE_STYLES = {
    hot:     { bg:"linear-gradient(135deg,#FF3D57,#8B0000)", color:"white"   },
    new:     { bg:"linear-gradient(135deg,#00C2FF,#0055CC)", color:"white"   },
    promo:   { bg:"linear-gradient(135deg,#FF6B35,#FF3D57)", color:"white"   },
    premium: { bg:"linear-gradient(135deg,#FFD700,#D4891A)", color:"#07080D" },
  };

  return (
    <section id="catalogue" style={{ background:G.dark2, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <SectionLabel text="Notre Stock" />
          <SectionTitle>Catalogue <span style={{ color:G.orange }}>Pièces</span></SectionTitle>
          <p style={{ color:G.chrome, fontSize:"clamp(.85rem,1.2vw,1rem)", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>Plus de 500 références — importées, certifiées, livrées en 48H.</p>
        </div>

        {/* Filter chips */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom: isMobile ? ".5rem" : 0, justifyContent: isMobile ? "flex-start" : "center", marginBottom:"2.5rem", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", msOverflowStyle:"none" }}>
          {CAT_FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".83rem", letterSpacing:".06em", textTransform:"uppercase", padding:"8px 16px", borderRadius:50, cursor:"pointer", border:"none", background: filter===f.id ? "linear-gradient(135deg,#FF6B35,#FF3D57)" : G.card2, color: filter===f.id ? "white" : "rgba(240,244,255,.55)", boxShadow: filter===f.id ? "0 4px 14px rgba(255,107,53,.3)" : "none", transition:"all .2s", whiteSpace:"nowrap", flexShrink:0 }}>
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))", gap:"1.2rem" }}>
          {filtered.map((p, i) => {
            const inCart = cart.find(c => c.id === p.id);
            const badge  = p.badge ? BADGE_STYLES[p.badge] : null;
            return (
              <div key={p.id} className="card-hover" style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:18, overflow:"hidden", animation:`fadeUp .5s ease ${i*.04}s both` }}>
                <div className="img-zoom" style={{ position:"relative", height:210, overflow:"hidden", background:G.dark3 }}>
                  <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    onError={e => { e.currentTarget.src = `https://placehold.co/500x210/121620/FF6B35?text=${encodeURIComponent(p.name)}`; }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(7,8,13,.75),transparent 55%)" }} />
                  {badge && <div style={{ position:"absolute", top:12, left:12, zIndex:2, background:badge.bg, color:badge.color, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".65rem", letterSpacing:".08em", textTransform:"uppercase", padding:"4px 11px", borderRadius:6 }}>{p.badgeTxt}</div>}
                  <div style={{ position:"absolute", top:12, right:12, background:"rgba(0,230,118,.12)", border:"1px solid rgba(0,230,118,.3)", color:"#00E676", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:6 }}>✓ Stock</div>
                </div>
                <div style={{ padding:"1.1rem" }}>
                  <div className="raj" style={{ color:G.orange, fontSize:".64rem", letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, marginBottom:5 }}>{CAT_LABELS[p.cat]}</div>
                  <div className="raj" style={{ fontWeight:700, fontSize:"1.08rem", lineHeight:1.25, marginBottom:4 }}>{p.name}</div>
                  <div style={{ fontSize:".72rem", color:G.chrome, marginBottom:9 }}>Réf: {p.ref} · {p.desc}</div>
                  <Stars count={p.stars} />
                  <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", margin:"10px 0" }}>
                    <GradientPrice price={p.price} />
                    <div className="raj" style={{ fontSize:".72rem", color:G.chrome, fontWeight:600 }}>FCFA</div>
                  </div>
                  <button onClick={() => onAddToCart(p)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:7, background: inCart ? "rgba(0,230,118,.1)" : "rgba(255,107,53,.1)", border: inCart ? "1px solid rgba(0,230,118,.3)" : "1px solid rgba(255,107,53,.25)", color: inCart ? "#00E676" : G.orange, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".85rem", letterSpacing:".05em", textTransform:"uppercase", padding:"11px 8px", borderRadius:10, cursor:"pointer", transition:"all .25s" }}>
                    {inCart
                      ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Dans le panier ({inCart.qty})</>
                      : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>Ajouter au panier</>
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== PROMO ===================== */
function PromoSection() {
  const [t, setT] = useState({ h:23, m:59, s:45 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev;
        s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;m=59;s=59;}
        return {h,m,s};
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2,"0");
  return (
    <section id="promo" style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#110300,#200800,#110300)", padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 100% at 50% 50%,rgba(255,107,53,.12),transparent 70%)" }} />
      <div className="grid-bg" style={{ position:"absolute", inset:0, opacity:.6 }} />
      <div style={{ position:"relative", zIndex:2, maxWidth:860, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"rgba(255,171,64,.1)", border:"1px solid rgba(255,171,64,.35)", color:G.amber, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".75rem", letterSpacing:".18em", textTransform:"uppercase", padding:"6px 16px", borderRadius:8, marginBottom:"1.2rem" }}>
          ⚡ Offre Spéciale du Moment
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(2.6rem,7vw,6rem)", lineHeight:.95, letterSpacing:".04em", marginBottom:"1.2rem" }}>
          <span style={{ color:G.white }}>−15% Sur Toutes<br/>Les </span>
          <span style={{ background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Pièces Moteur</span>
        </h2>
        <p style={{ color:"rgba(240,244,255,.5)", fontSize:"clamp(.88rem,1.5vw,1.05rem)", lineHeight:1.7, marginBottom:"2rem" }}>
          Mentionnez le code{" "}
          <strong style={{ color:G.amber, fontFamily:"'Rajdhani',sans-serif", fontSize:"1.1em" }}>MOTEUR15</strong>{" "}
          lors de votre commande.
        </p>
        <div style={{ display:"flex", justifyContent:"center", gap:"1rem", marginBottom:"2.5rem", flexWrap:"wrap" }}>
          {[[pad(t.h),"Heures"],[pad(t.m),"Minutes"],[pad(t.s),"Secondes"]].map(([num,label]) => (
            <div key={label} style={{ background:"rgba(0,0,0,.45)", border:"1px solid rgba(255,107,53,.3)", borderRadius:14, padding:"14px 20px", minWidth:80, animation:"borderPulse 2s ease-in-out infinite" }}>
              <div className="bebas" style={{ fontSize:"clamp(2rem,5vw,2.8rem)", color:G.orange, lineHeight:1 }}>{num}</div>
              <div className="raj" style={{ fontSize:".66rem", color:G.chrome, letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
        <a href={`https://wa.me/237654133947?text=${encodeURIComponent("Bonjour, je veux profiter de l'offre MOTEUR15")}`} target="_blank" rel="noreferrer" className="btn-main"
          style={{ display:"inline-flex", alignItems:"center", gap:11, background:"linear-gradient(135deg,#FF6B35,#FF3D57)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(.95rem,1.5vw,1.1rem)", letterSpacing:".06em", textTransform:"uppercase", padding:"15px 32px", borderRadius:12, textDecoration:"none", boxShadow:"0 6px 30px rgba(255,107,53,.45)" }}>
          <WaIcon size={19} />Profiter de l'Offre
        </a>
      </div>
    </section>
  );
}

/* ===================== PROCESS ===================== */
function ProcessSection() {
  const { isMobile } = useBreakpoint();
  const steps = [
    { icon:"🛒", title:"Choisissez vos pièces",  desc:"Parcourez le catalogue, ajoutez vos pièces. Filtrez par catégorie." },
    { icon:"📋", title:"Récapitulatif panier",    desc:"Consultez votre panier, ajustez les quantités, vérifiez le total." },
    { icon:"💬", title:"Commande WhatsApp",       desc:'Cliquez "Passer la commande" — un message pré-rempli est généré automatiquement.' },
    { icon:"🚚", title:"Livraison en 48H",        desc:"Après confirmation et paiement, livraison garantie en 48 heures." },
  ];
  return (
    <section id="process" style={{ background:G.dark, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <SectionLabel text="Simple & Rapide" />
          <SectionTitle>Comment <span style={{ color:G.orange }}>Commander</span></SectionTitle>
          <p style={{ color:G.chrome, fontSize:"clamp(.85rem,1.2vw,1rem)", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>En 4 étapes simples, recevez vos pièces en moins de 48 heures.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile ? 2 : 4},1fr)`, gap:"1.5rem 1rem" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign:"center", animation:`fadeUp .6s ease ${i*.1}s both` }}>
              <div className="step-i" style={{ width: isMobile ? 70 : 82, height: isMobile ? 70 : 82, borderRadius:"50%", background:G.card2, border:"2px solid rgba(255,107,53,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? "1.8rem" : "2rem", margin:"0 auto 1.2rem", position:"relative", cursor:"default" }}>
                {s.icon}
                <div className="bebas" style={{ position:"absolute", top:-7, right:-7, width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#FF6B35,#FF3D57)", fontSize:".8rem", display:"flex", alignItems:"center", justifyContent:"center", color:"white" }}>{i+1}</div>
              </div>
              <div className="raj" style={{ fontWeight:700, fontSize:"clamp(.95rem,1.5vw,1.05rem)", marginBottom:8 }}>{s.title}</div>
              <div style={{ fontSize:"clamp(.78rem,1.1vw,.85rem)", color:"rgba(240,244,255,.45)", lineHeight:1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsSection() {
  return (
    <section id="temoignages" style={{ background:G.dark2, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel text="Ils Nous Font Confiance" />
          <SectionTitle>Avis de Nos <span style={{ color:G.orange }}>Clients</span></SectionTitle>
          <p style={{ color:G.chrome, fontSize:"clamp(.85rem,1.2vw,1rem)", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>Des transporteurs et mécaniciens satisfaits à travers tout le Cameroun.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(280px,100%),1fr))", gap:"1.2rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="t-hover" style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:18, padding:"1.7rem", position:"relative", overflow:"hidden", animation:`fadeUp .6s ease ${i*.07}s both` }}>
              <div className="bebas" style={{ position:"absolute", right:16, top:8, fontSize:"6rem", color:"rgba(255,107,53,.05)", lineHeight:1, pointerEvents:"none" }}>"</div>
              <Stars count={t.stars} size=".85rem" />
              <p style={{ fontSize:".88rem", color:"rgba(240,244,255,.6)", lineHeight:1.7, margin:".9rem 0 1.3rem", fontStyle:"italic" }}>"{t.text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${t.color},${t.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:"white", flexShrink:0 }}>{t.init}</div>
                <div>
                  <div className="raj" style={{ fontWeight:700, fontSize:".9rem" }}>{t.name}</div>
                  <div style={{ fontSize:".68rem", color:G.chrome }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
function FaqSection() {
  const [open, setOpen] = useState(null);
  const { isMobile }    = useBreakpoint();
  return (
    <section id="faq" style={{ background:G.dark, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel text="Questions Fréquentes" />
          <SectionTitle>FAQ — <span style={{ color:G.orange }}>Vos Questions</span></SectionTitle>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(440px,1fr))", gap:".8rem" }}>
          {FAQS.map((f, i) => (
            <div key={i} onClick={() => setOpen(open===i ? null : i)}
              style={{ background:G.card, border:`1px solid ${open===i ? "rgba(255,107,53,.3)" : G.border}`, borderRadius:13, overflow:"hidden", cursor:"pointer", transition:"border-color .3s" }}>
              <div style={{ padding:"1.1rem 1.3rem", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>
                <span className="raj faq-q" style={{ fontWeight:700, fontSize:"clamp(.88rem,1.2vw,.95rem)", color: open===i ? G.orange : G.white, flex:1 }}>{f.q}</span>
                <div style={{ width:26, height:26, borderRadius:8, background:"rgba(255,107,53,.1)", border:"1px solid rgba(255,107,53,.2)", display:"flex", alignItems:"center", justifyContent:"center", color:G.orange, fontSize:"1.1rem", flexShrink:0, transition:"transform .3s", transform: open===i ? "rotate(45deg)" : "rotate(0)" }}>+</div>
              </div>
              <div style={{ maxHeight: open===i ? 220 : 0, overflow:"hidden", transition:"max-height .4s ease,padding .3s", padding: open===i ? "0 1.3rem 1.1rem" : "0 1.3rem", fontSize:".84rem", color:"rgba(240,244,255,.5)", lineHeight:1.7 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CONTACT ===================== */
function ContactSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const contacts = [
    { icon:"📱", accent:"#25D366", label:"WhatsApp & Orange",  val:"654 133 947" },
    { icon:"📍", accent:G.orange,  label:"Zone de couverture", val:"Tout le Cameroun" },
    { icon:"⏰", accent:G.cyan,    label:"Horaires",            val:"Lun–Dim · 7h00 – 20h00" },
    { icon:"✈️", accent:G.amber,   label:"Import depuis",       val:"Dubaï 🇦🇪" },
  ];
  return (
    <section id="contact" style={{ background:G.dark2, padding:"clamp(4rem,8vw,7rem) clamp(1rem,3vw,2rem)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 80% at 100% 100%,rgba(255,107,53,.06),transparent 60%)" }} />
      <div style={{ maxWidth:1400, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel text="Commandez Maintenant" />
          <SectionTitle>Commander en <span style={{ color:"#25D366" }}>2 Clics</span></SectionTitle>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr", gap:"clamp(2rem,4vw,4rem)", alignItems:"start" }}>
          <div>
            <h3 className="bebas" style={{ fontSize:"clamp(2rem,4vw,2.6rem)", letterSpacing:".03em", marginBottom:".8rem" }}>Nos <span style={{ color:G.orange }}>Coordonnées</span></h3>
            <p style={{ color:"rgba(240,244,255,.45)", fontSize:".9rem", lineHeight:1.7, marginBottom:"1.5rem" }}>Disponibles 7j/7 de 7h à 20h pour répondre à vos questions, devis et commandes.</p>
            {contacts.map((c, i) => {
              const rgb = hexToRgb(c.accent);
              return (
                <div key={i} className="contact-row" style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:13, padding:"1.1rem", display:"flex", alignItems:"center", gap:"1rem", marginBottom:".65rem" }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:`rgba(${rgb},.1)`, border:`1px solid rgba(${rgb},.22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div className="raj" style={{ fontSize:".66rem", color:G.chrome, letterSpacing:".1em", textTransform:"uppercase", fontWeight:600 }}>{c.label}</div>
                    <div className="raj" style={{ fontWeight:700, fontSize:"1rem", marginTop:1 }}>{c.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:"linear-gradient(135deg,rgba(37,211,102,.07),rgba(18,140,126,.04))", border:"1px solid rgba(37,211,102,.18)", borderRadius:20, padding:"clamp(1.5rem,3vw,2.5rem)" }}>
            <div style={{ fontSize:"2rem", marginBottom:".8rem" }}>💬</div>
            <div className="raj" style={{ fontWeight:700, fontSize:"1.15rem", marginBottom:7 }}>Passer une Commande WhatsApp</div>
            <div style={{ fontSize:".85rem", color:"rgba(240,244,255,.45)", lineHeight:1.65, marginBottom:"1.8rem" }}>Ajoutez vos pièces au panier et cliquez ci-dessous. Votre commande sera envoyée directement sur WhatsApp.</div>
            <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer" className="btn-wa-lg"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:11, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"1rem", letterSpacing:".06em", textTransform:"uppercase", padding:15, borderRadius:13, textDecoration:"none", marginBottom:"1.3rem", boxShadow:"0 6px 25px rgba(37,211,102,.3)" }}>
              <WaIcon size={20} />WhatsApp : 654 133 947
            </a>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {[["🚛","48H Livraison"],["✅","Certifié OEM"],["💰","Meilleur prix"],["🔄","Garantie retour"]].map(([ic,tx]) => (
                <div key={tx} style={{ background:"rgba(0,0,0,.25)", border:`1px solid ${G.border}`, borderRadius:10, padding:11, textAlign:"center" }}>
                  <div style={{ fontSize:"1.3rem", marginBottom:3 }}>{ic}</div>
                  <div className="raj" style={{ fontSize:".65rem", color:G.chrome, letterSpacing:".06em", textTransform:"uppercase", fontWeight:600 }}>{tx}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  const { isMobile } = useBreakpoint();
  const cols = [
    { title:"Navigation", links:[["#hero","Accueil"],["#catalogue","Catalogue"],["#whyus","Avantages"],["#process","Commander"],["#temoignages","Avis"],["#faq","FAQ"]] },
    { title:"Catégories",  links:[["#catalogue","🔩 Moteur"],["#catalogue","🛑 Freinage"],["#catalogue","⚙️ Transmission"],["#catalogue","🔧 Suspension"],["#catalogue","⚡ Électrique"],["#catalogue","🔨 Carrosserie"]] },
    { title:"Contact",     links:[["https://wa.me/237654133947","📱 WhatsApp"],["#","📍 Yaoundé, CMR"],["#","⏰ 7h–20h (7j/7)"],["#","✈️ Import Dubaï"],["#","🛡️ Garantie pièces"]] },
  ];
  return (
    <footer style={{ background:"#050608", borderTop:`1px solid ${G.border}` }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:`3rem clamp(1rem,3vw,2rem) 1.5rem` }}>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap:"2rem", marginBottom:"2.5rem" }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:".8rem" }}>
              <div style={{ width:33, height:33, borderRadius:8, background:"linear-gradient(135deg,#FF6B35,#FF3D57)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div className="bebas" style={{ fontSize:"1.4rem", lineHeight:1 }}>TRUCK<span style={{ color:G.orange }}>PARTS</span></div>
            </div>
            <p style={{ fontSize:".82rem", color:"rgba(240,244,255,.3)", lineHeight:1.7, maxWidth: isMobile ? "100%" : 260, marginBottom:"1.2rem" }}>Spécialiste en pièces détachées pour camions lourds, importées directement depuis Dubaï.</p>
            <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:36, height:36, background:"#25D366", borderRadius:9, color:"white", textDecoration:"none" }}>
              <WaIcon size={17} />
            </a>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div className="raj" style={{ color:G.orange, fontSize:".76rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:"1rem" }}>{col.title}</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:7 }}>
                {col.links.map(([href,label]) => (
                  <li key={label}>
                    <a href={href} style={{ fontSize:".83rem", color:"rgba(240,244,255,.35)", textDecoration:"none", transition:"color .2s" }}
                      onMouseOver={e => e.currentTarget.style.color = G.orange}
                      onMouseOut={e => e.currentTarget.style.color = "rgba(240,244,255,.35)"}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${G.border}`, paddingTop:"1.2rem", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:".5rem" }}>
          <div style={{ fontSize:".76rem", color:"rgba(240,244,255,.2)" }}>© 2025 <span style={{ color:G.orange }}>TruckParts Dubai</span> · Cameroun</div>
          <div style={{ fontSize:".76rem", color:"rgba(240,244,255,.2)" }}>Import Dubaï 🇦🇪 · 48H 🚛</div>
        </div>
      </div>
    </footer>
  );
}

/* ===================== CART PANEL ===================== */
function CartPanel({ cart, onClose, onChangeQty, onRemove, onOrder }) {
  const { isMobile } = useBreakpoint();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", zIndex:2000, backdropFilter:"blur(5px)" }} />
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width: isMobile ? "100vw" : 420, maxWidth:"100vw", background:G.card, borderLeft:"1px solid rgba(255,107,53,.18)", zIndex:2001, display:"flex", flexDirection:"column", animation:"cartSlide .4s ease" }}>
        <div style={{ padding:"1.3rem", borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div className="bebas" style={{ fontSize:"1.4rem", letterSpacing:".04em" }}>🛒 Mon Panier</div>
            <div className="raj" style={{ fontSize:".72rem", color:G.chrome, marginTop:1, fontWeight:600 }}>{count} article(s)</div>
          </div>
          <button onClick={onClose} style={{ width:36, height:36, borderRadius:8, background:"rgba(255,255,255,.04)", border:`1px solid ${G.border}`, color:G.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".95rem", transition:"all .2s" }}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"1rem 1.3rem", WebkitOverflowScrolling:"touch" }}>
          {cart.length === 0 ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:10, color:"rgba(240,244,255,.2)", textAlign:"center" }}>
              <div style={{ fontSize:"3rem" }}>🛒</div>
              <div className="raj" style={{ fontWeight:700, fontSize:".95rem" }}>Votre panier est vide</div>
              <div style={{ fontSize:".78rem" }}>Ajoutez des pièces depuis le catalogue</div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:`1px solid ${G.border}` }}>
                <img src={item.img} alt={item.name}
                  style={{ width:64, height:64, borderRadius:9, objectFit:"cover", border:`1px solid ${G.border}`, flexShrink:0, background:G.dark3 }}
                  onError={e => { e.currentTarget.src = "https://placehold.co/64x64/121620/FF6B35?text=P"; }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="raj" style={{ fontWeight:700, fontSize:".95rem", lineHeight:1.2 }}>{item.name}</div>
                  <div style={{ fontSize:".68rem", color:G.chrome, marginTop:2 }}>{item.ref}</div>
                  <div className="bebas" style={{ fontSize:"1.1rem", background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginTop:3, lineHeight:1 }}>
                    {(item.price * item.qty).toLocaleString("fr-FR")} FCFA
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:7 }}>
                    {[[-1,"−"],[1,"+"]].map(([d,l]) => (
                      <button key={l} onClick={() => onChangeQty(item.id, d)}
                        style={{ width:28, height:28, borderRadius:7, background:"rgba(255,255,255,.05)", border:`1px solid ${G.border}`, color:G.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", transition:"all .2s" }}>{l}</button>
                    ))}
                    <span className="raj" style={{ fontWeight:700, fontSize:".9rem", minWidth:18, textAlign:"center" }}>{item.qty}</span>
                    <span style={{ fontSize:".66rem", color:G.chrome, marginLeft:3 }}>× {item.price.toLocaleString("fr-FR")}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)}
                  style={{ background:"none", border:"none", color:"rgba(240,244,255,.2)", cursor:"pointer", padding:4, fontSize:".82rem", transition:"color .2s", alignSelf:"flex-start", marginTop:2 }}
                  onMouseOver={e => e.currentTarget.style.color = G.red}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(240,244,255,.2)"}>✕</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div style={{ padding:"1.3rem", borderTop:`1px solid ${G.border}`, background:"rgba(0,0,0,.3)", flexShrink:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:5 }}>
              <div className="raj" style={{ fontWeight:700, fontSize:".82rem", color:G.chrome, letterSpacing:".1em", textTransform:"uppercase" }}>Total</div>
              <div className="bebas" style={{ fontSize:"1.85rem", background:"linear-gradient(135deg,#FF6B35,#FFAB40)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>
                {total.toLocaleString("fr-FR")} FCFA
              </div>
            </div>
            <div style={{ fontSize:".72rem", color:G.chrome, textAlign:"center", marginBottom:".9rem" }}>🚛 Livraison <strong style={{ color:G.orange }}>gratuite</strong> · Délai <strong style={{ color:G.orange }}>48H</strong></div>
            <button onClick={onOrder} className="btn-wa-lg"
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:11, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"white", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"1rem", letterSpacing:".06em", textTransform:"uppercase", padding:13, borderRadius:13, border:"none", cursor:"pointer", boxShadow:"0 6px 25px rgba(37,211,102,.25)" }}>
              <WaIcon size={19} />Passer la commande WA
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ===================== TOAST ===================== */
function Toast({ msg, visible }) {
  if (!visible) return null;
  return (
    <div style={{ position:"fixed", bottom:"5rem", left:"50%", transform:"translateX(-50%)", background:G.card2, border:"1px solid rgba(255,107,53,.35)", borderRadius:11, padding:"12px 20px", zIndex:3000, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:".9rem", display:"flex", alignItems:"center", gap:9, boxShadow:"0 15px 50px rgba(0,0,0,.65)", whiteSpace:"nowrap", animation:"toastPop .35s ease", maxWidth:"90vw" }}>
      {msg}
    </div>
  );
}

/* ===================== WA FLOAT ===================== */
function WaFloat() {
  return (
    <a href="https://wa.me/237654133947" target="_blank" rel="noreferrer" className="wa-pulse"
      style={{ position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:900, width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#25D366,#128C7E)", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", boxShadow:"0 6px 25px rgba(37,211,102,.5)", transition:"transform .3s" }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={e => e.currentTarget.style.transform = ""}>
      <WaIcon size={27} />
    </a>
  );
}

/* ===================== APP ===================== */
export default function App() {
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast]       = useState({ msg:"", visible:false });
  const toastTimer              = useRef(null);

  useGlobalStyles();

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible:true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible:false })), 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ ${product.name} ajouté !`);
  }, [showToast]);

  const changeQty = useCallback((id, delta) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty + delta <= 0) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i);
    });
  }, []);

  const removeItem = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);
  const cartCount  = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight:"100vh", background:G.dark, color:G.white }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Ticker />
      <HeroSection />
      <StatsBand />
      <WhyUsSection />
      <BrandsSection />
      <CatalogueSection onAddToCart={addToCart} cart={cart} />
      <PromoSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <WaFloat />
      <Toast msg={toast.msg} visible={toast.visible} />
      {cartOpen && (
        <CartPanel
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeItem}
          onOrder={() => sendWhatsAppOrder(cart)}
        />
      )}
    </div>
  );
}

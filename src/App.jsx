import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Droplet, Wind, Shield, Leaf, Eye, FlaskConical } from 'lucide-react';
import { blink, trackEvent } from './lib/blink';

// --- COMPOSANTS ---

const SectionTitle = ({ children, className = "", light = false }) => (
  <div className={`flex items-center justify-center md:justify-start gap-4 mb-8 ${className}`}>
    <div className={`w-12 h-[1px] ${light ? 'bg-white/30' : 'bg-foreground/20'}`}></div>
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap font-sans ${light ? 'text-white/40' : 'text-foreground/40'}`}>
      {children}
    </span>
    <div className={`md:hidden w-12 h-[1px] ${light ? 'bg-white/30' : 'bg-foreground/20'}`}></div>
  </div>
);

const WaitlistCTA = ({ onClick, className = "mt-20 md:mt-24" }) => (
  <div className={`flex justify-center ${className}`}>
    <button
      onClick={onClick}
      className="px-10 py-4 bg-white border border-gray-900/10 text-gray-900 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm transition-all duration-300 transform hover:scale-[1.05] hover:shadow-md active:scale-[0.98] font-sans"
    >
      Join the experience
    </button>
  </div>
);

const Navbar = ({ refs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (ref, label) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    trackEvent('nav_click', { section: label });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6 md:py-8'
      } ${mobileMenuOpen ? 'bg-white' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer z-50 flex items-center"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackEvent('logo_click');
          }}
        >
          <span className={`text-2xl md:text-4xl font-serif font-bold tracking-widest transition-all duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            NURA
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-300 font-sans ${isScrolled ? 'text-gray-900' : 'text-white/80'}`}>
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy')} className="hover:text-white transition-colors">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science')} className="hover:text-white transition-colors">Science</button>
          <button onClick={() => scrollTo(refs.story, 'story')} className="hover:text-white transition-colors">Story</button>
          
          {/* Join Waitlist Button - Desktop */}
          <button 
            onClick={() => {
              scrollTo(refs.cta, 'waitlist_cta_nav');
              trackEvent('cta_click', { cta_location: 'navbar', cta_label: 'join_waitlist' });
            }} 
            className={`px-8 py-2.5 border rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 font-sans ${
              isScrolled 
                ? 'border-gray-900/10 text-gray-900 hover:bg-gray-900 hover:text-white' 
                : 'border-white/20 text-white/90 hover:bg-white hover:text-black'
            }`}
          >
            Join waitlist
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${isScrolled || mobileMenuOpen ? 'text-black' : 'text-white'}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-gray-900">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-gray-900">Science</button>
          <button onClick={() => scrollTo(refs.story, 'story_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-gray-900">Story</button>
          <button 
            onClick={() => {
              scrollTo(refs.cta, 'waitlist_cta_mobile');
              trackEvent('cta_click', { cta_location: 'navbar', cta_label: 'join_waitlist' });
            }} 
            className="px-10 py-4 border border-gray-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mt-4"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onExplore }) => (
  <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
    {/* Background Video */}
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        src="/video_home.mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center text-white px-4 fade-up max-w-6xl mx-auto flex flex-col items-center">
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-6 font-sans text-white">
        HEALTH-LED ACTIVEWEAR
      </span>
      <h1 className="hero-headline mb-8 text-white max-w-[90vw] md:max-w-[1150px] mx-auto">
        What touches your skin shapes how you <span className="italic text-white">perform and recover.</span>
      </h1>
      <p className="premium-body text-white mb-12 max-w-[340px] md:max-w-2xl mx-auto text-center">
        Grounded in Nordic wellbeing.
      </p>
      <button 
        onClick={() => {
          onExplore();
          trackEvent('cta_click', { cta_location: 'hero', cta_label: 'discover' });
        }}
        className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] font-bold border border-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-500 rounded-full font-sans text-white"
      >
        Discover
      </button>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
      <ChevronDown size={24} strokeWidth={1} />
    </div>
  </header>
);

const PhilosophySection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} className="py-24 md:py-40 bg-background relative overflow-hidden">
    <div className="section-fade-top" />
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-20 flex flex-col items-center">
      {/* Section Header */}
      <div className="max-w-4xl mb-24 flex flex-col items-center md:items-start text-center md:text-left space-y-6 mx-auto md:mx-0 w-full">
        <SectionTitle>Our philosophy</SectionTitle>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-32 items-center mb-12 w-full">
        
        {/* Image Content - Position Left on Desktop (order-1) */}
        <div className="order-1 relative group w-full flex justify-center md:block">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] overflow-hidden w-full max-w-[380px] md:max-w-none mx-auto md:mx-0">
            <img 
              src="/femme.png"
              alt="Skin health activewear - Sweat on skin" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
          {/* Text Overlay Box - Bottom Right */}
          <div className="absolute -bottom-6 -right-2 md:-right-12 bg-[#d1d1d1] p-6 md:p-8 max-w-[200px] md:max-w-[220px] z-10 shadow-sm">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed text-black/80 text-left font-sans">
              WHAT TOUCHES<br />YOUR SKIN MATTERS.
            </p>
          </div>
        </div>

        {/* Text Content - Position Right on Desktop (order-2) */}
        <div className="order-2 flex flex-col items-center md:items-start text-center md:text-left space-y-10 w-full">
          <h2 className="section-headline">
            Pioneering<br />
            <span className="italic-grey">health-led activewear.</span>
          </h2>
          
          <div className="space-y-6 premium-body max-w-[380px] md:max-w-xl mx-auto md:mx-0">
            <p>
              Rooted in Nordic wellbeing, NURA connects nature and performance through a skin care–level approach to activewear.
            </p>
            <p>
              Guided by natural fibres, material science, and a deep respect for skin comfort.
            </p>
            <p>
              Each piece is developed to support the body across the full performance cycle from movement to recovery.
            </p>
          </div>
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} className="mt-12 md:mt-16" />
    </div>
    <div className="section-fade-bottom" />
  </section>
);

const ScienceSection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} id="science" className="py-24 md:py-40 bg-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-20 flex flex-col items-center">
      {/* Section Header */}
      <div className="max-w-4xl mb-24 flex flex-col items-center md:items-start text-center md:text-left space-y-6 mx-auto md:mx-0">
        <SectionTitle>The Science</SectionTitle>
        <h2 className="section-headline">
          Nature meets <span className="italic-grey">modern science.</span>
        </h2>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative mb-20 md:mb-32 w-full">
        {/* Vertical Dividers for Desktop */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-[1px] bg-foreground/5"></div>
        <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-[1px] bg-foreground/5"></div>

        {/* Pillar 1: Natural-Tech */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500 mx-auto md:mx-0">
            <Droplet size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="science-subheadline">
              NATURAL-TECH
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700 mx-auto md:mx-0"></div>
          </div>
          <p className="premium-body text-foreground/60 max-w-[340px] md:max-w-[280px] group-hover:text-foreground/80 transition-colors mx-auto md:mx-0">
            Natural-based materials, enhanced through modern science. Engineered for high performance and lasting comfort, from training to recovery.
          </p>
        </div>

        {/* Pillar 2: Ingredient Focus */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500 mx-auto md:mx-0">
            <FlaskConical size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="science-subheadline">
              INGREDIENT FOCUS
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700 mx-auto md:mx-0"></div>
          </div>
          <p className="premium-body text-foreground/60 max-w-[340px] md:max-w-[280px] group-hover:text-foreground/80 transition-colors mx-auto md:mx-0">
            Clarity around what each piece is made of, and why. Material compositions are developed to support skin comfort and wellbeing.
          </p>
        </div>

        {/* Pillar 3: Material Safety */}
        <div className="group flex flex-col items-center md:items-start text-center md:text-left space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500 mx-auto md:mx-0">
            <Shield size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="science-subheadline">
              MATERIAL SAFETY
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700 mx-auto md:mx-0"></div>
          </div>
          <p className="premium-body text-foreground/60 max-w-[340px] md:max-w-[280px] group-hover:text-foreground/80 transition-colors mx-auto md:mx-0">
            Guided by a material safety–first mindset and developed with experts. Materials are evaluated for skin comfort, performance, and durability.
          </p>
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} />
    </div>
    <div className="section-fade-bottom" />
  </section>
);

const StorySection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} className="relative py-24 md:py-40 bg-[#1a1a1a] text-white overflow-hidden">
    <div className="section-fade-top" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16 md:mb-24 w-full">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 w-full">
          <SectionTitle light>Our Story</SectionTitle>
          <h2 className="section-headline">
            Born in the Nordics. <br />
            <span className="italic-grey">Built for wellbeing.</span>
          </h2>
          <div className="w-20 h-[1px] bg-white/30 my-6 mx-auto md:mx-0"></div>
          <div className="space-y-6 max-w-[380px] md:max-w-none mx-auto md:mx-0">
            <p className="premium-body text-gray-300">
              NURA is rooted in my Nordic upbringing where movement was a ritual, and wellbeing a way of living in nature.
            </p>
            <p className="premium-body text-gray-300">
              A decade in the beauty industry showed me how transparency and ingredient standards transformed skincare, while activewear remained dominated by synthetics, with little focus on what touches the skin.
            </p>
            <p className="premium-body text-gray-300">
              NURA was created to change that: health-led activewear, designed with a skincare-level approach to materials, supporting skin wellbeing, performance, and recovery.
            </p>
          </div>
          <p className="text-white font-sans italic text-lg pt-4 text-center md:text-left">
            Jenni Toft, Founder
          </p>
        </div>

        {/* Visual Element */}
        <div className="h-[400px] md:h-[700px] w-full max-w-[380px] md:max-w-none overflow-hidden relative shadow-2xl mx-auto">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FluYznwj5FOOUdMuQoDW7iLIaT7G3%2FWhatsAppImage2026-01-26at40503PM__224ad26d.JPG?alt=media&token=a961a687-c5d4-4af3-ae69-31e5e592df57" 
            alt="Jenni Toft - Founder" 
            className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-1000" 
          />
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} />
    </div>
    <div className="section-fade-bottom" />
  </section>
);

const CTASection = ({ innerRef }) => {
  const [email, setEmail] = useState('');
  const [preorder, setPreorder] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      await blink.db.waitlist.create({
        email: email,
        preorderInterest: preorder ? 1 : 0
      });
      
      setStatus('success');
      setEmail('');
      trackEvent('email_submitted', { 
        source: 'waitlist_form', 
        has_preorder_interest: preorder 
      });
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('idle');
      alert('An error occurred. Please try again.');
    }
  };

  const handleCheckboxToggle = () => {
    const nextState = !preorder;
    setPreorder(nextState);
    if (nextState) {
      trackEvent('preorder_interest_checked');
    }
  };

  return (
    <section ref={innerRef} className="py-32 md:py-48 bg-milkyway-frost text-stillness overflow-hidden relative">
      <div className="section-fade-top" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* Title Group */}
        <div className="text-center flex flex-col items-center space-y-6 mb-16">
          <h2 className="hero-headline max-w-[600px] md:max-w-4xl mx-auto">
            The next era of wellness <br />
            starts with <span className="italic-grey">what you wear.</span>
          </h2>
          <p className="premium-body text-foreground/40 text-center">
            Be the first to experience NURA.
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="w-full max-w-xl p-12 bg-stillness/[0.02] border border-stillness/5 text-center animate-fade-in mx-auto">
            <p className="font-serif italic text-2xl">Welcome to NURA.</p>
            <p className="text-stillness/40 mt-2 font-normal">We will be in touch shortly.</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-10 flex flex-col items-center">
              {/* Input Group */}
              <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 border-b border-stillness/10 pb-4 focus-within:border-stillness/30 transition-colors w-full">
                <input 
                  type="email" 
                  required
                  placeholder="Email address" 
                  className="flex-1 bg-transparent py-2 px-0 focus:outline-none text-xl md:text-2xl font-sans font-normal placeholder:text-stillness/20 text-stillness text-center md:text-left w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  onClick={() => trackEvent('cta_click', { cta_location: 'footer', cta_label: 'join_experience' })}
                  className="px-10 py-3.5 bg-black text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap mb-1"
                >
                  {status === 'loading' ? 'Joining...' : 'Join the experience'}
                </button>
              </div>

              {/* Checkbox Group */}
              <div className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer w-full" onClick={handleCheckboxToggle}>
                <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all flex-shrink-0 ${preorder ? 'bg-black border-black' : 'border-stillness/10 group-hover:border-stillness/30'}`}>
                  {preorder && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                </div>
                <span className="text-[10px] md:text-xs text-stillness/30 font-normal tracking-widest group-hover:text-stillness/50 transition-colors uppercase text-left">
                  I would consider pre-ordering when available
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="section-fade-bottom" />
    </section>
  );
};

const ManifestoSection = () => {
  const lines = [
    { label: "POWERED BY", keyword: "NATURE" },
    { label: "DESIGNED FOR", keyword: "HEALTH" },
    { label: "BACKED BY", keyword: "SCIENCE" }
  ];

  return (
    <section className="py-32 bg-background overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row md:items-baseline justify-center gap-12 md:gap-24 w-full px-6">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center text-center space-y-3"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/20 whitespace-nowrap font-sans">
              {line.label}
            </span>
            <span className="text-xl md:text-2xl font-serif tracking-tight text-foreground/30">
              {line.keyword}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white pt-24 pb-12 px-4 md:px-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 w-full">
        {/* Brand Column */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <div 
            className="text-2xl md:text-4xl font-serif font-bold tracking-widest text-gray-900 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              trackEvent('logo_click');
            }}
          >
            NURA
          </div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-foreground/40 leading-loose font-sans">
            NATURAL-TECH<br />ACTIVEWEAR
          </p>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 font-sans">
            Contact
          </p>
          <a 
            href="mailto:jenni@nurasport.com" 
            className="text-sm md:text-base font-normal text-foreground/80 hover:text-foreground transition-colors block font-sans"
            onClick={() => trackEvent('footer_contact_click')}
          >
            jenni@nurasport.com
          </a>
        </div>

        {/* Origin Column */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 font-sans">
            Origin
          </p>
          <p className="text-sm md:text-base font-normal text-foreground/80 font-sans">
            Designed in Denmark
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
        <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 text-center md:text-left font-sans">
          © {new Date().getFullYear()} NURA. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex gap-8 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 justify-center md:justify-end font-sans">
          <a href="#" className="hover:text-foreground transition-colors" onClick={() => trackEvent('footer_privacy_click')}>Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors" onClick={() => trackEvent('footer_terms_click')}>Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const philosophyRef = useRef(null);
  const scienceRef = useRef(null);
  const storyRef = useRef(null);
  const ctaRef = useRef(null);

  const refs = {
    philosophy: philosophyRef,
    science: scienceRef,
    story: storyRef,
    cta: ctaRef
  };

  useEffect(() => {
    // Initial pageview tracking
    trackEvent('page_view', { page_title: 'NURA Landing Page' });
  }, []);

  const scrollToCTA = (location = 'mid_page') => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
    trackEvent('cta_click', { cta_location: location, cta_label: 'join_experience' });
  };

  return (
    <div className="min-h-screen">
      <Navbar refs={refs} />
      <Hero onExplore={() => philosophyRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <PhilosophySection innerRef={philosophyRef} onJoin={() => scrollToCTA('philosophy')} />
      <ScienceSection innerRef={scienceRef} onJoin={() => scrollToCTA('science')} />
      <StorySection innerRef={storyRef} onJoin={() => scrollToCTA('story')} />
      <CTASection innerRef={ctaRef} />
      <Footer />
      <ManifestoSection />
    </div>
  );
}
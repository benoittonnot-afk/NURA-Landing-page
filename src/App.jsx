import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Droplet, Wind, Shield, Leaf, Eye, FlaskConical } from 'lucide-react';
import { blink, trackEvent } from './lib/blink';

// --- COMPOSANTS ---

const SectionTitle = ({ children, className = "", light = false }) => (
  <div className={`flex items-center gap-4 mb-8 ${className}`}>
    <div className={`w-12 h-[1px] ${light ? 'bg-white/30' : 'bg-lingonberry-noir/20'}`}></div>
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap ${light ? 'text-white/40' : 'text-lingonberry-noir'}`}>
      {children}
    </span>
  </div>
);

const WaitlistCTA = ({ onClick, className = "mt-20 md:mt-24", dark = false }) => (
  <div className={`flex justify-center ${className}`}>
    <button
      onClick={onClick}
      className={`px-10 py-4 border rounded-full text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm transition-all duration-500 transform hover:scale-[1.05] hover:shadow-md active:scale-[0.98] ${
        dark 
          ? 'bg-white text-stillness border-white/10 hover:bg-arctic-sun hover:text-white hover:border-arctic-sun' 
          : 'bg-white border-polar-sky/10 text-polar-sky hover:bg-arctic-sun hover:text-white hover:border-arctic-sun'
      }`}
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? 'bg-milkyway-frost/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6 md:py-8'
      } ${mobileMenuOpen ? 'bg-milkyway-frost' : ''}`}
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
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FluYznwj5FOOUdMuQoDW7iLIaT7G3%2Flogo__9e9645c9.png?alt=media&token=9303b069-4127-40a6-9534-c163821b50fa" 
            alt="NURA Logo" 
            className={`h-7 md:h-10 object-contain transition-all duration-300 ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
          />
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-300 ${isScrolled ? 'text-polar-sky' : 'text-white/80'}`}>
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy')} className="hover:text-arctic-sun transition-colors">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science')} className="hover:text-arctic-sun transition-colors">Science</button>
          <button onClick={() => scrollTo(refs.performance, 'performance')} className="hover:text-arctic-sun transition-colors">Performance</button>
          <button onClick={() => scrollTo(refs.story, 'story')} className="hover:text-arctic-sun transition-colors">Story</button>
          
          {/* Join Waitlist Button - Desktop */}
          <button 
            onClick={() => scrollTo(refs.cta, 'waitlist_cta_nav')} 
            className={`px-8 py-2.5 border rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              isScrolled 
                ? 'border-polar-sky/10 text-polar-sky hover:bg-arctic-sun hover:text-white hover:border-arctic-sun' 
                : 'border-white/20 text-white/90 hover:bg-white hover:text-polar-sky'
            }`}
          >
            Join waitlist
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${isScrolled || mobileMenuOpen ? 'text-polar-sky' : 'text-white'}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-milkyway-frost z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-polar-sky hover:text-arctic-sun">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-polar-sky hover:text-arctic-sun">Science</button>
          <button onClick={() => scrollTo(refs.performance, 'performance_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-polar-sky hover:text-arctic-sun">Performance</button>
          <button onClick={() => scrollTo(refs.story, 'story_mobile')} className="text-xs uppercase tracking-[0.4em] font-bold text-polar-sky hover:text-arctic-sun">Story</button>
          <button onClick={() => scrollTo(refs.cta, 'waitlist_cta_mobile')} className="px-10 py-4 border border-polar-sky rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-polar-sky mt-4 hover:bg-arctic-sun hover:text-white hover:border-arctic-sun">Join Waitlist</button>
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
        className="w-full h-full object-cover brightness-[0.7]"
        src="/video_home.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-milkyway-frost/25" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center text-white px-4 fade-up max-w-6xl mx-auto">
      <h1 className="hero-headline mb-8">
        Performance starts <br />
        <span className="italic">with health.</span>
      </h1>
      <p className="text-sm md:text-base lg:text-lg opacity-80 mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
        Natural tech activewear designed to support skin health and full performance cycle, inspired by Nordic values
      </p>
      <button 
        onClick={() => {
          onExplore();
          trackEvent('hero_explore_click');
        }}
        className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] font-bold border border-white/40 px-10 py-4 hover:bg-arctic-sun hover:border-arctic-sun hover:text-white transition-all duration-500 rounded-full"
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
  <section ref={innerRef} className="py-24 md:py-40 bg-milkyway-frost relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-12">
        
        {/* Image Content - Position Left on Desktop (order-1) */}
        <div className="order-1 relative group">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] overflow-hidden">
            <img 
              src="/femme.png"
              alt="Skin health activewear - Sweat on skin" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
          {/* Text Overlay Box - Bottom Right */}
          <div className="absolute -bottom-6 -right-6 md:-right-12 bg-[#d1d1d1] p-6 md:p-8 max-w-[280px] z-10">
            <p className="text-[10px] md:text-xs font-normal uppercase tracking-[0.2em] leading-relaxed text-black/80">
              A NEW STANDARD FOR WHAT YOU WEAR ON YOUR SKIN.
            </p>
          </div>
        </div>

        {/* Text Content - Position Right on Desktop (order-2) */}
        <div className="order-2 space-y-10">
          <SectionTitle>The Philosophy</SectionTitle>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-polar-sky tracking-tight">
            Skin care-level attention to what <span className="italic text-polar-sky/40">touches your skin.</span>
          </h2>
          
          <div className="space-y-8 text-base md:text-lg font-normal text-polar-sky leading-relaxed max-w-xl">
            <p>
              <span className="font-bold">NURA is a new standard</span> - elevated, intentional activewear where sensorial design meets science, and skin health becomes a performance advantage.
            </p>
            <p>
              We combine natural-tech materials with a skin care-level approach to support skin and total wellbeing, from movement to recovery.
            </p>
            <p>
              Born from the desire to connect performance, health and nature, rooted in the Nordic heritage and wellness culture.
            </p>
          </div>
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} className="mt-12 md:mt-16" />
    </div>
  </section>
);

const ScienceSection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} id="science" className="relative py-24 md:py-40 bg-milkyway-frost overflow-hidden">
    {/* Accent Band */}
    <div className="absolute top-0 left-0 right-0 h-[40px] md:h-[60px] bg-polar-sky"></div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
      {/* Section Header */}
      <div className="max-w-4xl mb-24 space-y-6">
        <SectionTitle>The Science</SectionTitle>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-polar-sky tracking-tight">
          Health-led performance wear designed to support your body from <span className="italic text-polar-sky/40">movement to recovery.</span>
        </h2>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative mb-20 md:mb-32">
        {/* Vertical Dividers for Desktop */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-[1px] bg-polar-sky/5"></div>
        <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-[1px] bg-polar-sky/5"></div>

        {/* Pillar 1: Ingredient Mindset */}
        <div className="group p-8 space-y-8 transition-all duration-700 hover:translate-y-[-4px] bg-polar-sky/[0.05] border border-polar-sky/10 rounded-sm">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-polar-sky/5 group-hover:bg-polar-sky/10 transition-colors duration-500">
            <Droplet size={20} strokeWidth={1.5} className="text-lingonberry-noir group-hover:text-arctic-sun transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-polar-sky/90 group-hover:text-polar-sky transition-colors">
              Skin-Led Ingredient<br />Mindset
            </h3>
            <div className="h-[1px] w-8 bg-polar-sky/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm text-polar-sky/60 leading-relaxed font-normal group-hover:text-polar-sky/80 transition-colors">
            A skin-first approach to materials and construction, designed for comfort in heat, sweat and movement, and to support recovery.
          </p>
        </div>

        {/* Pillar 2: Natural-Tech Performance */}
        <div className="group p-8 space-y-8 transition-all duration-700 hover:translate-y-[-4px] bg-polar-sky/[0.05] border border-polar-sky/10 rounded-sm">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-polar-sky/5 group-hover:bg-polar-sky/10 transition-colors duration-500">
            <FlaskConical size={20} strokeWidth={1.5} className="text-lingonberry-noir group-hover:text-arctic-sun transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-polar-sky/90 group-hover:text-polar-sky transition-colors">
              Natural-Tech<br />Performance
            </h3>
            <div className="h-[1px] w-8 bg-polar-sky/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm text-polar-sky/60 leading-relaxed font-normal group-hover:text-polar-sky/80 transition-colors">
            The finest natural materials, enhanced by modern science - engineered for high function and aligned with health and nature.
          </p>
        </div>

        {/* Pillar 3: Transparency */}
        <div className="group p-8 space-y-8 transition-all duration-700 hover:translate-y-[-4px] bg-polar-sky/[0.05] border border-polar-sky/10 rounded-sm">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-polar-sky/5 group-hover:bg-polar-sky/10 transition-colors duration-500">
            <Shield size={20} strokeWidth={1.5} className="text-lingonberry-noir group-hover:text-arctic-sun transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-polar-sky/90 group-hover:text-polar-sky transition-colors">
              Safety<br />& Transparency
            </h3>
            <div className="h-[1px] w-8 bg-polar-sky/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm text-polar-sky/60 leading-relaxed font-normal group-hover:text-polar-sky/80 transition-colors">
            Fabrics-level transparency - what it’s made of, and why. Material choices guided by integrity, safety, and microplastic-conscious design.
          </p>
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} />
    </div>
  </section>
);

const PerformanceSection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} className="relative bg-polar-sky text-white overflow-hidden">
    {/* Transition from Science */}
    <div className="h-[250px] transition-gradient-to-dark w-full"></div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div className="space-y-10">
          <SectionTitle light>Natural Tech</SectionTitle>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight tracking-tight">
            Performance without <span className="italic text-white/40">compromise.</span>
          </h2>
          <div className="space-y-8 text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-xl">
            <p>
              We believe technical gear shouldn't mean synthetic dominance. Our materials are derived from nature and optimized for the highest level of athletic performance.
            </p>
            <p>
              By focusing on skin compatibility and breathability, we help you maintain focus when it matters most.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            {['Anti-microbial', 'pH Balancing', 'Thermoregulating', 'Odor Resistant'].map((feature) => (
              <span key={feature} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-[4/5] overflow-hidden group">
          <img 
            src="/femme.jpeg" 
            alt="Natural performance tech" 
            className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-polar-sky/20 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} dark className="mt-24 md:mt-32" />
    </div>
    
    {/* Transition to Story */}
    <div className="h-[250px] transition-gradient-from-dark w-full"></div>
  </section>
);

const StorySection = ({ innerRef, onJoin }) => (
  <section ref={innerRef} className="relative py-24 md:py-40 bg-milkyway-frost text-polar-sky overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
        <div className="space-y-8">
          <SectionTitle>Our Story</SectionTitle>
          <h2 className="section-headline text-left text-polar-sky">
            Born in the Nordics. <br />
            <span className="italic text-polar-sky/40">Built for wellbeing.</span>
          </h2>
          <div className="w-20 h-[1px] bg-polar-sky/20 my-6"></div>
          <p className="text-polar-sky/70 font-normal leading-relaxed text-lg">
            NURA is rooted in my Nordic upbringing where movement was a ritual, and wellbeing a way of living in nature.
          </p>
          <p className="text-polar-sky/70 font-normal leading-relaxed text-lg">
            A decade in the beauty industry showed me how transparency and ingredient standards transformed skincare — while activewear remained dominated by synthetics, with little focus on what touches the skin.
          </p>
          <p className="text-polar-sky/70 font-normal leading-relaxed text-lg">
            NURA was created to change that: health-led activewear, designed with a skincare-level approach to materials — supporting skin wellbeing, performance, and recovery.
          </p>
          <p className="text-polar-sky font-serif italic text-xl pt-4">
            — Jenni Toft, Founder
          </p>
        </div>

        {/* Visual Element */}
        <div className="h-[500px] md:h-[700px] w-full overflow-hidden relative shadow-2xl">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FluYznwj5FOOUdMuQoDW7iLIaT7G3%2FJenni__8d8d3a59.jpg?alt=media&token=470644f6-e195-40f5-bcc3-aa1ce2167cec" 
            alt="Jenni Toft - Founder" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
        </div>
      </div>
      <WaitlistCTA onClick={onJoin} />
    </div>
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
    trackEvent('waitlist_submission_start', { email_provided: !!email, preorder_intent: preorder });
    
    try {
      await blink.db.waitlist.create({
        email: email,
        preorderInterest: preorder ? 1 : 0
      });
      
      setStatus('success');
      setEmail('');
      trackEvent('waitlist_submission_success');
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('idle');
      trackEvent('waitlist_submission_error', { error: error.message });
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section ref={innerRef} className="relative overflow-hidden">
      {/* Transition from Story */}
      <div className="h-[250px] transition-gradient-to-black w-full"></div>
      
      <div className="py-32 md:py-48 bg-stillness text-white">
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
          {/* Title Group */}
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight max-w-4xl mx-auto text-white">
              The next era of wellness <br />
              starts with <span className="italic text-white/40">what you wear.</span>
            </h2>
            <p className="text-base md:text-lg text-white/40 font-normal tracking-wide">
              Be the first to experience NURA.
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="w-full max-w-xl p-12 bg-white/5 border border-white/10 text-center animate-fade-in">
              <p className="font-serif italic text-2xl">Welcome to NURA.</p>
              <p className="text-white/40 mt-2 font-normal">We will be in touch shortly.</p>
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Input Group */}
                <div className="relative flex flex-col md:flex-row items-end gap-6 border-b border-white/10 pb-4 focus-within:border-white/40 transition-colors">
                  <input 
                    type="email" 
                    required
                    placeholder="Email address" 
                    className="flex-1 bg-transparent py-2 px-0 focus:outline-none text-xl md:text-2xl font-normal placeholder:text-white/20 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="px-10 py-3.5 bg-white text-stillness font-bold uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-arctic-sun hover:text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap mb-1"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join the experience'}
                  </button>
                </div>

                {/* Checkbox Group */}
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setPreorder(!preorder)}>
                  <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${preorder ? 'bg-white border-white' : 'border-white/10 group-hover:border-white/30'}`}>
                    {preorder && <div className="w-2.5 h-2.5 bg-stillness rounded-sm"></div>}
                  </div>
                  <span className="text-[10px] md:text-xs text-white/30 font-normal tracking-widest group-hover:text-white/50 transition-colors uppercase">
                    I would consider pre-ordering when available
                  </span>
                </div>
              </form>
            </div>
          )}
          
          {/* Bottom Slogans */}
          <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/[0.05] pt-16">
            <div className="text-[10px] md:text-xs tracking-[0.4em] font-normal text-white/30">
              POWERED BY <span className="font-bold text-white group-hover:text-arctic-sun transition-colors">NATURE</span>
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.4em] font-normal text-white/30">
              DESIGNED FOR <span className="font-bold text-white group-hover:text-arctic-sun transition-colors">HEALTH</span>
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.4em] font-normal text-white/30">
              BACKED BY <span className="font-bold text-white group-hover:text-arctic-sun transition-colors">SCIENCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-milkyway-frost pt-24 pb-12 px-6 md:px-12 border-t border-polar-sky/5">
    <div className="max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
        {/* Brand Column */}
        <div className="md:col-span-6 space-y-6">
          <div 
            className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-polar-sky cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              trackEvent('footer_logo_click');
            }}
          >
            NURA®
          </div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-polar-sky/40 leading-loose">
            NATURAL-TECH<br />ACTIVEWEAR
          </p>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-3 space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-polar-sky/30">
            Contact
          </p>
          <a 
            href="mailto:jenni@nurasport.com" 
            className="text-sm md:text-base font-normal text-polar-sky/80 hover:text-arctic-sun transition-colors block"
            onClick={() => trackEvent('footer_contact_click')}
          >
            jenni@nurasport.com
          </a>
        </div>

        {/* Origin Column */}
        <div className="md:col-span-3 space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-polar-sky/30">
            Origin
          </p>
          <p className="text-sm md:text-base font-normal text-polar-sky/80">
            Designed in Denmark
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[1px] bg-polar-sky/5 mb-8"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-polar-sky/30">
          © {new Date().getFullYear()} NURA. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex gap-8 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-polar-sky/30">
          <a href="#" className="hover:text-arctic-sun transition-colors" onClick={() => trackEvent('footer_privacy_click')}>Privacy</a>
          <a href="#" className="hover:text-arctic-sun transition-colors" onClick={() => trackEvent('footer_terms_click')}>Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const philosophyRef = useRef(null);
  const scienceRef = useRef(null);
  const performanceRef = useRef(null);
  const storyRef = useRef(null);
  const ctaRef = useRef(null);

  const refs = {
    philosophy: philosophyRef,
    science: scienceRef,
    performance: performanceRef,
    story: storyRef,
    cta: ctaRef
  };

  useEffect(() => {
    // Initial pageview tracking
    trackEvent('page_view', { page_title: 'NURA Landing Page' });
  }, []);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
    trackEvent('waitlist_cta_click');
  };

  return (
    <div className="min-h-screen bg-milkyway-frost">
      <Navbar refs={refs} />
      <Hero onExplore={() => philosophyRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <PhilosophySection innerRef={philosophyRef} onJoin={scrollToCTA} />
      <ScienceSection innerRef={scienceRef} onJoin={scrollToCTA} />
      <PerformanceSection innerRef={performanceRef} onJoin={scrollToCTA} />
      <StorySection innerRef={storyRef} onJoin={scrollToCTA} />
      <CTASection innerRef={ctaRef} />
      <Footer />
    </div>
  );
}

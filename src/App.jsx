import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Droplet, Wind, Shield, Leaf, Eye, FlaskConical } from 'lucide-react';
import { blink, trackEvent } from './lib/blink';

// --- COMPOSANTS ---

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
          className="text-2xl md:text-3xl font-serif font-semibold tracking-widest cursor-pointer z-50 mix-blend-difference text-black md:text-current"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackEvent('logo_click');
          }}
        >
           NURA
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-light transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy')} className="hover:opacity-70 transition-opacity">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science')} className="hover:opacity-70 transition-opacity">Science</button>
          <button onClick={() => scrollTo(refs.story, 'story')} className="hover:opacity-70 transition-opacity">Story</button>
          
          {/* Join Waitlist Button - Desktop */}
          <button 
            onClick={() => scrollTo(refs.cta, 'waitlist_cta_nav')} 
            className={`px-6 py-2 border ${isScrolled ? 'border-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white hover:bg-white hover:text-black'} transition-all duration-300`}
          >
            Join the waitlist
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
          <button onClick={() => scrollTo(refs.philosophy, 'philosophy_mobile')} className="text-2xl font-serif text-gray-900">Philosophy</button>
          <button onClick={() => scrollTo(refs.science, 'science_mobile')} className="text-2xl font-serif text-gray-900">Science</button>
          <button onClick={() => scrollTo(refs.story, 'story_mobile')} className="text-2xl font-serif text-gray-900">Story</button>
          <button onClick={() => scrollTo(refs.cta, 'waitlist_cta_mobile')} className="text-xl font-serif text-white bg-gray-900 px-8 py-3 mt-4">Join Waitlist</button>
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
      <div className="absolute inset-0 bg-black/30" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center text-white px-4 fade-up max-w-6xl mx-auto">
      <h1 className="hero-headline mb-8">
        Performance starts <br />
        <span className="italic">with health.</span>
      </h1>
      <p className="text-sm md:text-base lg:text-lg opacity-80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
        Natural tech activewear designed to support skin health and full performance cycle, inspired by Nordic values
      </p>
      <button 
        onClick={() => {
          onExplore();
          trackEvent('hero_explore_click');
        }}
        className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-white/40 px-8 py-3 hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
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

const PhilosophySection = ({ innerRef }) => (
  <section ref={innerRef} className="py-24 md:py-40 bg-background relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
      
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
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed text-black/80">
            A NEW STANDARD FOR WHAT YOU WEAR ON YOUR SKIN.
          </p>
        </div>
      </div>

      {/* Text Content - Position Right on Desktop (order-2) */}
      <div className="order-2 space-y-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-foreground tracking-tight">
          Skin care-level attention to what <span className="italic text-foreground/40">touches your skin.</span>
        </h2>
        
        <div className="space-y-8 text-base md:text-lg font-light text-foreground/80 leading-relaxed max-w-xl">
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

        <div className="pt-4">
          <a 
            href="#science" 
            className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-foreground/20 pb-2 hover:border-foreground transition-all duration-300 inline-block"
            onClick={() => trackEvent('manifesto_click')}
          >
            Read the manifesto
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ScienceSection = ({ innerRef }) => (
  <section ref={innerRef} id="science" className="py-24 md:py-40 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      {/* Section Header */}
      <div className="max-w-4xl mb-24 space-y-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 animate-fade-in">
          The Science of Nura
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-foreground tracking-tight">
          Health-led performance wear designed to support your body from <span className="italic text-foreground/40">movement to recovery.</span>
        </h2>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative">
        {/* Vertical Dividers for Desktop */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-[1px] bg-foreground/5"></div>
        <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-[1px] bg-foreground/5"></div>

        {/* Pillar 1: Ingredient Mindset */}
        <div className="group space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500">
            <Droplet size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/90 group-hover:text-foreground transition-colors">
              Skin-Led Ingredient<br />Mindset
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed font-light max-w-[280px] group-hover:text-foreground/80 transition-colors">
            A skin-first approach to materials and construction, designed for comfort in heat, sweat and movement, and to support recovery.
          </p>
        </div>

        {/* Pillar 2: Natural-Tech Performance */}
        <div className="group space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500">
            <FlaskConical size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/90 group-hover:text-foreground transition-colors">
              Natural-Tech<br />Performance
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed font-light max-w-[280px] group-hover:text-foreground/80 transition-colors">
            The finest natural materials, enhanced by modern science - engineered for high function and aligned with health and nature.
          </p>
        </div>

        {/* Pillar 3: Transparency */}
        <div className="group space-y-8 transition-all duration-500 hover:translate-y-[-4px]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/[0.03] group-hover:bg-foreground/5 transition-colors duration-500">
            <Shield size={20} strokeWidth={1.5} className="text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/90 group-hover:text-foreground transition-colors">
              Safety<br />& Transparency
            </h3>
            <div className="h-[1px] w-8 bg-foreground/20 group-hover:w-16 transition-all duration-700"></div>
          </div>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed font-light max-w-[280px] group-hover:text-foreground/80 transition-colors">
            Fabrics-level transparency - what it’s made of, and why. Material choices guided by integrity, safety, and microplastic-conscious design.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const StorySection = ({ innerRef }) => (
  <section ref={innerRef} className="relative py-24 md:py-40 bg-[#1a1a1a] text-white overflow-hidden">
    {/* Background Texture/Image removed as requested */}
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <span className="label-headline text-left block">Our Story</span>
        <h2 className="section-headline text-left">
          Born in the Nordics. <br />
          <span className="italic">Built for wellbeing.</span>
        </h2>
        <div className="w-20 h-[1px] bg-white/30 my-6"></div>
        <p className="text-gray-300 font-light leading-relaxed text-lg">
          NURA is rooted in my Nordic upbringing where movement was a ritual, and wellbeing a way of living in nature.
        </p>
        <p className="text-gray-300 font-light leading-relaxed text-lg">
          A decade in the beauty industry showed me how transparency and ingredient standards transformed skincare — while activewear remained dominated by synthetics, with little focus on what touches the skin.
        </p>
        <p className="text-gray-300 font-light leading-relaxed text-lg">
          NURA was created to change that: health-led activewear, designed with a skincare-level approach to materials — supporting skin wellbeing, performance, and recovery.
        </p>
        <p className="text-white font-serif italic text-xl pt-4">
          — Jenni Toft, Founder
        </p>
      </div>

      {/* Visual Element */}
      <div className="h-[500px] md:h-[700px] w-full overflow-hidden relative shadow-2xl">
         <img 
           src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FluYznwj5FOOUdMuQoDW7iLIaT7G3%2FJenni__8d8d3a59.jpg?alt=media&token=470644f6-e195-40f5-bcc3-aa1ce2167cec" 
           alt="Jenni Toft - Founder" 
           className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-1000" 
         />
      </div>
    </div>
  </section>
);

const CTASection = ({ innerRef }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    trackEvent('waitlist_submission_start', { email_provided: !!email });
    
    try {
      await blink.db.waitlist.create({
        email: email
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
    <section ref={innerRef} className="py-24 md:py-32 bg-background text-center px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="section-headline">
          The next era of wellness <br />
          <span className="italic">starts with what you wear.</span>
        </h2>
        <p className="text-foreground/60 font-light">
          Be the first to experience NURA
        </p>
        
        {status === 'success' ? (
          <div className="p-4 bg-green-50 text-green-900 font-serif border border-green-100 animate-fade-in">
            Welcome to NURA. We will be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              required
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-b border-gray-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 font-light placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="px-8 py-3 bg-gray-900 text-white font-serif uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Join the experience'}
            </button>
          </form>
        )}
        
        <p className="label-headline pt-8">
          POWERED BY NATURE - DESIGNED FOR HEALTH - BACKED BY SCIENCE
        </p>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div 
        className="text-2xl font-serif font-bold tracking-widest text-gray-900 cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          trackEvent('footer_logo_click');
        }}
      >
        NURA
      </div>
      
      <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.3em] text-foreground/40">
        <a 
          href="#" 
          className="hover:text-gray-900 transition-colors"
          onClick={() => trackEvent('social_click', { platform: 'instagram' })}
        >
          Instagram
        </a>
        <a 
          href="#" 
          className="hover:text-gray-900 transition-colors"
          onClick={() => trackEvent('social_click', { platform: 'tiktok' })}
        >
          TikTok
        </a>
        <a 
          href="#" 
          className="hover:text-gray-900 transition-colors"
          onClick={() => trackEvent('social_click', { platform: 'contact' })}
        >
          Contact
        </a>
      </div>

      <div className="text-[10px] text-gray-400">
        © {new Date().getFullYear()} NURA Activewear. All rights reserved.
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

  return (
    <div className="min-h-screen">
      <Navbar refs={refs} />
      <Hero onExplore={() => philosophyRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <PhilosophySection innerRef={philosophyRef} />
      <ScienceSection innerRef={scienceRef} />
      <StorySection innerRef={storyRef} />
      <CTASection innerRef={ctaRef} />
      <Footer />
    </div>
  );
}
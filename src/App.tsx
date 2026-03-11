import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { 
  Fence, 
  ShieldCheck, 
  Hammer, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft, 
  Star,
  CheckCircle2,
  Construction,
  Building2,
  Home,
  ArrowUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Story', href: '#our-story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-light shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-brand-dark">
          <div className="flex items-center space-x-2">
            <a href="#home" className="flex items-center">
              <img
                src="/images/logo.webp"
                alt="CFM Fence Solutions"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-dark hover:text-brand-orange transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-brand-orange text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-orange-600 transition-colors uppercase tracking-wider"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-brand-light pt-4"
          >
            <div className="px-4 pb-6 space-y-1 text-brand-dark">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-brand-dark hover:text-brand-orange border-b border-brand-gray/40 text-center"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-brand-orange text-white px-6 py-3 rounded-sm font-bold"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen lg:min-h-0 lg:h-screen flex flex-col overflow-hidden bg-brand-light scroll-mt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-1.png"
          alt="Modern outdoor fence in front of house"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      {/* Main content: takes remaining space, content centered */}
      <div className="relative z-10 flex-1 flex items-center min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-orange/20 border border-brand-orange/30 px-3 py-1 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Premium Quality Guaranteed</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-brand-dark leading-tight mb-6 uppercase tracking-tighter">
              SECURE YOUR <br />
              <span className="text-brand-orange">BOUNDARY</span> WITH <br />
              PRECISION
            </h1>
            <p className="text-brand-gray text-lg mb-10 max-w-lg">
              CFM Fence Solutions delivers high-quality residential and commercial fencing built for durability, security, and curb appeal. As a family-owned business, we take pride in craftsmanship, reliability, and attention to detail in every project we complete.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="bg-brand-orange text-white px-8 py-4 rounded-sm font-bold hover:bg-orange-600 transition-all flex items-center justify-center group"
              >
                Explore Services
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#gallery"
                className="bg-brand-dark/80 text-white px-8 py-4 rounded-sm font-bold hover:bg-brand-dark transition-all flex items-center justify-center"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar: in flow so it never overlaps content */}
      <div className="relative z-10 shrink-0 bg-brand-light/95 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: null, label: 'Family Owned & Operated' },
              { value: null, label: 'Residential & Commercial Projects' },
              
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center justify-center min-h-[3.5rem] lg:min-h-0 ${
                  i > 0 && i < 4 ? 'lg:border-l border-brand-gray/30' : ''
                }`}
              >
                {stat.value ? (
                  <>
                    <span className="text-brand-orange text-2xl sm:text-3xl font-black block">{stat.value}</span>
                    <span className="text-brand-gray text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-1">{stat.label}</span>
                  </>
                ) : (
                  <span className="text-brand-orange text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight leading-snug max-w-[12rem] lg:max-w-none">
                    {stat.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SERVICES_INCLUDING = [
  { title: 'Custom Gates', subtitle: 'Driveway, pedestrian & automated', image: '/images/customgates.JPEG' },
  {
    title: 'Hand/Stair Railings',
    subtitle: 'Indoor & outdoor, custom fit',
    image: '/images/stair-1.jpeg',
    images: ['/images/stair-1.jpeg', '/images/stair-2.jpeg', '/images/stair-3.jpeg'],
  },
  { title: 'Mailboxes', subtitle: 'Wood, granite and PVC', image: '/images/mailbox1.JPEG' },
  { title: 'Metal Guard Rail',
    subtitle: 'Safety Rails', 
    image: '/images/metal-1.jpeg',
    images: ['/images/metal-1.jpeg', '/images/metal-2.jpeg'],
  },
];

const Services = () => {
  const [servicesLightboxItemIndex, setServicesLightboxItemIndex] = useState<number | null>(null);
  const [servicesLightboxImageIndex, setServicesLightboxImageIndex] = useState(0);
  const [servicesSlideDir, setServicesSlideDir] = useState(0);
  const servicesTouchStartX = useRef<number | null>(null);
  const servicesDidSwipe = useRef(false);
  const servicesPrevImageIndex = useRef<number | null>(null);

  const services = [
    {
      title: 'Residential Fencing',
      description: 'Enhance your home\'s curb appeal and security with our wide range of wood, vinyl, and ornamental iron fences.',
      icon: <Home className="w-8 h-8" />,
      image: '/images/proj-2.jpg'
    },
    {
      title: 'Commercial Solutions',
      description: 'Durable and professional fencing for businesses, warehouses, and industrial sites. Security is our priority.',
      icon: <Building2 className="w-8 h-8" />,
      image: '/images/proj-7.jpg'
    },
    {
      title: 'Industrial & Security',
      description: 'High-security chain link, barbed wire, and automated gate systems for maximum protection of your assets.',
      icon: <Construction className="w-8 h-8" />,
      image: '/images/proj-6.jpg'
    }
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesLightboxItemIndex(null);
    };
    if (servicesLightboxItemIndex !== null) {
      const justOpened = servicesPrevImageIndex.current === null;
      if (justOpened) setServicesSlideDir(0);
      servicesPrevImageIndex.current = servicesLightboxImageIndex;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      servicesPrevImageIndex.current = null;
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [servicesLightboxItemIndex, servicesLightboxImageIndex]);

  const getCurrentLightboxImages = () => {
    if (servicesLightboxItemIndex === null) return [];
    const item = SERVICES_INCLUDING[servicesLightboxItemIndex] as { image: string; images?: string[] };
    return item.images ?? [item.image];
  };

  const currentLightboxImages = getCurrentLightboxImages();

  const servicesGoPrev = () => {
    setServicesSlideDir(-1);
    setServicesLightboxImageIndex((j) => (j === 0 ? currentLightboxImages.length - 1 : j - 1));
  };
  const servicesGoNext = () => {
    setServicesSlideDir(1);
    setServicesLightboxImageIndex((j) => (j === currentLightboxImages.length - 1 ? 0 : j + 1));
  };
  const servicesHandleTouchStart = (e: React.TouchEvent) => {
    servicesTouchStartX.current = e.touches[0].clientX;
    servicesDidSwipe.current = false;
  };
  const servicesHandleTouchMove = (e: React.TouchEvent) => {
    if (servicesTouchStartX.current === null) return;
    const x = e.touches[0].clientX;
    const diff = servicesTouchStartX.current - x;
    if (Math.abs(diff) > 50) servicesDidSwipe.current = true;
  };
  const servicesHandleTouchEnd = (e: React.TouchEvent) => {
    if (servicesTouchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = servicesTouchStartX.current - endX;
    servicesTouchStartX.current = null;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) servicesGoNext();
    else servicesGoPrev();
  };
  const servicesHandleBackdropClick = () => {
    if (servicesDidSwipe.current) {
      servicesDidSwipe.current = false;
      return;
    }
    setServicesLightboxItemIndex(null);
  };

  const openServicesLightbox = (itemIndex: number) => {
    setServicesLightboxItemIndex(itemIndex);
    setServicesLightboxImageIndex(0);
  };

  return (
    <section id="services" className="pt-20 sm:pt-28 lg:pt-36 pb-24 bg-brand-light scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">Our Fencing Solutions</h3>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white border border-brand-gray/20 overflow-hidden shadow-sm group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors"></div>
              </div>
              <div className="p-8">
                <div className="text-brand-orange mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-brand-dark mb-3 uppercase tracking-tight">{service.title}</h4>
                <p className="text-brand-gray-dark text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <a href="#contact" className="text-brand-orange font-bold text-xs uppercase tracking-widest flex items-center group">
                  View More
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-brand-gray/20">
          <div className="text-center mb-10">
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">More from us</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">Services including</h3>
            <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-4"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_INCLUDING.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white border border-brand-gray/20 overflow-hidden shadow-sm group cursor-pointer"
                onClick={() => openServicesLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openServicesLightbox(i)}
                aria-label={`View ${item.title} full size`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors"></div>
                  <div className="absolute inset-0 bg-brand-orange/80 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold uppercase tracking-widest text-sm border-2 border-white px-4 py-2">View full size</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-brand-dark uppercase tracking-tight">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-brand-gray-dark text-sm mt-1">{item.subtitle}</p>
                  )}
                  <a href="#contact" className="inline-flex items-center mt-4 text-brand-orange font-bold text-xs uppercase tracking-widest" onClick={(e) => e.stopPropagation()}>
                    View More
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services including – fullscreen lightbox */}
      <AnimatePresence>
        {servicesLightboxItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 touch-none"
            onClick={servicesHandleBackdropClick}
            onTouchStart={servicesHandleTouchStart}
            onTouchMove={servicesHandleTouchMove}
            onTouchEnd={servicesHandleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setServicesLightboxItemIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); servicesGoPrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); servicesGoNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={servicesLightboxImageIndex}
                initial={{
                  x: servicesSlideDir === 0 ? 0 : servicesSlideDir > 0 ? '100vw' : '-100vw',
                  opacity: servicesSlideDir === 0 ? 1 : 1,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: servicesSlideDir === 0 ? 0 : servicesSlideDir > 0 ? '-100vw' : '100vw',
                  opacity: 1,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                  <img
                    src={currentLightboxImages[servicesLightboxImageIndex]}
                    alt={SERVICES_INCLUDING[servicesLightboxItemIndex].title}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain select-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {servicesLightboxImageIndex + 1} / {currentLightboxImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const OurStory = () => {
  return (
    <section id="our-story" className="py-24 bg-brand-light text-brand-dark overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img
                src="/images/portrait.png"
                alt="Our Team"
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-orange -z-0 opacity-20"></div>
            <div className="absolute -top-6 -left-6 border-2 border-brand-orange w-32 h-32 -z-0"></div>
          </div>

          <div>
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-6">The Family Behind CFM</h3>
            <p className="text-brand-gray-dark text-lg mb-6">
              CFM Fence Solutions &mdash; Leominster
            </p>
            <p className="text-brand-gray-dark text-lg mb-6">
              At CFM Fence Solutions, fencing is more than just our trade &mdash; it&apos;s our passion and our promise to the community. Founded by Chris, who brings years of hands-on experience in fence installation and repair, our company was built with a vision of creating more than just strong, beautiful fences. We set out to build a business grounded in family values, integrity, and true craftsmanship.
            </p>
            <p className="text-brand-gray-dark text-lg mb-6">
              The name CFM represents Chris, his wife Francine, and their daughter Maileena &mdash; the heart and inspiration behind everything we do. As a family-owned and operated business, we understand the importance of protecting what matters most.
            </p>
            <p className="text-brand-gray-dark text-lg mb-6">
              We specialize in high-quality, custom fencing solutions including vinyl, wood, chain link, ornamental fencing, and custom gates. We also offer guard rails, hand railings, stair railings, and fence repairs. Every project is completed with careful attention to detail, premium materials, and a commitment to lasting durability.
            </p>
            <p className="text-brand-gray-dark text-lg">
              Our goal is simple: to provide dependable service, honest communication, and results that exceed expectations. When you choose CFM Fence Solutions, you&apos;re not just hiring a contractor &mdash; you&apos;re partnering with a local family that takes pride in securing and enhancing your home. We don&apos;t just build fences &mdash; we build trust, security, and lasting relationships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SWIPE_THRESHOLD = 50;

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const images = [
    '/images/proj-1.JPEG',
    '/images/proj-2.jpg',
    '/images/proj-3.jpg',
    '/images/stair.JPEG',
    '/images/proj-5.jpeg',
    '/images/proj-6.jpg',
    '/images/proj-7.jpg',
    '/images/proj-14.JPEG',
    '/images/proj-9.jpg',
    '/images/customgates.JPEG',
    '/images/handrailing.JPEG',
    '/images/mailbox.JPEG',
    '/images/proj-10.JPEG',
    '/images/proj-11.JPEG',
    '/images/proj-12.JPEG',
    '/images/proj-13.JPEG',
  ];

  const prevLightboxIndex = useRef<number | null>(null);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    if (lightboxIndex !== null) {
      if (prevLightboxIndex.current === null) setSlideDir(0);
      prevLightboxIndex.current = lightboxIndex;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      prevLightboxIndex.current = null;
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxIndex]);

  const goPrev = () => {
    setSlideDir(-1);
    setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  };
  const goNext = () => {
    setSlideDir(1);
    setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const x = e.touches[0].clientX;
    const diff = touchStartX.current - x;
    if (Math.abs(diff) > SWIPE_THRESHOLD) didSwipe.current = true;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) goNext();
    else goPrev();
  };
  const handleBackdropClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-24 bg-brand-light scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Our Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">Recent Projects</h3>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-4"></div>
        </div>

        {/* 2 cols mobile (vertical scroll), 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="aspect-square overflow-hidden relative group cursor-pointer"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
              aria-label={`View project ${i + 1}`}
            >
              <img
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-orange/80 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold uppercase tracking-widest text-sm border-2 border-white px-4 py-2">View full size</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 touch-none"
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-brand-orange transition-colors rounded-full hover:bg-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>

            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={lightboxIndex}
                initial={{
                  x: slideDir === 0 ? 0 : slideDir > 0 ? '100vw' : '-100vw',
                  opacity: slideDir === 0 ? 1 : 1,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: slideDir === 0 ? 0 : slideDir > 0 ? '-100vw' : '100vw',
                  opacity: 1,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                  <img
                    src={images[lightboxIndex]}
                    alt={`Project ${lightboxIndex + 1}`}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain select-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  const serviceOptions = [
    { value: 'residential', label: 'Residential Fencing' },
    { value: 'commercial', label: 'Commercial Fencing' },
    { value: 'industrial', label: 'Industrial Security' },
    { value: 'repair', label: 'Repair & Maintenance' },
  ];

  const [serviceNeeded, setServiceNeeded] = useState(serviceOptions[0]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [reviews, setReviews] = useState<
    { id: number; name: string; company?: string | null; rating: number; message: string }[]
  >([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewSlideDir, setReviewSlideDir] = useState(0); // 1 = next, -1 = prev
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to load reviews');
        const data = await res.json();
        if (data.ok && Array.isArray(data.reviews)) {
          setReviews(
            data.reviews.map((r: any) => ({
              id: r.id,
              name: r.name,
              company: r.company,
              rating: r.rating,
              message: r.message,
            })),
          );
        }
      } catch (err) {
        // ignore, we just won't show reviews
      } finally {
        setReviewsLoaded(true);
      }
    };
    loadReviews();
  }, []);

  // Auto-slide reviews carousel (only when 3+ reviews)
  useEffect(() => {
    if (!reviewsLoaded || reviews.length < 3) return;
    const id = window.setInterval(() => {
      setReviewSlideDir(1);
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [reviewsLoaded, reviews.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      setServiceNeeded(serviceOptions[0]);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setReviewSubmitStatus('sending');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setReviewSubmitStatus('success');
      setTimeout(() => setReviewSubmitStatus('idle'), 6000);
    } catch (err) {
      setReviewSubmitStatus('error');
      setTimeout(() => setReviewSubmitStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-light relative overflow-hidden scroll-mt-32">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 -skew-x-12 transform translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-8">Ready to Start <br />Your Project?</h3>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-orange/10 p-3 rounded-sm">
                  <Phone className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Call Us</p>
                  <p className="text-brand-dark text-xl font-bold">978-490-5447</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-orange/10 p-3 rounded-sm">
                  <Mail className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Email Us</p>
                  <p className="text-brand-dark text-xl font-bold">cfmfencesolutions@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-orange/10 p-3 rounded-sm">
                  <MapPin className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Visit Us</p>
                  <p className="text-brand-dark text-xl font-bold">Leominster, MA<br /></p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              {(!reviewsLoaded || reviews.length === 0) && (
                <div className="p-8 bg-brand-gray-dark/50 border-l-4 border-brand-orange">
                  <div className="flex items-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                    ))}
                  </div>
                  <p className="text-brand-light italic text-sm">
                    "CFM Fence Solutions transformed our facility&apos;s security. Their attention to detail and
                    professional installation was top-notch."
                  </p>
                  <p className="text-brand-dark font-bold text-xs uppercase tracking-widest mt-4">
                    — Rj Manapsal, Full Stack Developer
                  </p>
                </div>
              )}

              {reviewsLoaded && reviews.length > 0 && (
                <div className="space-y-4">
                  {reviews.length < 3 ? (
                    // 1–2 reviews: show them all stacked, no carousel
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-8 bg-brand-gray-dark/50 border-l-4 border-brand-orange"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-brand-orange fill-brand-orange' : 'text-brand-gray'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-brand-light italic text-sm">
                          &ldquo;{review.message}&rdquo;
                        </p>
                        <p className="text-brand-dark font-bold text-xs uppercase tracking-widest mt-4">
                          — {review.name}
                          {review.company ? `, ${review.company}` : ''}
                        </p>
                      </div>
                    ))
                  ) : (
                    // 3+ reviews: carousel with horizontal slide
                    <>
                      <div className="overflow-hidden">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.div
                            key={reviews[activeReviewIndex]?.id ?? 'no-review'}
                            initial={{
                              x: reviewSlideDir === 0 ? 0 : reviewSlideDir > 0 ? '100%' : '-100%',
                            }}
                            animate={{ x: 0 }}
                            exit={{
                              x: reviewSlideDir > 0 ? '-100%' : '100%',
                            }}
                            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="p-8 bg-brand-gray-dark/50 border-l-4 border-brand-orange"
                          >
                          <div className="flex items-center space-x-2 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < reviews[activeReviewIndex].rating
                                    ? 'text-brand-orange fill-brand-orange'
                                    : 'text-brand-gray'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-brand-light italic text-sm">
                            &ldquo;{reviews[activeReviewIndex].message}&rdquo;
                          </p>
                          <p className="text-brand-dark font-bold text-xs uppercase tracking-widest mt-4">
                            — {reviews[activeReviewIndex].name}
                            {reviews[activeReviewIndex].company
                              ? `, ${reviews[activeReviewIndex].company}`
                              : ''}
                          </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        {reviews.map((r, idx) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              setReviewSlideDir(idx > activeReviewIndex ? 1 : -1);
                              setActiveReviewIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === activeReviewIndex
                                ? 'w-5 bg-brand-orange'
                                : 'w-2 bg-brand-gray-dark/60 hover:bg-brand-gray-dark'
                            }`}
                            aria-label={`Show review ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl space-y-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    className="w-full bg-white border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    className="w-full bg-white border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Service Needed</label>
                <input type="hidden" name="service" value={serviceNeeded.label} />
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={serviceOptions}
                  value={serviceNeeded}
                  onChange={(option) => setServiceNeeded(option || serviceOptions[0])}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused ? '#FF6A2A' : 'rgba(110, 119, 129, 0.2)',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: state.isFocused ? '#FF6A2A' : 'rgba(110, 119, 129, 0.4)',
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#FF6A2A'
                        : state.isFocused
                        ? '#F2F2F0'
                        : '#FFFFFF',
                      color: state.isSelected ? '#FFFFFF' : '#1A1C1F',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#FF6A2A',
                      primary25: '#F2F2F0',
                    },
                  })}
                  isSearchable
                  placeholder="Select a service..."
                />
              </div>
              <div>
                <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  className="w-full bg-white border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-sm border border-green-500/50 bg-green-50 text-green-800"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
                    <p className="text-sm font-medium">Thank you! Your request has been sent. We&apos;ll get back to you soon.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-sm border border-red-500/50 bg-red-50 text-red-800"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full bg-brand-orange text-white py-5 font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Request'}
              </button>
            </form>

            <div className="border-t border-brand-gray/15 pt-8">
              <h4 className="text-brand-dark text-lg font-black uppercase tracking-widest mb-4">
                Leave a Review
              </h4>
              <p className="text-brand-gray text-xs mb-4">
                Share your experience with CFM Fence Solutions. Reviews are subject to approval before being featured
                on the site.
              </p>
              <form className="space-y-4" onSubmit={handleReviewSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="w-full bg-white border border-brand-gray/20 p-3 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">
                      Company <span className="text-brand-gray">(optional)</span>
                    </label>
                    <input
                      name="company"
                      type="text"
                      className="w-full bg-white border border-brand-gray/20 p-3 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">
                    Review
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full bg-white border border-brand-gray/20 p-3 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    placeholder="How was your experience with CFM Fence Solutions?"
                  ></textarea>
                </div>
                <div className="pt-2">
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-3 text-center">
                  Rate Your Experience
                  </label>
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1;
                      const active = starValue <= reviewRating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setReviewRating(starValue)}
                          className="p-1"
                          aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              active ? 'text-brand-orange fill-brand-orange' : 'text-brand-gray-dark'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" name="rating" value={reviewRating} />
                </div>
                <AnimatePresence mode="wait">
                  {reviewSubmitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 p-3 rounded-sm border border-green-500/50 bg-green-50 text-green-800 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                      <p>Your review has been submitted and is pending approval. Thank you.</p>
                    </motion.div>
                  )}
                  {reviewSubmitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 p-3 rounded-sm border border-red-500/50 bg-red-50 text-red-800 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <p>We couldn&apos;t submit your review right now. Please try again later.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={reviewSubmitStatus === 'sending'}
                  className="w-full bg-brand-dark text-white py-3 font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed text-xs"
                >
                  {reviewSubmitStatus === 'sending' ? 'Sending Review...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-light border-t border-brand-gray/40 pt-20 pb-10 text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <a href="#home" className="flex items-center">
                <img
                  src="/images/logo.webp"
                  alt="CFM Fence Solutions"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <p className="text-brand-gray max-w-sm mb-8">
              Providing premium fencing solutions with industrial strength and residential elegance. Your security is our commitment.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {['FB', 'TW', 'IG', 'LI'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-brand-gray-dark flex items-center justify-center text-brand-light hover:bg-brand-orange hover:text-white transition-all font-bold text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Our Story', href: '#our-story' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-brand-gray hover:text-brand-orange transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-6">Services</h4>
            <ul className="space-y-4">
              {['Residential', 'Commercial', 'Industrial', 'Security Gates', 'Repairs'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-brand-gray hover:text-brand-orange transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gray/40 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-brand-gray text-xs uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} CFM Fence Solutions. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-brand-orange text-white p-4 rounded-sm shadow-2xl hover:bg-orange-600 transition-all group border border-white/10"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <OurStory />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

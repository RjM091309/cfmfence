import React, { useState, useEffect } from 'react';
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
  Star,
  CheckCircle2,
  Construction,
  Building2,
  Home,
  ArrowUp
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
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-orange p-1.5 rounded">
              <Fence className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tighter ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
              CFM <span className="text-brand-orange">FENCE SOLUTIONS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-light hover:text-brand-orange transition-colors uppercase tracking-widest"
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
              className="text-white p-2"
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
            className="md:hidden bg-brand-dark border-t border-brand-gray-dark"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-brand-light hover:text-brand-orange border-b border-brand-gray-dark"
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
    <section id="home" className="relative min-h-screen lg:h-screen flex items-center overflow-hidden bg-brand-dark pb-32 lg:pb-0 scroll-mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-1.png"
          alt="Modern outdoor fence in front of house"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
            SECURE YOUR <br />
            <span className="text-brand-orange">BOUNDARY</span> WITH <br />
            PRECISION
          </h1>
          <p className="text-brand-gray text-lg mb-10 max-w-lg">
            CFM Fence Solutions provides industrial-grade fencing for residential, commercial, and high-security properties. Built to last, designed for strength.
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
              className="border border-brand-gray text-white px-8 py-4 rounded-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/90 border-t border-brand-gray-dark py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: 'Years Experience', value: '15+' },
              { label: 'Projects Completed', value: '2.5k' },
              { label: 'Expert Installers', value: '40+' },
              { label: 'Client Satisfaction', value: '100%' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-brand-orange text-2xl lg:text-3xl font-black">{stat.value}</span>
                <span className="text-brand-gray text-[10px] lg:text-xs uppercase tracking-widest font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Residential Fencing',
      description: 'Enhance your home\'s curb appeal and security with our wide range of wood, vinyl, and ornamental iron fences.',
      icon: <Home className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Commercial Solutions',
      description: 'Durable and professional fencing for businesses, warehouses, and industrial sites. Security is our priority.',
      icon: <Building2 className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Industrial & Security',
      description: 'High-security chain link, barbed wire, and automated gate systems for maximum protection of your assets.',
      icon: <Construction className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-light scroll-mt-20">
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
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark text-white overflow-hidden scroll-mt-20">
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
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
                alt="Our Team"
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-orange -z-0 opacity-20"></div>
            <div className="absolute -top-6 -left-6 border-2 border-brand-orange w-32 h-32 -z-0"></div>
          </div>

          <div>
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">About CFM Fence Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">Built on Trust, <br />Forged in Steel</h3>
            <p className="text-brand-gray text-lg mb-8">
              For over 15 years, CFM Fence Solutions has been the leading provider of high-quality fencing in the region. We combine traditional craftsmanship with modern technology to deliver results that exceed expectations.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                'Certified & Insured Professionals',
                'Custom Design & Fabrication',
                'Highest Grade Materials Only',
                'Lifetime Workmanship Warranty'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-brand-orange w-5 h-5 flex-shrink-0" />
                  <span className="text-brand-light font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-brand-orange text-white px-8 py-4 rounded-sm font-bold hover:bg-orange-600 transition-all uppercase tracking-widest text-sm">
              Our Full Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=800&sig=1'
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Our Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">Recent Projects</h3>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="aspect-square overflow-hidden relative group cursor-pointer"
            >
              <img
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-orange/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-widest text-sm border-2 border-white px-4 py-2">View Project</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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

  return (
    <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-20">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 -skew-x-12 transform translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8">Ready to Start <br />Your Project?</h3>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-gray-dark p-3 rounded-sm">
                  <Phone className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Call Us</p>
                  <p className="text-white text-xl font-bold">978-490-5447</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-gray-dark p-3 rounded-sm">
                  <Mail className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Email Us</p>
                  <p className="text-white text-xl font-bold">CFMfencesolution@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-gray-dark p-3 rounded-sm">
                  <MapPin className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <p className="text-brand-gray text-xs uppercase font-bold tracking-widest mb-1">Visit Us</p>
                  <p className="text-white text-xl font-bold">-<br /></p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-brand-gray-dark/50 border-l-4 border-brand-orange">
              <div className="flex items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                ))}
              </div>
              <p className="text-brand-light italic text-sm">
                "CFM Fence Solutions transformed our facility's security. Their attention to detail and professional installation was top-notch."
              </p>
              <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mt-4">— Robert Chen, Operations Director</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-brand-light border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-brand-light border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-brand-dark text-xs font-bold uppercase tracking-widest mb-2">Service Needed</label>
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
                  rows={4}
                  className="w-full bg-brand-light border border-brand-gray/20 p-4 focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button className="w-full bg-brand-orange text-white py-5 font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-gray-dark pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-brand-orange p-1.5 rounded">
                <Fence className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                CFM <span className="text-brand-orange">FENCE SOLUTIONS</span>
              </span>
            </div>
            <p className="text-brand-gray max-w-sm mb-8">
              Providing premium fencing solutions with industrial strength and residential elegance. Your security is our commitment.
            </p>
            <div className="flex space-x-4">
              {['FB', 'TW', 'IG', 'LI'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-brand-gray-dark flex items-center justify-center text-brand-light hover:bg-brand-orange hover:text-white transition-all font-bold text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-brand-gray hover:text-brand-orange transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Services</h4>
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

        <div className="border-t border-brand-gray-dark pt-8 flex flex-col md:row justify-between items-center text-brand-gray text-xs uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} CFM Fence Solutions. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
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
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

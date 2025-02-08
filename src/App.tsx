import React, { useState, useEffect } from 'react';
import { Sun, Moon, Phone, Building2, Target, Heart, Lightbulb, Shield, Sparkles, Menu, X } from 'lucide-react';

function YakutiLogo() {
  return (
    <div className="flex flex-col items-center relative">
    <img
      src={"/public/images/yakuti-logo.jpg"}
      alt="Yakuti Logo"
      className="h-20 w-20 max-w-full"
    />
  </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'vision-mission', label: 'Vision & Mission' },
    { id: 'values', label: 'Our Values' },
    { id: 'what-we-do', label: 'What We Do' },
  ];

  const isActive = (id: string) => activeSection === id;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <YakutiLogo />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-2 transition-colors ${
                    isActive(item.id)
                      ? 'text-maroon-800 dark:text-maroon-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-maroon-800 dark:hover:text-maroon-400'
                  }`}
                >
                  {item.label}
                  {isActive(item.id) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-maroon-800 dark:bg-maroon-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="tel:0700149095"
                className="hidden md:flex items-center gap-2 bg-maroon-800 text-white px-4 py-2 rounded-full hover:bg-maroon-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0700149095</span>
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-4 shadow-lg animate-fade-in">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative py-2 transition-colors ${
                      isActive(item.id)
                        ? 'text-maroon-800 dark:text-maroon-400 font-semibold pl-4 border-l-2 border-maroon-800 dark:border-maroon-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-maroon-800 dark:hover:text-maroon-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="tel:0700149095"
                  className="flex items-center gap-2 bg-maroon-800 text-white px-4 py-2 rounded-full hover:bg-maroon-700 transition-colors w-fit"
                >
                  <Phone className="w-4 h-4" />
                  <span>0700149095</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in leading-tight">
            Building Bridges to <span className="text-maroon-800 dark:text-maroon-400">Success</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-delay leading-relaxed">
            Connecting innovative companies with their end users through strategic sales, marketing, and business development solutions.
          </p>
          <button
            onClick={() => scrollToSection('what-we-do')}
            className="bg-maroon-800 text-white px-8 py-3 rounded-full hover:bg-maroon-800 transition-colors animate-fade-in-delay shadow-lg hover:shadow-xl"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who We Are</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Yakuti SMB is a Sales, Marketing, and Business Development consultancy based in Kenya. We are driven by a passion for discovering exceptional products and services, and our mission is to build bridges that connect innovative companies with their end users.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl animate-slide-in-right transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src={"/public/images/business-meeting.jpg"}
                alt="Team collaboration"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-20 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Target className="w-12 h-12 text-maroon-800 dark:text-maroon-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vision</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To make our client's dreams come true.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Heart className="w-12 h-12 text-maroon-800 dark:text-maroon-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mission</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At Yakuti SMB, we believe that founders and innovators create products and services with the potential to transform lives. Our mission is to be the bridge that connects these visionary companies with their customers.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl animate-fade-in transform hover:scale-105 transition-transform duration-300">
              <Shield className="w-12 h-12 text-maroon-800 dark:text-maroon-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe in honest, transparent and authentic working relationships, providing a safe work environment and being a reliable business partner.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl animate-fade-in transform hover:scale-105 transition-transform duration-300 delay-100">
              <Lightbulb className="w-12 h-12 text-maroon-800 dark:text-maroon-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Simplicity</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe in making interactions and communications as simple as possible, focusing on solutions that are easy to understand and use.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl animate-fade-in transform hover:scale-105 transition-transform duration-300 delay-200">
              <Sparkles className="w-12 h-12 text-maroon-800 dark:text-maroon-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Passion</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We are passionate about our clients' products and services, which drives us to excel in helping them reach their market effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl animate-slide-in-left transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src={"/public/images/what-we-do.jpg"}
                alt="Business meeting"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What We Do</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We partner with founders and managers to uncover the unique value propositions of their products and services. Together, we create simple, practical, and executable strategies that ensure these innovations reach their intended users, driving meaningful impact and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="relative mb-6 md:mb-0">
              <YakutiLogo />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-maroon-300" />
                <span>Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-maroon-400" />
                <a href="tel:0700149095" className="hover:text-maroon-400 transition-colors">0700149095</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
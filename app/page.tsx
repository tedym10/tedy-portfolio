'use client';
import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Code, Server, Monitor, MessageSquare, Zap, User, Briefcase, Phone, Star, Sparkles, Rocket, Heart, Coffee, Eye, Users, ChevronDown, MapPin, Calendar, Send, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  status: 'Live' | 'Completed';
  image: string;
}

interface TechStackItem {
  name: string;
  icon: string;
  category: string;
  level: number;
}

interface Skill {
  name: string;
  description: string;
  icon: string;
}

interface ParticlePosition {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const generateParticlePositions = (): ParticlePosition[] => {
      const positions: ParticlePosition[] = [];
      for (let i = 0; i < 20; i++) {
        const seed = i * 12345;
        const seededRandom = (offset: number) => {
          const x = Math.sin(seed + offset) * 10000;
          return x - Math.floor(x);
        };
        
        positions.push({
          left: seededRandom(1) * 100,
          top: seededRandom(2) * 100,
          delay: seededRandom(3) * 2,
          duration: 2 + seededRandom(4) * 3
        });
      }
      return positions;
    };

    setParticlePositions(generateParticlePositions());
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack: TechStackItem[] = [
    { name: 'JavaScript (ES6+)', icon: '🟨', category: 'Frontend', level: 90 },
    { name: 'React', icon: '⚛️', category: 'Frontend', level: 95 },
    { name: 'Next.js', icon: '▲', category: 'Frontend', level: 85 },
    { name: 'HTML5/CSS3', icon: '🌐', category: 'Frontend', level: 90 },
    { name: 'Node.js', icon: '🟢', category: 'Backend', level: 80 },
    { name: 'Express', icon: '🚂', category: 'Backend', level: 75 },
    { name: 'MySQL', icon: '🗄️', category: 'Database', level: 70 },
    { name: 'Git & GitHub', icon: '📦', category: 'Tools', level: 85 },
  ];

  const projects: Project[] = [
    {
      title: 'Stock Management System',
      description: 'A full-stack application for inventory tracking built with React, Node.js, and MySQL. Features real-time inventory updates, user authentication, and comprehensive reporting.',
      tech: ['Next.js', 'Nest.js', 'MySQL', 'Express'],
      github: 'https://tade1.vercel.app/',
      demo: 'https://tade1.vercel.app/',
      status: 'Live',
      image: '📊'
    },
    {
      title: 'Haik City Government Website',
      description: 'A responsive and accessible website for Haik City Government using Next.js. Focused on user experience and government service accessibility.',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/tedym10/haik-city-adminstration-website.git',
      demo: '#',
      status: 'Completed',
      image: '🏛️'
    }
  ];

  const skills: Skill[] = [
   { name: 'Problem Solving', description: 'Debugging complex issues and optimizing performance', icon: '🔧' },
   { name: 'Technical Support', description: 'Helping teams troubleshoot and implement solutions', icon: '🛠️' },
    { name: 'Clean Code Advocate', description: 'Writing maintainable and scalable code', icon: '✨' }
 ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CursorFollower = () => (
    <div
      className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 opacity-50 transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        transform: 'scale(0.8)',
      }}
    />
  );

  const FloatingParticles = () => {
    if (particlePositions.length === 0) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden">
      <CursorFollower />
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20 transition-all duration-300 hover:bg-black/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              <span>Tedy Geste</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 hover:scale-110 relative group ${
                    activeSection === section ? 'text-purple-400 border-b-2 border-purple-400' : ''
                  }`}
                >
                  {section}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-purple-300 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-slate-900/95 backdrop-blur-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-full text-left capitalize block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-purple-900/50 text-purple-300' 
                    : 'text-gray-300 hover:bg-purple-800/30 hover:text-purple-200'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>
        </div>
        
        <div className={`text-center z-10 max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
           <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1 hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-slate-700 group-hover:border-purple-400 transition-colors duration-300">
                  <Image
                    src="/profile.jpg"
                    alt="Tedy Geste"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
              Hey there, I&apos;m Tedy Geste! 👋
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-4xl font-light text-purple-200 mb-8 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
              <Code className="w-6 h-6 md:w-8 md:h-8 animate-bounce" />
              <span>JavaScript | React | Next.js Developer</span>
              <Rocket className="w-6 h-6 md:w-8 md:h-8 animate-bounce delay-300" />
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating modern web applications with clean, scalable code. 
              I specialize in React, Next.js, and full-stack JavaScript development.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="group px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Eye className="w-5 h-5 group-hover:animate-pulse" />
              <span>View My Work</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="group px-6 py-3 md:px-8 md:py-4 border-2 border-purple-400 rounded-full font-semibold text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <MessageSquare className="w-5 h-5 group-hover:animate-bounce" />
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <User className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
            <span>About Me</span>
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-400 animate-pulse" />
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 md:mb-6 flex items-center space-x-2">
                  <Coffee className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                  <span>👨‍💻 About Me</span>
                </h3>
                <div className="space-y-3 md:space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                  <p>
                    I&apos;m <span className="text-white font-semibold">Tedy</span>, a passionate <span className="text-purple-300 font-semibold">JavaScript | React | Next.js Developer</span> with experience building robust web applications. I thrive on turning complex problems into elegant solutions, whether it&apos;s debugging tricky code or optimizing performance.
                  </p>
                  
                  <div className="space-y-2 md:space-y-3">
                    <h4 className="text-purple-300 font-semibold flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>🔹 What I Do</span>
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Develop full-stack applications with <span className="text-white font-medium">React, Next.js, and Node.js</span></span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span>Build scalable systems like my <span className="text-white font-medium">Stock Management System</span> (Next.js + Nest.js + MySQL)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                        <span>Contribute to impactful projects like the <span className="text-white font-medium">Haik City Government Website</span> (Next.js)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>Provide <span className="text-white font-medium">technical support</span> and problem-solving expertise to teams</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <h4 className="text-purple-300 font-semibold flex items-center space-x-2">
                      <Rocket className="w-4 h-4" />
                      <span>🔹 Why I Code</span>
                    </h4>
                    <p className="text-xs md:text-sm">
                      I believe in clean, maintainable code that solves real-world problems. When I&apos;m not coding, I&apos;m either learning new tech or helping others debug their way to success.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 md:p-4 border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300">
                    <h4 className="text-purple-300 font-semibold mb-1 md:mb-2 flex items-center space-x-2">
                      <Star className="w-4 h-4 animate-spin" />
                      <span>🔹 Fun Fact</span>
                    </h4>
                    <p className="text-xs md:text-sm">
                      I can troubleshoot a bug while drinking coffee ☕️ <em>and</em> keeping my sanity intact!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
  <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 md:mb-6 flex items-center space-x-2">
    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
    <span>🌟 My Skills</span>
  </h3>
  <div className="grid grid-cols-1 gap-3">
    {skills.map((skill, index) => (
      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
        <span className="text-xl">{skill.icon}</span>
        <div>
          <h4 className="font-semibold text-white">{skill.name}</h4>
          <p className="text-sm text-gray-300">{skill.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 md:mb-6 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                  <span>🎯 Key Strengths</span>
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
                    <span className="text-lg md:text-xl">🔧</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">Problem Solver</h4>
                      <p className="text-xs md:text-sm text-gray-300">Debugging is my superpower.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
                    <span className="text-lg md:text-xl">👁️</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">Detail-Oriented</h4>
                      <p className="text-xs md:text-sm text-gray-300">Obsessed with pixel-perfect UIs and efficient backends.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
                    <span className="text-lg md:text-xl">🤝</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">Collaborative</h4>
                      <p className="text-xs md:text-sm text-gray-300">Love working with teams to ship impactful products.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 md:mb-6 flex items-center space-x-2">
                  <Server className="w-5 h-5 md:w-6 md:h-6" />
                  <span>🛠️ Tech Stack</span>
                </h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] group">
                      <div className="flex items-center justify-between mb-1 md:mb-2">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                          <div>
                            <div className="font-semibold text-white text-sm md:text-base">{tech.name}</div>
                            <div className="text-xs md:text-sm text-purple-300">{tech.category}</div>
                          </div>
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">{tech.level}%</div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 md:h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 md:h-2 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse"
                          style={{ width: `${tech.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <Monitor className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
            <span>🚀 Featured Projects</span>
            <Code className="w-8 h-8 md:w-12 md:h-12 text-pink-400" />
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] group">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="text-4xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-1 ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${project.status === 'Live' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`}></div>
                    <span>{project.status}</span>
                  </span>
                </div>
                
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-0.5 md:px-3 md:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm font-medium hover:bg-purple-500/30 transition-colors duration-300 hover:scale-105">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3 md:space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 md:space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 group text-xs md:text-sm"
                  >
                    <Github size={14} className="group-hover:animate-spin" />
                    <span>Code</span>
                  </a>
                  {project.demo !== '#' && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 md:space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 hover:scale-105 group text-xs md:text-sm"
                    >
                      <ExternalLink size={14} className="group-hover:animate-bounce" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <Mail className="w-8 h-8 md:w-12 md:h-12 text-purple-400 animate-bounce" />
            <span>📫 Let&apos;s Connect!</span>
            <Phone className="w-8 h-8 md:w-12 md:h-12 text-pink-400 animate-pulse" />
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and collaborations. 
            Whether you have a project in mind or just want to chat about tech, feel free to reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center flex-wrap">
            <a 
              href="mailto:ltedy45@gmail.com"
              className="group flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              <Mail size={16} className="group-hover:animate-bounce" />
              <span>ltedy45@gmail.com</span>
            </a>
            <a 
              href="tel:+251930997346"
              className="group flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-white shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              <Phone size={16} className="group-hover:animate-ping" />
              <span>+251 930 997 346</span>
            </a>
            <a 
              href="https://t.me/Tedy_10"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              <Send size={16} className="group-hover:animate-pulse" />
              <span>Telegram</span>
            </a>
            
            <a 
              href="https://github.com/tedym10"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 border-2 border-purple-400 rounded-full font-semibold text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 text-sm md:text-base"
            >
              <Github size={16} className="group-hover:animate-spin" />
              <span>GitHub Profile</span>
            </a>
          </div>
          
          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300">
            <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3 md:mb-4 flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span>Quick Info</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center justify-center space-x-1 md:space-x-2 text-gray-300">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span>Available for projects</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2 text-gray-300">
                <Zap className="w-3 h-3 md:w-4 md:h-4" />
                <span>Quick responder</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2 text-gray-300">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span>Team player</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs md:text-sm flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2">
            <span>© 2025 Tedy Geste. Built with Next.js, TypeScript &amp; Tailwind CSS</span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400 animate-pulse" />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

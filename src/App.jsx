import React from 'react';
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ExternalLink, Github, Linkedin, MessageSquare, Code, Server, Monitor, Database, Layers, Cloud, Network, BookOpen, GraduationCap, Mail, Phone, Calendar, Download } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function AnupPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    message: '',
    success: null
  });

  // Effect for detecting active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      // Update scrolled state for navbar styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Education", section: "education" },
    { name: "Contact", section: "contact" },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission with EmailJS
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: '', success: null });

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        message: 'Please fill out all fields.',
        success: false
      });
      return;
    }

    // EmailJS configuration from environment variables
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIDToOwner = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TO_OWNER;
    const templateIDToSender = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TO_SENDER;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    // Send email to owner
    emailjs.send(serviceID, templateIDToOwner, {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }, userID)
      .then(() => {
        // Send confirmation email to sender
        return emailjs.send(serviceID, templateIDToSender, {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }, userID);
      })
      .then(() => {
        setFormStatus({
          loading: false,
          message: 'Message sent successfully! You will receive a confirmation email shortly.',
          success: true
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setFormStatus({
          loading: false,
          message: 'Failed to send message. Please try again later.',
          success: false
        });
      });
  };

  // Projects data
  const projects = [
    {
      title: "Study Buddy (Study Material App)",
      description: "Centralized mobile app providing notes, syllabus, and previous year question papers (PYQs) for all RGPV branches and semesters.",
      stack: ["Flutter", "Dart", "Firebase"],
      image: "https://res.cloudinary.com/dlen26ceb/image/upload/v1755330495/Study_Buddy_fjza5n.jpg", // replace with actual if available
      // Github: "https://github.com/anupks5942/study-material-app",
      downloadLink: "https://drive.google.com/file/d/19JUYiycRBap12UgAlnp1m2KPio-ANXjq/view?usp=sharing"
    },
    {
      title: "Learning Management System (LMS)",
      description: "Full-stack LMS with course creation, lecture uploads, student enrollment, and search/filtering capabilities.",
      stack: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "Provider"],
      image: "https://res.cloudinary.com/dlen26ceb/image/upload/v1755330495/LMS_upidfk.jpg", // replace with actual if available
      // Github: "https://github.com/anupks5942/lms-frontend",
      downloadLink: "https://drive.google.com/file/d/1LlpSyXbjEWFVw-rndufdBIgQgPOQCQC1/view?usp=sharing"
    },
    {
      title: "GeoTrack (Location Tracking App)",
      description: "Location-based attendance tracking app that automates employee check-ins and check-outs using geofencing.",
      stack: ["Flutter", "Dart", "Firebase", "Geofencing"],
      image: "https://res.cloudinary.com/dlen26ceb/image/upload/v1755330495/GeoTrack_emstnp.jpg",
      // Github: "",
      downloadLink: "https://drive.google.com/file/d/1c5cO3Ua_-GYaEo4y4mjWLptKzcjgeEqg/view?usp=sharing"
    },
    // {
    //   title: "Telemedicine App",
    //   description: "Videoconferencing app for doctors and patients with appointment booking, chat, video/voice calling, and integrated ML features.",
    //   stack: ["Flutter", "Dart", "Firebase", "Deep Learning"],
    //   image: "https://raw.githubusercontent.com/yogesh-soni-4/Face-Detection/main/sample.png", // placeholder
    //   Github: "https://github.com/yogesh-soni-4/Face-Detection/tree/main"
    // },
    // {
    //   title: "KO Captain (Logistics App)",
    //   description: "Mobile logistics management app with real-time CSV uploads (Socket.io), API integration, and null-safe state management.",
    //   stack: ["Flutter", "Dart", "Firebase", "Node.js", "Socket.io", "Provider"],
    //   image: "/api/placeholder/400/300",
    //   Github: "" // add repo link if public
    // },
    // {
    //   title: "Stockship (Inventory Management Web App)",
    //   description: "Web-based inventory management system with real-time data sync and Firebase backend integration.",
    //   stack: ["Flutter (Web)", "Node.js", "Firebase"],
    //   image: "/api/placeholder/400/300",
    //   Github: "" // add repo link if public
    // }
  ];

  const educationData = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'RGPV University, Bhopal',
      duration: '2022 - Present',
      cgpa: '7.89',
      coursework: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems'],
      icon: <GraduationCap size={24} />,
    },
    {
      degree: '12th Grade (Higher Secondary)',
      institution: 'Kendriya Vidyalaya, Betul',
      duration: '2022',
      percentage: '92%',
      icon: <BookOpen size={24} />,
    },
    {
      degree: '10th Grade (Secondary)',
      institution: 'Kendriya Vidyalaya, Betul',
      duration: '2020',
      percentage: '86.2%',
      icon: <BookOpen size={24} />,
    },
  ];

  // Skills data
  const skills = [
    {
      category: 'Languages',
      icon: <Code size={24} />,
      items: ['Dart', 'JavaScript', 'C/C++', 'Python'],
    },
    {
      category: 'Frontend & Mobile',
      icon: <Monitor size={24} />,
      items: ['Flutter', 'Responsive UI/UX', 'Provider'],
    },
    {
      category: 'Backend',
      icon: <Server size={24} />,
      items: ['Node.js', 'Express.js', 'Firebase', 'REST APIs'],
    },
    {
      category: 'Databases',
      icon: <Database size={24} />,
      items: ['MongoDB', 'SQL', 'Firebase Firestore'],
    },
    {
      category: 'Tools & Others',
      icon: <Layers size={24} />,
      items: ['Git', 'GitHub', 'State Management', 'Socket.io', 'Machine Learning'],
    },
  ];

  // Experience data
  const experiences = [
    {
      role: "Flutter Developer Intern",
      company: "VortexV",
      period: "May 2025 – Present",
      responsibilities: [
        "Built responsive mobile apps with Flutter & Dart, integrating REST APIs and modern UI/UX components.",
        "Collaborated in a version-controlled team using Git/GitHub.",
        "Contributed to scalable, full-stack app development."
      ]
    },
    {
      role: "Flutter Developer Intern",
      company: "Katyayani Organics",
      period: "Nov 2024 – May 2025",
      responsibilities: [
        "Built KO-Captain (mobile) and Stockship (web) apps using Flutter, Node.js, and Firebase.",
        "Handled UI, API integration, real-time CSV uploads with Socket.io, and Provider state management.",
        "Ensured stability with null-safe models and earned praise from senior developers."
      ]
    }
  ];

  return (
    <div className="font-sans bg-gray-900 text-gray-100">
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">AKS</a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`${activeSection === link.section
                  ? "text-purple-400 font-medium"
                  : "text-gray-300 hover:text-purple-400"
                  } transition-colors duration-300`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-purple-400 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md py-2 px-4 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`block w-full text-left py-2 px-4 ${activeSection === link.section
                  ? "text-purple-400 font-medium bg-gray-700/50"
                  : "text-gray-300 hover:bg-gray-700/30"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center bg-gray-900 pt-20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>

        {/* Animated circles in background */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 py-12 md:flex items-center justify-between relative z-10">
          <div className="w-full md:w-3/4 mb-12 md:mb-0">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm">
              Full-Stack Developer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 text-5xl md:text-6xl">Anup Kumar Soni</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
              Full-Stack Innovator Building Scalable Systems and Cutting-Edge Interfaces
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I craft scalable mobile and web applications using Flutter, Firebase, Node.js/Express, and REST APIs, with a strong focus on responsive UI/UX and modern state management. My expertise spans backend integration, real-time features with Socket.io, and efficient database handling using MongoDB and SQL. Passionate about innovation, I also explore machine learning applications, from chatbots to disease detection, to build impactful, user-centric solutions.
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col space-y-4 md:pl-8">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md shadow-purple-700/20 text-lg"
            >
              Explore Projects
              <ArrowRight size={20} className="ml-2" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full px-6 py-4 border border-purple-500 text-purple-400 rounded-md hover:bg-purple-500/10 transition-colors duration-300 text-lg flex items-center justify-center"
            >
              Get in Touch
              <MessageSquare size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">About Me</span>
          </h2>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dlen26ceb/image/upload/v1712827130/mvh1wym0xcobe7wb1htx.jpg"
                  alt="Anup Kumar Soni"
                  className="rounded-full shadow-2xl w-56 h-56 object-cover border-4 border-purple-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-12">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Versatile Flutter & Full-Stack Developer with experience in building scalable mobile and web applications using Flutter, Firebase, Node.js, and REST APIs. Skilled at crafting high-performance UI/UX with modern state management (Provider) and integrating secure, real-time features such as Socket.io. Strong foundation in Data Structures & Algorithms with hands-on project and internship experience.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Passionate about developing impactful applications, I have worked on projects ranging from Study Buddy and Learning Management System to Telemedicine and logistics solutions (KO Captain & Stockship). With proficiency in Git/GitHub collaboration, backend integration, and machine learning applications, I strive to deliver efficient, user-centric, and reliable software solutions.
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                    Won College-level Summer of Code Competition 2024
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                    Won Branch Master Competition 2024
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                    Solved 350+ DSA problems on LeetCode and GFG
                  </li>
                </ul>
              </div>
              <div className="flex space-x-4 mt-6">
                <a href="/Anup_Campus_Resume.pdf" target='_blank' className="text-purple-400 hover:text-purple-300 flex items-center">
                  Download Resume <ArrowRight size={16} className="ml-1" />
                </a>
                <div className="flex space-x-3">
                  <a href="https://github.com/anupks5942" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Github size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/anup-kumar-soni-104b66263/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Linkedin size={22} />
                  </a>
                  <a href="https://www.geeksforgeeks.org/user/anupkumarkvo8/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Code size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Technical Skills</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <div
                key={index}
                className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-xl group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <span className="text-purple-400 mr-3 group-hover:text-purple-300 transition-colors duration-300">{skillCategory.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{skillCategory.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-300 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 border border-purple-700/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Work Experience</span>
          </h2>
          <div className="space-y-16 max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:ml-auto md:pl-8 md:pr-0 md:text-left' : 'md:mr-auto md:pr-8 md:pl-0 md:text-right'} pl-16 md:w-1/2`}>
                {/* Timeline dot */}
                <div className="absolute left-7 md:left-1/2 top-0 w-3 h-3 rounded-full bg-purple-500 transform md:translate-x-px translate-y-1.5 md:-translate-x-1.5 shadow-md shadow-purple-500/50"></div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm">
                    {exp.period}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">{exp.role}</h3>
                  <p className="text-gray-300 font-medium mb-4">{exp.company}</p>
                  <ul className={`space-y-2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-400">
                        <span className={`mr-2 text-purple-400 font-bold mt-1 ${index % 2 === 1 ? 'md:hidden' : ''}`}>•</span>
                        <span>{item}</span>
                        <span className={`ml-2 text-purple-400 font-bold mt-1 ${index % 2 === 1 ? 'hidden md:inline-block' : 'hidden'}`}>•</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Featured Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/api/placeholder/400/300"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4 h-24 overflow-hidden">{project.description}</p>
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-900/20 border border-purple-700/20 text-purple-300 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    {/* <a
                      href={project.Github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 flex items-center text-sm transition-colors"
                    >
                      <Github size={16} className="mr-2" /> View Code
                    </a> */}
                    <a
                      href={project.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 flex items-center text-sm transition-colors"
                    >
                      <Download size={16} className="mr-2" /> Download App
                    </a>
                    {/* {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 flex items-center text-sm transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </a>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Education</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>

                {/* Decorative circle in background */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-purple-600/5 group-hover:bg-purple-600/10 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 mr-3 group-hover:text-purple-300 transition-colors duration-300">{edu.icon}</span>
                    <h3 className="text-xl font-semibold text-purple-400">{edu.degree}</h3>
                  </div>
                  <p className="text-gray-300 font-medium">{edu.institution}</p>
                  <p className="text-gray-400 mb-4">{edu.duration}</p>
                  {edu.cgpa && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-purple-400">CGPA:</strong> {edu.cgpa}
                    </p>
                  )}
                  {edu.percentage && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-purple-400">Percentage:</strong> {edu.percentage}
                    </p>
                  )}
                  {edu.coursework && (
                    <div>
                      <h4 className="text-md font-semibold text-purple-300 mb-3">Relevant Coursework:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-3 py-1 bg-purple-900/30 border border-purple-700/30 text-purple-300 rounded-full text-sm font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Get In Touch</span>
          </h2>
          <div className="md:flex md:space-x-8 justify-center items-center">
            {/* <div className="md:w-1/2 mb-8 md:mb-0">
              <form onSubmit={handleFormSubmit} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-700">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                {formStatus.message && (
                  <p className={`mb-4 text-center ${formStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {formStatus.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className={`w-full py-3 rounded-md flex items-center justify-center shadow-md transition-all duration-300 ${formStatus.loading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-purple-700/20'
                    }`}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                  {!formStatus.loading && <MessageSquare size={18} className="ml-2" />}
                </button>
              </form>
            </div> */}
            <div className="md:w-1/2">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-700 h-full">
                <h3 className="text-xl font-semibold mb-6 text-purple-400">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail size={20} className="text-purple-400 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-300 mb-1">Email</p>
                      <a href="mailto:anupsoni404@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                        anupsoni404@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone size={20} className="text-purple-400 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-300 mb-1">Phone</p>
                      <a href="tel:+919644365693" className="text-purple-300 hover:text-purple-200 transition-colors">
                        +91 9691379799
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar size={20} className="text-purple-400 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-300 mb-1">Availability</p>
                      <p className="text-gray-400">Open to freelance projects and full-time opportunities. Let's discuss how I can contribute to your team or project!</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300 mb-3">Connect</p>
                    <div className="flex space-x-4">
                      <a href="https://github.com/anupks5942" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-700/80">
                        <Github size={20} />
                      </a>
                      <a href="https://www.linkedin.com/in/anup-kumar-soni-104b66263" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-700/80">
                        <Linkedin size={20} />
                      </a>
                      <a href="https://www.geeksforgeeks.org/user/anupkumarkvo8/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-700/80">
                        <Code size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/80 text-gray-300 py-8 border-t border-gray-700/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="mb-2">© {new Date().getFullYear()} Anup Kumar Soni. All rights reserved.</p>
              <p className="text-sm text-gray-400">Full-Stack Developer specializing in scalable systems and modern interfaces</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/anupks5942/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/anup-kumar-soni-104b66263/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.geeksforgeeks.org/user/anupkumarkvo8/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Code size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
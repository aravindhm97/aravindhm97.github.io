import React, { useState, useEffect } from "react";

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const jobTitles = [
    "Data Engineer",
    "Big Data Specialist",
    "Cloud Data Engineer",
    "ETL Developer",
    "AWS Data Engineer"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const current = jobTitles[loopNum % jobTitles.length];
    let timeout;

    if (!isDeleting && currentTitle === '') {
      // Start typing
      setTypingSpeed(150);
      setCurrentTitle(current.slice(0, 1));
    } else if (!isDeleting && currentTitle.length < current.length) {
      // Typing
      timeout = setTimeout(() => {
        setCurrentTitle(current.slice(0, currentTitle.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && currentTitle.length === current.length) {
      // Pause before deleting
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentTitle.length > 0) {
      // Deleting
      setTypingSpeed(70);
      timeout = setTimeout(() => {
        setCurrentTitle(current.slice(0, currentTitle.length - 1));
      }, typingSpeed);
    } else if (isDeleting && currentTitle.length === 0) {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timeout);
  }, [currentTitle, isDeleting, loopNum, typingSpeed, jobTitles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: "https://linkedin.com/in/aravindhkumar-m1997", 
      color: "text-blue-400 hover:text-blue-300",
      icon: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: "https://instagram.com", 
      color: "text-pink-400 hover:text-pink-300",
      icon: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.378 0 12.009c-.029 6.612 5.378 11.99 11.99 11.99 6.64 0 12.009-5.378 12.009-11.99 0-6.64-5.369-12.009-12.01-12.009zm9.548 12.01c0 5.273-4.262 9.548-9.535 9.548-5.287 0-9.548-4.275-9.548-9.548 0-5.287 4.261-9.548 9.548-9.548 5.273 0 9.535 4.261 9.535 9.548zm-15.191 0c0 2.559 2.084 4.632 4.643 4.632s4.643-2.073 4.643-4.632c0-2.572-2.084-4.643-4.643-4.643s-4.643 2.071-4.643 4.643zm13.623 6.374c-.316 1.264-1.477 2.271-2.887 2.271-1.423 0-2.597-1.007-2.899-2.271-.014.084-.014.168-.014.252 0 2.914 2.37 5.285 5.285 5.285.084 0 .168-.014.252-.014 1.41 0 2.572-1.007 2.887-2.271.316-1.264.014-2.687-.014-2.771-.014-.084-.014-.168-.014-.252 0-2.914-2.37-5.285-5.285-5.285-.084 0-.168.014-.252.014-1.41 0-2.572 1.007-2.887 2.271-.316 1.264-.014 2.687.014 2.771.014.084.014.168.014.252zm-7.6-10.86c-.911 0-1.65.739-1.65 1.65s.739 1.65 1.65 1.65 1.651-.739 1.651-1.65-.739-1.65-1.651-1.65z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: "https://facebook.com", 
      color: "text-blue-500 hover:text-blue-400",
      icon: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: "https://github.com", 
      color: "text-gray-300 hover:text-white",
      icon: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.073c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    }
  ];

  const experiences = [
    {
      company: "Huawei Technologies India Pvt. Ltd. (via Ionidea)",
      role: "Senior Software Engineer",
      period: "Jun 2022 – Dec 2022",
      location: "Bangalore",
      achievements: [
        "Led full-cycle ETL pipeline delivery for Singapore, Russia, and Europe regions, serving 5M+ users daily with 99.9% uptime while streamlining pipeline runtime by 50% through optimization of Spark configurations and partitioning strategies.",
        "Spearheaded major production migration for European region, resolving 12+ Hadoop component mismatches across 15+ nodes and ensuring seamless transition with zero data loss and zero downtime during business hours.",
        "Decommissioned 15+ redundant workflows and implemented storage optimization techniques, decreasing monthly storage usage by 2TB while maintaining data accessibility for analytics teams.",
        "Implemented automated validation framework for code reviews, lessened review comments and production defects by 30% and cutting average review time from 4 hours to 2.5 hours per pull request.",
        "Designed proof of concepts for 8+ new requirements, optimizing development time by 15% through reusable templates and standardized implementation patterns.",
        "Awarded Best Contribution Award twice for automation initiatives that enhanced system stability and optimizing manual intervention by 70%."
      ]
    },
    {
      company: "Huawei Technologies India Pvt. Ltd. (via Ionidea)",
      role: "Software Engineer & Associate",
      period: "Jun 2019 – Jun 2022",
      location: "Bangalore",
      achievements: [
        "Developed 15+ personalized recommendation workflows using Spark and Hive, processing 10TB+ of user behavior data daily to improve content discovery for 3M+ users.",
        "Automated data validation and cleansing processes using Unix Shell scripts, reducing manual validation time from 8 hours to 1 hour per workflow and improving data quality by 25%.",
        "Created comprehensive Low-Level Design (LLD) and Deployment Guide documentation for 20+ production deployments, decreasing deployment failures by 40% and onboarding time for new team members by 35%.",
        "Mentored 2+ junior engineers on Spark optimization techniques, improving team throughput by 20%.",
        "Resolved 95% of critical production defects within 24 hours, maintaining system availability of 99.85% across all monitored services.",
        "Collaborated with BI and CI teams to create an automated deployment pipeline, integrating a codebase check tool that improved deployment process efficiency by 20% and reducing deployment failures by 35%.",
        "Maintained code repositories in Git and SVN for 3+ projects with 10+ team members, implementing branching strategies that lowered merge conflicts by 60%."
      ]
    }
  ];

  const projects = [
    {
      title: "Query Copilot: Natural Language to Athena SQL",
      year: "2025",
      description: "Built NLP tool converting English questions to SQL for Amazon Athena, enabling business users to self-serve data insights. Reduced average query time from 2 hours to 15 minutes for 25+ business users through intuitive Streamlit interface. Automated infrastructure deployment using Terraform, provisioning S3 buckets, IAM roles, Glue Catalogs, and Athena workgroups for seamless scalability.",
      technologies: ["AWS", "Athena", "NLP", "Streamlit", "Terraform"],
      impact: "Reduced query time by 87.5%, automated infrastructure deployment"
    },
    {
      title: "Data Lake Scanner: Metadata Explorer for S3",
      year: "2025",
      description: "Created a Lambda-based serverless crawler to automatically scan, parse, and extract schema/metadata from S3 datasets. Stored and indexed extracted metadata in DynamoDB for instant search, enabling data discovery that previously took 4 hours to complete in under 30 seconds. Delivered a lightweight React frontend for visual exploration of S3 data assets, adopted by 15+ data analysts to reduce data discovery time by 75%.",
      technologies: ["Lambda", "S3", "DynamoDB", "React", "Serverless"],
      impact: "Reduced data discovery time from 4 hours to under 30 seconds, adopted by 15+ data analysts"
    },
    {
      title: "ETL-to-Email Bot: Daily Summary Reporter",
      year: "2025",
      description: "Designed and launched a serverless reporting pipeline using Athena, Lambda, and SES that processes 5GB+ of daily logs across 10 data sources. Automated extraction of 8+ core metrics (e.g., failed logins, new users) and distribution of custom HTML reports to 30+ stakeholders, saving 15+ hours of manual effort weekly. Optimized system for AWS Free Tier, achieving 'zero-ops' maintenance while processing 200+ reports monthly with 99.95% delivery success rate.",
      technologies: ["Lambda", "Athena", "SES", "Serverless", "AWS"],
      impact: "Saved 15+ hours of manual effort weekly, processing 200+ reports monthly with 99.95% delivery success rate"
    }
  ];

  const skills = [
    { category: "Big Data", items: ["Hadoop", "Spark", "Kafka", "Hive", "Sqoop", "YARN", "MapReduce"] },
    { category: "Cloud Platforms", items: ["AWS", "Snowflake", "Docker", "S3", "Glue", "Athena", "EC2", "IAM"] },
    { category: "Programming", items: ["Python", "SQL", "Shell Scripting", "JSON", "Unix"] },
    { category: "Databases", items: ["RDBMS", "MySQL", "Redis", "Parquet"] },
    { category: "Tools", items: ["Git", "SVN", "Agile", "Data Warehousing", "Putty", "WinSCP"] }
  ];

  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "TKS College of Technology",
      period: "Jun 2014 – Apr 2018",
      grade: "CGPA: 6.5/10"
    },
    {
      degree: "Higher Secondary Education",
      institution: "Z.K.M.Hr.Sec.School",
      period: "Jun 2012 – May 2014",
      grade: "66%"
    },
    {
      degree: "Secondary School Education",
      institution: "Z.K.M.Hr.Sec.School",
      period: "Jun 2011 – Jun 2012",
      grade: "80.6%"
    }
  ];

  const awards = [
    "3x Best Contribution Award - Huawei Technologies India Pvt. Ltd.",
    "Monthly Achievement Award - Huawei Technologies India Pvt. Ltd."
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 text-white shadow-xl border-r border-gray-800 fixed h-full overflow-y-auto hidden lg:block z-40">
        <div className="p-8">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <img
                src="https://placehold.co/150x150/6366f1/ffffff?text=AK"
                alt="Aravindh Kumar"
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-700 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20"></div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Aravindh Kumar</h1>
            <p className="text-purple-400 font-semibold">Data Engineer</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-gray-300">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">aravindhkumarm.1997@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">+91-9108806798</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Bangalore, India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} hover:scale-110 transition-transform duration-300 p-2 bg-gray-800 rounded-full hover:bg-purple-900`}
                title={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: 'home', label: 'Home', icon: 'M4 7v10c0 1.1.9 2 2 2h8a2 2 0 002-2V7M4 7l8-4 8 4M4 7l8 4 8-4' },
              { id: 'about', label: 'About', icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z' },
              { id: 'experience', label: 'Experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.6-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { id: 'skills', label: 'Skills', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              { id: 'education', label: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
              { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Awards */}
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-xl">
            <h3 className="font-semibold text-purple-400 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Awards & Recognition
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {awards.map((award, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-gray-900 text-white shadow-lg fixed top-0 w-full z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://placehold.co/40x40/6366f1/ffffff?text=AK"
              alt="Aravindh Kumar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold">Aravindh Kumar</h1>
              <p className="text-sm text-purple-400">Data Engineer</p>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className={`h-0.5 bg-gray-300 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`h-0.5 bg-gray-300 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`h-0.5 bg-gray-300 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-gray-900 border-t border-gray-800">
            <nav className="px-4 py-3 space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 pt-16 lg:pt-0">
        {/* Home Section */}
        <section id="home" className="min-h-screen relative">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://placehold.co/1600x900/4f46e5/ffffff?text=Professional+Portfolio')"
            }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div className="relative z-10 min-h-screen py-16 px-6 lg:px-12 flex items-center">
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Aravindh Kumar</span>
                </h1>
                
                <div className="text-2xl lg:text-3xl font-semibold text-purple-300 mb-8 h-12 flex items-center">
                  <span className="mr-2">{currentTitle}</span>
                  <span className="w-2 h-8 bg-purple-300 animate-pulse"></span>
                </div>
                
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  Results-driven Data Engineer with 3.5 years of experience in Big Data, ETL development, and Recommendation systems. 
                  Specialized in AWS cloud services and modern data engineering tools.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 transform flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Get In Touch</span>
                  </button>
                  <button 
                    onClick={() => scrollToSection('experience')}
                    className="border-2 border-purple-400 text-purple-400 bg-transparent hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.6-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>View Experience</span>
                  </button>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20">
                    <div className="text-3xl font-bold text-purple-300 mb-2">3.5+</div>
                    <div className="text-gray-200">Years Experience</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20">
                    <div className="text-3xl font-bold text-blue-300 mb-2">15+</div>
                    <div className="text-gray-200">Projects Completed</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20">
                    <div className="text-3xl font-bold text-green-300 mb-2">3x</div>
                    <div className="text-gray-200">Best Contribution Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
              About Me
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Results-driven Data Engineer with 3.5 years of experience in Big Data, ETL development, and Recommendation systems at Huawei. 
                Recently gained hands-on experience in core AWS cloud services and modern data engineering tools. 
                Demonstrated achievements in pipeline optimization (50% faster), production migration, and automation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Actively seeking opportunities in data engineering and cloud platforms where I can leverage my expertise in 
                Spark, Hadoop, AWS, and data pipeline optimization to deliver scalable and efficient data solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Awards & Recognition
                </h3>
                <ul className="space-y-3">
                  {awards.map((award, index) => (
                    <li key={index} className="text-gray-700 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {award}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                  </svg>
                  Key Achievements
                </h3>
                <ul className="space-y-3">
                  <li className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    50% faster pipeline runtime
                  </li>
                  <li className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    30% reduction in review time
                  </li>
                  <li className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    70% optimization of manual intervention
                  </li>
                  <li className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    99.9% system uptime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.6-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Experience
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{exp.role}</h3>
                      <p className="text-xl text-purple-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-gray-600 font-medium">{exp.period}</p>
                      <p className="text-gray-500 flex items-center justify-end mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Recent Projects
            </h2>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                        <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-semibold">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <p className="text-sm text-green-800 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Skills & Expertise
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    {index === 0 && (
                      <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-6 h-6 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 1.1.9 2 2 2h8a2 2 0 002-2V7M4 7l8-4 8 4M4 7l8 4 8-4" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5-3h3M15 21V3" />
                      </svg>
                    )}
                    <h3 className="text-xl font-bold text-gray-800">{skillGroup.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {skillGroup.items.map((skill, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg text-center hover:from-purple-100 hover:to-blue-100 transition-all duration-300">
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Education
            </h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-lg text-purple-600 font-semibold">{edu.institution}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-gray-600 font-medium">{edu.period}</p>
                      <p className="text-gray-500">{edu.grade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Email</p>
                        <p className="text-gray-600">aravindhkumarm.1997@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Phone</p>
                        <p className="text-gray-600">+91-9108806798</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Location</p>
                        <p className="text-gray-600">Bangalore, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Certifications</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span><strong>AWS Certified Cloud Practitioner</strong></span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span><strong>MOOCs and LinkedIn Learning</strong>—Data Engineering & Cloud</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Subject of your message"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 transform flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="text-xl font-bold">Aravindh Kumar</span>
            </div>
            <p className="text-gray-300 mb-4">
              Data Engineer specializing in Big Data, ETL development, and AWS cloud solutions.
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Aravindh Kumar. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;

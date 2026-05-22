import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Maxton LifeScience",
    type: "Full-time",
    duration: "Jan 2025 – Present",
    description: "Building scalable web applications for healthcare sector using React, Node.js, and MongoDB. Implemented responsive UI components and optimized API performance.",
    technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    role: "Web Developer",
    company: "Aayuvardan Lifescience",
    type: "Contract",
    duration: "Jun 2024 – Dec 2024",
    description: "Developed and maintained web applications for Ayurvedic healthcare platform. Created user-facing features and integrated backend APIs.",
    technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS"],
  },
  {
    role: "Frontend Developer",
    company: "Legal Firm Website Project",
    type: "Freelance",
    duration: "Mar 2025 – May 2025",
    description: "Designed and implemented a professional website for a legal firm with responsive design and smooth user experience.",
    technologies: ["React", "Tailwind CSS", "Responsive Design"],
  },
];

const education = {
  degree: "B.Tech – Computer Science & Engineering",
  institution: "AKTU University",
  duration: "2023 – 2027",
  gpa: "8.2/10",
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="pt-40 pb-28 md:pt-44 md:pb-36" ref={ref}>
      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm text-accent mb-3 font-serif-display italic">/ Professional Background</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Work <span className="font-serif-display italic">Experience</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Building scalable web applications and solving real-world problems through code since 2023.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-accent/30 hover:bg-white/5 transition-all duration-300"
              >
                {/* Timeline dot */}
                <div className="absolute -left-4 top-8 md:top-10 w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center md:flex hidden">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                      {exp.type}
                    </span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-foreground/70 border border-white/10 hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto p-6 md:p-8 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-foreground">🎓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{education.degree}</h3>
                <p className="text-sm text-muted-foreground">{education.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">CGPA: {education.gpa}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-accent whitespace-nowrap">{education.duration}</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-5">
            Want to learn more about my work?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-8 py-3 text-sm font-medium text-accent hover:bg-accent/20 hover:border-accent transition-all duration-300"
          >
            View My Resume
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

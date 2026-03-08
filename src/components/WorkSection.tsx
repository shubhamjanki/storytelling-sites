import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { img: project1, title: "Finera Dashboard", category: "Product Design", tags: ["Dashboard", "SaaS"] },
  { img: project2, title: "Havenly Real Estate", category: "Web Design", tags: ["Website", "Branding"] },
  { img: project3, title: "HealthSync App", category: "Mobile Design", tags: ["Mobile", "Healthcare"] },
  { img: project4, title: "Cluxo Learning Platform", category: "UI/UX Design", tags: ["EdTech", "Platform"] },
];

const WorkSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-2">/ Best Projects</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Selected <span className="font-serif-display italic">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl bg-surface">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;

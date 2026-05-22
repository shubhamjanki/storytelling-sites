import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const Blogs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="page-shell min-h-screen">
      <div className="global-ambient-bg" aria-hidden="true">
        <div className="ambient-blob ambient-blob-hero" />
        <div className="ambient-blob ambient-blob-tech" />
        <div className="ambient-blob ambient-blob-footer" />
      </div>
      <section className="container relative z-10 mx-auto px-6 py-10 md:py-14">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-4xl text-center"
        >
          <p className="mb-3 text-sm text-muted-foreground font-serif-display italic">
            / All Blogs
          </p>
          <h1 className="text-4xl font-light leading-tight text-foreground md:text-6xl">
            Notes from the{" "}
            <span className="font-serif-display italic text-gradient-neon">
              build
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Frontend, full-stack, UI/UX, and portfolio lessons from the projects
            I am building and refining.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <Link
                to={`/blogs/${post.slug}`}
                className="group block rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_60px_hsl(var(--neon)/0.12)]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border px-3 py-1 text-foreground">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-medium leading-snug text-foreground transition-colors group-hover:text-accent md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/70 text-foreground backdrop-blur-xl transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blogs;

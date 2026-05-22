import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogPostBySlug } from "@/data/blogPosts";
import NotFound from "@/pages/NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="page-shell min-h-screen">
      <div className="global-ambient-bg" aria-hidden="true">
        <div className="ambient-blob ambient-blob-hero" />
        <div className="ambient-blob ambient-blob-tech" />
        <div className="ambient-blob ambient-blob-footer" />
      </div>
      <article className="container relative z-10 mx-auto px-6 py-10 md:py-14">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          All blogs
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

          <h1 className="text-4xl font-light leading-tight text-foreground md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.intro}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-medium text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm backdrop-blur-xl">
            <p className="mb-4 text-sm text-muted-foreground font-serif-display italic">
              / Key takeaways
            </p>
            <ul className="space-y-3">
              {post.takeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="flex gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </aside>
        </motion.div>
      </article>
    </main>
  );
};

export default BlogPost;

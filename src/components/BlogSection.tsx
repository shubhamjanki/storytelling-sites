import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Eye,
  Github,
  Linkedin,
  Mail,
  Settings,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import portrait from "@/assets/portrait.png";

const MotionLink = motion(Link);
const featuredPosts = blogPosts.slice(0, 3);
const [featuredPost, ...latestPosts] = featuredPosts;
const topics = ["All", "Frontend", "UI/UX", "Full Stack", "AI", "Product", "Career", "Thoughts"];

const BlogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-14 md:py-16" ref={ref}>
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.78fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-full border border-white/60 bg-white/60 shadow-sm backdrop-blur-xl">
                <img
                  src={portrait}
                  alt="Shubham Pandey"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Available for work
              </span>
            </div>

            <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
              / Journal
            </p>
            <h2 className="mt-4 text-[2.8rem] font-light leading-[0.94] tracking-tight text-foreground sm:text-5xl lg:text-[3.55rem] xl:text-[3.9rem]">
              Writing about{" "}
              <span className="font-serif-display italic text-gradient-neon">
                engineering
              </span>
              , systems and digital craft.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Notes from building scalable products, AI tools and modern
              interfaces.
            </p>

            <div className="mt-6 border-y border-border py-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                Explore topics
              </p>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <span
                    key={topic}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      i === 0
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white/55 text-foreground backdrop-blur-xl"
                    }`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-b border-border py-4">
              {[
                { icon: BookOpen, value: "24", label: "Articles" },
                { icon: Eye, value: "12K+", label: "Views" },
                { icon: Clock3, value: "120", label: "Read min" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/60 backdrop-blur-xl">
                    <stat.icon size={15} />
                  </div>
                  <p className="text-base font-medium text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/60 bg-white/55 p-3.5 shadow-[0_18px_70px_hsl(var(--neon)/0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/60 backdrop-blur-xl">
                  <Mail size={17} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Get new articles in your inbox
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="min-h-10 rounded-xl border border-white/60 bg-white/65 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                />
                <button
                  type="button"
                  className="min-h-10 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-foreground">
              {[Github, Linkedin, Settings].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  aria-label="Social link"
                  className="transition-colors hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <div className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-wide text-foreground">
                <span className="text-accent">✦</span>
                Featured article
              </div>

              <MotionLink
                to={`/blogs/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-4 shadow-[0_20px_90px_hsl(var(--neon)/0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent md:grid-cols-[1.05fr_0.95fr] md:p-5"
              >
                <div className="flex min-h-[260px] flex-col justify-between p-2 md:min-h-[285px] md:p-3">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-accent">
                        {featuredPost.category}
                      </span>
                      <span>{featuredPost.date}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={15} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 className="max-w-xl text-2xl font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
                      {featuredPost.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-white/60 backdrop-blur-xl">
                      <img src={portrait} alt="" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-sm text-foreground">Shubham Pandey</span>
                  </div>
                </div>

                <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-white/50 md:min-h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-xl transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </MotionLink>
            </motion.div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide text-foreground">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Latest articles
                </div>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all articles
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {latestPosts.map((post, i) => (
                  <MotionLink
                    key={post.title}
                    to={`/blogs/${post.slug}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.18 + 0.1 * i }}
                    className="group flex min-h-[340px] flex-col rounded-2xl border border-white/70 bg-white/55 p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_60px_hsl(var(--neon)/0.12)]"
                  >
                    <div className="relative h-36 overflow-hidden rounded-xl bg-white/50">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-xl transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-2 pt-3">
                      <div className="mb-2.5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 text-lg font-medium leading-tight text-foreground transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4 text-sm font-medium text-foreground">
                        <span className="h-1 w-20 rounded-full bg-muted">
                          <span className="block h-full w-1/2 rounded-full bg-accent" />
                        </span>
                        <span className="inline-flex items-center gap-2">
                          Read more
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  </MotionLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

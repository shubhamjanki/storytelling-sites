import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
  takeaways: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "structure-react-projects",
    title: "How I Structure React Projects That Stay Easy to Grow",
    excerpt:
      "A practical breakdown of folders, components, and habits that keep frontend work clean after the first sprint.",
    date: "May 2026",
    readTime: "6 min read",
    category: "Frontend",
    image: project1,
    intro:
      "A React project feels simple at the start, but the real test comes when features begin to overlap. The structure should make the next change easier to place, review, and debug.",
    sections: [
      {
        heading: "Start With Clear Feature Boundaries",
        body:
          "I like grouping code around what the user experiences: sections, pages, hooks, data, and shared UI. This keeps local decisions close to the feature and prevents every new component from becoming global by default.",
      },
      {
        heading: "Keep Shared Components Boring",
        body:
          "Reusable components should be stable and predictable. Buttons, cards, inputs, and layout helpers are useful when they reduce repetition, but they should not hide product-specific behavior inside a generic name.",
      },
      {
        heading: "Name Things For The Next Developer",
        body:
          "Good names reduce the need for comments. A component named ProjectCard or BlogSection tells the reader where they are immediately, while vague names make even simple files feel expensive to understand.",
      },
    ],
    takeaways: [
      "Organize by product behavior before abstract patterns.",
      "Create shared UI only when repetition becomes real.",
      "Prefer clear names over clever folders.",
    ],
  },
  {
    slug: "healthcare-websites-trust-clarity",
    title: "Designing Healthcare Websites for Trust and Clarity",
    excerpt:
      "Notes from building lifescience websites where credibility, speed, and readable content matter more than visual noise.",
    date: "Apr 2026",
    readTime: "5 min read",
    category: "UI/UX",
    image: project2,
    intro:
      "Healthcare and lifescience websites need a quieter kind of design. The visitor is usually looking for confidence, contact details, products, services, or proof that the organization is legitimate.",
    sections: [
      {
        heading: "Make The First Screen Useful",
        body:
          "The hero should quickly communicate what the company does, who it serves, and what action the visitor can take next. Decorative visuals can support that message, but they should never slow it down.",
      },
      {
        heading: "Design For Scanning",
        body:
          "People rarely read every word on a company website. Strong headings, short paragraphs, clear categories, and predictable spacing help visitors build trust without working too hard.",
      },
      {
        heading: "Let Contact Paths Stay Visible",
        body:
          "For service and healthcare businesses, contact is often the conversion. Phone, email, location, or inquiry CTAs should be easy to reach from important sections without feeling aggressive.",
      },
    ],
    takeaways: [
      "Clarity creates more trust than decoration.",
      "Short sections work better for busy visitors.",
      "Contact actions should be obvious and calm.",
    ],
  },
  {
    slug: "ai-interview-platform-lessons",
    title: "What Building an AI Interview Platform Taught Me",
    excerpt:
      "Lessons from connecting product thinking, API design, and user feedback in a full-stack MERN application.",
    date: "Mar 2026",
    readTime: "7 min read",
    category: "Full Stack",
    image: project3,
    intro:
      "An AI interview platform is not only about generating questions. It needs a complete flow where users feel guided, responses are saved correctly, and feedback arrives in a useful form.",
    sections: [
      {
        heading: "The Flow Matters More Than The Feature",
        body:
          "A model response is only valuable when the user knows what to do with it. The interface needs to make practice sessions, answers, feedback, and next steps feel connected.",
      },
      {
        heading: "Backend Design Shapes Product Quality",
        body:
          "Clean API routes, sensible schemas, and reliable error states make the frontend easier to build. When data is modeled well, the product feels more stable to the person using it.",
      },
      {
        heading: "Feedback Should Be Actionable",
        body:
          "Generic feedback does not help candidates improve. Better feedback points to specific strengths, missed details, and one or two practical improvements for the next attempt.",
      },
    ],
    takeaways: [
      "AI features still need strong product design.",
      "Reliable data flow makes the experience feel trustworthy.",
      "Useful feedback should be specific and limited.",
    ],
  },
  {
    slug: "portfolio-that-feels-personal",
    title: "Making a Portfolio Feel Personal Without Slowing It Down",
    excerpt:
      "How motion, copy, project cards, and small interaction details can make a portfolio memorable without hurting usability.",
    date: "Feb 2026",
    readTime: "4 min read",
    category: "Portfolio",
    image: project4,
    intro:
      "A portfolio should show skill quickly, but it should also feel like a person made it. The balance is in using personality as a guide, not as a layer of noise.",
    sections: [
      {
        heading: "Let The Work Stay Primary",
        body:
          "Visual effects are strongest when they frame the projects instead of competing with them. The design should make it easy to understand what was built and why it mattered.",
      },
      {
        heading: "Use Motion With Restraint",
        body:
          "Small entrance animations and hover states can make a site feel polished. Too much motion makes reading harder, especially on pages where the visitor is trying to evaluate your work.",
      },
      {
        heading: "Write Like A Builder",
        body:
          "Clear project descriptions, honest constraints, and concrete outcomes say more than generic claims. Good portfolio writing makes your decision-making visible.",
      },
    ],
    takeaways: [
      "Personality should support the work.",
      "Motion is best when it improves orientation.",
      "Specific writing builds credibility.",
    ],
  },
];

export const getBlogPostBySlug = (slug: string | undefined) =>
  blogPosts.find((post) => post.slug === slug);

const Footer = () => (
  <footer className="border-t border-border pt-10 pb-16">
    <div className="container mx-auto px-6">
      {/* Nav links */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground mb-12">
        <div className="flex gap-6">
          {["Home", "About", "Portfolio", "Contact"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-foreground transition-colors">{s}</a>
          ))}
        </div>
        <span>©{new Date().getFullYear()} Shubham Pandey. All rights reserved.</span>
      </div>

      {/* Large name */}
      <div className="text-center">
        <h2 className="text-7xl md:text-[10rem] lg:text-[14rem] font-serif-display italic text-foreground/5 leading-none select-none">
          Shubham
        </h2>
      </div>
    </div>
  </footer>
);

export default Footer;

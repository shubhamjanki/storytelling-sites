const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <span>© 2025 Elian Ross. All rights reserved.</span>
      <div className="flex gap-6">
        {["Twitter", "Dribbble", "LinkedIn", "Behance"].map((s) => (
          <a key={s} href="#" className="hover:text-foreground transition-colors">{s}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

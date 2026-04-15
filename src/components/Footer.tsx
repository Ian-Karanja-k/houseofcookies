import hocLogo from "@/assets/hoc-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-background py-8">
    <div className="container mx-auto px-4 text-center">
      <img src={hocLogo} alt="House of Cookies" className="h-12 w-auto mx-auto" />
      <p className="text-muted-foreground text-sm mt-2">House of Cookies — Premium baked goods delivered to you.</p>
      <p className="text-muted-foreground/50 text-xs mt-4">© {new Date().getFullYear()} House of Cookies. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;

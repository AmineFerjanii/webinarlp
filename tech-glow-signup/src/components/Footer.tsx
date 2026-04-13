import type { Translations } from "@/lib/translations";

const Footer = ({ t }: { t: Translations }) => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          {t.footerCopy}
        </span>
        <div className="flex gap-6">
          {t.footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

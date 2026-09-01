import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/lazy";
import { WorldTuner } from "@/components/motion/world-tuner";
import { ConsoleSignature } from "@/components/craft/console-signature";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <WorldTuner />
      <ConsoleSignature />
      {children}
      <Footer />
    </MotionProvider>
  );
}

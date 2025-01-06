import Features from "@/components/features/feature";
import Hero from "@/components/hero/hero";
import Navigation from "@/components/navbar/landing-page-navbar";

export default function LandingPage() {
  return (
    <main className="bg-slate-900 min-h-full overflow-hidden">
      {/** navigation */}
      <div className="md:px-32 px-4 h-16 flex items-center fixed w-full top-0 left-0 border-b shadow-lg backdrop-blur-xl inset-0 z-50">
        <Navigation />
      </div>

      <div className="pt-16">
        {/** hero */}
        <div className="mt-12 md:px-32 mx-6">
          <Hero />
        </div>
        {/** features */}
        <div className="md:px-32 px-4 py-32">
          <Features />
        </div>
      </div>
    </main>
  );
}

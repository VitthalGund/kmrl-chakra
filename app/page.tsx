import Link from "next/link";
import GradientShell from "@/components/site/gradient-shell";
import { Button } from "@/components/ui/button";
import { ImageSection } from "@/components/site/image-section";
import { FeatureCards } from "@/components/site/feature-cards";

export default function HomePage() {
  return (
    <GradientShell>
      <section className="mt-8 text-center">
        <div className="surface-card rounded-2xl px-6 py-10">
          <h1 className="text-balance text-3xl md:text-5xl font-semibold">
            KMRL‑Synapse
          </h1>
          <p className="mt-3 text-pretty opacity-90 md:text-lg">
            An AI-powered knowledge layer for Kochi Metro — search, summarize,
            and stay informed across departments.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/login">
              <Button size="lg">Explore Features</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ImageSection
        src="/images/metro-station.png"
        alt="Metro train at a bright Kochi station platform with commuters"
        title="Built for the pace of the city"
        body="Synapse connects people and documents so teams can act faster — from station controllers to engineering, HR, and finance."
      />

      <FeatureCards />

      <ImageSection
        reverse
        src="/images/metro-illustration.png"
        alt="Illustrated metro ecosystem with city, people, and greenery"
        title="Seamless by design"
        body="A unified experience: search, role-aware summaries, and gentle notifications keep your day flowing without information overload."
      />

      <section id="about" className="mt-12 surface-card rounded-2xl p-6">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="mt-2 text-sm opacity-90">
          KMRL‑Synapse is a demo showcase built to illustrate how AI can bring
          order to operational documents and updates.
        </p>
      </section>

      <section id="contact" className="mt-6 surface-card rounded-2xl p-6">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2 text-sm opacity-90">
          Reach us via the GitHub link in the footer.
        </p>
      </section>
    </GradientShell>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ice Breaker Games",
  description: "Terms of Service for Ice Breaker Games website.",
  alternates: {
    canonical: "https://www.icebreakergames.site/tos",
  },
  openGraph: {
    type: "website",
    url: "https://www.icebreakergames.site/tos",
    title: "Terms of Service | Ice Breaker Games",
    description: "Terms of Service for Ice Breaker Games website.",
    siteName: "Ice Breaker Games",
  },
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing and using Ice Breaker Games ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="text-muted-foreground mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on Ice Breaker Games for personal, non-commercial transitory viewing only.
          </p>
          <p className="text-muted-foreground mb-4">
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the Website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Content Usage</h2>
          <p className="text-muted-foreground mb-4">
            The ice breaker games and activities provided on this website are for educational and entertainment purposes. You may use these activities in your personal or professional settings, but you may not republish or redistribute the content without permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
          <p className="text-muted-foreground mb-4">
            The materials on Ice Breaker Games are provided on an 'as is' basis. Ice Breaker Games makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
          <p className="text-muted-foreground mb-4">
            In no event shall Ice Breaker Games or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ice Breaker Games.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Revisions</h2>
          <p className="text-muted-foreground mb-4">
            Ice Breaker Games may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms of Service, please email{" "}
            <a href="mailto:support@icebreakergames.site" className="underline underline-offset-2">
              support@icebreakergames.site
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="underline underline-offset-2">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

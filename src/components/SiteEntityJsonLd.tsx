/** Site-wide Organization + WebSite JSON-LD for GEO / knowledge-graph anchoring. */
export function SiteEntityJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.icebreakergames.site/#organization",
    name: "Ice Breaker Games",
    url: "https://www.icebreakergames.site",
    logo: {
      "@type": "ImageObject",
      url: "https://www.icebreakergames.site/img/home-hero.jpg",
    },
    email: "support@icebreakergames.site",
    description:
      "Facilitator-ready icebreaker games and guides for meetings, virtual teams, classrooms, and youth groups.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@icebreakergames.site",
      contactType: "customer support",
      url: "https://www.icebreakergames.site/contact",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.icebreakergames.site/#website",
    name: "Ice Breaker Games",
    url: "https://www.icebreakergames.site",
    publisher: {
      "@id": "https://www.icebreakergames.site/#organization",
    },
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

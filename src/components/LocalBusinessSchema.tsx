export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Prashanthi Digital Studio & LED Walls",
    image: "https://prashanthidigitals.com/images/logo/logo.jpeg",
    "@id": "https://prashanthidigitals.com",
    url: "https://prashanthidigitals.com",
    telephone: "+91-9948670396",
    email: "prashanthistudio@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nacharam",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500076",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4297,
      longitude: 78.5562,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "22:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "22:30",
      },
    ],
    sameAs: [
      "https://www.facebook.com/prashanthistudio",
      "https://www.instagram.com/prashanthistudio",
      "https://www.youtube.com/@prashanthistudio",
    ],
    priceRange: "₹₹",
    description:
      "Professional photography, videography & LED wall rental services in Hyderabad with 20+ years of experience. Specializing in weddings, events & celebrations.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography & Event Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "LED Wall Rental",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Event Videography",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

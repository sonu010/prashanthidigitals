/**
 * Categorized event types for Prashanthi Digital Studio.
 * Used across bookings, daily-log, invoices, gallery-manager, and the public /book form.
 */

export interface EventSubType {
  label: string;
  value: string;
}

export interface EventCategory {
  label: string;
  value: string;
  subTypes: EventSubType[];
}

export const eventCategories: EventCategory[] = [
  {
    label: "Wedding Events",
    value: "Wedding Events",
    subTypes: [
      { label: "Pre-Wedding Shoot", value: "Pre-Wedding Shoot" },
      { label: "Engagement / Ring Ceremony", value: "Engagement" },
      { label: "Roka / Nischitartham", value: "Roka / Nischitartham" },
      { label: "Haldi Ceremony", value: "Haldi Ceremony" },
      { label: "Mehendi Ceremony", value: "Mehendi Ceremony" },
      { label: "Sangeet", value: "Sangeet" },
      { label: "Wedding Day", value: "Wedding Day" },
      { label: "Baraat", value: "Baraat" },
      { label: "Reception", value: "Reception" },
      { label: "Post-Wedding Shoot", value: "Post-Wedding Shoot" },
      { label: "Destination Wedding", value: "Destination Wedding" },
    ],
  },
  {
    label: "Personal & Social Events",
    value: "Personal & Social Events",
    subTypes: [
      { label: "Birthday Party", value: "Birthday Party" },
      { label: "Baby Shower / Seemantham", value: "Baby Shower" },
      { label: "Naming Ceremony", value: "Naming Ceremony" },
      { label: "Cradle Ceremony", value: "Cradle Ceremony" },
      { label: "Half Saree Function", value: "Half Saree Function" },
      { label: "Anniversary Celebration", value: "Anniversary" },
      { label: "Housewarming / Gruhapravesam", value: "Housewarming" },
      { label: "Family Get-Together", value: "Family Get-Together" },
      { label: "Farewell / Retirement Party", value: "Farewell Party" },
    ],
  },
  {
    label: "Portraits & Lifestyle",
    value: "Portraits & Lifestyle",
    subTypes: [
      { label: "Couple Shoot", value: "Couple Shoot" },
      { label: "Maternity Shoot", value: "Maternity Shoot" },
      { label: "Newborn Shoot", value: "Newborn Shoot" },
      { label: "Family Portrait", value: "Family Portrait" },
      { label: "Kids Photography", value: "Kids Photography" },
      { label: "Fashion / Model Portfolio", value: "Fashion Portfolio" },
    ],
  },
  {
    label: "Corporate Events",
    value: "Corporate Events",
    subTypes: [
      { label: "Conference / Seminar", value: "Conference" },
      { label: "Product Launch", value: "Product Launch" },
      { label: "Award Ceremony", value: "Award Ceremony" },
      { label: "Corporate Party / Team Outing", value: "Corporate Party" },
      { label: "Office Inauguration", value: "Office Inauguration" },
      { label: "Annual Meet / Annual Day", value: "Annual Meet" },
      { label: "Brand / Promotional Event", value: "Brand Event" },
    ],
  },
  {
    label: "Religious & Traditional",
    value: "Religious & Traditional",
    subTypes: [
      { label: "Mangala Snanam", value: "Mangala Snanam" },
      { label: "Satyanarayana Vratham", value: "Satyanarayana Vratham" },
      { label: "Pooja / Homam", value: "Pooja / Homam" },
      { label: "Ganesh Chaturthi", value: "Ganesh Chaturthi" },
      { label: "Bonalu", value: "Bonalu" },
      { label: "Eid / Ramzan Gathering", value: "Eid Gathering" },
      { label: "Christmas Celebration", value: "Christmas" },
      { label: "Temple / Church Event", value: "Temple / Church Event" },
    ],
  },
  {
    label: "School & College Events",
    value: "School & College Events",
    subTypes: [
      { label: "Annual Day / Sports Day", value: "Annual Day" },
      { label: "Graduation / Convocation", value: "Graduation" },
      { label: "College Fest", value: "College Fest" },
      { label: "Freshers / Farewell Party", value: "Freshers Party" },
    ],
  },
  {
    label: "Entertainment & Public",
    value: "Entertainment & Public",
    subTypes: [
      { label: "Music Concert / DJ Night", value: "Concert" },
      { label: "Cultural Festival", value: "Cultural Festival" },
      { label: "Fashion Show", value: "Fashion Show" },
      { label: "Exhibition / Expo", value: "Exhibition" },
      { label: "Movie / Audio Launch", value: "Movie Launch" },
    ],
  },
  {
    label: "LED Wall Only",
    value: "LED Wall Only",
    subTypes: [
      { label: "Wedding LED Wall", value: "Wedding LED Wall" },
      { label: "Corporate LED Wall", value: "Corporate LED Wall" },
      { label: "Stage Backdrop", value: "Stage Backdrop" },
      { label: "Live Streaming Setup", value: "Live Streaming" },
    ],
  },
  {
    label: "Other",
    value: "Other",
    subTypes: [
      { label: "Other / Custom Event", value: "Other" },
    ],
  },
];

/**
 * Flat list of all event type labels (for simple dropdowns / SEO marquee).
 */
export const allEventTypeLabels = eventCategories.flatMap((cat) =>
  cat.subTypes.map((s) => s.label)
);

/**
 * Get all gallery categories (the top-level category names).
 * Used in gallery manager and public gallery page.
 */
export const galleryCategories = [
  "Weddings",
  "Pre-Wedding",
  "Engagement",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Reception",
  "Birthdays",
  "Baby Shower",
  "Naming Ceremony",
  "Cradle Ceremony",
  "Portraits",
  "Maternity",
  "Newborn",
  "Corporate",
  "Religious",
  "LED Wall",
  "Other",
];

/**
 * Short list of key event labels for the home page marquee.
 */
export const homePageEventTypes = [
  "Weddings",
  "Pre-Wedding",
  "Engagements",
  "Haldi & Mehendi",
  "Birthdays",
  "Baby Shoots",
  "Naming Ceremonies",
  "Corporate Events",
  "Religious Ceremonies",
  "LED Wall Events",
  "Portraits & Lifestyle",
];

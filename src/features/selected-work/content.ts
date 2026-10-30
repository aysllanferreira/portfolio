/**
 * Facts for the featured Stream Signage case study. The drive-thru visual depicts a
 * US product UI, so its menu and order stay in English and US dollars in every locale.
 */

export const caseStudy = {
  name: "Stream Signage",
  country: "us",
  url: "https://streamsignage.com",
  domain: "streamsignage.com",
  metrics: [
    { key: "restaurants", value: "100+" },
    { key: "apps", value: "2" },
    { key: "integrations", value: "3+" },
  ],
  integrations: ["Oracle POS", "Clover", "HolidayOil", "Desktop app"],
} as const;

export type CaseMetricKey = (typeof caseStudy.metrics)[number]["key"];

export const driveThru = {
  lane: "Drive-thru · Lane 1",
  live: "Live",
  menu: {
    title: "Menu app",
    sync: "synced from POS",
    promo: { kicker: "Limited time", name: "Spicy Tenders Combo", price: "$8.49" },
    groups: [
      {
        name: "Combos",
        items: [
          ["Chicken Bowl", "$9.29"],
          ["Grilled Plate", "$10.49"],
          ["Family Meal", "$24.99"],
        ],
      },
      {
        name: "Sides & drinks",
        items: [
          ["Fried Rice", "$3.79"],
          ["Iced Tea", "$2.49"],
        ],
      },
    ],
  },
  pos: {
    title: "POS app",
    order: "Order #1042",
    lines: [
      ["1×", "Spicy Tenders Combo", "$8.49"],
      ["2×", "Iced Tea", "$4.98"],
      ["1×", "Fried Rice", "$3.79"],
    ],
    totalLabel: "Total",
    total: "$18.65",
    confirm: "Please confirm your order",
  },
  event: 'pos.on("order") → screen.render(order)',
} as const;

export type NavLink = {
  label: string;
  href: string;
  badge?: string;
  description?: string;
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavPromo = {
  heading: string;
  description: string;
  href: string;
  imageUrl?: string;
};

export type NavItem = {
  label: string;
  href: string;
  columns: NavColumn[];
  promo?: NavPromo;
};

export type UtilityItem = {
  label: string;
  href: string;
  icon: "search" | "store" | "account" | "cart";
  action?: "link" | "drawer" | "modal";
};

export type FooterSection = {
  heading: string;
  links: NavLink[];
};

export type FooterConfig = {
  sections: FooterSection[];
  socialLinks: { platform: string; url: string }[];
  newsletter: { heading: string; description: string };
};

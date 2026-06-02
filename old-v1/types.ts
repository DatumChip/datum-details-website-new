export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ChartDataPoint {
  month: string;
  reactive: number;
  proactive: number;
}
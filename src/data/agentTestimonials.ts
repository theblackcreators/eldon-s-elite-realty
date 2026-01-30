export interface AgentTestimonial {
  name: string;
  title: string;
  yearsWithCompany: number;
  previousBrokerage?: string;
  quote: string;
  image?: string;
  specialization?: string;
}

export const agentTestimonials: AgentTestimonial[] = [
  {
    name: "Sarah Martinez",
    title: "Senior Real Estate Agent",
    yearsWithCompany: 4,
    previousBrokerage: "Keller Williams",
    quote: "Joining Connect Realty was the best career decision I've made. The lead generation system alone has doubled my business, and the support from the team is incredible. I finally feel like I have a true partner in my success.",
    specialization: "Luxury Homes"
  },
  {
    name: "Michael Chen",
    title: "Real Estate Agent",
    yearsWithCompany: 2,
    previousBrokerage: "RE/MAX",
    quote: "The technology and marketing tools at Connect Realty are light years ahead of my previous brokerage. I spend less time on admin work and more time with clients. Plus, the commission split is unbeatable.",
    specialization: "First-Time Buyers"
  },
  {
    name: "Jennifer Thompson",
    title: "Real Estate Agent",
    yearsWithCompany: 3,
    quote: "As a new agent, I was worried about getting lost in a big brokerage. Connect Realty provided the training, mentorship, and support I needed to close 15 transactions in my first year. The culture here is truly collaborative.",
    specialization: "New Construction"
  },
  {
    name: "David Rodriguez",
    title: "Team Leader",
    yearsWithCompany: 5,
    previousBrokerage: "Century 21",
    quote: "I've been in real estate for 12 years, and Connect Realty offers the best combination of support, technology, and commission structure I've ever seen. The leadership genuinely cares about agent success.",
    specialization: "Investment Properties"
  },
  {
    name: "Amanda Foster",
    title: "Real Estate Agent",
    yearsWithCompany: 3,
    previousBrokerage: "Coldwell Banker",
    quote: "The CRM system and automated marketing campaigns have transformed my business. I can focus on building relationships while the technology handles the follow-up. My conversion rate has increased by 40%.",
    specialization: "Relocation Specialist"
  },
  {
    name: "Robert Williams",
    title: "Senior Real Estate Agent",
    yearsWithCompany: 6,
    quote: "Connect Realty invests in their agents. From continuing education to marketing budgets, they provide everything you need to compete at the highest level. I've grown my business 300% since joining.",
    specialization: "Waterfront Properties"
  }
];


/**
 * Single source of truth for everything the site says.
 * Edit this file to update content — no component changes needed.
 *
 * Every fact below comes from the supplied profile card. Nothing has been invented:
 * fields that the source did not provide (contact details, social links, company name)
 * are left empty and the UI hides them until they are filled in.
 */
import {
  Compass,
  Landmark,
  Layers,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

/** Resolves a file in /public against the deployed base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const profile = {
  firstName: 'Anamika',
  lastName: 'Goswami',
  name: 'Anamika Goswami',
  role: 'Co-Founder & Director',
  credential: 'Certified Financial Planner',
  credentialShort: 'CFP',
  intro:
    'As co-founder of Redolent Financial Broking, I help people make informed, strategic decisions about their money, and I have been doing it for more than 18 years.',
}

/** The company Anamika co-founded, as shown on its own letterhead. */
export const company = {
  name: 'Redolent Financial Broking Pvt. Ltd.',
  shortName: 'Redolent',
  registration: 'AMFI Registered Mutual Fund & SIF Distributor',
  arn: 'ARN 287554',
  founded: 'Founded in Guwahati, 2008',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const

/** Shown in the scrolling strip under the hero. */
export const disciplines = [
  'Financial Planning',
  'Investment Management',
  'Mutual Fund Advisory',
  'Broking',
]

export const about = {
  heading: 'Eighteen years of helping people decide well.',
  paragraphs: [
    'I am a Certified Financial Planner with an MBA in Finance from Gauhati University, and I have spent more than 18 years in the financial services industry.',
    'My career began in 2005 at Stock Holding Corporation. Three years later I chose the less certain path and co-founded Redolent Financial Broking Pvt. Ltd. in Guwahati, a business in broking and mutual fund advisory.',
    'Everything I do rests on a strong foundation in financial planning and investment management. My work is to help you reach your financial goals through decisions that are informed, strategic and genuinely yours.',
  ],
  /** An original line written for this site in Anamika's voice — not a recorded quotation. */
  pullLine: 'A good plan should leave you clearer, not just better invested.',
}

export const stats = [
  { value: 18, prefix: '', suffix: '+', label: 'Years in financial services' },
  { value: 12, prefix: '', suffix: '', label: 'Clients when the company began' },
  { value: 1000, prefix: 'Nearly ', suffix: '', label: 'Clients the company serves today' },
]

export const journey = [
  {
    year: '2005',
    title: 'Stock Holding Corporation',
    kicker: 'Where it began',
    body: 'I started my career in financial services here. It was the beginning of everything that followed.',
  },
  {
    year: '2008',
    title: 'Co-Founder, Redolent Financial Broking Pvt. Ltd.',
    kicker: 'Into entrepreneurship',
    body: 'I ventured into entrepreneurship and co-founded Redolent in Guwahati, a business in broking and mutual fund advisory.',
  },
  {
    year: 'Today',
    title: 'Co-Founder & Director, Redolent',
    kicker: 'Leading the company',
    body: 'Redolent is an AMFI registered mutual fund and SIF distributor. My attention to regulatory adherence and operational efficiency has been a cornerstone of the company’s growth from 12 clients to nearly 1,000.',
  },
]

export interface Card {
  icon: LucideIcon
  title: string
  body: string
}

export const expertise: Card[] = [
  {
    icon: Compass,
    title: 'Financial Planning',
    body: 'Turning what you want from life into a plan with clear priorities, so each decision has a reason behind it.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Management',
    body: 'Building and looking after investments with discipline, keeping them aligned with the goals they were chosen for.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Adherence',
    body: 'Meticulous attention to the rules that protect clients. I treat compliance as part of the service, never an afterthought.',
  },
  {
    icon: Workflow,
    title: 'Operational Efficiency',
    body: 'Processes that run the way they should, so the work behind your finances stays accurate, timely and dependable.',
  },
]

export const services: Card[] = [
  {
    icon: Layers,
    title: 'Financial planning',
    body: 'A structured look at where you are, where you want to be, and the informed decisions that connect the two.',
  },
  {
    icon: TrendingUp,
    title: 'Mutual fund advisory',
    body: 'Guidance on choosing and reviewing mutual funds so that what you hold matches what you are working towards.',
  },
  {
    icon: Landmark,
    title: 'Broking',
    body: 'Broking services delivered with the same care for process and regulation that runs through all of my work.',
  },
]

export const credentials = [
  {
    kind: 'Education',
    title: 'MBA (Finance)',
    issuer: 'Gauhati University',
  },
  {
    kind: 'Certification',
    title: 'Certified Financial Planner',
    issuer: 'Professional certification in financial planning',
  },
]

/** Original statements written for this site, based on the documented approach. */
export const philosophy = {
  statement:
    'Good financial decisions are rarely dramatic. They are informed, deliberate, and made with a clear view of where you want to go.',
  principles: [
    {
      title: 'Informed before invested',
      body: 'You should understand a decision before you make it. My role is to give you the clarity to choose with confidence.',
    },
    {
      title: 'Strategy over impulse',
      body: 'Goals come first, products second. Every recommendation has to earn its place in the plan.',
    },
    {
      title: 'Done properly, every time',
      body: 'Regulatory adherence and sound operations are quiet work, but they are what make advice dependable.',
    },
  ],
}

/**
 * Contact details appear across the Contact section and footer automatically.
 * Leave a field empty to hide it.
 * - `email`: used for the mailto link and as the form's fallback delivery.
 * - `formEndpoint`: optional URL (e.g. a Formspree endpoint) the form POSTs JSON to.
 */
export const contact = {
  email: 'anamikaghy6@gmail.com',
  phone: '+91 99571 83236',
  /** WhatsApp number in international format, digits only (used for the wa.me link). */
  whatsapp: '919957183236',
  location: '',
  formEndpoint: '',
  social: [] as { label: string; href: string }[],
}

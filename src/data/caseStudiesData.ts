import { CaseStudy } from '../types/caseStudy';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'proptii-ai-search',
    slug: 'proptii-ai-discovery',
    productName: 'Proptii',
    title: 'Proptii: Transforming Rental Search with Multimodal AI',
    subtitle: 'AI-Powered Home Discovery Engine',
    category: 'AI & PropTech',
    tagline: 'Personalized matching that cuts rental discovery time by more than half.',
    client: 'PropTech Ecosystem / B2C & B2B',
    year: '2026',
    featured: true,
    image: '/images/proptii-cover.png',
    tags: ['AI Recommendations', 'Computer Vision', 'Predictive Matching', 'Search UX'],
    metrics: [
      { label: 'Faster Search Cycle', value: '58%', detail: 'Average drop in days from search to tenancy application' },
      { label: 'Lead-to-Tour Ratio', value: '4.2x', detail: 'Compared to conventional listing portals' },
      { label: 'Active Match Volume', value: '35k+', detail: 'Verified tenant profiles mapped accurately' }
    ],
    challenge: 'Conventional property discovery forces seekers to comb through thousands of stale listings with static filters that fail to capture lifestyle, commute nuances, and real-time availability.',
    solution: 'Engineered Proptii, an intelligent recommendation layer utilizing natural language intent parsing and image attribute extraction to pair seekers with properties fitting their true preferences.',
    outcome: 'Tenants found verified matches within 48 hours on average, while property managers experienced significantly higher conversion rates and reduced inquiry abandonment.',
    technologies: ['React', 'TypeScript', 'Vector Embeddings', 'FastAPI', 'Tailwind CSS'],
    testimonial: {
      quote: 'Proptii changed how our prospective tenants interact with inventory. The search is intuitive, fast, and eliminates irrelevant viewings.',
      author: 'Marcus Vance',
      role: 'Director of Residential Leasing',
      organization: 'Vanguard Living UK'
    }
  },
  {
    id: 'council-connect-housing',
    slug: 'council-connect-streamlining',
    productName: 'Council Connect',
    title: 'Council Connect: Modernizing Public Sector Housing Allocation',
    subtitle: 'Public Sector Property Coordination',
    category: 'Public Sector',
    tagline: 'Bridging local government authorities with verified private landlords.',
    client: 'Municipal Housing Authorities & Private Landlords',
    year: '2025 - 2026',
    featured: true,
    image: '/images/council-connect-cover.png',
    tags: ['GovTech', 'Workflow Automation', 'Compliance Auditing', 'Document OCR'],
    metrics: [
      { label: 'Admin Work Reduction', value: '72%', detail: 'Saved hours per week in manual verification and casework' },
      { label: 'Units Integrated', value: '1,200+', detail: 'Private rental sector homes brought onto council programs' },
      { label: 'Placement Turnaround', value: '-14 Days', detail: 'Reduction in time required to house families in need' }
    ],
    challenge: 'Local authorities faced severe backlogs matching urgent housing needs with private sector stock due to manual compliance vetting, fragmented communications, and regulatory bottlenecks.',
    solution: 'Delivered an integrated portal providing instant compliance scoring, automated landlord onboarding, digital contract signing, and direct casing workflows for council housing officers.',
    outcome: 'Decentralized departments united under one dashboard, shortening placement cycles by two weeks and boosting private landlord participation by 84%.',
    technologies: ['Next.js', 'PostgreSQL', 'Secure OCR Verification', 'Automated Audit Trail'],
    testimonial: {
      quote: 'The manual document churn was overwhelming our team. Council Connect gave us complete visibility and accelerated placement times when families needed it most.',
      author: 'Eleanor Davies',
      role: 'Housing Strategy Officer',
      organization: 'Greater London Borough Consortium'
    }
  },
  {
    id: 'nest-quest-students',
    slug: 'nest-quest-student-matching',
    productName: 'Nest Quest',
    title: 'Nest Quest: Solving the Student Accommodation Crisis',
    subtitle: 'Group Housing & HMO Matchmaking',
    category: 'Student Housing',
    tagline: 'Pairing university students with certified accommodation and compatible housemates.',
    client: 'UK University Hubs & PBSA Providers',
    year: '2025',
    featured: true,
    image: '/images/nest-quest-cover.png',
    tags: ['Student Living', 'PBSA Systems', 'Identity Verification', 'Group Compatibility'],
    metrics: [
      { label: 'Satisfaction Rate', value: '98%', detail: 'Reported satisfaction with housemate & unit matching' },
      { label: 'Students Assisted', value: '8,500+', detail: 'Verified student users during peak autumn season' },
      { label: 'Campus Partners', value: '45+', detail: 'Universities and institutional student living operators' }
    ],
    challenge: 'International and domestic university students routinely suffer from opaque deposit practices, incompatible roommate pairings, and predatory subletting during peak term enrollment.',
    solution: 'Designed Nest Quest as a student-first portal with institutional identity authentication, lifestyle compatibility scoring, and direct links to verified PBSA and HMO landlords.',
    outcome: 'Eliminated rental fraud incidents for participating university partners and reduced room vacancies during peak handover months to under 1.5%.',
    technologies: ['React', 'Firebase', 'Live Messaging', 'Stripe Verification'],
    testimonial: {
      quote: 'Nest Quest alleviated the stress of finding accommodation for incoming overseas students. It set a new benchmark for trust in student lettings.',
      author: 'Dr. Tariq Al-Mansoor',
      role: 'Head of Student Welfare Services',
      organization: 'Midlands University Union'
    }
  },
  {
    id: 'kompass-broker-intelligence',
    slug: 'kompass-broker-case-management',
    productName: 'Kompass',
    title: 'Kompass: Intelligent Case Management & Fact Find for Brokers',
    subtitle: 'Broker Case Workflow & Product Sourcing Engine',
    category: 'Market Intelligence',
    tagline: 'Empowering mortgage and commercial brokers to manage active cases, conduct digital fact find, and source optimal financial products.',
    client: 'Mortgage Brokers & Commercial Finance Intermediaries',
    year: '2026',
    featured: true,
    image: '/images/proptii-agent-analytics.png',
    tags: ['Case Management', 'Digital Fact Find', 'Suitability Reports', 'Lender Criteria Matching', 'Compliance Workflow'],
    metrics: [
      { label: 'Fact Find Speed', value: '3.4x Faster', detail: 'Automated digital fact find with Open Banking and document verification' },
      { label: 'Report Generation', value: '-85% Time', detail: 'Instant automated generation of audit-ready client suitability reports' },
      { label: 'Active Broker Cases', value: '18,000+', detail: 'Completed cases processed through Kompass lending workflows' }
    ],
    challenge: 'Mortgage and commercial finance brokers lose hours each day rekeying client information across fragmented lender portals, manually conducting arduous fact finds, chasing missing documentation, and drafting bespoke suitability reports under stringent regulatory scrutiny.',
    solution: 'Engineered Kompass as an end-to-end broker operating system: combining intelligent case pipeline management, intuitive digital fact find capture, automated income and bank statement verification, algorithmic lender criteria sourcing, and instant one-click suitability report generation.',
    outcome: 'Brokers increased monthly case throughput by 68% while eliminating manual rekeying errors, maintaining 100% statutory compliance, and securing faster decisions in principle for borrowers.',
    technologies: ['React', 'TypeScript', 'Open Banking API', 'OCR Document Extraction', 'FastAPI'],
    testimonial: {
      quote: 'Kompass transformed how our firm manages client cases. The digital fact find, automated reporting, and instant product matching cut days out of our application process.',
      author: 'David Sterling',
      role: 'Managing Partner',
      organization: 'Apex Commercial Finance UK'
    }
  }
];

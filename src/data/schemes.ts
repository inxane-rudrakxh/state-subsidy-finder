export type Scheme = {
  id: string;
  state: string;
  name: string;
  category: string;
  department: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  process: string[];
  website: string;
};

export type StateInfo = {
  name: string;
  capital: string;
  industries: string[];
  blurb: string;
};

export const STATE_INFO: Record<string, StateInfo> = {
  Maharashtra: {
    name: "Maharashtra",
    capital: "Mumbai",
    industries: ["Manufacturing", "IT/ITeS", "Textiles", "Auto", "FinTech"],
    blurb: "India's industrial powerhouse with the largest state GDP and a deep startup ecosystem.",
  },
  Karnataka: {
    name: "Karnataka",
    capital: "Bengaluru",
    industries: ["IT", "Biotech", "Aerospace", "ESDM", "Startups"],
    blurb: "Home to India's startup capital with world-class incentives for tech and deep-tech.",
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    capital: "Chennai",
    industries: ["Auto", "Electronics", "Textiles", "Leather", "Renewables"],
    blurb: "Leading manufacturing hub with India's largest EV and electronics clusters.",
  },
  Gujarat: {
    name: "Gujarat",
    capital: "Gandhinagar",
    industries: ["Chemicals", "Pharma", "Textiles", "Renewables", "Diamonds"],
    blurb: "India's most industrialised state with marquee incentives under Vibrant Gujarat.",
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    capital: "Lucknow",
    industries: ["Food Processing", "Electronics", "Textiles", "Tourism"],
    blurb: "Fast-growing economy with aggressive MSME and one-district-one-product incentives.",
  },
  Telangana: {
    name: "Telangana",
    capital: "Hyderabad",
    industries: ["IT", "Life Sciences", "Aerospace", "Pharma"],
    blurb: "Progressive policy state with TS-iPASS single-window clearance and T-Hub.",
  },
  Rajasthan: {
    name: "Rajasthan",
    capital: "Jaipur",
    industries: ["Renewables", "Mining", "Tourism", "Textiles"],
    blurb: "Largest state by area with leading solar and tourism subsidies.",
  },
  "West Bengal": {
    name: "West Bengal",
    capital: "Kolkata",
    industries: ["Jute", "Tea", "MSME", "Leather", "IT"],
    blurb: "Eastern gateway with strong MSME and manufacturing incentives.",
  },
  Kerala: {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    industries: ["Tourism", "Spices", "IT", "Ayurveda"],
    blurb: "High HDI state with focused startup, tourism and traditional industry support.",
  },
  Punjab: {
    name: "Punjab",
    capital: "Chandigarh",
    industries: ["Agriculture", "Food Processing", "Textiles", "Auto Parts"],
    blurb: "Agri-industrial state with comprehensive food processing and MSME schemes.",
  },
  Haryana: {
    name: "Haryana",
    capital: "Chandigarh",
    industries: ["Auto", "IT", "Aerospace", "Apparel"],
    blurb: "Industrial corridor leader with strong NCR-based manufacturing incentives.",
  },
  "Madhya Pradesh": {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    industries: ["Textiles", "Food Processing", "Pharma", "Cement"],
    blurb: "Heart of India with attractive land bank and capital subsidy programs.",
  },
  Odisha: {
    name: "Odisha",
    capital: "Bhubaneswar",
    industries: ["Steel", "Aluminium", "IT", "Seafood"],
    blurb: "Metal & mineral powerhouse with focused industrial policy incentives.",
  },
  Bihar: {
    name: "Bihar",
    capital: "Patna",
    industries: ["Food Processing", "Textiles", "Leather", "IT"],
    blurb: "Emerging investment destination with new industrial investment promotion policy.",
  },
  "Andhra Pradesh": {
    name: "Andhra Pradesh",
    capital: "Amaravati",
    industries: ["Auto", "Pharma", "Electronics", "Aquaculture"],
    blurb: "Long coastline with port-led industrial policy and single-window clearances.",
  },
  Assam: {
    name: "Assam",
    capital: "Dispur",
    industries: ["Tea", "Oil & Gas", "Bamboo", "Tourism"],
    blurb: "Gateway to the North-East with industrial & investment policy 2019.",
  },
  Jharkhand: {
    name: "Jharkhand",
    capital: "Ranchi",
    industries: ["Mining", "Steel", "Textiles", "Auto"],
    blurb: "Mineral-rich state with focused textile and food processing incentives.",
  },
  Chhattisgarh: {
    name: "Chhattisgarh",
    capital: "Raipur",
    industries: ["Steel", "Power", "Mining", "Agro"],
    blurb: "Power surplus state offering industrial subsidies and rebated tariffs.",
  },
  Uttarakhand: {
    name: "Uttarakhand",
    capital: "Dehradun",
    industries: ["Pharma", "Tourism", "Auto", "FMCG"],
    blurb: "Industrial belt with mega project incentives and SGST reimbursements.",
  },
  "Himachal Pradesh": {
    name: "Himachal Pradesh",
    capital: "Shimla",
    industries: ["Pharma", "Tourism", "Hydro", "Horticulture"],
    blurb: "Industrial Policy 2019 with capital and interest subsidies.",
  },
  Goa: {
    name: "Goa",
    capital: "Panaji",
    industries: ["Tourism", "Pharma", "IT", "Mining"],
    blurb: "Coastal state offering tourism and IT investment incentives.",
  },
  "Jammu and Kashmir": {
    name: "Jammu and Kashmir",
    capital: "Srinagar",
    industries: ["Tourism", "Handicrafts", "Agro", "Horticulture"],
    blurb: "New Industrial Development Scheme with central capital incentives.",
  },
  Delhi: {
    name: "Delhi",
    capital: "New Delhi",
    industries: ["Services", "IT", "Retail", "Logistics"],
    blurb: "Capital territory with focused startup and MSME support.",
  },
};

const make = (
  state: string,
  list: { name: string; category: string; department: string; short: string }[]
): Scheme[] =>
  list.map((s, i) => ({
    id: `${state.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
    state,
    name: s.name,
    category: s.category,
    department: s.department,
    shortDescription: s.short,
    description: `${s.name} is a flagship initiative by the Government of ${state} under ${s.department}. It is designed to accelerate ${s.category.toLowerCase()} growth, attract investment, and create sustainable employment opportunities across the state.`,
    benefits: [
      "Capital subsidy on eligible fixed investment",
      "Interest subsidy on term loans",
      "SGST reimbursement for a defined period",
      "Electricity duty exemption",
      "Stamp duty waiver on land purchase",
    ],
    eligibility: [
      `Registered enterprise operating in ${state}`,
      "Valid Udyam / GST / CIN registration",
      "Compliant with environmental & labour norms",
      "Minimum investment / employment thresholds as per policy",
    ],
    documents: [
      "Detailed Project Report (DPR)",
      "Udyam registration certificate",
      "Land / lease documents",
      "Bank sanction letter",
      "PAN, GST & incorporation documents",
    ],
    process: [
      "Register on the state single-window portal",
      "Submit application along with DPR & documents",
      "Department review & site verification",
      "Approval by State Level Committee",
      "Disbursal of incentives on milestone completion",
    ],
    website: "https://www.india.gov.in/",
  }));

export const SCHEMES: Scheme[] = [
  ...make("Maharashtra", [
    { name: "Package Scheme of Incentives (PSI)", category: "Industrial Development", department: "Directorate of Industries", short: "Comprehensive capital and interest subsidy for new and expanding industrial units." },
    { name: "Maharashtra Startup Policy", category: "Startups", department: "MSIns", short: "Grants, fellowships and incubation support for early-stage startups." },
    { name: "MSME Competitive (Lean) Scheme", category: "MSME Development", department: "MSME Dept", short: "Technology upgradation and competitiveness improvement assistance." },
    { name: "EV Manufacturing Incentive", category: "EV & Mobility", department: "Industries Dept", short: "Special incentives for electric vehicle and battery manufacturing." },
    { name: "Maharashtra Textile Policy", category: "Textile", department: "Textiles Dept", short: "Setting up textile units with capital subsidy and power tariff rebate." },
    { name: "Tourism Promotion Scheme", category: "Tourism", department: "Tourism Dept", short: "Incentives for hotels, resorts and tourism infrastructure." },
  ]),
  ...make("Karnataka", [
    { name: "Karnataka Industrial Policy 2020-25", category: "Industrial Development", department: "Commerce & Industries", short: "Investment promotion subsidy for mega and ultra-mega projects." },
    { name: "Elevate Startup Program", category: "Startups", department: "K-Tech", short: "Grant-in-aid up to ₹50L for innovative product-based startups." },
    { name: "ESDM Policy Incentives", category: "Electronics", department: "ITBT Dept", short: "Capital subsidy for Electronics System Design & Manufacturing units." },
    { name: "Karnataka R&D Policy", category: "R&D", department: "Science & Tech", short: "Co-funding for industry-academia R&D collaborations." },
    { name: "Aerospace Policy Incentives", category: "Aerospace", department: "Industries Dept", short: "Special incentives for aerospace component manufacturing." },
  ]),
  ...make("Tamil Nadu", [
    { name: "TN Industrial Policy 2021", category: "Industrial Development", department: "MSME Dept", short: "Structured capital subsidy and SGST refund for industries." },
    { name: "TN Startup & Innovation Policy", category: "Startups", department: "StartupTN", short: "Seed grant, scale-up grant and incubator support." },
    { name: "TN EV Policy 2023", category: "EV & Mobility", department: "Industries Dept", short: "100% SGST refund and capital subsidy for EV manufacturers." },
    { name: "Mega Textile Park Scheme", category: "Textile", department: "Handlooms & Textiles", short: "Anchor unit incentives for integrated textile parks." },
    { name: "TN Data Centre Policy", category: "Digital Infra", department: "ITBT Dept", short: "Stamp duty exemption and power tariff rebate for data centres." },
  ]),
  ...make("Gujarat", [
    { name: "Gujarat Industrial Policy 2020", category: "Industrial Development", department: "Industries Dept", short: "Capital and interest subsidy for MSMEs and large industries." },
    { name: "Gujarat Startup Scheme", category: "Startups", department: "Industries Commissionerate", short: "Seed support, sustenance allowance and acceleration grants." },
    { name: "Solar Power Policy", category: "Renewables", department: "Energy Dept", short: "Net metering and rooftop solar incentives for commercial users." },
    { name: "Gujarat Textile Policy", category: "Textile", department: "Industries Dept", short: "Interest, power and capital subsidy across the textile value chain." },
    { name: "Semicon Policy", category: "Semiconductors", department: "Science & Tech", short: "Capital subsidy on top of Centre's incentives for fabs and ATMP." },
  ]),
  ...make("Uttar Pradesh", [
    { name: "UP Industrial Investment Policy", category: "Industrial Development", department: "Industries Dept", short: "Front-end capital subsidy and SGST reimbursement." },
    { name: "UP Startup Policy 2020", category: "Startups", department: "IT & Electronics", short: "Incubation support, sustenance allowance and matching grants." },
    { name: "ODOP Scheme", category: "MSME Development", department: "MSME Dept", short: "One District One Product margin money and training support." },
    { name: "UP Electronics Manufacturing Policy", category: "Electronics", department: "IT & Electronics", short: "Capital subsidy and stamp duty exemption for ESDM units." },
  ]),
  ...make("Telangana", [
    { name: "TS-iPASS Incentives", category: "Industrial Development", department: "Industries Dept", short: "Time-bound single window clearance with linked incentives." },
    { name: "T-Hub Startup Support", category: "Startups", department: "ITE&C Dept", short: "Incubation, acceleration and grant programs via T-Hub." },
    { name: "Life Sciences Policy", category: "Pharma & Biotech", department: "ITE&C Dept", short: "Capital subsidy and R&D grants for pharma and biotech." },
    { name: "TS EV & ESS Policy", category: "EV & Mobility", department: "Industries Dept", short: "Road tax exemption and capital subsidy for EV ecosystem." },
  ]),
  ...make("Rajasthan", [
    { name: "RIPS 2022", category: "Industrial Development", department: "BIP Rajasthan", short: "Investment promotion subsidy and employment generation subsidy." },
    { name: "Rajasthan Startup Policy", category: "Startups", department: "DoIT&C", short: "Seed funding, sustenance allowance and marketing support." },
    { name: "Solar Energy Policy", category: "Renewables", department: "Energy Dept", short: "Long-term PPA and land allotment for solar projects." },
    { name: "Tourism Unit Policy", category: "Tourism", department: "Tourism Dept", short: "Industry status benefits for hotels and tourism units." },
  ]),
  ...make("West Bengal", [
    { name: "WBIS 2013 (revised)", category: "Industrial Development", department: "Commerce & Industries", short: "Industrial promotion assistance and interest subsidy." },
    { name: "Karmasathi Prakalpa", category: "Employment", department: "MSME & Textiles", short: "Loan and subsidy for self-employment generation." },
    { name: "WB Textile Policy", category: "Textile", department: "MSME & Textiles", short: "Capital and interest subsidy for textile units." },
  ]),
  ...make("Kerala", [
    { name: "Kerala Industrial Policy 2023", category: "Industrial Development", department: "Industries Dept", short: "Investment subsidy and priority sector incentives." },
    { name: "Kerala Startup Mission", category: "Startups", department: "KSUM", short: "Grants, incubation and patent support for tech startups." },
    { name: "Responsible Tourism", category: "Tourism", department: "Tourism Dept", short: "Community-led tourism enterprise grants." },
  ]),
  ...make("Punjab", [
    { name: "Punjab IBDP 2022", category: "Industrial Development", department: "Invest Punjab", short: "Fiscal incentives, SGST reimbursement and power subsidy." },
    { name: "Punjab Startup Policy", category: "Startups", department: "Industries Dept", short: "Seed grant and incubation support for early stage startups." },
    { name: "Food Processing Mission", category: "Food Processing", department: "Food Processing Dept", short: "Capital subsidy for processing & cold-chain units." },
  ]),
  ...make("Haryana", [
    { name: "Haryana Enterprises & Employment Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Capital, employment and stamp duty subsidies." },
    { name: "Haryana Startup Policy", category: "Startups", department: "IT Dept", short: "Lease rental subsidy and seed grants for startups." },
    { name: "EV Policy 2022", category: "EV & Mobility", department: "Industries & Commerce", short: "SGST reimbursement and capital subsidy for EV makers." },
  ]),
  ...make("Madhya Pradesh", [
    { name: "MP Industrial Investment Promotion", category: "Industrial Development", department: "MP IDC", short: "Investment subsidy and land at concessional rates." },
    { name: "MP Startup Policy 2022", category: "Startups", department: "MSME Dept", short: "Matching grants and lease rental assistance." },
    { name: "MP Textile Policy", category: "Textile", department: "MSME Dept", short: "Capital, power and interest subsidy for textile units." },
  ]),
  ...make("Odisha", [
    { name: "IPR 2022", category: "Industrial Development", department: "Industries Dept", short: "Capital investment subsidy and interest subsidy under IPR." },
    { name: "Odisha Startup Policy", category: "Startups", department: "Startup Odisha", short: "Need-based grants, IP support and product development funding." },
    { name: "Sea Food Park Scheme", category: "Food Processing", department: "Fisheries Dept", short: "Subsidies for seafood processing and cold-chain." },
  ]),
  ...make("Bihar", [
    { name: "Bihar Industrial Investment Promotion Policy", category: "Industrial Development", department: "Industries Dept", short: "Capital and interest subsidy with SGST reimbursement." },
    { name: "Bihar Startup Policy", category: "Startups", department: "Industries Dept", short: "Seed funding and matching loan assistance up to ₹10L." },
    { name: "Bihar Textile & Leather Policy", category: "Textile", department: "Industries Dept", short: "Wage, freight and electricity subsidies." },
  ]),
  ...make("Andhra Pradesh", [
    { name: "AP Industrial Development Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Mega project incentives with bespoke packages." },
    { name: "AP Innovation & Startup Policy", category: "Startups", department: "ITE&C", short: "Operational grants, marketing assistance and lab access." },
    { name: "AP EV Policy", category: "EV & Mobility", department: "Industries Dept", short: "Road tax exemption and capital subsidy for OEMs." },
  ]),
  ...make("Assam", [
    { name: "Industrial & Investment Policy 2019", category: "Industrial Development", department: "Industries & Commerce", short: "Capital investment subsidy and SGST reimbursement." },
    { name: "Assam Startup Policy", category: "Startups", department: "Industries & Commerce", short: "Sustenance grant, lab and incubation support." },
  ]),
  ...make("Jharkhand", [
    { name: "Jharkhand Industrial & Investment Policy", category: "Industrial Development", department: "Industries Dept", short: "Comprehensive package of subsidies for new units." },
    { name: "Jharkhand Textile Policy", category: "Textile", department: "Industries Dept", short: "Wage assistance and capital subsidy for textile units." },
  ]),
  ...make("Chhattisgarh", [
    { name: "CG Industrial Policy 2019-24", category: "Industrial Development", department: "CSIDC", short: "Fixed capital investment subsidy and stamp duty exemption." },
    { name: "CG Startup Policy", category: "Startups", department: "CSIDC", short: "Seed funding and patent reimbursement scheme." },
  ]),
  ...make("Uttarakhand", [
    { name: "MSME Policy 2015", category: "MSME Development", department: "Industries Dept", short: "Capital, interest and SGST reimbursement schemes." },
    { name: "Uttarakhand Tourism Policy", category: "Tourism", department: "Tourism Dept", short: "Capital subsidy for tourism units across categories." },
  ]),
  ...make("Himachal Pradesh", [
    { name: "HP Industrial Policy 2019", category: "Industrial Development", department: "Industries Dept", short: "Capital, interest and freight subsidies for industries." },
    { name: "HP Startup Scheme", category: "Startups", department: "Industries Dept", short: "Sustenance allowance and grants for innovators." },
  ]),
  ...make("Goa", [
    { name: "Goa IDC Incentive Scheme", category: "Industrial Development", department: "Goa IDC", short: "Land rebate and capital subsidy for industries." },
    { name: "Goa Startup Policy", category: "Startups", department: "ITE&C", short: "Grants, lease rental subsidy and patent reimbursement." },
  ]),
  ...make("Jammu and Kashmir", [
    { name: "J&K Industrial Policy 2021", category: "Industrial Development", department: "Industries & Commerce", short: "Capital investment incentive with GST linked subsidy." },
    { name: "J&K Tourism Policy", category: "Tourism", department: "Tourism Dept", short: "Capital subsidy for hotels, homestays and adventure tourism." },
  ]),
  ...make("Delhi", [
    { name: "Delhi Startup Policy", category: "Startups", department: "Industries Dept", short: "Reimbursements, mentoring and procurement preferences." },
    { name: "Delhi EV Policy", category: "EV & Mobility", department: "Transport Dept", short: "Purchase incentive and scrappage benefit." },
  ]),
];

export const schemesByState = (state: string) =>
  SCHEMES.filter((s) => s.state === state);

export const getScheme = (id: string) =>
  SCHEMES.find((s) => s.id === id);

export const ALL_CATEGORIES = Array.from(new Set(SCHEMES.map((s) => s.category))).sort();
export const ALL_STATES = Array.from(new Set(SCHEMES.map((s) => s.state))).sort();

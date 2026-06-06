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
  officialUrl: string; // Changed from website
};

export type StateInfo = {
  name: string;
  capital: string;
  industries: string[];
  blurb: string;
};

export const STATE_INFO: Record<string, StateInfo> = {
  Maharashtra: { name: "Maharashtra", capital: "Mumbai", industries: ["Manufacturing", "IT/ITeS", "FinTech"], blurb: "India's industrial powerhouse with the largest state GDP." },
  Karnataka: { name: "Karnataka", capital: "Bengaluru", industries: ["IT", "Aerospace", "Startups"], blurb: "Home to India's startup capital with world-class tech incentives." },
  "Tamil Nadu": { name: "Tamil Nadu", capital: "Chennai", industries: ["Auto", "Electronics", "Renewables"], blurb: "Leading manufacturing hub with EV and electronics clusters." },
  Gujarat: { name: "Gujarat", capital: "Gandhinagar", industries: ["Chemicals", "Pharma", "Diamonds"], blurb: "India's most industrialised state with marquee incentives." },
  "Uttar Pradesh": { name: "Uttar Pradesh", capital: "Lucknow", industries: ["Food Processing", "Electronics", "Tourism"], blurb: "Fast-growing economy with aggressive MSME incentives." },
  Telangana: { name: "Telangana", capital: "Hyderabad", industries: ["IT", "Life Sciences", "Aerospace"], blurb: "Progressive policy state with TS-iPASS single-window." },
  Rajasthan: { name: "Rajasthan", capital: "Jaipur", industries: ["Renewables", "Mining", "Tourism"], blurb: "Largest state by area with leading solar subsidies." },
  "West Bengal": { name: "West Bengal", capital: "Kolkata", industries: ["Jute", "Tea", "MSME"], blurb: "Eastern gateway with strong MSME and manufacturing incentives." },
  Kerala: { name: "Kerala", capital: "Thiruvananthapuram", industries: ["Tourism", "Spices", "IT"], blurb: "High HDI state with focused startup and tourism support." },
  Punjab: { name: "Punjab", capital: "Chandigarh", industries: ["Agriculture", "Food Processing", "Auto Parts"], blurb: "Agri-industrial state with comprehensive food processing schemes." },
  Haryana: { name: "Haryana", capital: "Chandigarh", industries: ["Auto", "IT", "Apparel"], blurb: "Industrial corridor leader with strong NCR-based incentives." },
  "Madhya Pradesh": { name: "Madhya Pradesh", capital: "Bhopal", industries: ["Textiles", "Food Processing", "Pharma"], blurb: "Heart of India with attractive land bank and capital subsidy programs." },
  Odisha: { name: "Odisha", capital: "Bhubaneswar", industries: ["Steel", "Aluminium", "IT"], blurb: "Metal & mineral powerhouse with focused industrial incentives." },
  Bihar: { name: "Bihar", capital: "Patna", industries: ["Food Processing", "Textiles", "Leather"], blurb: "Emerging investment destination with new industrial policies." },
  "Andhra Pradesh": { name: "Andhra Pradesh", capital: "Amaravati", industries: ["Auto", "Pharma", "Electronics"], blurb: "Long coastline with port-led industrial policy." },
  Assam: { name: "Assam", capital: "Dispur", industries: ["Tea", "Oil & Gas", "Tourism"], blurb: "Gateway to the North-East with strong investment policies." },
  Jharkhand: { name: "Jharkhand", capital: "Ranchi", industries: ["Mining", "Steel", "Auto"], blurb: "Mineral-rich state with focused textile incentives." },
  Chhattisgarh: { name: "Chhattisgarh", capital: "Raipur", industries: ["Steel", "Power", "Mining"], blurb: "Power surplus state offering industrial subsidies." },
  Uttarakhand: { name: "Uttarakhand", capital: "Dehradun", industries: ["Pharma", "Tourism", "Auto"], blurb: "Industrial belt with mega project incentives." },
  "Himachal Pradesh": { name: "Himachal Pradesh", capital: "Shimla", industries: ["Pharma", "Tourism", "Hydro"], blurb: "Industrial Policy 2019 with capital and interest subsidies." },
  Goa: { name: "Goa", capital: "Panaji", industries: ["Tourism", "Pharma", "IT"], blurb: "Coastal state offering tourism and IT investment incentives." },
  "Jammu and Kashmir": { name: "Jammu and Kashmir", capital: "Srinagar", industries: ["Tourism", "Handicrafts", "Agro"], blurb: "New Industrial Development Scheme with central capital incentives." },
  Delhi: { name: "Delhi", capital: "New Delhi", industries: ["Services", "IT", "Logistics"], blurb: "Capital territory with focused startup and MSME support." },
  "Arunachal Pradesh": { name: "Arunachal Pradesh", capital: "Itanagar", industries: ["Hydro Power", "Tourism", "Agro"], blurb: "Land of the dawn-lit mountains with hydro and tourism incentives." },
  Manipur: { name: "Manipur", capital: "Imphal", industries: ["Handlooms", "Handicrafts", "Agro"], blurb: "Jewel of India offering MSME and textile subsidies." },
  Meghalaya: { name: "Meghalaya", capital: "Shillong", industries: ["Tourism", "Mining", "Agro"], blurb: "Abode of clouds with dedicated tourism and startup policies." },
  Mizoram: { name: "Mizoram", capital: "Aizawl", industries: ["Bamboo", "Handlooms", "Tourism"], blurb: "High literacy state focusing on bamboo and MSME development." },
  Nagaland: { name: "Nagaland", capital: "Kohima", industries: ["Agro", "Tourism", "Handlooms"], blurb: "Rich cultural heritage with specific agro and tourism policies." },
  Sikkim: { name: "Sikkim", capital: "Gangtok", industries: ["Eco-tourism", "Pharma", "Agro"], blurb: "First fully organic state with eco-tourism and pharma incentives." },
  Tripura: { name: "Tripura", capital: "Agartala", industries: ["Rubber", "Bamboo", "IT"], blurb: "Second largest rubber producer offering IT and MSME subsidies." },
  "Andaman and Nicobar Islands": { name: "Andaman and Nicobar Islands", capital: "Port Blair", industries: ["Tourism", "Fisheries", "Agro"], blurb: "Strategic archipelago with tourism and fisheries subsidies." },
  Chandigarh: { name: "Chandigarh", capital: "Chandigarh", industries: ["IT", "Services", "Tourism"], blurb: "First planned city with IT and service sector incentives." },
  "Dadra and Nagar Haveli and Daman and Diu": { name: "Dadra and Nagar Haveli and Daman and Diu", capital: "Daman", industries: ["Manufacturing", "Plastics", "Textiles"], blurb: "Coastal union territory with strong manufacturing subsidies." },
  Ladakh: { name: "Ladakh", capital: "Leh", industries: ["Tourism", "Renewables", "Agro"], blurb: "High altitude territory focusing on solar and eco-tourism." },
  Lakshadweep: { name: "Lakshadweep", capital: "Kavaratti", industries: ["Tourism", "Fisheries", "Coir"], blurb: "Coral islands promoting sustainable tourism and fisheries." },
  Puducherry: { name: "Puducherry", capital: "Puducherry", industries: ["Tourism", "IT", "Textiles"], blurb: "Coastal territory with IT, tourism and MSME policies." },
};

const make = (
  state: string,
  list: { name: string; category: string; department: string; short: string; url: string }[]
): Scheme[] =>
  list.map((s, i) => ({
    id: `${state.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}`,
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
    officialUrl: s.url,
  }));

export const SCHEMES: Scheme[] = [
  ...make("Maharashtra", [
    { name: "Package Scheme of Incentives (PSI)", category: "Industrial Development", department: "Directorate of Industries", short: "Comprehensive capital and interest subsidy for new and expanding industrial units.", url: "https://maitri.mahaonline.gov.in/" },
    { name: "Maharashtra Startup Policy", category: "Startups", department: "MSIns", short: "Grants, fellowships and incubation support for early-stage startups.", url: "https://www.msins.in/" },
    { name: "EV Manufacturing Incentive", category: "EV & Mobility", department: "Industries Dept", short: "Special incentives for electric vehicle and battery manufacturing.", url: "https://di.maharashtra.gov.in/" },
  ]),
  ...make("Karnataka", [
    { name: "Karnataka Industrial Policy 2020-25", category: "Industrial Development", department: "Commerce & Industries", short: "Investment promotion subsidy for mega and ultra-mega projects.", url: "https://kum.karnataka.gov.in/" },
    { name: "Elevate Startup Program", category: "Startups", department: "K-Tech", short: "Grant-in-aid up to ₹50L for innovative product-based startups.", url: "https://startup.karnataka.gov.in/" },
  ]),
  ...make("Tamil Nadu", [
    { name: "TN Industrial Policy 2021", category: "Industrial Development", department: "MSME Dept", short: "Structured capital subsidy and SGST refund for industries.", url: "https://investingintamilnadu.com/" },
    { name: "TN Startup & Innovation Policy", category: "Startups", department: "StartupTN", short: "Seed grant, scale-up grant and incubator support.", url: "https://startuptn.in/" },
  ]),
  ...make("Gujarat", [
    { name: "Gujarat Industrial Policy 2020", category: "Industrial Development", department: "Industries Dept", short: "Capital and interest subsidy for MSMEs and large industries.", url: "https://ic.gujarat.gov.in/" },
    { name: "Gujarat Startup Scheme", category: "Startups", department: "Industries Commissionerate", short: "Seed support, sustenance allowance and acceleration grants.", url: "https://startupgujarat.in/" },
  ]),
  ...make("Uttar Pradesh", [
    { name: "UP Industrial Investment Policy", category: "Industrial Development", department: "Industries Dept", short: "Front-end capital subsidy and SGST reimbursement.", url: "https://invest.up.gov.in/" },
    { name: "UP Startup Policy 2020", category: "Startups", department: "IT & Electronics", short: "Incubation support, sustenance allowance and matching grants.", url: "https://startinup.up.gov.in/" },
  ]),
  ...make("Telangana", [
    { name: "TS-iPASS Incentives", category: "Industrial Development", department: "Industries Dept", short: "Time-bound single window clearance with linked incentives.", url: "https://ipass.telangana.gov.in/" },
    { name: "T-Hub Startup Support", category: "Startups", department: "ITE&C Dept", short: "Incubation, acceleration and grant programs via T-Hub.", url: "https://t-hub.co/" },
  ]),
  ...make("Rajasthan", [
    { name: "RIPS 2022", category: "Industrial Development", department: "BIP Rajasthan", short: "Investment promotion subsidy and employment generation subsidy.", url: "https://invest.rajasthan.gov.in/" },
    { name: "Rajasthan Startup Policy", category: "Startups", department: "DoIT&C", short: "Seed funding, sustenance allowance and marketing support.", url: "https://istart.rajasthan.gov.in/" },
  ]),
  ...make("West Bengal", [
    { name: "WBIS 2013 (revised)", category: "Industrial Development", department: "Commerce & Industries", short: "Industrial promotion assistance and interest subsidy.", url: "https://silpasathi.wb.gov.in/" },
    { name: "Karmasathi Prakalpa", category: "Employment", department: "MSME & Textiles", short: "Loan and subsidy for self-employment generation.", url: "https://myenterprisewb.in/" },
  ]),
  ...make("Kerala", [
    { name: "Kerala Industrial Policy 2023", category: "Industrial Development", department: "Industries Dept", short: "Investment subsidy and priority sector incentives.", url: "https://ksidc.org/" },
    { name: "Kerala Startup Mission", category: "Startups", department: "KSUM", short: "Grants, incubation and patent support for tech startups.", url: "https://startupmission.kerala.gov.in/" },
  ]),
  ...make("Punjab", [
    { name: "Punjab IBDP 2022", category: "Industrial Development", department: "Invest Punjab", short: "Fiscal incentives, SGST reimbursement and power subsidy.", url: "https://investpunjab.gov.in/" },
    { name: "Punjab Startup Policy", category: "Startups", department: "Industries Dept", short: "Seed grant and incubation support for early stage startups.", url: "https://startup.punjab.gov.in/" },
  ]),
  ...make("Haryana", [
    { name: "Haryana Enterprises & Employment Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Capital, employment and stamp duty subsidies.", url: "https://investharyana.in/" },
    { name: "Haryana Startup Policy", category: "Startups", department: "IT Dept", short: "Lease rental subsidy and seed grants for startups.", url: "https://statestartup.haryana.gov.in/" },
  ]),
  ...make("Madhya Pradesh", [
    { name: "MP Industrial Investment Promotion", category: "Industrial Development", department: "MP IDC", short: "Investment subsidy and land at concessional rates.", url: "https://invest.mp.gov.in/" },
    { name: "MP Startup Policy 2022", category: "Startups", department: "MSME Dept", short: "Matching grants and lease rental assistance.", url: "https://mpmsme.gov.in/" },
  ]),
  ...make("Odisha", [
    { name: "IPR 2022", category: "Industrial Development", department: "Industries Dept", short: "Capital investment subsidy and interest subsidy under IPR.", url: "https://investodisha.gov.in/" },
    { name: "Odisha Startup Policy", category: "Startups", department: "Startup Odisha", short: "Need-based grants, IP support and product development funding.", url: "https://startupodisha.gov.in/" },
  ]),
  ...make("Bihar", [
    { name: "Bihar Industrial Investment Promotion Policy", category: "Industrial Development", department: "Industries Dept", short: "Capital and interest subsidy with SGST reimbursement.", url: "https://state.bihar.gov.in/industries/" },
    { name: "Bihar Startup Policy", category: "Startups", department: "Industries Dept", short: "Seed funding and matching loan assistance up to ₹10L.", url: "https://startup.bihar.gov.in/" },
  ]),
  ...make("Andhra Pradesh", [
    { name: "AP Industrial Development Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Mega project incentives with bespoke packages.", url: "https://www.apindustries.gov.in/" },
    { name: "AP Innovation & Startup Policy", category: "Startups", department: "ITE&C", short: "Operational grants, marketing assistance and lab access.", url: "https://www.nsws.gov.in/" },
  ]),
  ...make("Assam", [
    { name: "Industrial & Investment Policy 2019", category: "Industrial Development", department: "Industries & Commerce", short: "Capital investment subsidy and SGST reimbursement.", url: "https://investinassam.com/" },
    { name: "Assam Startup Policy", category: "Startups", department: "Industries & Commerce", short: "Sustenance grant, lab and incubation support.", url: "https://startup.assam.gov.in/" },
  ]),
  ...make("Jharkhand", [
    { name: "Jharkhand Industrial & Investment Policy", category: "Industrial Development", department: "Industries Dept", short: "Comprehensive package of subsidies for new units.", url: "https://advantage.jharkhand.gov.in/" },
  ]),
  ...make("Chhattisgarh", [
    { name: "CG Industrial Policy 2019-24", category: "Industrial Development", department: "CSIDC", short: "Fixed capital investment subsidy and stamp duty exemption.", url: "https://industries.cg.gov.in/" },
  ]),
  ...make("Uttarakhand", [
    { name: "MSME Policy 2015", category: "MSME Development", department: "Industries Dept", short: "Capital, interest and SGST reimbursement schemes.", url: "https://investuttarakhand.uk.gov.in/" },
  ]),
  ...make("Himachal Pradesh", [
    { name: "HP Industrial Policy 2019", category: "Industrial Development", department: "Industries Dept", short: "Capital, interest and freight subsidies for industries.", url: "https://emerginghimachal.hp.gov.in/" },
  ]),
  ...make("Goa", [
    { name: "Goa IDC Incentive Scheme", category: "Industrial Development", department: "Goa IDC", short: "Land rebate and capital subsidy for industries.", url: "https://goaidc.com/" },
    { name: "Goa Startup Policy", category: "Startups", department: "ITE&C", short: "Grants, lease rental subsidy and patent reimbursement.", url: "https://startup.goa.gov.in/" },
  ]),
  ...make("Jammu and Kashmir", [
    { name: "J&K Industrial Policy 2021", category: "Industrial Development", department: "Industries & Commerce", short: "Capital investment incentive with GST linked subsidy.", url: "https://investjk.in/" },
  ]),
  ...make("Delhi", [
    { name: "Delhi Startup Policy", category: "Startups", department: "Industries Dept", short: "Reimbursements, mentoring and procurement preferences.", url: "https://www.nsws.gov.in/" },
  ]),
  ...make("Arunachal Pradesh", [
    { name: "AP Industrial & Investment Policy", category: "Industrial Development", department: "Industries Dept", short: "Capital investment subsidy for new industrial units.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Manipur", [
    { name: "Manipur Industrial Policy", category: "Industrial Development", department: "Commerce & Industries", short: "Comprehensive industrial and IT sector incentives.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Meghalaya", [
    { name: "Meghalaya Industrial Policy", category: "Industrial Development", department: "Commerce & Industries", short: "Subsidies for tourism and agro-based industries.", url: "https://investmeghalaya.gov.in/" }
  ]),
  ...make("Mizoram", [
    { name: "Mizoram Industrial Policy", category: "Industrial Development", department: "Industries Dept", short: "Incentives focusing on bamboo and MSME sectors.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Nagaland", [
    { name: "Nagaland Industrial Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Subsidies for local entrepreneurs and MSMEs.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Sikkim", [
    { name: "Sikkim MSME Policy", category: "MSME Development", department: "Commerce & Industries", short: "Incentives for eco-tourism and organic agro units.", url: "https://sikkim.gov.in/" }
  ]),
  ...make("Tripura", [
    { name: "Tripura Industrial Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Capital and interest subsidies for IT and rubber industries.", url: "https://investtripura.gov.in/" }
  ]),
  ...make("Andaman and Nicobar Islands", [
    { name: "Andaman Industrial Scheme", category: "Industrial Development", department: "Industries Dept", short: "Subsidies promoting sustainable tourism and fisheries.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Chandigarh", [
    { name: "Chandigarh IT Policy", category: "IT & Services", department: "IT Dept", short: "Incentives for IT and knowledge-based startups.", url: "https://chandigarh.gov.in/" }
  ]),
  ...make("Dadra and Nagar Haveli and Daman and Diu", [
    { name: "DNH & DD Industrial Policy", category: "Industrial Development", department: "Industries Dept", short: "Subsidies to promote manufacturing and plastics.", url: "https://www.nsws.gov.in/" }
  ]),
  ...make("Ladakh", [
    { name: "Ladakh Industrial Policy", category: "Industrial Development", department: "Industries Dept", short: "Eco-friendly industrial subsidies for renewables and tourism.", url: "https://ladakh.nic.in/" }
  ]),
  ...make("Lakshadweep", [
    { name: "Lakshadweep Industrial Scheme", category: "Industrial Development", department: "Industries Dept", short: "Incentives for sustainable fisheries and coir industries.", url: "https://lakshadweep.gov.in/" }
  ]),
  ...make("Puducherry", [
    { name: "Puducherry Industrial Policy", category: "Industrial Development", department: "Industries & Commerce", short: "Capital subsidy and IT incentives for investors.", url: "https://industry.py.gov.in/" }
  ])
];

export const schemesByState = (state: string) =>
  SCHEMES.filter((s) => s.state === state);

export const getScheme = (id: string) =>
  SCHEMES.find((s) => s.id === id);

export const ALL_CATEGORIES = Array.from(new Set(SCHEMES.map((s) => s.category))).sort();
export const ALL_STATES = Array.from(new Set(SCHEMES.map((s) => s.state))).sort();

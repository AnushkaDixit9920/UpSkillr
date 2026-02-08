export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  interviewStyle: 'DSA-heavy' | 'CS-basics' | 'Aptitude' | 'Balanced' | 'System-design';
  primaryFocus: string[];
  secondaryFocus: string[];
  skillChecklist: string[];
  preparationTips: string[];
  difficulty: 'High' | 'Medium' | 'Medium-High';
  avgInterviewRounds: number;
}

export const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '🔵',
    industry: 'Technology',
    description: 'Global technology leader known for search, cloud computing, and AI innovations.',
    interviewStyle: 'DSA-heavy',
    primaryFocus: [
      'Data Structures & Algorithms',
      'System Design',
      'Problem Solving',
      'Coding Proficiency'
    ],
    secondaryFocus: [
      'Behavioral Questions',
      'Leadership Principles',
      'Project Experience'
    ],
    skillChecklist: [
      'Arrays, Strings, Linked Lists',
      'Trees, Graphs, Heaps',
      'Dynamic Programming',
      'Recursion & Backtracking',
      'System Design Basics',
      'Distributed Systems',
      'Time & Space Complexity',
      'Object-Oriented Design'
    ],
    preparationTips: [
      'Practice 200+ LeetCode problems (focus on Medium & Hard)',
      'Master Big O notation and optimization techniques',
      'Study Google-specific interview patterns',
      'Prepare for 45-60 minute coding rounds',
      'Practice explaining your thought process clearly',
      'Review system design for senior roles'
    ],
    difficulty: 'High',
    avgInterviewRounds: 5
  },
  {
    id: 'uber',
    name: 'Uber',
    logo: '⚫',
    industry: 'Transportation Technology',
    description: 'Leading mobility platform connecting riders with drivers worldwide.',
    interviewStyle: 'Balanced',
    primaryFocus: [
      'System Design',
      'Data Structures & Algorithms',
      'Distributed Systems',
      'Real-time Systems'
    ],
    secondaryFocus: [
      'Behavioral Assessment',
      'Product Sense',
      'Cross-functional Collaboration'
    ],
    skillChecklist: [
      'Real-time Location Systems',
      'Distributed Computing',
      'Database Design',
      'API Design',
      'Caching Strategies',
      'Message Queues',
      'Load Balancing',
      'Microservices Architecture'
    ],
    preparationTips: [
      'Focus heavily on system design (Uber-scale)',
      'Understand real-time data processing',
      'Study geolocation and mapping algorithms',
      'Practice designing ride-matching systems',
      'Review database sharding and partitioning',
      'Prepare for cross-team collaboration questions'
    ],
    difficulty: 'High',
    avgInterviewRounds: 5
  },
  {
    id: 'cisco',
    name: 'Cisco',
    logo: '🔷',
    industry: 'Networking & Communications',
    description: 'Global leader in networking hardware, software, and cybersecurity solutions.',
    interviewStyle: 'CS-basics',
    primaryFocus: [
      'Networking Fundamentals',
      'Computer Science Basics',
      'Operating Systems',
      'Security Concepts'
    ],
    secondaryFocus: [
      'Problem Solving',
      'Team Collaboration',
      'Communication Skills'
    ],
    skillChecklist: [
      'TCP/IP Protocol Suite',
      'Network Routing & Switching',
      'OSI Model',
      'Firewalls & Security',
      'Linux/Unix Administration',
      'Cloud Networking',
      'Software Development',
      'Troubleshooting'
    ],
    preparationTips: [
      'Deep dive into networking protocols (TCP/IP, HTTP, DNS)',
      'Review OSI model layers thoroughly',
      'Study Cisco certifications content (CCNA level)',
      'Prepare for hands-on networking scenarios',
      'Review operating system concepts',
      'Practice explaining technical concepts simply'
    ],
    difficulty: 'Medium',
    avgInterviewRounds: 4
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '🟣',
    industry: 'Consulting & Technology Services',
    description: 'Global professional services company with expertise in digital transformation.',
    interviewStyle: 'Aptitude',
    primaryFocus: [
      'Aptitude & Reasoning',
      'Communication Skills',
      'Problem Solving',
      'Domain Knowledge'
    ],
    secondaryFocus: [
      'Technical Fundamentals',
      'Project Experience',
      'Client Management'
    ],
    skillChecklist: [
      'Verbal & Logical Reasoning',
      'Quantitative Aptitude',
      'Basic Programming',
      'Database Concepts',
      'Cloud Fundamentals',
      'Agile Methodology',
      'Business Communication',
      'Presentation Skills'
    ],
    preparationTips: [
      'Practice aptitude tests (verbal, logical, quantitative)',
      'Prepare for group discussions',
      'Work on communication and presentation skills',
      'Review basic programming concepts',
      'Understand consulting case studies',
      'Prepare examples of leadership and teamwork'
    ],
    difficulty: 'Medium',
    avgInterviewRounds: 3
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    logo: '🔵',
    industry: 'Professional Networking',
    description: 'The world\'s largest professional network connecting talent with opportunity.',
    interviewStyle: 'Balanced',
    primaryFocus: [
      'Data Structures & Algorithms',
      'System Design',
      'Behavioral Assessment',
      'Product Thinking'
    ],
    secondaryFocus: [
      'Leadership Principles',
      'Cross-functional Work',
      'Impact & Metrics'
    ],
    skillChecklist: [
      'Graph Algorithms',
      'Recommendation Systems',
      'Search & Ranking',
      'Database Design',
      'Distributed Systems',
      'RESTful APIs',
      'Data Analytics',
      'A/B Testing'
    ],
    preparationTips: [
      'Practice graph-based problems (social networks)',
      'Study recommendation and ranking algorithms',
      'Review LinkedIn\'s engineering blog',
      'Prepare behavioral answers using STAR method',
      'Understand data-driven product decisions',
      'Practice designing social features at scale'
    ],
    difficulty: 'Medium-High',
    avgInterviewRounds: 4
  }
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id);
}

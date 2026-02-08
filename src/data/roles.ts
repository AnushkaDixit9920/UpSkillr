export interface Role {
  id: string;
  title: string;
  category: string;
  description: string;
  coreSkills: string[];
  supportingSkills: string[];
  behavioralSkills: string[];
  degreeRequirement: string;
  preferredBackground: 'Tech' | 'Non-Tech' | 'Both';
  salaryRange: string;
  demandLevel: 'High' | 'Medium' | 'Growing';
  timeline: {
    phase: string;
    duration: string;
    focus: string[];
  }[];
}

export const roles: Role[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Engineering',
    description: 'Design, develop, and maintain software applications and systems.',
    coreSkills: [
      'Programming Languages (Python, Java, JavaScript)',
      'Data Structures & Algorithms',
      'Version Control (Git)',
      'Database Management (SQL/NoSQL)',
      'API Development'
    ],
    supportingSkills: [
      'Cloud Platforms (AWS, GCP, Azure)',
      'CI/CD Pipelines',
      'Testing & QA',
      'Containerization (Docker)',
      'Agile Methodologies'
    ],
    behavioralSkills: [
      'Problem Solving',
      'Team Collaboration',
      'Communication',
      'Time Management',
      'Adaptability'
    ],
    degreeRequirement: 'Bachelor\'s in CS/IT preferred, not mandatory',
    preferredBackground: 'Tech',
    salaryRange: '$70K - $180K',
    demandLevel: 'High',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['Programming fundamentals', 'Basic DSA', 'Version control', 'One framework']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['Advanced DSA', 'System design basics', 'Database proficiency', 'Build projects']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Distributed systems', 'Cloud architecture', 'Open source contributions', 'Leadership skills']
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Extract insights from complex data to drive business decisions.',
    coreSkills: [
      'Python/R Programming',
      'Statistics & Probability',
      'Machine Learning',
      'Data Visualization',
      'SQL & Data Manipulation'
    ],
    supportingSkills: [
      'Deep Learning',
      'Big Data Tools (Spark, Hadoop)',
      'Cloud ML Platforms',
      'A/B Testing',
      'Feature Engineering'
    ],
    behavioralSkills: [
      'Analytical Thinking',
      'Business Acumen',
      'Storytelling with Data',
      'Curiosity',
      'Attention to Detail'
    ],
    degreeRequirement: 'Bachelor\'s/Master\'s in STEM, Statistics, or related',
    preferredBackground: 'Tech',
    salaryRange: '$80K - $200K',
    demandLevel: 'High',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['Python basics', 'Statistics fundamentals', 'SQL proficiency', 'Pandas/NumPy']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['ML algorithms', 'Scikit-learn', 'Data visualization', 'EDA techniques']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Deep learning', 'NLP/Computer Vision', 'MLOps', 'Research papers']
      }
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product',
    description: 'Define product vision and lead cross-functional teams to deliver value.',
    coreSkills: [
      'Product Strategy',
      'User Research',
      'Roadmap Planning',
      'Stakeholder Management',
      'Data Analysis'
    ],
    supportingSkills: [
      'Technical Understanding',
      'UX Design Principles',
      'Market Analysis',
      'Financial Modeling',
      'Agile/Scrum'
    ],
    behavioralSkills: [
      'Leadership',
      'Empathy',
      'Decision Making',
      'Influence without Authority',
      'Strategic Thinking'
    ],
    degreeRequirement: 'MBA preferred, diverse backgrounds welcome',
    preferredBackground: 'Both',
    salaryRange: '$90K - $200K',
    demandLevel: 'High',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['Product fundamentals', 'User research methods', 'Basic analytics', 'Communication skills']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['Roadmap creation', 'Prioritization frameworks', 'Technical literacy', 'Stakeholder management']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Product strategy', 'Team leadership', 'Business metrics', 'Cross-functional leadership']
      }
    ]
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    category: 'Design',
    description: 'Create intuitive and delightful user experiences through research and design.',
    coreSkills: [
      'User Research',
      'Wireframing & Prototyping',
      'Design Tools (Figma, Sketch)',
      'Interaction Design',
      'Usability Testing'
    ],
    supportingSkills: [
      'Visual Design',
      'Design Systems',
      'HTML/CSS Basics',
      'Motion Design',
      'Accessibility Standards'
    ],
    behavioralSkills: [
      'Empathy',
      'Creativity',
      'Collaboration',
      'Attention to Detail',
      'Presentation Skills'
    ],
    degreeRequirement: 'Design degree helpful, portfolio matters more',
    preferredBackground: 'Both',
    salaryRange: '$60K - $150K',
    demandLevel: 'High',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['Design principles', 'Figma basics', 'User research 101', 'Portfolio building']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['Advanced prototyping', 'Design systems', 'Usability testing', 'Case studies']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Design leadership', 'Strategic design', 'Mentoring', 'Cross-platform design']
      }
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Engineering',
    description: 'Bridge development and operations to enable faster, reliable software delivery.',
    coreSkills: [
      'Linux Administration',
      'CI/CD Pipelines',
      'Cloud Platforms (AWS/GCP/Azure)',
      'Infrastructure as Code',
      'Containerization (Docker/Kubernetes)'
    ],
    supportingSkills: [
      'Scripting (Bash, Python)',
      'Monitoring & Logging',
      'Security Best Practices',
      'Networking',
      'Database Administration'
    ],
    behavioralSkills: [
      'Problem Solving',
      'Automation Mindset',
      'Collaboration',
      'Continuous Learning',
      'Crisis Management'
    ],
    degreeRequirement: 'CS/IT degree or equivalent experience',
    preferredBackground: 'Tech',
    salaryRange: '$80K - $180K',
    demandLevel: 'High',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['Linux fundamentals', 'Git mastery', 'Basic scripting', 'One cloud platform']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['Docker & Kubernetes', 'CI/CD setup', 'Terraform/Ansible', 'Monitoring tools']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Multi-cloud architecture', 'Security & compliance', 'SRE practices', 'Team leadership']
      }
    ]
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business',
    description: 'Analyze business processes and identify opportunities for improvement.',
    coreSkills: [
      'Requirements Gathering',
      'Process Mapping',
      'Data Analysis',
      'Documentation',
      'Stakeholder Communication'
    ],
    supportingSkills: [
      'SQL & Excel',
      'BI Tools (Tableau, Power BI)',
      'Project Management',
      'Domain Knowledge',
      'Agile Methodologies'
    ],
    behavioralSkills: [
      'Analytical Thinking',
      'Communication',
      'Problem Solving',
      'Negotiation',
      'Attention to Detail'
    ],
    degreeRequirement: 'Business/Economics degree preferred',
    preferredBackground: 'Both',
    salaryRange: '$55K - $120K',
    demandLevel: 'Medium',
    timeline: [
      {
        phase: 'Foundation',
        duration: '0-3 months',
        focus: ['BA fundamentals', 'Requirements documentation', 'Excel proficiency', 'Communication skills']
      },
      {
        phase: 'Intermediate',
        duration: '3-6 months',
        focus: ['SQL & data analysis', 'BI tools', 'Process modeling', 'Agile/Scrum']
      },
      {
        phase: 'Advanced',
        duration: '6+ months',
        focus: ['Strategic analysis', 'Domain expertise', 'Leadership', 'Consulting skills']
      }
    ]
  }
];

export function getRoleById(id: string): Role | undefined {
  return roles.find(r => r.id === id);
}

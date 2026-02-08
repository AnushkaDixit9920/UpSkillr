// Learning resources for skills

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'documentation' | 'practice' | 'project';
  level: 'beginner' | 'intermediate' | 'advanced';
  effort: 'low' | 'medium' | 'high';
  duration: string;
  outcome: string;
  url: string;
  provider: string;
}

export interface SkillResources {
  skill: string;
  resources: LearningResource[];
}

export const skillResources: SkillResources[] = [
  {
    skill: 'JavaScript',
    resources: [
      {
        id: 'js-1',
        title: 'JavaScript Fundamentals',
        type: 'course',
        level: 'beginner',
        effort: 'medium',
        duration: '4 weeks',
        outcome: 'Build interactive web pages with vanilla JS',
        url: '#',
        provider: 'freeCodeCamp'
      },
      {
        id: 'js-2',
        title: 'JavaScript: The Hard Parts',
        type: 'video',
        level: 'intermediate',
        effort: 'high',
        duration: '8 hours',
        outcome: 'Master closures, async, and prototypes',
        url: '#',
        provider: 'Frontend Masters'
      },
      {
        id: 'js-3',
        title: 'JavaScript.info',
        type: 'documentation',
        level: 'beginner',
        effort: 'low',
        duration: 'Self-paced',
        outcome: 'Comprehensive JS reference knowledge',
        url: '#',
        provider: 'JavaScript.info'
      }
    ]
  },
  {
    skill: 'TypeScript',
    resources: [
      {
        id: 'ts-1',
        title: 'TypeScript for Beginners',
        type: 'course',
        level: 'beginner',
        effort: 'medium',
        duration: '2 weeks',
        outcome: 'Add type safety to JavaScript projects',
        url: '#',
        provider: 'Udemy'
      },
      {
        id: 'ts-2',
        title: 'TypeScript Deep Dive',
        type: 'documentation',
        level: 'intermediate',
        effort: 'medium',
        duration: 'Self-paced',
        outcome: 'Advanced TypeScript patterns',
        url: '#',
        provider: 'TypeScript Handbook'
      }
    ]
  },
  {
    skill: 'Python',
    resources: [
      {
        id: 'py-1',
        title: 'Python for Everybody',
        type: 'course',
        level: 'beginner',
        effort: 'medium',
        duration: '8 weeks',
        outcome: 'Python programming foundation',
        url: '#',
        provider: 'Coursera'
      },
      {
        id: 'py-2',
        title: 'Automate the Boring Stuff',
        type: 'project',
        level: 'beginner',
        effort: 'medium',
        duration: '4 weeks',
        outcome: 'Practical Python automation skills',
        url: '#',
        provider: 'Al Sweigart'
      },
      {
        id: 'py-3',
        title: 'LeetCode Python Track',
        type: 'practice',
        level: 'intermediate',
        effort: 'high',
        duration: 'Ongoing',
        outcome: 'Algorithmic problem solving',
        url: '#',
        provider: 'LeetCode'
      }
    ]
  },
  {
    skill: 'React',
    resources: [
      {
        id: 'react-1',
        title: 'React Official Tutorial',
        type: 'documentation',
        level: 'beginner',
        effort: 'low',
        duration: '1 week',
        outcome: 'Understand React fundamentals',
        url: '#',
        provider: 'React.dev'
      },
      {
        id: 'react-2',
        title: 'Full Stack Open',
        type: 'course',
        level: 'intermediate',
        effort: 'high',
        duration: '12 weeks',
        outcome: 'Full stack development with React',
        url: '#',
        provider: 'University of Helsinki'
      },
      {
        id: 'react-3',
        title: 'Build a Real-World App',
        type: 'project',
        level: 'intermediate',
        effort: 'high',
        duration: '4 weeks',
        outcome: 'Portfolio-ready React project',
        url: '#',
        provider: 'Self-directed'
      }
    ]
  },
  {
    skill: 'Node.js',
    resources: [
      {
        id: 'node-1',
        title: 'Node.js Crash Course',
        type: 'video',
        level: 'beginner',
        effort: 'low',
        duration: '3 hours',
        outcome: 'Build REST APIs with Express',
        url: '#',
        provider: 'Traversy Media'
      },
      {
        id: 'node-2',
        title: 'Node.js Design Patterns',
        type: 'course',
        level: 'advanced',
        effort: 'high',
        duration: '6 weeks',
        outcome: 'Production-grade Node architecture',
        url: '#',
        provider: 'Packt'
      }
    ]
  },
  {
    skill: 'SQL',
    resources: [
      {
        id: 'sql-1',
        title: 'SQL Basics',
        type: 'course',
        level: 'beginner',
        effort: 'low',
        duration: '2 weeks',
        outcome: 'Write queries and manage databases',
        url: '#',
        provider: 'Khan Academy'
      },
      {
        id: 'sql-2',
        title: 'SQL Practice Problems',
        type: 'practice',
        level: 'intermediate',
        effort: 'medium',
        duration: 'Ongoing',
        outcome: 'Complex query optimization',
        url: '#',
        provider: 'HackerRank'
      }
    ]
  },
  {
    skill: 'AWS',
    resources: [
      {
        id: 'aws-1',
        title: 'AWS Cloud Practitioner',
        type: 'course',
        level: 'beginner',
        effort: 'medium',
        duration: '4 weeks',
        outcome: 'Cloud fundamentals certification prep',
        url: '#',
        provider: 'AWS Training'
      },
      {
        id: 'aws-2',
        title: 'AWS Solutions Architect',
        type: 'course',
        level: 'intermediate',
        effort: 'high',
        duration: '8 weeks',
        outcome: 'Design scalable cloud architectures',
        url: '#',
        provider: 'A Cloud Guru'
      }
    ]
  },
  {
    skill: 'Docker',
    resources: [
      {
        id: 'docker-1',
        title: 'Docker for Beginners',
        type: 'video',
        level: 'beginner',
        effort: 'low',
        duration: '4 hours',
        outcome: 'Containerize applications',
        url: '#',
        provider: 'Docker Official'
      },
      {
        id: 'docker-2',
        title: 'Docker in Production',
        type: 'project',
        level: 'intermediate',
        effort: 'medium',
        duration: '2 weeks',
        outcome: 'Deploy multi-container apps',
        url: '#',
        provider: 'Self-directed'
      }
    ]
  },
  {
    skill: 'Kubernetes',
    resources: [
      {
        id: 'k8s-1',
        title: 'Kubernetes Basics',
        type: 'documentation',
        level: 'beginner',
        effort: 'medium',
        duration: '2 weeks',
        outcome: 'Understand container orchestration',
        url: '#',
        provider: 'Kubernetes.io'
      },
      {
        id: 'k8s-2',
        title: 'CKA Certification',
        type: 'course',
        level: 'advanced',
        effort: 'high',
        duration: '8 weeks',
        outcome: 'Certified Kubernetes Administrator',
        url: '#',
        provider: 'Linux Foundation'
      }
    ]
  },
  {
    skill: 'Machine Learning',
    resources: [
      {
        id: 'ml-1',
        title: 'Machine Learning by Andrew Ng',
        type: 'course',
        level: 'beginner',
        effort: 'high',
        duration: '12 weeks',
        outcome: 'Foundational ML algorithms',
        url: '#',
        provider: 'Coursera'
      },
      {
        id: 'ml-2',
        title: 'Kaggle Learn',
        type: 'practice',
        level: 'intermediate',
        effort: 'medium',
        duration: 'Ongoing',
        outcome: 'Hands-on ML competitions',
        url: '#',
        provider: 'Kaggle'
      }
    ]
  },
  {
    skill: 'Data Science',
    resources: [
      {
        id: 'ds-1',
        title: 'Data Science Specialization',
        type: 'course',
        level: 'beginner',
        effort: 'high',
        duration: '10 weeks',
        outcome: 'End-to-end data science workflow',
        url: '#',
        provider: 'Johns Hopkins'
      },
      {
        id: 'ds-2',
        title: 'Pandas & NumPy Mastery',
        type: 'video',
        level: 'intermediate',
        effort: 'medium',
        duration: '6 hours',
        outcome: 'Data manipulation proficiency',
        url: '#',
        provider: 'DataCamp'
      }
    ]
  },
  {
    skill: 'Git',
    resources: [
      {
        id: 'git-1',
        title: 'Git & GitHub Crash Course',
        type: 'video',
        level: 'beginner',
        effort: 'low',
        duration: '2 hours',
        outcome: 'Version control fundamentals',
        url: '#',
        provider: 'YouTube'
      },
      {
        id: 'git-2',
        title: 'Pro Git Book',
        type: 'documentation',
        level: 'intermediate',
        effort: 'medium',
        duration: 'Self-paced',
        outcome: 'Advanced Git workflows',
        url: '#',
        provider: 'Git SCM'
      }
    ]
  },
  {
    skill: 'CI/CD',
    resources: [
      {
        id: 'cicd-1',
        title: 'GitHub Actions Fundamentals',
        type: 'course',
        level: 'beginner',
        effort: 'low',
        duration: '1 week',
        outcome: 'Automate build and deploy',
        url: '#',
        provider: 'GitHub Learning'
      },
      {
        id: 'cicd-2',
        title: 'Jenkins Pipeline Mastery',
        type: 'course',
        level: 'intermediate',
        effort: 'medium',
        duration: '3 weeks',
        outcome: 'Enterprise CI/CD pipelines',
        url: '#',
        provider: 'Udemy'
      }
    ]
  },
  {
    skill: 'Communication',
    resources: [
      {
        id: 'comm-1',
        title: 'Technical Writing',
        type: 'course',
        level: 'beginner',
        effort: 'low',
        duration: '2 weeks',
        outcome: 'Clear documentation skills',
        url: '#',
        provider: 'Google Developers'
      },
      {
        id: 'comm-2',
        title: 'Public Speaking for Engineers',
        type: 'video',
        level: 'intermediate',
        effort: 'medium',
        duration: '4 hours',
        outcome: 'Present technical concepts clearly',
        url: '#',
        provider: 'LinkedIn Learning'
      }
    ]
  },
  {
    skill: 'Leadership',
    resources: [
      {
        id: 'lead-1',
        title: 'Engineering Management 101',
        type: 'course',
        level: 'intermediate',
        effort: 'medium',
        duration: '6 weeks',
        outcome: 'Lead technical teams effectively',
        url: '#',
        provider: 'Pluralsight'
      }
    ]
  },
  {
    skill: 'Agile',
    resources: [
      {
        id: 'agile-1',
        title: 'Scrum Master Certification',
        type: 'course',
        level: 'beginner',
        effort: 'medium',
        duration: '4 weeks',
        outcome: 'Facilitate agile teams',
        url: '#',
        provider: 'Scrum.org'
      }
    ]
  }
];

export function getResourcesForSkill(skillName: string): LearningResource[] {
  const skillResource = skillResources.find(
    sr => sr.skill.toLowerCase() === skillName.toLowerCase()
  );
  return skillResource?.resources || [];
}

export function getResourcesForSkills(skillNames: string[]): SkillResources[] {
  return skillNames
    .map(skill => ({
      skill,
      resources: getResourcesForSkill(skill)
    }))
    .filter(sr => sr.resources.length > 0);
}

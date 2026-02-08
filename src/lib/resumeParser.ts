// Skill keywords to look for in resumes
export const skillKeywords: Record<string, string[]> = {
  'JavaScript': ['javascript', 'js', 'es6', 'es2015', 'ecmascript'],
  'TypeScript': ['typescript', 'ts'],
  'Python': ['python', 'py', 'python3'],
  'Java': ['java', 'jvm', 'spring', 'spring boot', 'springboot'],
  'React': ['react', 'reactjs', 'react.js', 'react native'],
  'Node.js': ['node', 'nodejs', 'node.js', 'express', 'expressjs'],
  'SQL': ['sql', 'mysql', 'postgresql', 'postgres', 'oracle', 'sql server', 'sqlite'],
  'NoSQL': ['nosql', 'mongodb', 'mongo', 'cassandra', 'dynamodb', 'redis', 'firebase'],
  'AWS': ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudfront'],
  'Docker': ['docker', 'dockerfile', 'docker-compose', 'containerization'],
  'Kubernetes': ['kubernetes', 'k8s', 'kubectl', 'helm'],
  'Git': ['git', 'github', 'gitlab', 'bitbucket', 'version control'],
  'CI/CD': ['ci/cd', 'cicd', 'jenkins', 'github actions', 'circleci', 'travis'],
  'Machine Learning': ['machine learning', 'ml', 'deep learning', 'neural network', 'tensorflow', 'pytorch'],
  'Data Science': ['data science', 'pandas', 'numpy', 'scikit-learn', 'jupyter'],
  'HTML/CSS': ['html', 'css', 'html5', 'css3', 'sass', 'scss', 'less'],
  'Angular': ['angular', 'angularjs', 'angular.js'],
  'Vue.js': ['vue', 'vuejs', 'vue.js', 'nuxt'],
  'REST API': ['rest', 'restful', 'rest api', 'api development'],
  'GraphQL': ['graphql', 'apollo', 'hasura'],
  'Agile': ['agile', 'scrum', 'kanban', 'sprint', 'jira'],
  'Linux': ['linux', 'ubuntu', 'centos', 'debian', 'redhat', 'bash'],
  'C++': ['c++', 'cpp', 'c/c++'],
  'C#': ['c#', 'csharp', '.net', 'dotnet', 'asp.net'],
  'Go': ['golang', 'go language'],
  'Rust': ['rust', 'rustlang'],
  'Swift': ['swift', 'ios development', 'swiftui'],
  'Kotlin': ['kotlin', 'android development'],
  'PHP': ['php', 'laravel', 'symfony', 'wordpress'],
  'Ruby': ['ruby', 'rails', 'ruby on rails', 'ror'],
  'Terraform': ['terraform', 'infrastructure as code', 'iac'],
  'Communication': ['communication', 'presentation', 'public speaking'],
  'Leadership': ['leadership', 'team lead', 'mentoring', 'management'],
  'Problem Solving': ['problem solving', 'analytical', 'critical thinking'],
};

// Role-specific required skills
export const roleRequirements: Record<string, { core: string[]; preferred: string[] }> = {
  'software-engineer': {
    core: ['JavaScript', 'Python', 'Git', 'SQL', 'REST API'],
    preferred: ['TypeScript', 'React', 'Node.js', 'Docker', 'AWS', 'CI/CD']
  },
  'data-scientist': {
    core: ['Python', 'SQL', 'Machine Learning', 'Data Science'],
    preferred: ['AWS', 'Docker', 'NoSQL', 'Communication']
  },
  'devops-engineer': {
    core: ['Linux', 'Docker', 'CI/CD', 'Git', 'AWS'],
    preferred: ['Kubernetes', 'Terraform', 'Python', 'NoSQL']
  },
  'product-manager': {
    core: ['Communication', 'Leadership', 'Agile', 'Problem Solving'],
    preferred: ['SQL', 'Data Science']
  },
  'ux-designer': {
    core: ['HTML/CSS', 'Communication', 'Problem Solving'],
    preferred: ['JavaScript', 'React']
  },
  'business-analyst': {
    core: ['SQL', 'Communication', 'Agile', 'Problem Solving'],
    preferred: ['Python', 'Data Science']
  }
};

export interface ExtractedSkill {
  name: string;
  found: boolean;
  context?: string;
}

export interface ResumeAnalysis {
  extractedSkills: ExtractedSkill[];
  missingCoreSkills: string[];
  missingPreferredSkills: string[];
  coverageScore: number;
  suggestions: string[];
}

export function extractSkillsFromText(text: string): string[] {
  const normalizedText = text.toLowerCase();
  const foundSkills: string[] = [];

  for (const [skill, keywords] of Object.entries(skillKeywords)) {
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword.toLowerCase())) {
        if (!foundSkills.includes(skill)) {
          foundSkills.push(skill);
        }
        break;
      }
    }
  }

  return foundSkills;
}

export function analyzeResumeForRole(
  extractedSkills: string[],
  roleId: string
): ResumeAnalysis {
  const requirements = roleRequirements[roleId] || roleRequirements['software-engineer'];
  
  const missingCoreSkills = requirements.core.filter(
    skill => !extractedSkills.includes(skill)
  );
  
  const missingPreferredSkills = requirements.preferred.filter(
    skill => !extractedSkills.includes(skill)
  );
  
  const totalRequired = requirements.core.length + requirements.preferred.length;
  const foundRequired = extractedSkills.filter(
    skill => requirements.core.includes(skill) || requirements.preferred.includes(skill)
  ).length;
  
  const coverageScore = Math.round((foundRequired / totalRequired) * 100);
  
  const suggestions: string[] = [];
  
  if (missingCoreSkills.length > 0) {
    suggestions.push(`Add core skills: ${missingCoreSkills.join(', ')}`);
  }
  
  if (coverageScore < 50) {
    suggestions.push('Consider taking online courses to build missing skills');
  }
  
  if (missingPreferredSkills.length > 0 && missingCoreSkills.length === 0) {
    suggestions.push(`Boost your profile with: ${missingPreferredSkills.slice(0, 3).join(', ')}`);
  }
  
  if (extractedSkills.length < 5) {
    suggestions.push('Add more technical keywords to improve ATS compatibility');
  }
  
  suggestions.push('Quantify achievements with metrics (e.g., "improved performance by 40%")');
  
  const extractedSkillsResult: ExtractedSkill[] = Object.keys(skillKeywords).map(skill => ({
    name: skill,
    found: extractedSkills.includes(skill)
  }));
  
  return {
    extractedSkills: extractedSkillsResult,
    missingCoreSkills,
    missingPreferredSkills,
    coverageScore,
    suggestions
  };
}

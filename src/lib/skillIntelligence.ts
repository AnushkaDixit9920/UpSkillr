// Skill confidence scoring and effort-to-reward analysis

import { roles, Role } from '@/data/roles';
import { skillKeywords, roleRequirements } from './resumeParser';

export interface SkillConfidence {
  skill: string;
  score: number;
  breakdown: {
    resumePresence: number;
    projectRelevance: number;
    roleFrequency: number;
  };
  tier: 'strong' | 'moderate' | 'weak' | 'missing';
}

export interface SkillROI {
  skill: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  roiCategory: 'quick-win' | 'high-roi' | 'long-term' | 'low-priority';
  timeToLearn: string;
  rolesRequired: number;
}

export interface CareerSwitchAnalysis {
  fromRole: string;
  toRole: string;
  overlapPercentage: number;
  transferableSkills: string[];
  missingSkills: string[];
  estimatedTransitionTime: string;
  riskLevel: 'low' | 'medium' | 'high';
  learningIntensity: 'light' | 'moderate' | 'intensive';
  verdict: 'Safe Switch' | 'Moderate Transition' | 'High-Risk Pivot';
}

export interface JobMatch {
  roleId: string;
  roleTitle: string;
  readinessPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  level: 'entry' | 'mid' | 'senior';
  industries: string[];
}

// Calculate skill confidence score
export function calculateSkillConfidence(
  skill: string,
  extractedSkills: string[],
  targetRoleId: string
): SkillConfidence {
  const isPresent = extractedSkills.includes(skill);
  
  // Resume presence (0-40 points)
  const resumePresence = isPresent ? 40 : 0;
  
  // Project relevance simulation (0-30 points)
  // In production, this would analyze project descriptions
  const projectRelevance = isPresent ? Math.floor(Math.random() * 15) + 15 : 0;
  
  // Role frequency - how often this skill appears across roles (0-30 points)
  let roleFrequency = 0;
  const requirements = roleRequirements[targetRoleId];
  if (requirements) {
    if (requirements.core.includes(skill)) {
      roleFrequency = 30;
    } else if (requirements.preferred.includes(skill)) {
      roleFrequency = 20;
    } else {
      roleFrequency = 10;
    }
  }
  
  const score = resumePresence + projectRelevance + roleFrequency;
  
  let tier: SkillConfidence['tier'];
  if (!isPresent) {
    tier = 'missing';
  } else if (score >= 70) {
    tier = 'strong';
  } else if (score >= 50) {
    tier = 'moderate';
  } else {
    tier = 'weak';
  }
  
  return {
    skill,
    score: Math.min(100, score),
    breakdown: {
      resumePresence,
      projectRelevance,
      roleFrequency
    },
    tier
  };
}

// Calculate effort-to-reward for a skill
export function calculateSkillROI(
  skill: string,
  extractedSkills: string[]
): SkillROI {
  const isPresent = extractedSkills.includes(skill);
  
  // Count how many roles require this skill
  let rolesRequired = 0;
  let isCore = false;
  
  Object.values(roleRequirements).forEach(req => {
    if (req.core.includes(skill)) {
      rolesRequired += 2;
      isCore = true;
    } else if (req.preferred.includes(skill)) {
      rolesRequired += 1;
    }
  });
  
  // Determine effort based on skill type
  const highEffortSkills = ['Machine Learning', 'Kubernetes', 'Data Science', 'AWS'];
  const lowEffortSkills = ['Git', 'Agile', 'Communication', 'HTML/CSS'];
  
  let effort: SkillROI['effort'];
  let timeToLearn: string;
  
  if (lowEffortSkills.includes(skill)) {
    effort = 'low';
    timeToLearn = '1-2 weeks';
  } else if (highEffortSkills.includes(skill)) {
    effort = 'high';
    timeToLearn = '3-6 months';
  } else {
    effort = 'medium';
    timeToLearn = '1-2 months';
  }
  
  // Determine impact
  let impact: SkillROI['impact'];
  if (rolesRequired >= 8 || isCore) {
    impact = 'high';
  } else if (rolesRequired >= 4) {
    impact = 'medium';
  } else {
    impact = 'low';
  }
  
  // Categorize ROI
  let roiCategory: SkillROI['roiCategory'];
  if (effort === 'low' && impact === 'high') {
    roiCategory = 'quick-win';
  } else if (impact === 'high') {
    roiCategory = 'high-roi';
  } else if (effort === 'high' && impact === 'medium') {
    roiCategory = 'long-term';
  } else {
    roiCategory = 'low-priority';
  }
  
  return {
    skill,
    effort,
    impact,
    roiCategory,
    timeToLearn,
    rolesRequired
  };
}

// Analyze career switch
export function analyzeCareerSwitch(
  currentRoleId: string,
  targetRoleId: string,
  extractedSkills: string[]
): CareerSwitchAnalysis {
  const currentRole = roles.find(r => r.id === currentRoleId);
  const targetRole = roles.find(r => r.id === targetRoleId);
  
  if (!currentRole || !targetRole) {
    throw new Error('Invalid role IDs');
  }
  
  // Collect all skills for both roles
  const currentAllSkills = [
    ...currentRole.coreSkills,
    ...currentRole.supportingSkills,
    ...currentRole.behavioralSkills
  ];
  
  const targetAllSkills = [
    ...targetRole.coreSkills,
    ...targetRole.supportingSkills,
    ...targetRole.behavioralSkills
  ];
  
  // Find overlapping skills (normalize for comparison)
  const normalizeSkill = (s: string) => s.toLowerCase().split('(')[0].trim();
  
  const currentNormalized = currentAllSkills.map(normalizeSkill);
  const targetNormalized = targetAllSkills.map(normalizeSkill);
  
  const transferableSkills: string[] = [];
  targetAllSkills.forEach((skill, idx) => {
    const normalized = targetNormalized[idx];
    if (currentNormalized.some(cs => cs.includes(normalized) || normalized.includes(cs))) {
      transferableSkills.push(skill);
    }
  });
  
  // Missing skills
  const missingSkills = targetAllSkills.filter(skill => 
    !transferableSkills.includes(skill) && 
    !extractedSkills.some(es => skill.toLowerCase().includes(es.toLowerCase()))
  );
  
  // Calculate overlap percentage
  const overlapPercentage = Math.round((transferableSkills.length / targetAllSkills.length) * 100);
  
  // Determine risk level
  let riskLevel: CareerSwitchAnalysis['riskLevel'];
  let estimatedTransitionTime: string;
  let learningIntensity: CareerSwitchAnalysis['learningIntensity'];
  let verdict: CareerSwitchAnalysis['verdict'];
  
  if (overlapPercentage >= 60) {
    riskLevel = 'low';
    estimatedTransitionTime = '3-6 months';
    learningIntensity = 'light';
    verdict = 'Safe Switch';
  } else if (overlapPercentage >= 35) {
    riskLevel = 'medium';
    estimatedTransitionTime = '6-12 months';
    learningIntensity = 'moderate';
    verdict = 'Moderate Transition';
  } else {
    riskLevel = 'high';
    estimatedTransitionTime = '12-24 months';
    learningIntensity = 'intensive';
    verdict = 'High-Risk Pivot';
  }
  
  return {
    fromRole: currentRole.title,
    toRole: targetRole.title,
    overlapPercentage,
    transferableSkills: transferableSkills.slice(0, 8),
    missingSkills: missingSkills.slice(0, 8),
    estimatedTransitionTime,
    riskLevel,
    learningIntensity,
    verdict
  };
}

// Skill-to-Job Analysis
export function analyzeSkillsToJobs(extractedSkills: string[]): JobMatch[] {
  const jobMatches: JobMatch[] = [];
  
  roles.forEach(role => {
    const allRoleSkills = [
      ...role.coreSkills,
      ...role.supportingSkills
    ];
    
    // Match extracted skills against role skills
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    
    allRoleSkills.forEach(roleSkill => {
      const normalized = roleSkill.toLowerCase();
      const isMatched = extractedSkills.some(es => 
        normalized.includes(es.toLowerCase()) || 
        es.toLowerCase().includes(normalized.split('(')[0].trim())
      );
      
      if (isMatched) {
        matchedSkills.push(roleSkill);
      } else {
        missingSkills.push(roleSkill);
      }
    });
    
    const readinessPercentage = Math.round((matchedSkills.length / allRoleSkills.length) * 100);
    
    // Determine level based on skill count and depth
    let level: JobMatch['level'];
    if (extractedSkills.length <= 5 || readinessPercentage < 40) {
      level = 'entry';
    } else if (extractedSkills.length <= 10 || readinessPercentage < 70) {
      level = 'mid';
    } else {
      level = 'senior';
    }
    
    // Assign industries
    const industryMap: Record<string, string[]> = {
      'software-engineer': ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
      'data-scientist': ['Technology', 'Finance', 'Healthcare', 'Research'],
      'product-manager': ['Technology', 'E-commerce', 'SaaS', 'Media'],
      'ux-designer': ['Technology', 'Agency', 'E-commerce', 'Media'],
      'devops-engineer': ['Technology', 'Cloud Services', 'Finance', 'SaaS'],
      'business-analyst': ['Consulting', 'Finance', 'Healthcare', 'Technology']
    };
    
    jobMatches.push({
      roleId: role.id,
      roleTitle: role.title,
      readinessPercentage,
      matchedSkills: matchedSkills.slice(0, 5),
      missingSkills: missingSkills.slice(0, 5),
      level,
      industries: industryMap[role.id] || ['Various Industries']
    });
  });
  
  // Sort by readiness
  return jobMatches.sort((a, b) => b.readinessPercentage - a.readinessPercentage);
}

// Get all skill ROIs for prioritization
export function getSkillROIAnalysis(extractedSkills: string[]): SkillROI[] {
  const allSkills = Object.keys(skillKeywords);
  const missingSkills = allSkills.filter(s => !extractedSkills.includes(s));
  
  return missingSkills
    .map(skill => calculateSkillROI(skill, extractedSkills))
    .sort((a, b) => {
      const categoryOrder = { 'quick-win': 0, 'high-roi': 1, 'long-term': 2, 'low-priority': 3 };
      return categoryOrder[a.roiCategory] - categoryOrder[b.roiCategory];
    });
}

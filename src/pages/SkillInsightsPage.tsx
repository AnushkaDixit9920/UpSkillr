import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { roles } from '@/data/roles';
import { getResourcesForSkills } from '@/data/skillResources';
import { 
  calculateSkillConfidence, 
  getSkillROIAnalysis,
  SkillConfidence,
  SkillROI
} from '@/lib/skillIntelligence';
import { skillKeywords } from '@/lib/resumeParser';
import SkillConfidenceRing from '@/components/skills/SkillConfidenceRing';
import ResourceCard from '@/components/skills/ResourceCard';
import { 
  Brain,
  TrendingUp,
  Zap,
  Clock,
  Target,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SkillInsightsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('software-engineer');
  
  const extractedSkills = user?.skills || [];
  
  // Calculate skill confidence for all skills
  const skillConfidences = useMemo(() => {
    const allSkills = Object.keys(skillKeywords);
    return allSkills
      .map(skill => calculateSkillConfidence(skill, extractedSkills, selectedRole))
      .filter(sc => extractedSkills.includes(sc.skill) || sc.breakdown.roleFrequency > 0)
      .sort((a, b) => b.score - a.score);
  }, [extractedSkills, selectedRole]);
  
  // Get ROI analysis for missing skills
  const roiAnalysis = useMemo(() => {
    return getSkillROIAnalysis(extractedSkills);
  }, [extractedSkills]);
  
  // Group ROI by category
  const roiByCategory = useMemo(() => {
    const grouped: Record<SkillROI['roiCategory'], SkillROI[]> = {
      'quick-win': [],
      'high-roi': [],
      'long-term': [],
      'low-priority': []
    };
    roiAnalysis.forEach(roi => {
      grouped[roi.roiCategory].push(roi);
    });
    return grouped;
  }, [roiAnalysis]);
  
  // Get resources for top missing skills
  const recommendedResources = useMemo(() => {
    const topMissingSkills = roiAnalysis
      .filter(r => r.roiCategory === 'quick-win' || r.roiCategory === 'high-roi')
      .slice(0, 4)
      .map(r => r.skill);
    return getResourcesForSkills(topMissingSkills);
  }, [roiAnalysis]);
  
  const categoryLabels: Record<SkillROI['roiCategory'], { label: string; color: string; icon: typeof Zap }> = {
    'quick-win': { label: 'Quick Wins', color: 'text-success', icon: Zap },
    'high-roi': { label: 'High ROI', color: 'text-primary', icon: TrendingUp },
    'long-term': { label: 'Long-term Investment', color: 'text-warning', icon: Clock },
    'low-priority': { label: 'Low Priority', color: 'text-muted-foreground', icon: Target }
  };
  
  if (!user?.resumeUploaded) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-3xl bg-primary/10 mb-6">
            <Brain className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">Skill Intelligence</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Upload your resume to unlock personalized skill confidence scores, 
            ROI analysis, and learning recommendations.
          </p>
          <Button variant="glow" size="lg" onClick={() => navigate('/resume')}>
            <Upload className="w-5 h-5 mr-2" />
            Upload Resume First
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Skill Intelligence</h1>
              <p className="text-muted-foreground">Confidence scoring, ROI analysis & learning paths</p>
            </div>
          </div>
        </div>
        
        {/* Role Selector */}
        <Card variant="glass" className="animate-fade-in-delay-1">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedRole === role.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skill Confidence Cards */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="glass" className="animate-fade-in-delay-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Skill Confidence Scores
                </CardTitle>
                <CardDescription>
                  Based on resume presence, project relevance, and role requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {skillConfidences.slice(0, 8).map(sc => (
                    <div 
                      key={sc.skill}
                      className={cn(
                        'p-4 rounded-xl border transition-all',
                        sc.tier === 'strong' && 'bg-success/5 border-success/30',
                        sc.tier === 'moderate' && 'bg-warning/5 border-warning/30',
                        sc.tier === 'weak' && 'bg-info/5 border-info/30',
                        sc.tier === 'missing' && 'bg-destructive/5 border-destructive/30'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <SkillConfidenceRing score={sc.score} size="sm" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{sc.skill}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {sc.tier === 'strong' && (
                              <span className="text-xs text-success flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Strong
                              </span>
                            )}
                            {sc.tier === 'moderate' && (
                              <span className="text-xs text-warning flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Moderate
                              </span>
                            )}
                            {sc.tier === 'weak' && (
                              <span className="text-xs text-info flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Needs Work
                              </span>
                            )}
                            {sc.tier === 'missing' && (
                              <span className="text-xs text-destructive flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Missing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Breakdown */}
                      <div className="mt-3 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Resume</span>
                          <span>{sc.breakdown.resumePresence}/40</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(sc.breakdown.resumePresence / 40) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Projects</span>
                          <span>{sc.breakdown.projectRelevance}/30</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-info rounded-full transition-all"
                            style={{ width: `${(sc.breakdown.projectRelevance / 30) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Role Fit</span>
                          <span>{sc.breakdown.roleFrequency}/30</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${(sc.breakdown.roleFrequency / 30) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* ROI Analysis */}
            <Card variant="glass" className="animate-fade-in-delay-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Effort-to-Reward Analysis
                </CardTitle>
                <CardDescription>
                  Prioritize learning based on impact and effort required
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(roiByCategory).map(([category, skills]) => {
                  if (skills.length === 0) return null;
                  const cat = categoryLabels[category as SkillROI['roiCategory']];
                  const Icon = cat.icon;
                  
                  return (
                    <div key={category}>
                      <h4 className={cn('text-sm font-medium mb-3 flex items-center gap-2', cat.color)}>
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {skills.slice(0, 4).map(skill => (
                          <div 
                            key={skill.skill}
                            className="p-3 rounded-lg bg-secondary/30 border border-border/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{skill.skill}</span>
                              <span className="text-xs text-muted-foreground">
                                {skill.timeToLearn}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className={cn(
                                skill.effort === 'low' && 'text-success',
                                skill.effort === 'medium' && 'text-warning',
                                skill.effort === 'high' && 'text-destructive'
                              )}>
                                {skill.effort} effort
                              </span>
                              <span className={cn(
                                skill.impact === 'high' && 'text-success',
                                skill.impact === 'medium' && 'text-warning',
                                skill.impact === 'low' && 'text-muted-foreground'
                              )}>
                                {skill.impact} impact
                              </span>
                              <span className="text-muted-foreground">
                                {skill.rolesRequired} roles need this
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
          
          {/* Learning Resources Sidebar */}
          <div className="space-y-6">
            <Card variant="glass" className="animate-fade-in-delay-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Resources
                </CardTitle>
                <CardDescription>
                  Curated learning paths for your skill gaps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedResources.length > 0 ? (
                  recommendedResources.slice(0, 3).map(sr => (
                    <div key={sr.skill}>
                      <h4 className="text-sm font-medium mb-2 text-primary">{sr.skill}</h4>
                      {sr.resources.slice(0, 2).map(resource => (
                        <ResourceCard 
                          key={resource.id} 
                          resource={resource} 
                          skillName={sr.skill} 
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No specific resources needed - your skills look great!
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card variant="glass" className="animate-fade-in-delay-3">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="font-medium mb-2">Compare Career Paths</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  See how your skills transfer to different roles
                </p>
                <Button variant="outline" onClick={() => navigate('/career-switch')}>
                  Analyze Switch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

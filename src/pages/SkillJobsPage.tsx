import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { analyzeSkillsToJobs, JobMatch } from '@/lib/skillIntelligence';
import SkillConfidenceRing from '@/components/skills/SkillConfidenceRing';
import { 
  Briefcase,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Building2,
  TrendingUp,
  Target,
  Upload,
  Sparkles,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SkillJobsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const extractedSkills = user?.skills || [];
  
  const jobMatches = useMemo(() => {
    return analyzeSkillsToJobs(extractedSkills);
  }, [extractedSkills]);
  
  const levelLabels = {
    entry: { label: 'Entry Level', color: 'text-info' },
    mid: { label: 'Mid Level', color: 'text-warning' },
    senior: { label: 'Senior Level', color: 'text-success' }
  };
  
  const getReadinessColor = (percentage: number) => {
    if (percentage >= 70) return 'text-success';
    if (percentage >= 40) return 'text-warning';
    return 'text-destructive';
  };
  
  const getReadinessLabel = (percentage: number) => {
    if (percentage >= 70) return 'Ready to Apply';
    if (percentage >= 40) return 'Close Match';
    return 'Needs Preparation';
  };
  
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-3xl bg-primary/10 mb-6">
            <Briefcase className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">Skill-to-Job Analysis</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Login and upload your resume to see which jobs match your skills.
          </p>
          <Button variant="glow" size="lg" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!user.resumeUploaded) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-3xl bg-primary/10 mb-6">
            <Briefcase className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">Skill-to-Job Analysis</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Upload your resume to discover which job roles match your skillset
            and see your readiness percentage for each role.
          </p>
          <Button variant="glow" size="lg" onClick={() => navigate('/resume')}>
            <Upload className="w-5 h-5 mr-2" />
            Upload Resume First
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  // Find top match
  const topMatch = jobMatches[0];
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Skill-to-Job Analysis</h1>
              <p className="text-muted-foreground">Discover roles that match your skillset</p>
            </div>
          </div>
        </div>
        
        {/* Top Match Hero */}
        {topMatch && (
          <Card variant="glass" className="overflow-hidden animate-fade-in-delay-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <SkillConfidenceRing score={topMatch.readinessPercentage} size="lg" />
                  <div className="absolute -top-2 -right-2 p-2 rounded-full bg-warning/20">
                    <Award className="w-5 h-5 text-warning" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium">Best Match</span>
                  </div>
                  <h2 className="text-2xl font-bold font-display mb-2">{topMatch.roleTitle}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      levelLabels[topMatch.level].color,
                      'bg-current/10'
                    )}>
                      {levelLabels[topMatch.level].label}
                    </span>
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getReadinessColor(topMatch.readinessPercentage),
                      'bg-current/10'
                    )}>
                      {getReadinessLabel(topMatch.readinessPercentage)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {topMatch.industries.map(industry => (
                      <span 
                        key={industry}
                        className="px-2 py-1 rounded text-xs bg-secondary/50 text-muted-foreground"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="glow" onClick={() => navigate(`/exploration/${topMatch.roleId}`)}>
                  Explore Role
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* All Job Matches */}
        <Card variant="glass" className="animate-fade-in-delay-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              All Job Matches
            </CardTitle>
            <CardDescription>
              Based on your {extractedSkills.length} extracted skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobMatches.map((job, index) => (
                <div 
                  key={job.roleId}
                  className={cn(
                    'p-4 rounded-xl border transition-all hover:border-primary/30',
                    index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-secondary/30 border-border/50'
                  )}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <SkillConfidenceRing score={job.readinessPercentage} size="sm" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{job.roleTitle}</h4>
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-medium',
                          levelLabels[job.level].color,
                          'bg-current/10'
                        )}>
                          {levelLabels[job.level].label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {job.industries.slice(0, 3).join(', ')}
                        </span>
                      </div>
                      
                      {/* Skills */}
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3 h-3 text-success" />
                            <span className="text-xs text-success">Matched Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.matchedSkills.slice(0, 3).map(skill => (
                              <span 
                                key={skill}
                                className="px-2 py-0.5 rounded text-[10px] bg-success/10 text-success border border-success/20"
                              >
                                {skill.split('(')[0].trim()}
                              </span>
                            ))}
                            {job.matchedSkills.length > 3 && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-success/10 text-success">
                                +{job.matchedSkills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <XCircle className="w-3 h-3 text-destructive" />
                            <span className="text-xs text-destructive">Missing Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.missingSkills.slice(0, 3).map(skill => (
                              <span 
                                key={skill}
                                className="px-2 py-0.5 rounded text-[10px] bg-destructive/10 text-destructive border border-destructive/20"
                              >
                                {skill.split('(')[0].trim()}
                              </span>
                            ))}
                            {job.missingSkills.length > 3 && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-destructive/10 text-destructive">
                                +{job.missingSkills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <div className={cn('text-xl font-bold', getReadinessColor(job.readinessPercentage))}>
                          {job.readinessPercentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">Ready</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/exploration/${job.roleId}`)}
                      >
                        Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/skill-insights')}>
            <TrendingUp className="w-4 h-4 mr-2" />
            View Skill ROI Analysis
          </Button>
          <Button variant="outline" onClick={() => navigate('/career-switch')}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Compare Career Paths
          </Button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground">
          This is career intelligence analysis based on skill matching. 
          Actual job requirements may vary by company and position.
        </p>
      </div>
    </DashboardLayout>
  );
}

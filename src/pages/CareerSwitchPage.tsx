import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { roles } from '@/data/roles';
import { analyzeCareerSwitch, CareerSwitchAnalysis } from '@/lib/skillIntelligence';
import SkillConfidenceRing from '@/components/skills/SkillConfidenceRing';
import { 
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CareerSwitchPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fromRole, setFromRole] = useState('business-analyst');
  const [toRole, setToRole] = useState('software-engineer');
  const [analysis, setAnalysis] = useState<CareerSwitchAnalysis | null>(null);
  
  const extractedSkills = user?.skills || [];
  
  const handleAnalyze = () => {
    try {
      const result = analyzeCareerSwitch(fromRole, toRole, extractedSkills);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    }
  };
  
  const verdictStyles = {
    'Safe Switch': { 
      color: 'text-success', 
      bg: 'bg-success/10', 
      border: 'border-success/30',
      icon: Shield 
    },
    'Moderate Transition': { 
      color: 'text-warning', 
      bg: 'bg-warning/10', 
      border: 'border-warning/30',
      icon: TrendingUp 
    },
    'High-Risk Pivot': { 
      color: 'text-destructive', 
      bg: 'bg-destructive/10', 
      border: 'border-destructive/30',
      icon: AlertTriangle 
    }
  };
  
  const riskColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-destructive'
  };
  
  const intensityLabels = {
    light: { label: 'Light Study', color: 'text-success' },
    moderate: { label: 'Regular Practice', color: 'text-warning' },
    intensive: { label: 'Intensive Training', color: 'text-destructive' }
  };
  
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-3xl bg-primary/10 mb-6">
            <ArrowRightLeft className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">Career Switch Analysis</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Login and upload your resume to analyze career transition possibilities.
          </p>
          <Button variant="glow" size="lg" onClick={() => navigate('/auth')}>
            Get Started
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
              <ArrowRightLeft className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Career Switch Analysis</h1>
              <p className="text-muted-foreground">Compare roles and assess transition risk</p>
            </div>
          </div>
        </div>
        
        {/* Role Selection */}
        <Card variant="glass" className="animate-fade-in-delay-1">
          <CardHeader>
            <CardTitle>Select Roles to Compare</CardTitle>
            <CardDescription>Choose your current background and target role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* From Role */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Current Role / Background</label>
                <div className="space-y-2">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setFromRole(role.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg transition-all',
                        fromRole === role.id
                          ? 'bg-info/20 border border-info/30 text-info'
                          : 'bg-secondary/30 border border-transparent hover:border-border'
                      )}
                    >
                      <div className="font-medium text-sm">{role.title}</div>
                      <div className="text-xs text-muted-foreground">{role.category}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              {/* To Role */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Target Role</label>
                <div className="space-y-2">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setToRole(role.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg transition-all',
                        toRole === role.id
                          ? 'bg-primary/20 border border-primary/30 text-primary'
                          : 'bg-secondary/30 border border-transparent hover:border-border',
                        fromRole === role.id && 'opacity-50 cursor-not-allowed'
                      )}
                      disabled={fromRole === role.id}
                    >
                      <div className="font-medium text-sm">{role.title}</div>
                      <div className="text-xs text-muted-foreground">{role.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="glow" 
                size="lg" 
                onClick={handleAnalyze}
                disabled={fromRole === toRole}
              >
                <Target className="w-5 h-5 mr-2" />
                Analyze Transition
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6 animate-fade-in">
            {/* Verdict Card */}
            <Card 
              variant="glass" 
              className={cn(
                'overflow-hidden',
                verdictStyles[analysis.verdict].border,
                verdictStyles[analysis.verdict].bg
              )}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <SkillConfidenceRing score={analysis.overlapPercentage} size="lg" />
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      {(() => {
                        const Icon = verdictStyles[analysis.verdict].icon;
                        return <Icon className={cn('w-6 h-6', verdictStyles[analysis.verdict].color)} />;
                      })()}
                      <h2 className={cn('text-2xl font-bold font-display', verdictStyles[analysis.verdict].color)}>
                        {analysis.verdict}
                      </h2>
                    </div>
                    <p className="text-muted-foreground">
                      {analysis.fromRole} → {analysis.toRole}
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{analysis.estimatedTransitionTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={cn('w-4 h-4', riskColors[analysis.riskLevel])} />
                        <span className={cn('text-sm', riskColors[analysis.riskLevel])}>
                          {analysis.riskLevel} risk
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className={cn('w-4 h-4', intensityLabels[analysis.learningIntensity].color)} />
                        <span className={cn('text-sm', intensityLabels[analysis.learningIntensity].color)}>
                          {intensityLabels[analysis.learningIntensity].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">{analysis.overlapPercentage}%</div>
                    <div className="text-sm text-muted-foreground">Skill Overlap</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Skills Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Transferable Skills */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                    Transferable Skills ({analysis.transferableSkills.length})
                  </CardTitle>
                  <CardDescription>Skills that carry over to the new role</CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis.transferableSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.transferableSkills.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-success/20 text-success border border-success/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No direct skill overlap found.</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Missing Skills */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <XCircle className="w-5 h-5" />
                    Skills to Acquire ({analysis.missingSkills.length})
                  </CardTitle>
                  <CardDescription>New skills needed for the target role</CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSkills.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-destructive/20 text-destructive border border-destructive/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      You have all the skills needed!
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={() => navigate('/skill-insights')}>
                View Skill ROI Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/skill-jobs')}>
                See All Job Matches
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {!user.resumeUploaded && (
                <Button variant="glow" onClick={() => navigate('/resume')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume for Better Analysis
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

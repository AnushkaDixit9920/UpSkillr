import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCompanyById } from '@/data/companies';
import { 
  ArrowLeft, 
  Target, 
  Layers, 
  CheckCircle2, 
  Lightbulb,
  AlertTriangle,
  Briefcase,
  Clock,
  BarChart3
} from 'lucide-react';

const interviewStyleColors: Record<string, string> = {
  'DSA-heavy': 'bg-destructive/20 text-destructive border-destructive/30',
  'CS-basics': 'bg-info/20 text-info border-info/30',
  'Aptitude': 'bg-warning/20 text-warning border-warning/30',
  'Balanced': 'bg-success/20 text-success border-success/30',
  'System-design': 'bg-accent/20 text-accent border-accent/30',
};

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const company = getCompanyById(companyId || '');

  if (!company) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Company not found</h2>
          <Button asChild>
            <Link to="/companies">Back to Companies</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <Link 
          to="/companies" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
          <div className="text-6xl">{company.logo}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-display mb-2">{company.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{company.industry}</p>
            <p className="text-muted-foreground">{company.description}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-delay-1">
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{company.avgInterviewRounds}</div>
              <div className="text-xs text-muted-foreground">Interview Rounds</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{company.difficulty}</div>
              <div className="text-xs text-muted-foreground">Difficulty</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{company.primaryFocus.length}</div>
              <div className="text-xs text-muted-foreground">Primary Focus</div>
            </CardContent>
          </Card>
          <Card variant="glass" className={interviewStyleColors[company.interviewStyle]}>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-lg font-bold">{company.interviewStyle}</div>
              <div className="text-xs opacity-80">Interview Style</div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card variant="glass" className="border-warning/30 animate-fade-in-delay-2">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-warning font-medium">Demo Data Notice</p>
              <p className="text-sm text-muted-foreground">
                This is a heuristic demo. Future versions will learn from aggregated public interview trends.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Primary Focus */}
          <Card variant="glass" className="animate-fade-in-delay-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle>What to Focus On More</CardTitle>
              </div>
              <CardDescription>Primary areas that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {company.primaryFocus.map((focus, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium">{focus}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Secondary Focus */}
          <Card variant="glass" className="animate-fade-in-delay-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-muted-foreground" />
                <CardTitle>What is Secondary</CardTitle>
              </div>
              <CardDescription>Important but not the main focus</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {company.secondaryFocus.map((focus, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{focus}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Skill Checklist */}
        <Card variant="glass" className="animate-fade-in-delay-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <CardTitle>Skill Checklist</CardTitle>
            </div>
            <CardDescription>Technical skills you should prepare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {company.skillChecklist.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preparation Tips */}
        <Card variant="glass" className="animate-fade-in-delay-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              <CardTitle>Preparation Tips</CardTitle>
            </div>
            <CardDescription>Expert recommendations for your preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {company.preparationTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-warning/5 to-transparent border border-warning/20">
                  <div className="p-2 rounded-lg bg-warning/20 shrink-0">
                    <Lightbulb className="w-4 h-4 text-warning" />
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

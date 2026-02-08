import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { companies } from '@/data/companies';
import { 
  Building2, 
  ArrowRight, 
  AlertTriangle,
  Briefcase,
  Target,
  Clock
} from 'lucide-react';

const interviewStyleColors: Record<string, string> = {
  'DSA-heavy': 'bg-destructive/20 text-destructive',
  'CS-basics': 'bg-info/20 text-info',
  'Aptitude': 'bg-warning/20 text-warning',
  'Balanced': 'bg-success/20 text-success',
  'System-design': 'bg-accent/20 text-accent',
};

const difficultyColors: Record<string, string> = {
  'High': 'bg-destructive/20 text-destructive',
  'Medium-High': 'bg-warning/20 text-warning',
  'Medium': 'bg-success/20 text-success',
};

export default function CompaniesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Company Preparation</h1>
              <p className="text-muted-foreground">Tailored preparation strategies for top companies</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Card variant="glass" className="border-warning/30 animate-fade-in-delay-1">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-warning font-medium">Demo Data Notice</p>
              <p className="text-sm text-muted-foreground">
                This is a heuristic demo. Future versions will learn from aggregated public interview trends and real-time data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <Card 
              key={company.id}
              variant="glass-hover"
              className="group animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{company.logo}</div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {company.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {company.industry}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className={`pill-tag ${interviewStyleColors[company.interviewStyle]}`}>
                    {company.interviewStyle}
                  </span>
                  <span className={`pill-tag ${difficultyColors[company.difficulty]}`}>
                    {company.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{company.avgInterviewRounds} rounds</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>{company.primaryFocus.length} focus areas</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors"
                  asChild
                >
                  <Link to={`/companies/${company.id}`}>
                    View Preparation Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

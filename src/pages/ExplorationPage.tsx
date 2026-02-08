import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { roles } from '@/data/roles';
import { 
  Compass, 
  ArrowRight, 
  TrendingUp,
  GraduationCap,
  DollarSign,
  Code,
  BarChart2,
  Palette,
  Briefcase,
  Settings
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  'Engineering': Code,
  'Data & Analytics': BarChart2,
  'Product': Briefcase,
  'Design': Palette,
  'Business': TrendingUp,
};

const demandColors: Record<string, string> = {
  'High': 'bg-success/20 text-success',
  'Medium': 'bg-warning/20 text-warning',
  'Growing': 'bg-info/20 text-info',
};

const backgroundColors: Record<string, string> = {
  'Tech': 'bg-primary/20 text-primary',
  'Non-Tech': 'bg-accent/20 text-accent',
  'Both': 'bg-success/20 text-success',
};

export default function ExplorationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Compass className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Exploration Mode</h1>
              <p className="text-muted-foreground">Understand career paths before committing</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card variant="glass" className="animate-fade-in-delay-1">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="p-3 rounded-xl bg-info/20">
                <GraduationCap className="w-6 h-6 text-info" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Deep-Dive Into Roles</h3>
                <p className="text-sm text-muted-foreground">
                  Each role includes core skills, preparation timelines, and structured roadmaps to help you make informed career decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const CategoryIcon = categoryIcons[role.category] || Settings;
            return (
              <Card 
                key={role.id}
                variant="glass-hover"
                className="group animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                      <CategoryIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className={`pill-tag ${demandColors[role.demandLevel]}`}>
                      {role.demandLevel} Demand
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{role.title}</CardTitle>
                  <CardDescription>{role.category}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className={`pill-tag ${backgroundColors[role.preferredBackground]}`}>
                      {role.preferredBackground} Background
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{role.salaryRange}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Core Skills Preview:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.coreSkills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
                          {skill.split(' ')[0]}
                        </span>
                      ))}
                      {role.coreSkills.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
                          +{role.coreSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors"
                    asChild
                  >
                    <Link to={`/exploration/${role.id}`}>
                      Explore Role
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

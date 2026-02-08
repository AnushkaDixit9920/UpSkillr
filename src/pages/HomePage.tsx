import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Building2, 
  Compass, 
  FileText, 
  LayoutDashboard, 
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  ChevronRight,
  Upload,
  Brain,
  ArrowRightLeft,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Building2,
    title: 'Company-Specific Preparation',
    description: 'Get tailored preparation strategies for top companies like Google, Uber, Cisco, and more.',
    href: '/companies',
    highlight: true,
    tag: 'Most Popular',
  },
  {
    icon: Compass,
    title: 'Exploration Mode',
    description: 'Deep-dive into career paths with structured roadmaps, skill requirements, and timelines.',
    href: '/exploration',
  },
  {
    icon: FileText,
    title: 'Resume Intelligence',
    description: 'Upload your resume for AI-powered skill extraction and gap analysis.',
    href: '/resume',
  },
  {
    icon: LayoutDashboard,
    title: 'Career Dashboard',
    description: 'Track your progress across jobs, internships, hackathons, and skill development.',
    href: '/dashboard',
  },
  {
    icon: Users,
    title: 'Community & Mentorship',
    description: 'Learn from industry experts and get guidance from professionals in your field.',
    href: '/community',
  },
];

const intelligenceFeatures = [
  {
    icon: BookOpen,
    title: 'Resource Provider',
    description: 'Get curated learning resources for your missing skills with effort estimates.',
    href: '/skill-insights',
    color: 'text-success',
  },
  {
    icon: Brain,
    title: 'Skill Confidence & ROI',
    description: 'See confidence scores for each skill and prioritize by effort-to-reward.',
    href: '/skill-insights',
    color: 'text-primary',
  },
  {
    icon: ArrowRightLeft,
    title: 'Career Switch Analysis',
    description: 'Compare roles, assess risk level, and see transferable skills.',
    href: '/career-switch',
    color: 'text-warning',
  },
  {
    icon: Briefcase,
    title: 'Skill-to-Job Matching',
    description: 'Discover jobs you can apply for based on your current skillset.',
    href: '/skill-jobs',
    color: 'text-info',
  },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50+', label: 'Company Profiles' },
  { value: '200+', label: 'Career Paths' },
  { value: '95%', label: 'Success Rate' },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold font-display gradient-text">UpSkillr</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Companies</Link>
            <Link to="/exploration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
            <Link to="/resume" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resume</Link>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="glow" size="pill" onClick={() => navigate('/dashboard')}>
                Dashboard
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button variant="glow" size="pill" onClick={() => navigate('/auth')}>
                  Get Started
                  <Sparkles className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-info/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Workforce Intelligence Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 animate-fade-in">
            Your Career <span className="gradient-text">Intelligence</span> Partner
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-delay-1">
            Navigate your career with data-driven insights. Company prep, skill analysis, resume intelligence, and personalized roadmaps — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <Button variant="glow" size="xl" onClick={() => navigate(user ? '/dashboard' : '/auth')}>
              {user ? 'Go to Dashboard' : 'Start Free'}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => navigate('/exploration')}>
              <Compass className="w-5 h-5" />
              Explore Careers
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-delay-3">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-card/40 backdrop-blur border border-border/50">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Upload CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card variant="glass" className="overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary/20 animate-pulse-glow">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold font-display mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground">Get instant skill analysis and personalized career recommendations</p>
                </div>
                <Button variant="glow" size="lg" onClick={() => navigate('/resume')}>
                  <FileText className="w-4 h-4" />
                  Analyze Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Everything You Need to <span className="gradient-text">Level Up</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From company-specific preparation to career tracking, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                variant="glass-hover"
                className={`group cursor-pointer ${feature.highlight ? 'md:col-span-2 lg:col-span-1 ring-2 ring-primary/30' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.href)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${feature.highlight ? 'bg-primary/20' : 'bg-secondary'} group-hover:bg-primary/20 transition-colors`}>
                      <feature.icon className={`w-6 h-6 ${feature.highlight ? 'text-primary' : 'text-muted-foreground'} group-hover:text-primary transition-colors`} />
                    </div>
                    {feature.tag && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {feature.tag}
                      </span>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Intelligence Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Advanced <span className="gradient-text">Career Intelligence</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Go beyond basic skill matching with our intelligence-powered analysis tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {intelligenceFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                variant="glass-hover"
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.href)}
              >
                <CardHeader>
                  <div className={`p-3 rounded-xl bg-secondary w-fit group-hover:bg-primary/20 transition-colors`}>
                    <feature.icon className={`w-6 h-6 ${feature.color} group-hover:text-primary transition-colors`} />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card variant="glass" className="p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-primary/20">
                  <Target className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of professionals using UpSkillr to land their dream jobs at top companies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="glow" size="xl" onClick={() => navigate(user ? '/dashboard' : '/auth')}>
                  Get Started for Free
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Rocket className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold font-display gradient-text">UpSkillr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 UpSkillr. Workforce & Employability Intelligence Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

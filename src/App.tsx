import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ExplorationPage from "./pages/ExplorationPage";
import RoleDetailPage from "./pages/RoleDetailPage";
import ResumePage from "./pages/ResumePage";
import CommunityPage from "./pages/CommunityPage";
import SkillInsightsPage from "./pages/SkillInsightsPage";
import CareerSwitchPage from "./pages/CareerSwitchPage";
import SkillJobsPage from "./pages/SkillJobsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:companyId" element={<CompanyDetailPage />} />
            <Route path="/exploration" element={<ExplorationPage />} />
            <Route path="/exploration/:roleId" element={<RoleDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/skill-insights" element={<SkillInsightsPage />} />
            <Route path="/career-switch" element={<CareerSwitchPage />} />
            <Route path="/skill-jobs" element={<SkillJobsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

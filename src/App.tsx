import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NeighborhoodPage from "./pages/NeighborhoodPage";
import ResourcesPage from "./pages/ResourcesPage";
import PropertySearchPage from "./pages/PropertySearchPage";
import NewConstructionPage from "./pages/NewConstructionPage";
import BuyersPage from "./pages/BuyersPage";
import SellersPage from "./pages/SellersPage";
import RecruitingPage from "./pages/RecruitingPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import FairHousingPage from "./pages/FairHousingPage";
import ToolsPage from "./pages/ToolsPage";
import NotFound from "./pages/NotFound";
import AIAssistant from "./components/AIAssistant";
import FloatingLeadWidget from "./components/FloatingLeadWidget";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/neighborhoods/:slug" element={<NeighborhoodPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/properties" element={<PropertySearchPage />} />
            <Route path="/new-construction" element={<NewConstructionPage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/sellers" element={<SellersPage />} />
            <Route path="/join-our-team" element={<RecruitingPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/fair-housing" element={<FairHousingPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
          <FloatingLeadWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

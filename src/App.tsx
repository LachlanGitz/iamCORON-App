import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import EmergencyContacts from "./pages/EmergencyContacts";
import ReportIssue from "./pages/ReportIssue";
import TourismMap from "./pages/TourismMap";
import Services from "./pages/Services";
import EmergencyPasundo from "./pages/EmergencyPasundo";
import GovernmentRequirements from "./pages/GovernmentRequirements";
import FareGuide from "./pages/FareGuide";
import JobBoard from "./pages/JobBoard";
import PowerWaterWatch from "./pages/PowerWaterWatch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/pasundo" element={<EmergencyPasundo />} />
            <Route path="/services/requirements" element={<GovernmentRequirements />} />
            <Route path="/services/fare" element={<FareGuide />} />
            <Route path="/services/jobs" element={<JobBoard />} />
            <Route path="/services/utilities" element={<PowerWaterWatch />} />
            <Route path="/emergency" element={<EmergencyContacts />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/map" element={<TourismMap />} />
            {/* Placeholder for Profile */}
            <Route path="/profile" element={<div className="p-4 text-center">Profile Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
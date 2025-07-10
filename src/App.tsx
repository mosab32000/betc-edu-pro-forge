
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TasksPage from "./pages/TasksPage";
import ChatPage from "./pages/ChatPage";
import WisdomPage from "./pages/WisdomPage";
import HallPage from "./pages/HallPage";
import HeroesPage from "./pages/HeroesPage";
import LibraryPage from "./pages/LibraryPage";
import GalleryPage from "./pages/GalleryPage";
import BtecEvaluatorPage from "./pages/BtecEvaluatorPage";
import NotFound from "./pages/NotFound";
import ResearchPage from "./pages/ResearchPage";
import SecretsPage from "./pages/SecretsPage";
import ArchivePage from "./pages/ArchivePage";
import SystemManagementPage from "./pages/SystemManagementPage";
import CreativePage from "./pages/CreativePage";
import GamificationPage from "./pages/GamificationPage";
import ARExperiencePage from "./pages/ARExperiencePage";
import AdvancedNabataPage from "./pages/AdvancedNabataPage";
import MinistryIntegrationPage from "./pages/MinistryIntegrationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/wisdom" element={<WisdomPage />} />
          <Route path="/hall" element={<HallPage />} />
          <Route path="/heroes" element={<HeroesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/btec-evaluator" element={<BtecEvaluatorPage />} />
          {/* PetraVerse Core Routes */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/secrets" element={<SecretsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/system" element={<SystemManagementPage />} />
          {/* Advanced Features */}
          <Route path="/creative" element={<CreativePage />} />
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/ar-experience" element={<ARExperiencePage />} />
          <Route path="/nabata" element={<AdvancedNabataPage />} />
          {/* Ministry Integration */}
          <Route path="/ministry" element={<MinistryIntegrationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

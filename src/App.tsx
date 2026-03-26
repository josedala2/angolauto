import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import VehiclesPage from "./pages/Vehicles";
import BrandsPage from "./pages/Brands";
import BrandDetailPage from "./pages/BrandDetail";
import ContactPage from "./pages/Contact";
import AuthPage from "./pages/Auth";
import AdminPage from "./pages/Admin";
import VehicleDetailPage from "./pages/VehicleDetail";
import MyAccountPage from "./pages/MyAccount";
import ComparePage from "./pages/Compare";
import AboutPage from "./pages/About";
import NewsPage from "./pages/News";
import NewsDetailPage from "./pages/NewsDetail";
import CareersPage from "./pages/Careers";
import WorkshopPage from "./pages/Workshop";
import UsedVehiclesPage from "./pages/UsedVehicles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/veiculos" element={<VehiclesPage />} />
                <Route path="/veiculos-usados" element={<UsedVehiclesPage />} />
                <Route path="/marcas" element={<BrandsPage />} />
                <Route path="/marcas/:brandId" element={<BrandDetailPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/:slug" element={<NewsDetailPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/oficina" element={<WorkshopPage />} />
                <Route path="/carreiras" element={<CareersPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/veiculo/:id" element={<VehicleDetailPage />} />
                <Route path="/minha-conta" element={<MyAccountPage />} />
                <Route path="/comparar" element={<ComparePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <WhatsAppButton />
              <ScrollToTop />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

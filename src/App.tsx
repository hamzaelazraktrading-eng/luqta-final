import { Switch, Route } from "wouter";
// حذفنا استدعاء QueryClient من هنا لأننا وضعناه في main.tsx لتبسيط الأمور
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import TrendingPage from "./pages/TrendingPage";
import FavoritesPage from "./pages/FavoritesPage";
import CouponsPage from "./pages/CouponsPage";
import CategoryPage from "./pages/CategoryPage";
import OfferDetailPage from "./pages/OfferDetailPage";
import PrivacyPage from "./pages/Privacypage"; 
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/trending" component={TrendingPage} />
      <Route path="/favorites" component={FavoritesPage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/offer/:id" component={OfferDetailPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="font-tajawal bg-[#F1F5F9] min-h-screen">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;

import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

// Layout Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { FloatingButtons } from "./components/FloatingButtons";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

// Scroll to top on route change component
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <ScrollToTop />
        <Home />
      </Route>
      <Route path="/about">
        <ScrollToTop />
        <About />
      </Route>
      <Route path="/services">
        <ScrollToTop />
        <Services />
      </Route>
      <Route path="/portfolio">
        <ScrollToTop />
        <Portfolio />
      </Route>
      <Route path="/pricing">
        <ScrollToTop />
        <Pricing />
      </Route>
      <Route path="/contact">
        <ScrollToTop />
        <Contact />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Router />
            </div>
            <Footer />
            <FloatingButtons />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

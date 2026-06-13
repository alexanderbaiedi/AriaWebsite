import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Leadership from "@/pages/leadership";
import InterpreterExpectations from "@/pages/interpreter-expectations";
import Careers from "@/pages/careers";
import CareersApply from "@/pages/careers-apply";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/careers/apply" component={CareersApply} />
      <Route path="/careers" component={Careers} />
      <Route path="/leadership" component={Leadership} />
      <Route path="/interpreter-expectations" component={InterpreterExpectations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import PWABadge from "./PWABadge.tsx";
import Header from "./components/ui/header.tsx";
import Footer from "./components/ui/footer.tsx";
import FloatingElements from "./components/floatingElements.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/errorFallback.tsx";
import { ToastContainer } from "react-toastify";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <PWABadge />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full min-h-screen flex flex-col bg-base-200">
          <FloatingElements />
          <Header />
          <AppRoutes />
          <Footer />
        </div>
        <ToastContainer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

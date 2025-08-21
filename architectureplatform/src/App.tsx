import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import PWABadge from "./PWABadge.tsx";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <PWABadge />
      <div className="w-full min-h-screen flex flex-col bg-base-200">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./config/authConfig";

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

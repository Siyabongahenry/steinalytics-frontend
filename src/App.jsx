import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

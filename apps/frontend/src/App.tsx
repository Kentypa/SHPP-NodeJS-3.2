import { BrowserRouter } from "react-router";
import "./App.css";
import { ApplicationRoutes } from "./screens/ApplicationRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

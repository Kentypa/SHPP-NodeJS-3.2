import { BrowserRouter } from "react-router";
import "./App.css";
import { ApplicationRoutes } from "./screens/ApplicationRoutes";

function App() {
  return (
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  );
}

export default App;

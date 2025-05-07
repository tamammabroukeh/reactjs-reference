import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import router from "./router";
document.documentElement.style.setProperty("--wizard-active", "#9b87f5");
document.documentElement.style.setProperty("--wizard-completed", "#8B5CF6");
document.documentElement.style.setProperty("--wizard-incomplete", "#9CA3AF");
document.documentElement.style.setProperty("--wizard-error", "#ef4444");
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

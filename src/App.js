import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./Routers/Routers";

function App() {
  const routers = Routers
  return (
    <div>
      <RouterProvider router={routers}>
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;

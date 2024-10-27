import { RouterProvider } from "react-router-dom";
import routes from "./routes/route";

export default function App() {
  return (
    <div className="h-screen w-screen bg-grayLight px-5 sm:px-0">
      <RouterProvider router={routes} />
    </div>
  );
}

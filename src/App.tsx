import { RouterProvider } from "react-router-dom";
import routes from "./routes/route";

export default function App() {
  return (
    <div className="h-screen w-screen bg-grayLight">
      <RouterProvider router={routes} />
    </div>
  );
}

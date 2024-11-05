import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PublicLayout from "../layout/PublicLayout";
import NotFound from "../pages/NotFound";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import PrivateLayout from "../layout/PrivateLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },

      {
        path: "campaign",
        element: <Campaign />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

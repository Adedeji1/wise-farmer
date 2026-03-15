import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Academy } from "./pages/Academy";
import { Shop } from "./pages/Shop";
import { Scholarships } from "./pages/Scholarships";
import { Webinars } from "./pages/Webinars";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about-us", Component: About },
      { path: "academy", Component: Academy },
      { path: "shop", Component: Shop },
      { path: "scholarships", Component: Scholarships },
      { path: "webinars", Component: Webinars },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);

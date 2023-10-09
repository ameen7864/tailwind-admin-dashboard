import { SignIn, SignUp } from "@/pages/auth";
import { Home, Notifications, Profile, Tables } from "@/pages/dashboard";
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  HomeIcon,
  TableCellsIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Restaurant from "./pages/Restaurant/Restaurant";
import Supermarket from "./pages/Restaurant/Supermarket";
import User from "./pages/User-details/User";
import Groups from "./pages/User-details/Groups";
import Countries from "./pages/User-details/Countries";
import Allcustomer from "./pages/Customer-details/All-customer";
import MostActivee from "./pages/Customer-details/MostActivee";
import Block from "./pages/Customer-details/Block";
import Vocher from "./pages/Subscriptions/Vocher";
import NotConfirmed from "./pages/Subscriptions/NotConfirmed";
import Purchase from "./pages/Subscriptions/Purchase";
import Invoice from "./pages/Invoice/Invoice";
import Queue from "./pages/Queue/Queue";
import Banner from "./pages/Banner.jsx/Banner";
import Offers from "./pages/Offers/Offers";
import Cuisines from "./pages/Cuisines/Cuisines";
import AddRestaurant from "./pages/Add-Data/Restaurant";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/restaurant",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
        path: "/resturant",
        element: <Restaurant />,
      },
      {
        path: "/supermarket",
        element: <Supermarket />,
      },
      { path: "/user", element: <User />  },
      { path: "/group", element: <Groups />  },
      { path: "/country", element: <Countries />  },
      { path: "/all_customer", element: <Allcustomer />  },
      { path: "/most_active", element: <MostActivee />  },
      { path: "/block", element: <Block />  },
      { path: "/purchase", element: <Purchase />  },
      { path: "/not-confirmed", element: <NotConfirmed />  },
      { path: "/vocher", element: <Vocher />  },
      { path: "/invoice", element: <Invoice />  },
      { path: "/queue", element: <Queue />  },
      { path: "/banner", element: <Banner />  },
      { path: "/offer", element: <Offers />  },
      { path: "/cuisine", element: <Cuisines />  },

      //add data

  { path: "/add", element: <AddRestaurant />  },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

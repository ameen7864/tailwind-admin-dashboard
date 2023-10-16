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

import NotConfirmed from "./pages/Subscriptions/NotConfirmed";
import Purchase from "./pages/Subscriptions/Purchase";
import Invoice from "./pages/Invoice/Invoice";
import Queue from "./pages/Queue/Queue";
import Banner from "./pages/Banner.jsx/Banner";
import Offers from "./pages/Offers/Offers";
import Cuisines from "./pages/Cuisines/Cuisines";
import AddRestaurant from "./pages/Add-Data/Restaurant";
import AddUser from "./pages/Add-Data/Users";
import AddGroups from "./pages/Add-Data/Groups";
import AddCountries from "./pages/Add-Data/Countries";

import AddCuisines from "./pages/Add-Data/Cuisines";
import AddQueueTags from "./pages/Add-Data/QueueTags";
import AddBanner from "./pages/Add-Data/Banner";
import AddOffers from "./pages/Add-Data/Offers";
import Voucher from "./pages/Subscriptions/Vocher";
import Addvoucher from "./pages/Add-Data/vocher";
import RestaurantBranch from "./pages/Restaurant/RestaurantBranch/RestaurantBranch";
import BranchDetails from "./pages/Restaurant/RestaurantBranch/BranchDetails";
import AddBranchtable from "./pages/Add-Data/restaurantbranch/AddBranchtable";
import AddBranch from "./pages/Add-Data/restaurantbranch/AddBranch";
import AddBranchMenu from "./pages/Add-Data/restaurantbranch/branchmenu/AddBranchMenu";

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
      { path: "/branches", element: <RestaurantBranch />  },
      { path: "/branchesdetails", element: <BranchDetails />  },
      { path: "/branchestables", element: <AddBranchtable />  },
      { path: "/branchesmenu", element: <AddBranchMenu />  },
      { path: "/addbranch", element: <AddBranch />  },
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
      { path: "/voucher", element: <Voucher />  },
      { path: "/invoice", element: <Invoice />  },
      { path: "/queue", element: <Queue />  },
      { path: "/banner", element: <Banner />  },
      { path: "/offer", element: <Offers />  },
      { path: "/cuisine", element: <Cuisines />  },

      //add data

  { path: "/add", element: <AddRestaurant />  },
  { path: "/adduser", element: <AddUser />  },
  { path: "/addgroup", element: <AddGroups />  },
  { path: "/addcountry", element: <AddCountries />  },
  { path: "/addvoucher", element: <Addvoucher />  },
  { path: "/addcuisines", element: <AddCuisines />  },
  { path: "/addqueue", element: <AddQueueTags />  },
  { path: "/addbanner", element: <AddBanner />  },
  { path: "/addoffer", element: <AddOffers />  },
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

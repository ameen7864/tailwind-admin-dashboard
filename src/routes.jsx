import { SignIn } from "@/pages/auth";

import { ArrowRightOnRectangleIcon, HomeIcon } from "@heroicons/react/24/solid";
import Allcustomer from "./pages/Customer-details/All-customer";
import Block from "./pages/Customer-details/Block";
import MostActivee from "./pages/Customer-details/MostActivee";
import Restaurant from "./pages/Restaurant/Restaurant";
import Supermarket from "./pages/Restaurant/Supermarket";
import Countries from "./pages/User-details/Countries";
import Groups from "./pages/User-details/Groups";
import User from "./pages/User-details/User";

import AddCountries from "./pages/Add-Data/Countries";
import AddGroups from "./pages/Add-Data/Groups";
import AddRestaurant from "./pages/Add-Data/Restaurant";
import AddUser from "./pages/Add-Data/Users";
import Banner from "./pages/Banner.jsx/Banner";
import Cuisines from "./pages/Cuisines/Cuisines";
import Invoice from "./pages/Invoice/Invoice";
import Offers from "./pages/Offers/Offers";
import Queue from "./pages/Queue/Queue";
import NotConfirmed from "./pages/Subscriptions/NotConfirmed";
import Purchase from "./pages/Subscriptions/Purchase";

import AddBanner from "./pages/Add-Data/Banner";
import AddCuisines from "./pages/Add-Data/Cuisines";
import AddOffers from "./pages/Add-Data/Offers";
import AddQueueTags from "./pages/Add-Data/QueueTags";
import AddBranch from "./pages/Add-Data/restaurantbranch/AddBranch";
import AddBranchtable from "./pages/Add-Data/restaurantbranch/AddBranchtable";
import AddBranchMenu from "./pages/Add-Data/restaurantbranch/branchmenu/AddBranchMenu";
import Addvoucher from "./pages/Add-Data/vocher";
import CustomerDetails from "./pages/CustomerDetails.jsx/CustomerDetails";
import BranchDetails from "./pages/Restaurant/RestaurantBranch/BranchDetails";
import RestaurantBranch from "./pages/Restaurant/RestaurantBranch/RestaurantBranch";
import About from "./pages/RestaurantPages/About";
import Contact from "./pages/RestaurantPages/Contact";
import Termsandcondition from "./pages/RestaurantPages/Termsandcondition";
import Analytic from "./pages/RestaurantReports/analytic/Analytic";
import CallTime from "./pages/RestaurantReports/calltimes/CallTime";
import Cancellation from "./pages/RestaurantReports/cancellation/Cancellation";
import NotifyTime from "./pages/RestaurantReports/notifytime/NotifyTime";
import Overview from "./pages/RestaurantReports/overview/Overview";
import RegisteredData from "./pages/RestaurantReports/registered/Registered";
import TurnOver from "./pages/RestaurantReports/turnover/TurnOver";
import Voucher from "./pages/Subscriptions/Vocher";
import Home from "./pages/dashboard/home";
import Rolls from "./pages/User-details/Rolls";
import Areas from "./pages/User-details/Areas";
import Tasks from "./pages/Notification/Tasks";
import Filter from "./pages/Notification/Filter";

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
        path: "/resturant",
        element: <Restaurant />,
      },
      { path: "/branches", element: <RestaurantBranch /> },
      { path: "/branchesdetails", element: <BranchDetails /> },
      { path: "/branch", element: <AddBranchtable /> },
      { path: "/branchesmenu", element: <AddBranchMenu /> },
      { path: "/addbranch", element: <AddBranch /> },
      {
        path: "/supermarket",
        element: <Supermarket />,
      },
      { path: "/user", element: <User /> },
      { path: "/group", element: <Groups /> },
      { path: "/country", element: <Countries /> },
      { path: "/all_customer", element: <Allcustomer /> },
      { path: "/most_active", element: <MostActivee /> },
      { path: "/block", element: <Block /> },
      { path: "/purchase", element: <Purchase /> },
      { path: "/not-confirmed", element: <NotConfirmed /> },
      { path: "/voucher", element: <Voucher /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/queue", element: <Queue /> },
      { path: "/banner", element: <Banner /> },
      { path: "/offer", element: <Offers /> },
      { path: "/cuisine", element: <Cuisines /> },
      //pages
      { path: "/termsandcondition", element: <Termsandcondition /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },

      //reports

      { path: "/overview", element: <Overview /> },
      { path: "/cancellation", element: <Cancellation /> },
      { path: "/registered", element: <RegisteredData /> },
      { path: "/analytic", element: <Analytic /> },
      { path: "/callTime", element: <CallTime /> },
      { path: "/notifyTime", element: <NotifyTime /> },
      { path: "/turnOver", element: <TurnOver /> },

      //notification
      { path: "/tasks", element: <Tasks /> },
      { path: "/filter", element: <Filter /> },

      //add data

      { path: "/add", element: <AddRestaurant /> },
      { path: "/adduser", element: <AddUser /> },
      { path: "/addgroup", element: <AddGroups /> },
      { path: "/addcountry", element: <AddCountries /> },
      { path: "/areas", element: <Areas /> },
      { path: "/rolls", element: <Rolls /> },

      { path: "/addvoucher", element: <Addvoucher /> },
      { path: "/addcuisines", element: <AddCuisines /> },
      { path: "/addqueue", element: <AddQueueTags /> },
      { path: "/addbanner", element: <AddBanner /> },
      { path: "/addoffer", element: <AddOffers /> },
      { path: "/customerdetails", element: <CustomerDetails /> },
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
    ],
  },
];

export default routes;

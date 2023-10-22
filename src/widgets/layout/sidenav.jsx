// import PropTypes from "prop-types";
// import { Link, NavLink } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   Avatar,
//   Button,
//   IconButton,
//   Typography,
// } from "@material-tailwind/react";
// import { useMaterialTailwindController, setOpenSidenav } from "@/context";

// export function Sidenav({ brandImg, brandName, routes }) {
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { sidenavColor, sidenavType, openSidenav } = controller;
//   const sidenavTypes = {
//     dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
//     white: "bg-white shadow-lg",
//     transparent: "bg-transparent",
//   };

//   return (
//     <aside
//       className={`${sidenavTypes[sidenavType]} ${
//         openSidenav ? "translate-x-0" : "-translate-x-80"
//       } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
//     >
//       <div
//         className={`relative border-b ${
//           sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
//         }`}
//       >
//         <Li  className="-mt-1"nk to="/" className="flex items-center gap-4 py-6 px-8">
//           <Avatar src={brandImg} size="sm" />
//           <Typography
//             variant="h6"
//             color={sidenavType === "dark" ? "white" : "blue-gray"}
//           >
//             {brandName}
//           </Typography>
//         </Link>
//         <IconButton
//           variant="text"
//           color="white"
//           size="sm"
//           ripple={false}
//           className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
//           onClick={() => setOpenSidenav(dispatch, false)}
//         >
//           <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
//         </IconButton>
//       </div>
//       <div className="m-4">
//         {routes.map(({ layout, title, pages }, key) => (
//           <ul key={key} className="mb-4 flex flex-col gap-1">
//             {title && (
//               <li  className="-mt-1" className="mx-3.5 mt-4 mb-2">
//                 <Typography
//                   variant="small"
//                   color={sidenavType === "dark" ? "white" : "blue-gray"}
//                   className="font-black uppercase opacity-75"
//                 >
//                   {title}
//                 </Typography>
//               </li>
//             )}
//             {pages.map(({ icon, name, path }) => (
//               <li  className="-mt-1" key={name}>
//                 <NavLink to={`/${layout}${path}`}>
//                   {({ isActive }) => (
//                     <Button
//                       variant={isActive ? "gradient" : "text"}
//                       color={
//                         isActive
//                           ? sidenavColor
//                           : sidenavType === "dark"
//                           ? "white"
//                           : "blue-gray"
//                       }
//                       className="flex items-center gap-4 px-4 capitalize"
//                       fullWidth
//                     >
//                       {icon}
//                       <Typography
//                         color="inherit"
//                         className="font-medium capitalize"
//                       >
//                         {name}
//                       </Typography>
//                     </Button>
//                   )}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         ))}
//       </div>
//     </aside>
//   );
// }

// Sidenav.defaultProps = {
//   brandImg: "/img/logo-ct.png",
//   brandName: "Material Tailwind React",
// };

// Sidenav.propTypes = {
//   brandImg: PropTypes.string,
//   brandName: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

// export default Sidenav;

import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  MdAccessibility,
  MdAnalytics,
  MdArticle,
  MdCall,
  MdClose,
  MdDashboard,
  MdFastfood,
  MdFlag,
  MdGroups,
  MdGroups2,
  MdGroups3,
  MdInfo,
  MdLocalOffer,
  MdLock,
  MdNotificationsPaused,
  MdOutlineArchive,
  MdOutlineCancel,
  MdOutlineCheck,
  MdOutlineReportGmailerrorred,
  MdOutlineSpeakerNotes,
  MdPayments,
  MdPercent,
  MdPerson,
  MdPhotoSizeSelectActual,
  MdReceiptLong,
  MdRecentActors,
  MdReport,
  MdRestaurant,
  MdSell,
  MdShoppingCart,
} from "react-icons/md";

import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState } from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-3 w-3   transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  return (
    <aside
      className={`${"bg-white shadow-lg"} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } custom-scrollbar fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-64 overflow-hidden rounded-xl transition-transform duration-300 hover:overflow-y-auto xl:translate-x-0`}
    >
      <div className="relative border-b  border-white/20">
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography variant="h6" color={"dark"}>
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <hr />
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li className="-mt-1">
            <NavLink to={`/dashboard/home`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? " linear-gradient(195deg, #7537be, #31206d)"
                      : "transparent",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    dashboard
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/resturant`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdRestaurant className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    restaurant
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/supermarket`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdShoppingCart className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    supermarket
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="font-sm -my-2 w-full  rounded border-0 px-3  text-base font-medium  capitalize leading-relaxed text-inherit"
              onClick={() => handleOpen(1)}
            >
              <MdPerson className="ml-1 text-lg" />
              <div className="-ml-3">Users Details</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px ", marginBottom: "1px" }}
              >
                <li className="">
                  <NavLink to={`/dashboard/user`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdPerson className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          users
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/group`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdGroups className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          groups
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/country`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdFlag className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          countries
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader
              className="font-sm -my-1 rounded border-0 px-3 text-base font-medium  leading-relaxed text-inherit "
              onClick={() => handleOpen(2)}
            >
              <MdRecentActors className="ml-1 text-lg" />{" "}
              <div className="ml-3">Customer Details</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-5px " }}
              >
                <li className="-mt-1">
                  <NavLink to={`/dashboard/all_customer`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdGroups3 className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          All
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/most_active`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdGroups2 className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          most active
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/block`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdLock className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          block
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader
              className=" mx-0  -my-1 rounded border-0 px-3 text-base font-medium  leading-relaxed text-inherit"
              onClick={() => handleOpen(3)}
            >
              <MdPayments className="ml-1 text-lg" />
              <div className="font-xs  -ml-3">Subscriptions</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " }}
              >
                <li className="-mt-0">
                  <NavLink to={`/dashboard/purchase`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdOutlineCheck className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          purchase
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/not-confirmed`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdClose className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          not confirmed
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/voucher`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdPercent className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          voucher
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>

          <li className="-mt-1">
            <NavLink to={`/dashboard/invoice`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdReceiptLong className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    invoice
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/cuisine`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdFastfood className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    cuisines
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/queue`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdSell className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    queue tags
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/banner`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdPhotoSizeSelectActual className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    banners
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li className="-mt-1">
            <NavLink to={`/dashboard/offer`}>
              {({ isActive }) => (
                <Button
                  style={{
                    background: isActive
                      ? "linear-gradient(195deg, #7537be, #31206d)"
                      : "white",
                    boxShadow: "none",
                  }}
                  variant={isActive ? "gradient" : "white"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                  fullWidth
                >
                  <MdLocalOffer className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    offers
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader
              className=" font-sm  mx-0 -my-1 rounded border-0 px-3 text-base font-medium leading-relaxed text-inherit"
              onClick={() => handleOpen(4)}
            >
              <MdPayments className="ml-1 text-lg" />
              <div className="-ml-16">Pages</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px ", marginBottom: "1px" }}
              >
                <li className="-mt-0">
                  <NavLink to={`/dashboard/termsandcondition`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdArticle className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          terms and condition
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/contact`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdCall className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          contact us
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/about`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdInfo className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          about us
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
            <AccordionHeader
              className=" font-sm  mx-0 -my-1 rounded border-0 px-3 text-base font-medium leading-relaxed text-inherit"
              onClick={() => handleOpen(5)}
            >
              <MdReport className="ml-1 text-lg" />
              <div className="-ml-16">Reports</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-5px " }}
              >
                <li className="-mt-1">
                  <NavLink to={`/dashboard/overview`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdOutlineReportGmailerrorred className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Overview
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/cancellation`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdOutlineCancel className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          cancellation
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/registered`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdOutlineArchive className="mt-1 text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          registered
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/analytic`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdAnalytics className="mt-1 text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          analytic
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/callTime`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdAccessibility className="mt-1 text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          callTime
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/notifyTime`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdNotificationsPaused className="mt-1 text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          notifyTime
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/turnOver`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="items supermarket-center  hover:bg-violet-600 flex gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdOutlineSpeakerNotes className="mt-1.5 text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          turnOver
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
            <AccordionHeader
              className=" font-sm  mx-0 -my-1 rounded border-0 px-3 text-base font-medium leading-relaxed text-inherit"
              onClick={() => handleOpen(6)}
            >
              <MdDashboard className="ml-1 text-lg" />

              <div className="-ml-9">Notification</div>
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " }}
              >
                <li className="-mt-0">
                  <NavLink to={`/dashboard/tasks`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Tasks
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li className="-mt-1">
                  <NavLink to={`/dashboard/filter`}>
                    {({ isActive }) => (
                      <Button
                        style={{
                          background: isActive
                            ? "linear-gradient(195deg, #7537be, #31206d)"
                            : "white",
                          boxShadow: "none",
                        }}
                        variant={isActive ? "gradient" : "white"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="hover:bg-violet-600 flex items-center gap-4 px-4 capitalize "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          filter
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Admin Dashboard",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;

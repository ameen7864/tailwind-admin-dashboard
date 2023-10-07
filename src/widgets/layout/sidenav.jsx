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
//         <Link to="/" className="flex items-center gap-4 py-6 px-8">
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
//               <li className="mx-3.5 mt-4 mb-2">
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
//               <li key={name}>
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
import { MdDashboard } from "react-icons/md";

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
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-64 rounded-xl transition-transform duration-300 xl:translate-x-0 overflow-hidden hover:overflow-y-auto`}
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
          <li>
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
                    className="font-normal capitalize"
                  >
                    restaurant
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/rest`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    restaurant
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    supermarket
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <Accordion
            open={open === 1}
            icon={<Icon id={1} open={open}  />}
            
          >
            <AccordionHeader
              className="font-normal mx-0 text-sm rounded  border-0 px-3 w-full " 
              onClick={() => handleOpen(1)}
            >
              <MdDashboard className="text-lg" /> Users Details
            </AccordionHeader>
            <AccordionBody >
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " , marginBottom:"1px"}}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          users
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          groups
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
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
          <Accordion
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className="font-normal  text-sm rounded  border-0 px-3 "
              onClick={() => handleOpen(2)}
            >
              <MdDashboard className="text-lg" /> Customer Details
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-5px " }}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          All
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          most active
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
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
          <Accordion
            open={open === 3}
            icon={<Icon id={3} open={open}  />}
          >
            <AccordionHeader
              className="font-normal mx-0 text-sm rounded  border-0 px-3 "
              onClick={() => handleOpen(3)}
            >
              <MdDashboard className="text-lg" /> Subscriptions
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " }}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          purchase
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          not confirmed
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          vocher
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>

          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    invoice
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    cuisines
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    queue tags
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    banners
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/tables`}>
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
                  className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                  fullWidth
                >
                  <MdDashboard className="text-lg" />
                  <Typography
                    color="inherit"
                    className="font-normal capitalize"
                  >
                    offers
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <Accordion
            open={open === 1}
            icon={<Icon id={1} open={open}  />}
            
          >
            <AccordionHeader
              className="font-normal mx-0 text-sm rounded  border-0 px-3 w-full " 
              onClick={() => handleOpen(1)}
            >
              <MdDashboard className="text-lg" /> Users Details
            </AccordionHeader>
            <AccordionBody >
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " , marginBottom:"1px"}}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          users
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          groups
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
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
          <Accordion
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className="font-normal  text-sm rounded  border-0 px-3 "
              onClick={() => handleOpen(2)}
            >
              <MdDashboard className="text-lg" /> Customer Details
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-5px " }}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          All
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          most active
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
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
          <Accordion
            open={open === 3}
            icon={<Icon id={3} open={open}  />}
          >
            <AccordionHeader
              className="font-normal mx-0 text-sm rounded  border-0 px-3 "
              onClick={() => handleOpen(3)}
            >
              <MdDashboard className="text-lg" /> Subscriptions
            </AccordionHeader>
            <AccordionBody>
              <ul
                className="flex flex-col gap-1"
                style={{ marginTop: "-15px " }}
              >
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          purchase
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          not confirmed
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/home`}>
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
                        className="flex items  supermarket-center gap-4 px-4 capitalize hover:bg-violet-600 "
                        fullWidth
                      >
                        <MdDashboard className="text-lg" />
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          vocher
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

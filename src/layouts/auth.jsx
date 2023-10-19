import routes from "@/routes";
import { Route, Routes } from "react-router-dom";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4"></div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white"></div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;

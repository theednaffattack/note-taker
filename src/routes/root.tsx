import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { HorizontalNavHeader } from "../horiz-nav-header";
export default function Root() {
  return (
    <>
      <div className="debug">
        <HorizontalNavHeader />
        <Outlet />
      </div>
    </>
  );
}

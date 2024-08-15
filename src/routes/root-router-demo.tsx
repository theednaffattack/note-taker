import { Outlet } from "react-router-dom";
import { routeInfo } from "../route-info";
import { ReactNode } from "react";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {routeInfo.map((item, itemIndex) => (
              <RouteListItem
                key={item.href + "-" + itemIndex}
                href={item.href}
                linkText={item.linkText}
              />
            ))}
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

function RouteListItem({
  children,
  href,
  linkText,
}: {
  href: string;
  linkText: string;
  children?: ReactNode;
}) {
  return (
    <li key={href}>
      <a href={href}>
        {linkText}
        {children}
      </a>
    </li>
  );
}

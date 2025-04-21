import { FC } from "react";
import { LinkItem } from "../../types/link-item";
import { Navigation } from "../UI/Navigation";
import { RoutesPath } from "../../enums/routes-path";

const navigates: LinkItem[] = [
  { name: "Main page", link: RoutesPath.MAIN },
  { name: "Library", link: RoutesPath.LIBRARY },
  { name: "Sign in", link: RoutesPath.SIGN_IN },
];

export const Header: FC = () => {
  return (
    <header className="flex justify-around items-center w-full p-4 bg-gray-300">
      <Navigation
        menuItems={navigates}
        className={(isActive) => (isActive ? "font-bold text-md" : "text-sm")}
      />
    </header>
  );
};

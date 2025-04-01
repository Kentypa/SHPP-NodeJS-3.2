import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-gray-300 p-5">
      <div className="flex justify-around">
        <h3>Site logo</h3>
        <h3>User bobr</h3>
      </div>
    </header>
  );
};

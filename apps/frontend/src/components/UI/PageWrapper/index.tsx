import { ComponentWithChildren } from "../../../types/component-with-children";
import { Footer } from "../../Footer";
import { Header } from "../../Header";

export const PageWrapper: ComponentWithChildren = ({ children }) => {
  return (
    <main className="flex flex-col h-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

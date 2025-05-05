import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { AdminBookList } from "../../components/AdminBookList";
import { AdminBookAdd } from "../../components/AdminBookAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/auth-service";
import { useNavigate } from "react-router";

const bookList = [
  {
    title: "PHP для початківців",
    authors: ["Жора"],
    img: "",
    year: 2021,
    clicks: 3,
  },
  {
    title: "Java для початківців",
    authors: ["Жора", "Жорик"],
    img: "",
    year: 2021,
    clicks: 3,
  },
];

export const AdminPage: FC = () => {
  const queryClient = useQueryClient();
  const { logout } = authService("api/v1/");
  const nav = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      nav("/sign-in");
    },
  });

  return (
    <PageWrapper>
      <main className="flex flex-grow justify-center">
        <div className="flex justify-between w-full max-w-[1280px] py-10">
          <AdminBookList booksList={bookList} />
          <AdminBookAdd />
        </div>
        <button
          onClick={() => {
            logoutMutation.mutate();
          }}
        >
          Logout
        </button>
      </main>
    </PageWrapper>
  );
};

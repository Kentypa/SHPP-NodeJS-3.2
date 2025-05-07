import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { AdminBookList } from "../../components/AdminBookList";
import { AdminBookAdd } from "../../components/AdminBookAdd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/auth-service";
import { useNavigate } from "react-router";
import { booksService } from "../../services/books-service";

export const AdminPage: FC = () => {
  const { getBooks } = booksService("api/v1/");
  const { logout } = authService("api/v1/");
  const queryClient = useQueryClient();
  const booksQuery = useQuery({ queryKey: ["books"], queryFn: getBooks });
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
          {booksQuery.isSuccess && (
            <AdminBookList booksList={booksQuery.data.books} />
          )}
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

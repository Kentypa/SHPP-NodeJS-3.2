import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { AdminBookList } from "../../components/AdminBookList";
import { AdminBookAdd } from "../../components/AdminBookAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/auth-service";
import { useNavigate } from "react-router";

export const AdminPage: FC = () => {
  const { logout } = authService("/admin/api/v1/");
  const queryClient = useQueryClient();
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
        <div className="flex flex-col w-full max-w-[1280px] py-10 gap-8">
          <div className="flex justify-end">
            <button
              onClick={() => logoutMutation.mutate()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:justify-around">
            <AdminBookList />

            <AdminBookAdd />
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

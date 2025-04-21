import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { useForm } from "../../hooks/use-form";
import { FormObject } from "../../types/form-object";
import { authService } from "../../services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const SignInPage: FC = () => {
  const queryClient = useQueryClient();

  const { signIn } = authService("api/v1/");

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const sendData = (data: FormObject) => {
    signInMutation.mutate(data);
  };

  const { handleChange, handleSubmit } = useForm({}, sendData);

  return (
    <PageWrapper>
      <main className="flex flex-grow justify-center items-center bg-gray-50">
        <form
          className="flex flex-col w-full max-w-md border border-gray-300 shadow-md gap-4 p-6 rounded-2xl bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-2">Sign in</h2>
          <label className="text-sm text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <label className="text-sm text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <button className="mt-4 bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 transition">
            Sign In
          </button>
        </form>
      </main>
    </PageWrapper>
  );
};

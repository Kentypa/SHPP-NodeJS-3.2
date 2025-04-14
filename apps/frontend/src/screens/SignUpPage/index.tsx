import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";

export const SignUpPage: FC = () => {
  return (
    <PageWrapper>
      <main className="flex flex-grow justify-center items-center bg-gray-50">
        <div className="flex flex-col w-full max-w-md border border-gray-300 shadow-md gap-4 p-6 rounded-2xl bg-white">
          <h2 className="text-2xl font-bold text-center mb-2">Sign up</h2>

          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter username"
          />

          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter password"
          />

          <button className="mt-4 bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 transition">
            Sign up
          </button>
        </div>
      </main>
    </PageWrapper>
  );
};

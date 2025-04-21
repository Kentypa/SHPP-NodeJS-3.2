import { api } from "../config/axios-config";
import { FormObject } from "../types/form-object";

export function authService(endpoint: string) {
  const signIn = async (data: FormObject) => {
    api
      .post(endpoint, data, { params: { action: "sign-in" } })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("basic", res.data.basic);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const logout = async () => {
    api
      .post(endpoint, {}, { params: { action: "logout" } })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("basic");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return { signIn, logout };
}

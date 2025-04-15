declare module "express" {
  interface Request {
    addition: "a" | "b";
    body: unknown;
    cookies: unknown;
    route: unknown;
    signedCookies: unknown;
  }
}

export {};

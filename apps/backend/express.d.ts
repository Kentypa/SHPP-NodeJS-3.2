declare module "express" {
  interface Request {
    addition: "a" | "b";
    body: any;
    cookies: unknown;
    route: unknown;
    signedCookies: unknown;
    file: { filename: string };
  }
}

export {};

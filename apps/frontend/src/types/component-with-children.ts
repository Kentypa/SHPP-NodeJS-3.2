import { FC, PropsWithChildren } from "react";

export type ComponentWithChildren<P = object> = FC<PropsWithChildren<P>>;

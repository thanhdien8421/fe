"use client";
import { Provider } from "react-redux";
import { store } from "@/hooks/store";
import { ReactNode, FC } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
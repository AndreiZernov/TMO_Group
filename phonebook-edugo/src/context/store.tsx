import React, { createContext, useContext } from "react";
import { createStore, TStore } from "./createStore";
import { useLocalStore } from "mobx-react";

const storeContext = createContext<TStore | null>(null);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(createStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider.");
  }
  return store;
};

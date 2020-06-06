import React from "react";
import { IBill, ICategory } from "./constants";

interface IDataContext {
  bills: IBill[];
  setBills: (bills: IBill[]) => void;
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
}

export const DataContext = React.createContext<IDataContext>({
  bills: [],
  setBills: () => {},
  categories: [],
  setCategories: () => {},
});

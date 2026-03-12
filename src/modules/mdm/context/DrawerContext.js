// app/(docs)/components/DrawerContext.js
"use client";
import { createContext, useContext } from "react";

export const DrawerContext = createContext({
  onToggle: () => {}
});

export const useDrawer = () => useContext(DrawerContext);

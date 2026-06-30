import { createContext, useContext } from "react";

const WatchContext = createContext(null);

export const useWatch = () => useContext(WatchContext);

export default WatchContext;

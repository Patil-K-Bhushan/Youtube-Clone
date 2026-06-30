import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { collapseForWatch, restoreMenu } from "../utils/appSlice";

const useCollapseSidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(collapseForWatch());
    return () => dispatch(restoreMenu());
  }, [dispatch]);
};

export default useCollapseSidebar;

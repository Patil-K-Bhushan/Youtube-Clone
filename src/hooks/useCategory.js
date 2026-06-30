import { useState } from "react";

const useCategory = (defaultCategory = "All") => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  return {
    activeCategory,
    setActiveCategory,
  };
};

export default useCategory;
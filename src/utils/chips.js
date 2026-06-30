export const CHIP_FILTERS = {
  All: { categoryId: null },
  Music: { categoryId: "10" },
  Gaming: { categoryId: "20" },
  News: { categoryId: "25" },
  Movies: { categoryId: "1" },
};

export const getChipFilter = (label) => CHIP_FILTERS[label] ?? { query: label };

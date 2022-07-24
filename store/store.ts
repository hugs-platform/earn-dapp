import create from "zustand";

const inititalState = {
  coins: {
    coinInfo: [],
  },
};

export const useStore = create((set) => ({
  ...{ ...inititalState },
  updateObject: (object: string, field: string, value: any) =>
    set(
      (state) =>
        (state = {
          ...state,
          [object]: { ...state[object], [field]: value },
        })
    ),
}));

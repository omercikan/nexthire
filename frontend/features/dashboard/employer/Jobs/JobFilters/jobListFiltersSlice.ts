import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterStatus = "all" | "published" | "passive" | "draft";
type FilterSort = "newest" | "oldest" | "most_applied";

interface InitialState {
  filters: {
    searchTerm: string;
    status: FilterStatus;
    sort: FilterSort;
  };
}

const initialState: InitialState = {
  filters: {
    searchTerm: "",
    status: "all",
    sort: "newest",
  },
};

export const jobFiltersSlice = createSlice({
  name: "jobFiltersSlice",
  initialState: initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<typeof initialState.filters>>,
    ) => {
      Object.assign(state.filters, action.payload);
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, clearFilters } = jobFiltersSlice.actions;

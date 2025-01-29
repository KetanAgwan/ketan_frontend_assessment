import { createSlice } from "@reduxjs/toolkit";

const domainSlice = createSlice({
  name: "domains",
  initialState: {
    domains: [],
  },
  reducers: {
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
    addDomain: (state, action) => {
      state.domains.push(action.payload);
    },
    updateDomain: (state, action) => {
      const { id, ...updatedDomain } = action.payload;
      const domainIndex = state.domains.findIndex((domain) => domain.id === id);
      if (domainIndex !== -1) {
        state.domains[domainIndex] = updatedDomain;
      }
    },
    deleteDomain: (state, action) => {
      const domainIndex = state.domains.findIndex(
        (domain) => domain.id === action.payload
      );
      if (domainIndex !== -1) {
        state.domains.splice(domainIndex, 1);
      }
    },
  },
});

export const { setDomains } = domainSlice.actions;

export default domainSlice.reducer;

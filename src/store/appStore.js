import { configureStore } from "@reduxjs/toolkit";
import { domainApi } from "../api/domain_api/domainSlice";

const appStore = configureStore({
  reducer: {
    domains: domainApi.reducer,
  },
});

export default appStore;

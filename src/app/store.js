import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "./features/auth-api-slice";
import menuSlice from "./features/menuSlice";
import authTokenSlice from "./features/auth-token-slice";
const store = configureStore({
  reducer: {
    menu: menuSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authTokenSlice.reducer,
  },

  middleware: (gDM) => {
    return gDM().concat([
      authApiSlice.middleware
    ]);
  },
});

export default store;

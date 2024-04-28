import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "./features/auth-api-slice";
import menuSlice from "./features/menuSlice";
import authTokenSlice from "./features/auth-token-slice";
import adminObjectApiSlice from "./features/admin-apis/admin-object-api-slice";
import adminRepoApiSlice from "./features/admin-apis/admin-repo-api-slice";
const store = configureStore({
  reducer: {
    menu: menuSlice,
    auth: authTokenSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [adminObjectApiSlice.reducerPath]: adminObjectApiSlice.reducer,
    [adminRepoApiSlice.reducerPath]: adminRepoApiSlice.reducer
  },

  middleware: (gDM) => {
    return gDM().concat([
      authApiSlice.middleware,
      adminObjectApiSlice.middleware,
      adminRepoApiSlice.middleware
    ]);
  },
});

export default store;

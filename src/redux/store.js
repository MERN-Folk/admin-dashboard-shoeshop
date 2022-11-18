import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PersonReducer from "./features/personSlice";
import CproReducer from "./features/cproSlice";
import GroupReducer from "./features/groupSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    person: PersonReducer,
    cpro: CproReducer,
    group: GroupReducer,
  },
});

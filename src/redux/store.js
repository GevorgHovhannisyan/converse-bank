import { configureStore,   } from "@reduxjs/toolkit"; //getDefaultMiddleware,
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { rootReducer } from ".";
// import { githubApi } from "./githubTest/github.api";

const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
    //     serializableCheck: false
    // }).concat(githubApi.middleware)
})

setupListeners(store.dispatch)

export default store
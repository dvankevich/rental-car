// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites"],
};

const persistedReducer = persistReducer(persistConfig, carsReducer);

const store = configureStore({
  reducer: {
    cars: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо перевірку для redux-persist
        ignoredActions: [persistStore.persistReducer],
        ignoredPaths: ["persistedReducer"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

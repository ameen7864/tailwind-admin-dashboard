import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  allcustomerApi,
  allrestaurantApi,
  bannerApi,
  blockApi,
  countriesapi,
  countriesareaapi,
  cuisineApi,
  dashboardApi,
  groupsapi,
  invoiceApi,
  mostactiveApi,
  offerApi,
  queueApi,
  reasturantApi,
  todoApi,
  usersApi,
} from "./ReduxApi";

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [allrestaurantApi.reducerPath]: allrestaurantApi.reducer,
    [reasturantApi.reducerPath]: reasturantApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [cuisineApi.reducerPath]: cuisineApi.reducer,
    [queueApi.reducerPath]: queueApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsapi.reducerPath]: groupsapi.reducer,
    [countriesapi.reducerPath]: countriesapi.reducer,
    [countriesareaapi.reducerPath]: countriesareaapi.reducer,

    [allcustomerApi.reducerPath]: allcustomerApi.reducer,
    [mostactiveApi.reducerPath]: mostactiveApi.reducer,
    [blockApi.reducerPath]: blockApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      reasturantApi.middleware,
      todoApi.middleware,
      invoiceApi.middleware,
      allrestaurantApi.middleware,
      cuisineApi.middleware,
      queueApi.middleware,
      bannerApi.middleware,
      offerApi.middleware,

      usersApi.middleware,
      groupsapi.middleware,
      countriesapi.middleware,
      countriesareaapi.middleware,

      allcustomerApi.middleware,
      mostactiveApi.middleware,
      blockApi.middleware
    ),
});

setupListeners(store.dispatch);

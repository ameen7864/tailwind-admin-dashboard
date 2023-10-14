import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://webadminapi.requeue.com/WebAdmin";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkNoYW5uZWwiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE3LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJBY2Nlc3NUb2tlbiI6eyJOSUwiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAifSwiVXNlciI6ImRpeWFhIiwiaWF0IjoxNjk2NzQ0NzM3LCJleHAiOjE2OTczNDk1Mzd9.FvCCJO6efZA-I_jmNrYDViqKiUN-OmIPMy0hWebDR_Q";

  export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders(headers) {
        headers.set("Authorization", AUTH_TOKEN);
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getDashboardByName: builder.query({
        query: () => `Total`,
      }),
    }),
  });


export const allrestaurantApi = createApi({
  reducerPath: "allrestaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllRestByName: builder.query({
      query: () => `rest`,
    }),
  }),
});

export const reasturantApi = createApi({
  reducerPath: "reasturantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRestaurantByName: builder.query({
      query: ({ id, searched, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("id", id);
        queryParams.append("searchText", searched);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `getallrestro?${queryParams.toString()}`;
      },
    }),
  }),
});

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInvoiceByName: builder.query({
      query: ({ parentId, restId, sdate, Edate, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("parentId", -1);
        queryParams.append("restID", restId);
        queryParams.append("startdate", sdate);
        queryParams.append("Enddate", Edate);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `getOrderDetail?status=2&${queryParams.toString()}`;
      },
    }),
  }),
});

export const cuisineApi = createApi({
  reducerPath: "cuisineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCuisineByName: builder.query({
      query: ({ pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `getCuisines?${queryParams.toString()}`;
      },
    }),
  }),
});

export const queueApi = createApi({
  reducerPath: "queueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQueueByName: builder.query({
      query: () => `QeueuTags`,
    }),
  }),
});

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBannerByName: builder.query({
      query: ({ pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `banner?${queryParams.toString()}`;
      },
    }),
  }),
});

export const offerApi = createApi({
  reducerPath: "offerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOfferByName: builder.query({
      query: ({ pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `getoffer?${queryParams.toString()}`;
      },
    }),
  }),
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersByName: builder.query({
      query: ({ searchText, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("searchText", searchText);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `Users?${queryParams.toString()}`;
      },
    }),
  }),
});

export const groupsapi = createApi({
  reducerPath: "groupsapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGroupByName: builder.query({
      query: () => `Allgroups`,
    }),
  }),
});

export const countriesapi = createApi({
  reducerPath: "countriesapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountryByName: builder.query({
      query: ({ searchText, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("searchText", searchText);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `Countries?${queryParams.toString()}`;
      },
    }),
  }),
});
export const countriesareaapi = createApi({
  reducerPath: "countriesareaapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountryAreaByName: builder.query({
      query: ({ countryid}) => {
        const queryParams = new URLSearchParams();
        queryParams.append("countryid", countryid);
      
        return `Areas?${queryParams.toString()}`;
      },
    }),
  }),
});



export const allcustomerApi = createApi({
  reducerPath: "allcustomerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomersByName: builder.query({
      query: ({ search, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("search", search);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `Clients?${queryParams.toString()}`;
      },
    }),
  }),
});

export const mostactiveApi = createApi({
  reducerPath: "mostactiveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMostByName: builder.query({
      query: ({ search, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("search", search);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `activeClients?${queryParams.toString()}`;
      },
    }),
  }),
});

export const blockApi = createApi({
  reducerPath: "blockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBlockByName: builder.query({
      query: ({ search, pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("search", search);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `BlockClients?${queryParams.toString()}`;
      },
    }),
  }),
});


export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodoByName: builder.query({
      query: () => `todos`,
    }),
  }),
});

export const { useGetDashboardByNameQuery } = dashboardApi;
export const { useGetAllRestByNameQuery } = allrestaurantApi;
export const { useGetRestaurantByNameQuery } = reasturantApi;
export const { useGetInvoiceByNameQuery } = invoiceApi;
export const { useGetCuisineByNameQuery } = cuisineApi;
export const { useGetQueueByNameQuery } = queueApi;
export const { useGetBannerByNameQuery } = bannerApi;
export const { useGetOfferByNameQuery } = offerApi;

export const { useGetUsersByNameQuery } = usersApi;
export const { useGetGroupByNameQuery } = groupsapi;
export const { useGetCountryByNameQuery } = countriesapi;
export const { useGetCountryAreaByNameQuery } = countriesareaapi;

export const { useGetCustomersByNameQuery } = allcustomerApi;
export const { useGetMostByNameQuery } = mostactiveApi;
export const { useGetBlockByNameQuery } = blockApi;


export const { useGetTodoByNameQuery } = todoApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://192.168.1.40:9091/WebAdmin";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkNoYW5uZWwiOiJNb3ppbGxhLzUuMCAoWDExOyBMaW51eCB4ODZfNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTYuMC4wLjAgU2FmYXJpLzUzNy4zNiIsIkFjY2Vzc1Rva2VuIjp7Ik5JTCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9LCJVc2VyIjoiZGl5YWEiLCJpYXQiOjE2OTczMDI4OTEsImV4cCI6MTY5NzkwNzY5MX0.fU2TasDToQfbUos8WFR3cJZ6V30AzQL1_-e13NmNiZ0";

// `WebAdmin/RTotal?endDate=${Edate}%2023:59&type=${type}&restId=${rest}&startDate=${sdate}%2000:00&page=${tableParams.pagination.current}&pagelimit=${tableParams.pagination.pageSize}`,

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Authorization", AUTH_TOKEN);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getOverviewByName: builder.query({
      query: ({ branchid, startDate, EndDate, restId, position }) => {
        const queryParams = new URLSearchParams();

        queryParams.append("parentId", branchid);
        queryParams.append("startDate", startDate);
        queryParams.append("endDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("position", position);
        return `RTotal?${queryParams.toString()}`;
      },
    }),
    getOverviewDataByName: builder.query({
      query: ({
        type,
        branchid,
        startDate,
        EndDate,
        restId,
        page,
        pagelimit,
      }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("type", type);
        queryParams.append("parentId", branchid);
        queryParams.append("startDate", startDate);
        queryParams.append("endDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("page", page);
        queryParams.append("pagelimit", pagelimit);
        return `RTotal?${queryParams.toString()}`;
      },
    }),

    getCancellationByName: builder.query({
      query: ({
        phone,
        branchid,
        startDate,
        EndDate,
        restId,
        pages,
        pageSize,
      }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("clientphone", phone);
        queryParams.append("parentId", branchid);
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("page", pages);
        queryParams.append("pagelimit", pageSize);
        return `CancledClientData?${queryParams.toString()}`;
      },
    }),
    getRestrationByName: builder.query({
      query: ({ startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        return `getRestration?${queryParams.toString()}`;
      },
    }),
    getTurnoverInsideByName: builder.query({
      query: ({ position, restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("position", position);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getTurnOver?status=2&${queryParams.toString()}`;
      },
    }),
    getTurnoverOutsideByName: builder.query({
      query: ({ position, restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("position", position);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getTurnOver?status=2&${queryParams.toString()}`;
      },
    }),
    // `/WebAdmin/GetAvgCallTime?&restId=${restId}&parentId=${branchid}&startDate=${sdate}&EndDate=${Edate}&status=2`,
    getNotifyAverageByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `GetAvgCallTime?status=2&${queryParams.toString()}`;
      },
    }),
    getNotifyMaxiumByName: builder.query({
      query: ({ position, restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("position", position);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getTurnOver?status=2&${queryParams.toString()}`;
      },
    }),

    // GetAvgCallTime
    //   getRestaurantUsersByName: builder.query({
    //     query: (id) => {
    //       return `getusersbyrestid?restID=${id}`;
    //     },
    //     providesTags: ["restaurant"],
    //   }),
    //   //branch tables
    //   getRestaurantTablesByName: builder.query({
    //     query: (id) => {
    //       return `getTablesbyrest?restID=${id}`;
    //     },
    //     providesTags: ["tables"],
    //   }),
    //   deleteTable: builder.mutation({
    //     query: (id) => ({
    //       url: `deleteTablesbyId?id=${id}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: ["tables"],
    //   }),
    //   //branchmenu
    //   getRestaurantMenuByName: builder.query({
    //     query: (id) => {
    //       return `getmenubyrestid?restID=${id}`;
    //     },
    //     providesTags: ["menu"],
    //   }),
    //   addBranchMenu: builder.mutation({
    //     query: (item) => ({
    //       url: "addMenubyrestid",
    //       method: "POST",
    //       body: item,
    //     }),
    //     invalidatesTags: ["menu"],
    //   }),
  }),
});

export const {
  useGetOverviewByNameQuery,
  useGetOverviewDataByNameQuery,
  useGetCancellationByNameQuery,
  useGetRestrationByNameQuery,
  useGetTurnoverInsideByNameQuery,
  useGetTurnoverOutsideByNameQuery,

  useGetNotifyAverageByNameQuery,
  useGetNotifyMaxiumByNameQuery,
} = reportsApi;

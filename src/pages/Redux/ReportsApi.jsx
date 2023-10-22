import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://192.168.1.40:9091/WebAdmin";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkNoYW5uZWwiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTE4LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJBY2Nlc3NUb2tlbiI6eyJOSUwiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAifSwiVXNlciI6ImRpeWFhIiwiaWF0IjoxNjk3OTUxMTMyLCJleHAiOjE2OTg1NTU5MzJ9.mOgOoX6dU2FlJNOVh10r4B1y0sfhJ0cFNxL2MFBsonY";

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
    //cancellation data
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
    // register data
    getRestrationByName: builder.query({
      query: ({ startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        return `getRestration?${queryParams.toString()}`;
      },
    }),

    //turn over
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

    //notify time
    getNotifyAverageByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate, page, pagelimit }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        queryParams.append("pagelimit", pagelimit);
        queryParams.append("page", page);
        return `GetAvgNotifyTime?status=2&${queryParams.toString()}`;
      },
    }),

    getNotifyMaxiumByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getMaxcalltime?status=2&${queryParams.toString()}`;
      },
    }),

    //call time
    getCallAverageByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `GetAvgCallTime?status=2&${queryParams.toString()}`;
      },
    }),
    getCallMaxiumByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getMaxcalltime?status=2&${queryParams.toString()}`;
      },
    }),

    // analytic data

    //Longest Waiting Time
    getLongestWaitingByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `longestWaitingTime?status=2&${queryParams.toString()}`;
      },
    }),

    //Number Of Seat Requested
    getNoSeatReqByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `numberOfSeatRequested?status=2&${queryParams.toString()}`;
      },
    }),
    //Max Seat (Guests)
    getMaxSeatByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `maxSeatedGuest?status=2&${queryParams.toString()}`;
      },
    }),

    //Canceled Queue
    getCancelQueByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `maxSeatedGuest?status=4,5&${queryParams.toString()}`;
      },
    }),

    //Total Queued (Not Seat)
    getTotalQueByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `totalQueued?status=2&${queryParams.toString()}`;
      },
    }),

    //Rest Log - Full
    getRestLogFullByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=1&${queryParams.toString()}`;
      },
    }),

    //Rest Log - Offline
    getRestLogOffByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=11&${queryParams.toString()}`;
      },
    }),

    //Rest Log - InsideClose
    getRestLogInsideByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=5&${queryParams.toString()}`;
      },
    }),

    //Rest Log - OutsideClose
    getRestLogOutByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=7&${queryParams.toString()}`;
      },
    }),

    //Rest Log - InsideFull
    getRestLogInsFullByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=4&${queryParams.toString()}`;
      },
    }),

    //Rest Log - OutsideFull
    getRestLogOutFullByName: builder.query({
      query: ({ restId, parentId, startDate, EndDate }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDate);
        queryParams.append("EndDate", EndDate);
        queryParams.append("restId", restId);
        queryParams.append("parentId", parentId);
        return `getRestLog?type=6&${queryParams.toString()}`;
      },
    }),

    //Tasks
    getTasksByName: builder.query({
      query: ({ pages, pageSize }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", pages);
        queryParams.append("pageSize", pageSize);

        return `getdata?${queryParams.toString()}`;
      },
    }),
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

  useGetCallAverageByNameQuery,
  useGetCallMaxiumByNameQuery,

  useGetLongestWaitingByNameQuery,
  useGetNoSeatReqByNameQuery,
  useGetMaxSeatByNameQuery,
  useGetCancelQueByNameQuery,
  useGetTotalQueByNameQuery,
  useGetRestLogFullByNameQuery,
  useGetRestLogOffByNameQuery,
  useGetRestLogInsideByNameQuery,
  useGetRestLogOutByNameQuery,
  useGetRestLogInsFullByNameQuery,
  useGetRestLogOutFullByNameQuery,

  useGetTasksByNameQuery,
} = reportsApi;

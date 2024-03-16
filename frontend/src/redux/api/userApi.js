import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1"}),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        
        getMe: builder.query({
            query: ( ) => `/me`,
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled}) {
                console.log('getMe called') 
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setLoading(false));
                }catch (error) { 
                    dispatch(setLoading(false));
                    console.log(error);
                }
            },
        }),
        updateProfile: builder.mutation({
            query(body) {
              return {
                url: "/me/update",
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["User"],
          }),
    }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;
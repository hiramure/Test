import { ITEM_URL } from "../features/constant";
import { apiSlice } from "./apiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: bulder.query({
      query: ({ keyword }) => ({
        url: `${ITEM_URL}`,
        params: { keyword },
      }),

      keepUnusedDaraFor: 5,
      provideTags: ["Item"],
    }),

    getItemById: bulder.query({
      query: (itemId) => `${ITEM_URL}/${itemId}`,
      provideTags: (result, error, itemId) => [{ type: "Item", id: itemId }],
    }),

    allItems: bulder.query({
      query: () => `${ITEM_URL}/`,
    }),

    getProductDetails: builder.query({
      query: (itemId) => ({
        url: `${ITEM_URL}/${itemId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createItem: builder.mutation({
      query: (itemData) => ({
        url: `${ITEM_URL}`,
        method: "POST",
        body: itemData,
      }),

      invalidatesTags: ["Item"],
    }),

    updateItem: builder.mutation({
      query: ({ itemId, formData }) => ({
        url: `${ITEM_URL}/${itemId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `${ITEM_URL}/${itemId}`,
        method: "DELETE",
      }),
      providesTags: ["Item"],
    }),

    // getNewItem: builder.mutation({
    //   query: () => `${ITEM_URL}/new`,
    //   keepUnusedDaraFor: 5,
    // }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useAllItemsQuery,
  useGetProductDetailsQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = itemApiSlice;

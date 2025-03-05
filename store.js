import { configureStore } from '@reduxjs/toolkit'
import productReducer  from "./src/core/features/productSlice"
import loginReducer  from "./src/core/features/loginSlice"
export const store = configureStore({
  reducer: {
    product : productReducer,
    login : loginReducer 
  },
})

// // Infer the RootState and AppDispatch types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
import { createSlice } from "@reduxjs/toolkit";


export interface postState {
  error : null | boolean,
  loading : null| boolean,
}

const initialState : postState = {
   error: null,
   loading : null
}

const postSlice = createSlice({
  name :"post",
  initialState,
  reducers :{
   fetchingPostStart: (state)=>{
    state.loading = true;
   },
   fetchingPostFailed: (state)=>{
    state.loading = false;
    state.error = true;
   },
   fetchingPostSuccess: (state)=>{
    state.loading = false;
    state.error = false;
   },
   createPostStart: (state)=>{
    state.loading = true;
   },
   createPostFailed: (state)=>{
    state.loading = false;
    state.error = true;
   },
   createPostSuccess: (state)=>{
    state.loading = false;
    state.error = false;
   },
  }

})

export const {fetchingPostFailed ,fetchingPostStart , fetchingPostSuccess,createPostFailed ,createPostStart , createPostSuccess } = postSlice.actions
export default postSlice.reducer

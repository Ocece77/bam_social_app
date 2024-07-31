import { createSlice } from "@reduxjs/toolkit";


export interface postState {
  error : null | boolean,
  loading : null| boolean,
  uploaded : null| boolean,
  updated : null| boolean,
}

const initialState : postState = {
   error: null,
   loading : null,
   uploaded : null,
   updated : null,
}

const postSlice = createSlice({
  name :"post",
  initialState,
  reducers :{
   fetchingPostStart: (state)=>{
    state.loading = true;
    state.uploaded = false;
   },
   fetchingPostFailed: (state)=>{
    state.loading = false;
    state.error = true;
   },
   fetchingPostSuccess: (state)=>{
    state.loading = false;
    state.error = false;
   },
   loadingImageStart: (state)=>{
    state.loading = true;
    state.uploaded = false;

   },
   loadingImageFailed: (state)=>{
    state.loading = false;
    state.error = true;
    state.uploaded = false;
   },
   loadingImageSuccess: (state)=>{
    state.loading = false;
    state.error = false;
    state.uploaded = true;
   },
   createPostStart: (state)=>{
    state.loading = true;
    state.uploaded = false;
   },
   createPostFailed: (state)=>{
    state.loading = false;
    state.error = true;
   },
   createPostSuccess: (state)=>{
    state.loading = false;
    state.error = false;
   },
   updatePostStart: (state)=>{
    state.loading = true;
    state.updated = false;
   },
   updatePostFailed: (state)=>{
    state.loading = false;
    state.error = true;
    state.updated = false;
   },
   updatePostSuccess: (state )=>{
    state.loading = false;
    state.error = false;
    state.updated = true;
   },
  }

})

export const {fetchingPostFailed ,fetchingPostStart , fetchingPostSuccess,createPostFailed ,createPostStart , createPostSuccess , loadingImageSuccess , loadingImageFailed ,loadingImageStart, updatePostSuccess , updatePostFailed ,updatePostStart} = postSlice.actions
export default postSlice.reducer

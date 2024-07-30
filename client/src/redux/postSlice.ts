import { createSlice } from "@reduxjs/toolkit";


export interface postState {
  error : null | boolean,
  loading : null| boolean,
  uploaded : null| boolean
}

const initialState : postState = {
   error: null,
   loading : null,
   uploaded:null
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
  }

})

export const {fetchingPostFailed ,fetchingPostStart , fetchingPostSuccess,createPostFailed ,createPostStart , createPostSuccess , loadingImageSuccess , loadingImageFailed ,loadingImageStart} = postSlice.actions
export default postSlice.reducer

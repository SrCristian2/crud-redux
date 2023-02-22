import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show:false
}

const modalPost = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    handleShow:(state)=>{
        state.show=true
    },
    handleClose:(state)=>{
        state.show=false
    }
  }
});

export const {handleClose,handleShow} = modalPost.actions

export default modalPost.reducer
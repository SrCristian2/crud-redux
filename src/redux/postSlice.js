import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  posts: [
    {
      id: uuidv4(),
      img: "https://us.123rf.com/450wm/mamun25g/mamun25g2206/mamun25g220602684/187451398-logotipo-de-img-letra-img-dise%C3%B1o-de-logotipo-de-letra-img-logotipo-de-iniciales-img-vinculado-con.jpg?ver=6",
      title: "title1",
      description: "description1",
    },
  ],
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({ ...action.payload, id: uuidv4() });
    },

    delPost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    putPost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
  },
});

export const { addPost, delPost, putPost } = postSlice.actions;

export default postSlice.reducer;

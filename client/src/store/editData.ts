import { createSlice } from '@reduxjs/toolkit';
const initialState = { postId: '', tag: '', title: '', content: '' };

const editDataSlice = createSlice({
  name: 'editData',
  initialState,
  reducers: {
    savePostData: (state, action) => {
      state.postId = action.payload.postId;
      state.tag = action.payload.tag;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    reset: () => initialState,
  },
});

export const { savePostData, reset } = editDataSlice.actions;
export default editDataSlice.reducer;

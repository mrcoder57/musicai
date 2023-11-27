import { createSlice } from '@reduxjs/toolkit';

export const songIdSlice = createSlice({
  name: 'songId',
  initialState: null,
  reducers: {
    setSongId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSongId } = songIdSlice.actions;

export const selectSongId = (state) => state.songId;

export default songIdSlice.reducer;
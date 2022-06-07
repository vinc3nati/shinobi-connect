import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalData: null,
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action) => {
      state.isOpen = true;
      state.modalData = action?.payload;
    },
    closePostModal: (state) => {
      state.isOpen = false;
      state.modalData = null;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export const postModalReducer = postModalSlice.reducer;

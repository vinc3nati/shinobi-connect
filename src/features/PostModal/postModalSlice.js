import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalData: null,
  postQueryBody: null,
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action) => {
      state.isOpen = true;
      state.modalData = action?.payload?.modalData;
      state.postQueryBody = action?.payload?.postQueryBody;
    },
    closePostModal: (state) => {
      state.isOpen = false;
      state.modalData = null;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export const postModalReducer = postModalSlice.reducer;

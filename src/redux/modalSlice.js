import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    actionName: "",
    actionSubmit: false,
    id: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.actionName = action.payload.actionName;
      state.id = action.payload.id;
    },
    updateForm: (state) => {
      state.actionName = "update";
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.actionName = "";
      state.actionSubmit = false;
      state.id = "";
    },
  },
});

export const { openModal,  updateForm, closeModal } = modalSlice.actions;
export const selectId = (state) => state.modal.id;
export const selectIsOpen = (state) => state.modal.isOpen;
export const selectActionName = (state) => state.modal.actionName;
export const selectActionSubmit = (state) => state.modal.actionSubmit;

export default modalSlice.reducer;

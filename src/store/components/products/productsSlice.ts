import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IfProducts {
  dataProducts: any[];
  userChatNotices: any[];
}

const initialState: IfProducts = {
  dataProducts: [],
  userChatNotices: [],
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setStoProducts: (state: IfProducts, action: PayloadAction<any>) => {
      state.dataProducts = action.payload;
    },
    setStoChatNotices: (state: IfProducts, action: PayloadAction<any>) => {
      state.userChatNotices = action.payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const { setStoProducts, setStoChatNotices } = actions;
export default reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IfThudungGios {}

const initialState: IfThudungGios = {};

const thudungGiosSlice = createSlice({
  name: "thudungGiosSlice",
  initialState,
  reducers: {},
});

const { reducer, actions } = thudungGiosSlice;
export const {} = actions;
export default reducer;

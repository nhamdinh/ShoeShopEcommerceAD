import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IfThudungGios {
  arrBuy: any;
  arrSell: any;
}

const initialState: IfThudungGios = {
  arrBuy: [],
  arrSell: [],
};

const thudungGiosSlice = createSlice({
  name: "thudungGiosSlice",
  initialState,
  reducers: {
    st_setArrBuy: (state: IfThudungGios, action: PayloadAction<any>) => {
      state.arrBuy = action.payload.arrBuy ?? initialState.arrBuy;
    },
    st_setArrSell: (state: IfThudungGios, action: PayloadAction<any>) => {
      state.arrSell = action.payload.arrSell ?? initialState.arrSell;
    },
  },
});

const { reducer, actions } = thudungGiosSlice;
export const { st_setArrBuy, st_setArrSell } = actions;
export default reducer;

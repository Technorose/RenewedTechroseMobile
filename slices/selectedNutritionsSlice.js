import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
}

export const selectedNutritionsSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state = initialState, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state = initialState, action) => {
      let newBasket = [...state.items];
      let itemIndex = state.items.findIndex(item=> item.id==action.payload.id);
      if(itemIndex>=0){
        newBasket.splice(itemIndex, 1);
      }else{
        console.log("can't remove item as its not in the basket");
      }
      state.items = newBasket
    },
    emptyBasket: (state = initialState, action)=>{
        state.items = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, emptyBasket } = selectedNutritionsSlice.actions

export const selectBasketItems = state=> state.selectedNutritions.items;

export const selectBasketItemsById = (state, id)=> state.selectedNutritions.items.filter(item=> item.id==id);

export const selectBasketTotal = state=> state.selectedNutritions.items.reduce((total, item)=> total = total += item.price, 0)

export default selectedNutritionsSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataTypes } from '../common/types';


const initialState: DataTypes.CategorySelection = {
  categoryName: 'generator',
  };

const CategorySlice = createSlice({
  name: 'categorySetter',
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<Partial<DataTypes.CategorySelection>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        ...action.payload,
      };
    },
  }
})

export const { updateCategory} = CategorySlice.actions
export default CategorySlice.reducer;
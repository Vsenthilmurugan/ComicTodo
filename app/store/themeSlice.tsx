import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataTypes } from '../common/types';


const initialState: DataTypes.ThemeProps = {
    theme_name: 'mickey',
    button_bg: '#D4de96',
    theme_header: '#D4DE96',
    theme_body: '#F5F5DC',
    theme_add: 'pluto',
    theme_generator_text: 'Ask Mickey',
    theme_generator: 'mickey',
    theme_inprogress: 'goofy',
    theme_completed: 'donald',
    theme_available: 'minnie',
  };

const themeSlice = createSlice({
  name: 'themeSetter',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<Partial<DataTypes.ThemeProps>>) => {
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

export const { updateTheme} = themeSlice.actions
export default themeSlice.reducer;
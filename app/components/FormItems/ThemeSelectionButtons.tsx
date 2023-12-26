import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateTheme } from "@/app/common/utilities";
import { Button } from "@mui/material";
import { DataTypes } from "@/app/common/types";

const ThemeSelectionButtons = () => {
  const themeStateData: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const dispatch = useDispatch();
  const [theme, setSelectedTheme] = useState<string>(themeStateData.theme_name);
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e: any) => {
          setSelectedTheme(e.target.value);
          handleUpdateTheme(e.target.value, dispatch);
        }}
      >
        <FormControlLabel
          checked={theme=="mickey"?true:false}
          value="mickey"
          control={<Radio />}
          label="Disney "
        />
        <FormControlLabel
          style={{ fontFamily: "'Comic Neue', 'cursive'" }}
          checked={theme=="avengers"?true:false}
          value="avengers"
          control={<Radio />}
          label="Avengers"
          className="font-comic"
        />
        <FormControlLabel checked={theme=="frozen"?true:false} value="frozen" control={<Radio />} label="Frozen" />
      </RadioGroup>
      <button
        style={{ background: themeStateData.button_bg }}
        className="font-comic h-[30px] rounded-xl text-white"
      >
        Save
      </button>
    </FormControl>
  );
};

export default ThemeSelectionButtons;

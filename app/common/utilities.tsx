import { useDispatch } from "react-redux";
import { updateTheme } from "../store/themeSlice";
import { updateCategory } from "../store/CategorySlice";


export const handleUpdateTheme = (themeName:string,dispatch:any) => {

    if(themeName=='avengers'){
        dispatch(updateTheme({ theme_name: "avengers",button_bg:"#F56969", theme_header: "#F56969",theme_add:'thor',theme_available:'guardian',theme_body:'#FBC3C3',theme_completed:'spidy',theme_generator:'strange',theme_generator_text:"Ask Strange",theme_inprogress:'wanda' }));
    }else if(themeName=='mickey'){
        dispatch(updateTheme({ theme_name: "mickey",button_bg:"#D4de96", theme_header: "#D4de96",theme_add:'pluto',theme_available:'minnie',theme_body:'#F5F5DC',theme_completed:'donald',theme_generator:'mickey',theme_generator_text:"Ask Mickey",theme_inprogress:'goofy' }));
    }else if(themeName=='frozen'){
        dispatch(updateTheme({ theme_name: "frozen",button_bg:"#679EF3", theme_header: "#679EF3",theme_add:'elsa',theme_available:'lizard',theme_body:'#A1DBF8',theme_completed:'frozen',theme_generator:'olaf',theme_generator_text:"Ask Olaf",theme_inprogress:'frozen_ok' }));
    }else{
        dispatch(updateTheme({ theme_name: "mickey",button_bg:"#D4de96", theme_header: "#D4de96",theme_add:'pluto',theme_available:'minnie',theme_body:'#F5F5DC',theme_completed:'donald',theme_generator:'mickey',theme_generator_text:"Ask Mickey",theme_inprogress:'goofy' }));
    }
  };

  export const handleCategory = (categoryValue:string,dispatch:any) =>{
    dispatch(updateCategory({categoryName:categoryValue}));
  }
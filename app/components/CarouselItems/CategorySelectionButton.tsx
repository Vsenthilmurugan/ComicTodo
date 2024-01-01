'use client'
import { DataTypes } from '@/app/common/types';
import { handleCategory, handleUpdateTheme } from '@/app/common/utilities';
import { updateTheme } from '@/app/reducers/themeSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const CategorySelectionButton = (data:DataTypes.CardContentText) => {
  
  const dispatch = useDispatch();
  return (
    <button style={{background:data.buttonBgColor}} onClick={()=>{
      handleCategory(data.categoryName,dispatch);
      }} className="text-white flex justify-center font-comic py-2 px-4 rounded-lg">
        {data.buttonText?data.buttonText:"Select"}
      </button>
  )
}

export default CategorySelectionButton
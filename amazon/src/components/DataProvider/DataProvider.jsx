import React,{creatContext} from 'react'
import { useReducer } from 'react';

export const DataContext =creatContext();
const DataProvider=({children,reducer,initialState})=>{
return (
 <DataContext.Provider value ={useReducer(reducer,initialState)}>
{children}
 </DataContext.Provider>
)
}

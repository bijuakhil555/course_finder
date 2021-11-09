import { createContext, React, useState } from "react";


const SearchContext = createContext()

export const SearchContextProvider = (props)=>{
    const [searchname,setSearchname]=useState('')
    const [searchchild,setSearchchild]=useState('')
    const [searchDate,setSearchDate] = useState('')
    const [pageNumber,setPageNumber] = useState(0)
    const [self,setSelf] = useState(true)
    
return(
    <SearchContext.Provider
        value={{
            searchname,
            setSearchname,
            searchchild,
            setSearchchild,
            searchDate,
            setSearchDate,
            pageNumber,
            setPageNumber,
            self,
            setSelf
        }}
    >
        {props.children}
    </SearchContext.Provider>
)}



export default SearchContext;
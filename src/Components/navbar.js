import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import SearchContext from '../Context/searchContext'
import './component.css'
import RestoreIcon from '@mui/icons-material/Restore';

function Navbar() {
    const [submitted,setSubmitted] = useState('')
    const [search,setSearch] = useState('')
    const [searchchild,setSearchChild]= useState('')
    const [datePicker,setDatePicker] = useState('')
    const [checked, setChecked] = useState(false);
    const ctx =  useContext(SearchContext)

    const searchWords =(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const searchChildHandler =(event)=>{
        event.preventDefault()
        setSearchChild(event.target.value)
    }

    const searchHandler =(e)=>{
        e.preventDefault()
        ctx.setSearchname(search)
        ctx.setSearchchild(searchchild)
        ctx.setSearchDate(datePicker)
        ctx.setPageNumber(0)
    }

    const resetHandlar = ()=>{
        ctx.setSearchname('')
        ctx.setSearchchild('')
        ctx.setSearchDate('')
        setSearch('')
        setSearchChild('')
        setDatePicker('')
       
      
    }

    const handleDate = (e)=>{
        e.preventDefault()
        setDatePicker(e.target.value)
    }
    const checkHandle = (e)=>{
        
        setChecked(e.target.checked)
        ctx.setSelf(checked)
    }
   
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container-fluid">
                        
                        <a className="navbar-brand newDisplay" href="#">Course Finder</a>
                         
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            </li>
                            
                        </ul>
                        <form className="myFlex" onSubmit={searchHandler}>
                            <input className="form-control me-2 marg" type="search" placeholder="Course" value={search} onChange={searchWords} aria-label="Search"/>
                            <input className="form-control me-2 marg" type="search" placeholder="Child subject" value={searchchild} onChange={searchChildHandler} aria-label="Search"/>
                            <input className="form-control me-2 marg " type="date" placeholder="Date" value={datePicker} onChange={handleDate} aria-label="Search"/>
                            <div class="form-check ml-3 mr-3 marg">
                                <input 
                                    class="form-check-input " 
                                    type="checkbox"  
                                    checked={checked}
                                    onChange={checkHandle} 
                                    id="flexCheckDefault"
                                />
                                <label class="form-check-label widt" for="flexCheckDefault">
                                    Self paced
                                </label>
                            </div>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                           
                            <button className="btn btn-outline-success mx-3" type="reset" onClick={resetHandlar} >Reset</button>
                        </form>

                        </div>
                       
                    </div>
                    
            </nav>
            
        </div>
    )
}

export default Navbar


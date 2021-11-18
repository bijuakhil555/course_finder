import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../Context/searchContext';
import Card   from "./card";
import ReactPaginate from 'react-paginate';
import Barchart from './barchart';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Button, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

function Cardpage() {

    const reduxState = useSelector(state => state.subjects)
    console.log(reduxState)


    const ctx = useContext(SearchContext)
    const includeCourse = ['Course Name']
    const includeChild = ['Child Subject']
    const [courses,setNewcourse] = useState([])
    const [loading,setLoading] = useState(false)
    const [parent,setParent] = useState([])
    const [university,setUniversity] = useState([])


    
    const cardPerPage = 9
    const pagesVisited = ctx.pageNumber * cardPerPage
    

    useEffect(() => {
        if(reduxState) {
            
            setNewcourse(reduxState.slice(0,500));}

            const dataList = reduxState.slice(0,500)

// ADDING COMPLETE PARENT SUBJECT TO A STATE
           setUniversity(dataList.map(res=>{return res['Universities/Institutions']}))

           
         
      
       
    }, [reduxState])

 

 


    const [showParent,setShowParent] = useState(false)
    const [showUniversity,setShowUniversity] = useState(false)

    const isParent=()=>{
        setShowParent(true)
        setShowUniversity(false)
      
        
    }
    const isUniversity=()=>{
        setShowParent(false)
        setShowUniversity(true)
    }


    const searchData = ctx.searchname
    const childsearch = ctx.searchchild
    const dateFromPicker = ctx.searchDate
    const dateToSearch = new Date(dateFromPicker);
    dateToSearch.setHours(0,0,0,0);
    

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    const newDateToSearch = convert(dateToSearch)
    

    let dataSearch  = courses.filter(item =>{
        return Object.keys(item).some(key =>{
           return includeCourse.includes(key) ? item[key].toString().toLowerCase().includes(searchData.toString().toLowerCase()) : false }
            )
    })
   .filter(items =>{
        return Object.keys(items).some(key =>{
            return includeChild.includes(key) ? items[key].toString().toLowerCase().includes(childsearch.toString().toLowerCase()) : false  }
            )
    }).filter(function (el) {    
        var filteDateString = el['Next Session Date']
        var replacedDate = filteDateString.replace('nd','').replace('rd','').replace('th','')
        var filterDate = new Date(replacedDate)
        const stringDate = convert(filterDate)
        if(dateToSearch != 'Invalid Date'){
            if( filterDate != 'Invalid Date' ){
                if(stringDate === newDateToSearch){
                    return el
                } 
            }
        }
        else{
            return el
        }
        
        
        
      })
      .filter(function (el) {    
        var self = el['Next Session Date']
        
        if(!ctx.self){
                if(self == 'Self paced'){
                
                    return el
                } 
            }
        else{
            return el
        }
        
        
        
      })
    
    const numRows = dataSearch.length
    const pageParent = []
    const pageUniversity = []
    const displayCard = dataSearch.slice(pagesVisited, pagesVisited + cardPerPage).map((responce)=>{
                pageParent.push(responce['Parent Subject'])
                pageUniversity.push(responce['Universities/Institutions'])

                return <div className='col-lg-4 col-md-6   '  >
                        <Card
                        id={responce['Course Id']}
                        name={responce['Course Name']}
                        provider={responce.Provider}
                        university={responce['Universities/Institutions']}
                        major={responce['Parent Subject']}
                        subject={responce['Child Subject']}
                        date={responce['Next Session Date']}
                        video={responce['Url']}
                        
                        />
                        </div>
                })
    
    

// PARENT SUBJECT GRAPH LOGIC   

    const uniqueParent = ([...new Set(pageParent)])
    var parentLength = uniqueParent.length;
    const aCount = new Map([...new Set(pageParent)].map(
        x => [x, pageParent.filter(y => y === x).length]
    ));
    const parentCount=[]
    for (var i=0;i<parentLength;i++){
        parentCount.push(aCount.get(uniqueParent[i]))
    }
  
// UNIVERSITY GRAPH LOGIC  
    const uniqueUniversity = ([...new Set(pageUniversity)])
    var universityLength = uniqueUniversity.length;
    const bCount = new Map([...new Set(pageUniversity)].map(
        x => [x, pageUniversity.filter(y => y === x).length]
    ));
    const universityCount=[]
    for (var i=0;i<universityLength;i++){
        universityCount.push(bCount.get(uniqueUniversity[i]))
    }



    
    const noCourse = ()=>{
        if(dataSearch == ''){
            return <h3 className="container" >No course found !!</h3>
        }
    }

    const loadingSnippet = ()=>{
        return( <div class="spinner-border loading" role="status">
        <span class="sr-only"></span>
      </div>)
    }

    const pageHandler = ({selected})=>{
       ctx.setPageNumber(selected)
       window.scrollTo(0, 0)
    }

    const pageCounted = Math.ceil(numRows / cardPerPage)


    return (
        <div>
            <h5 className="headcard" >Total course : {numRows}</h5>

            {loading ? loadingSnippet() :noCourse()  }
            <div className='row ' >
                {displayCard}
                
            </div>
            <div className='mypage' >
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
       
                pageRangeDisplayed={1}
                pageCount={pageCounted}
                onPageChange={pageHandler}
                containerClassName={'pagination justify-content-center mt-4 mb-4'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                previousLabel="< previous"
            />
            </div>
            <div className="newpoper">
            <PopupState  variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment className="newpoper">
                <Button variant="contained" {...bindTrigger(popupState)}>
                    Graph
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={isParent}>Parent Subject</MenuItem>
                    <MenuItem onClick={isUniversity}>University</MenuItem>
                    
                </Menu>
                </React.Fragment>
            )}
            </PopupState>
            </div>
            { showParent && <div className='barchart'>
                <Barchart
                name={'Parent sub count'}
                counted={parentCount}
                parentList={uniqueParent}
                />
            </div>}
           { showUniversity && <div className='barchart'>
                <Barchart
                name={'University count'}
                counted={universityCount}
                parentList={uniqueUniversity}
                />
            </div>}
            
        </div>
    )
}

export default Cardpage

import React from 'react'
import './component.css'
import DateRangeIcon from '@mui/icons-material/DateRange';

function Card(props) {
    
    const redirectHandler =()=>{
        console.log(`${props.video}`)
        window.open(`${props.video}`);
    }
    return (
        <div >
            <div class="card  " onClick={redirectHandler}>
                <div class="card-body  "> 
               
                    <p class="card-text alignleft">{props.id}</p>
                    <p class="card-text alignright">{props.date ? props.date : 'NA' }</p>
                    <DateRangeIcon className={'alignright'}/>
                    <br/>
                    <p class="card-text details">Provider</p>
                    <h3 class="card-title">{props.provider ? props.provider : 'Unknown'}</h3>
                    <p class="card-text details">Course name</p>
                    <h4 class="card-text">{props.name}</h4>
                    <p class="card-text details">University</p>
                    <h5 class="card-title">{props.university ? props.university : 'Unknown'}</h5>
                    <div className='card-bottom' >
                        <div className='bottom'>
                            <p class="card-text  details ">Parent subject</p>
                            <p class="card-text  ">{props.major ? props.major :'Unknown'}</p>
                        </div>
                        <div className='bottom2'>
                            <p class="card-text  details ">Child subject</p>
                            <p class="card-text  ">{props.subject ? props.subject : 'Unknown' }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card

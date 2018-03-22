import React from 'react';
import NormalLoginForm from '../components/NormalLoginForm'
import image from '../assets/bgImage.png'

const index = (props) =>{
  return(
        <div id="container" style={{backgroundImage: `url(${image})`,width:'100%',height:'100%',backgroundSize:'100% 100%'}}>
           <div className='bg' > </div>
           <div className='login' style={{position:'relative',paddingLeft:'10rem',left:'50rem'}}>
           <NormalLoginForm/></div>
        </div>
)

}


export default index;

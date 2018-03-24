import React from 'react';
import NormalLoginForm from '../components/NormalLoginForm'
import image from '../assets/bgImage.png'

const index = (props) =>{
  return(
        <div id="container" style={{position:'absolute',backgroundImage: `url(${image})`,width:'100%',height:'100%',backgroundSize:'100% 100%'}}>
           <div className='login' style={{position:'relative',top:'10rem',marginLeft:'65%'}}>
           <NormalLoginForm/></div>
        </div>
)

}


export default index;

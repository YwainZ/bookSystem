import React from 'react';
import image from '../assets/bgImage.png';
import ForgetForm from '../components/forgetForm';

class Forget extends React.Component{

 render(){
   return(    <div id="container" style={{position:'absolute',backgroundImage: `url(${image})`,width:'100%',height:'100%',backgroundSize:'100% 100%'}}>
   <div className='login' style={{position:'relative',top:'10rem',marginLeft:'65%'}}>
   <ForgetForm/>
  </div>
</div>)
 }
}
export default Forget;

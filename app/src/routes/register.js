import React from 'react';
import image from '../assets/bgImage.png';
import RegisterForm from '../components/registerForm';
 class Register extends React.Component{
  render(){
    return (
      <div style={{backgroundImage: `url(${image})`,width:'100%',height:'100%',backgroundSize:'100% 100%'}}>
      <div style={{position:'relative',padding:'10rem',left:'50rem'}}>
      <RegisterForm/>
      </div>
      </div>
    )
  }
 }
 export default Register;

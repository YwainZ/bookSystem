import React from 'react';
import Menu from '../components/Menu';
import UserInfo from '../components/userInfo';
 class Info  extends React.Component{
   render(){
     return (
       <div style={{display:'flex',justifyContent:'flex-start'}}>
       <div style={{ minHeight: "70rem" }}>
       <Menu/>
       </div>
       <div style={{margin:20,width:'90%',height:'50rem'}}>
       <UserInfo />
       </div>
       </div>

     )
   }
 }
 export default Info;

import React from 'react';
import API_CONFIG from '../config/config';
import fetch from 'isomorphic-fetch';

 class UserInfo extends React.Component{
   componentDidMount(){
     this.getUserInfo();
   }
   getUserInfo(){
     fetch(API_CONFIG.baseUrl+'/user/info',{
       method:'GET',
       mode:'cors',
       credentials:'include',
       headers:{
         "Content-type":"application/json"
       }
     }).then(res =>{
       return res.json()
     }).then(res =>{
       console.log(res.data)
     })
   }
    render(){
      return(
        <div>
        <p></p>
        </div>
      )
    }
 }
 export default UserInfo;

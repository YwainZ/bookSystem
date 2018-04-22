import React from 'react';
import TableInfo from '../components/tableInfo';
import Menu from '../components/Menu'
class Uploaded extends React.Component{
   render(){
     return(
       <div style={{display:'flex',justifyContent:'flex-start'}}>
       <div style={{ minHeight: "70rem" }}>
       <Menu/>
       </div>
       <div style={{height:'50rem',margin:30,width:'90%'}}>
       <TableInfo />
       </div>
       </div>
     )
   }
}
export default Uploaded

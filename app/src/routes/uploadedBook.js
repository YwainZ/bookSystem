import React from 'react';
import TableInfo from '../components/tableInfo';
import Menu from '../components/Menu'
class Uploaded extends React.Component{
   render(){
     return(
       <div style={{display:'flex',justifyContent:'flex-start'}}>
       <div >
       <Menu/>
       </div>
       <div style={{height:'700px',margin:30,width:'700px'}}>
       <TableInfo />
       </div>
       </div>
     )
   }
}
export default Uploaded

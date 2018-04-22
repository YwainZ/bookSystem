import React from 'react';
import Menu from '../components/Menu';
import Upload from '../components/uploadButton';
class UploadBook extends React.Component{

  render(){
    return(
      <div style={{ display: "flex", justifyContent: "flex-start"  }}>
      <div style={{ minHeight: "70rem" }}>
       <Menu/>
      </div>
      <div style={{height:'40rem',padding:'10%'}}>
      <Upload/>
      </div>
      </div>
    )
  }
}
export default UploadBook;

import React from 'react';
import Menu from '../components/Menu';
import Upload from '../components/uploadButton';
class UploadBook extends React.Component{

  render(){
    return(
      <div style={{ display: "flex", justifyContent: "flex-start"  }}>
      <div>
       <Menu/>
      </div>
      <div style={{height:'50rem',padding:'100px'}}>
      <Upload/>
      </div>
      </div>
    )
  }
}
export default UploadBook;

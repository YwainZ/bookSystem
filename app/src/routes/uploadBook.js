import React from 'react';
import Menu from '../components/Menu';
import Upload from '../components/uploadButton';
import {Button} from 'antd';
import { hashHistory } from 'react-router';
class UploadBook extends React.Component{
  onClick(){
    hashHistory.push('/uploaded')
  }
  render(){
    return(
      <div style={{ display: "flex", justifyContent: "flex-start"  }}>
      <div>
       <Menu/>
      </div>
      <div style={{height:'700px',padding:'100px'}}>
      <Upload/>
      <Button onClick={this.onClick} style={{float:'right', margin:10}}>点击查看已上传的图书</Button>;
      </div>
      </div>
    )
  }
}
export default UploadBook;

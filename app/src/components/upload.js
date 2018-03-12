import React from 'react';
import { Upload, Icon, message } from 'antd';
import API_CONFIG from '../config/config';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: API_CONFIG.baseUrl+'/book/books',
  onChange(info) {
    console.log(info.fileList[0]);
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class UploadButton extends React.Component{
render(){
  return (
  <Dragger {...props} style={{width:'600px'}}>
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">点击此处或拖拽至此区域进行上传</p>
    <p className="ant-upload-hint">电子书目前仅支持pdf格式</p>
  </Dragger>)
 }
}
export default UploadButton;

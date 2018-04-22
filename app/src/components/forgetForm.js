import React from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import API from '../config/config';
import { hashHistory } from 'react-router';
const FormItem = Form.Item;

class ForgetForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        fetch(API.baseUrl+'/user/update',{
          method:'PUT',
          credentials:'include',
          mode:'cors',
          body:JSON.stringify(values),
          headers:{
            'Content-type':'application/json'
          }
        }).then(res =>{
          return res.json()
        }).then(res =>{
          if(values.mail!==undefined&&res.code===-5){
           message.error(res.msg);
          }
          if(res.code === 0){
            message.success("修改成功");
            hashHistory.push("/");
          }
        })
      }
    );
  }
  back(){
    hashHistory.push('/');
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'300px'}}>
    <FormItem>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入您的学号!' }],
      })(
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator('mail', {
        rules: [{ required: true, message: '请输入您的邮箱!' }],
      })(
        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="邮箱" />
      )}
    </FormItem>
    <FormItem>
    {getFieldDecorator('password', {
      rules: [{ required: true, message: '输入您的新密码' }],
    })(
      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
    )}
  </FormItem>
  <FormItem>
  <Button  style={{width:'40%'}} type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
  <Button  style={{width:'40%',float:'right'}} type="normal" onClick={this.back.bind(this)}>返回</Button>
  </FormItem>
  </Form>)
  }

}
const WrappedNormalLoginForm = Form.create()(ForgetForm);
export default WrappedNormalLoginForm;

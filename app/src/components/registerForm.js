import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { message} from 'antd';
import fetch from 'isomorphic-fetch';
import API_CONFIG from '../config/config';
import {hashHistory} from 'react-router'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      var reg =/^[0-9]*$/g;
      var reg1 = /^\w+$ /g;
      var reg2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g
      var flag = false;

      if(reg.test(values.username).valueOf() === false){
          message.error("学号必须全部由数字组成")
      }else if(reg1.test(values.nickname).valueOf === false){
          message.error("昵称必须由字母数字下划线组成")
      }
      else if(reg2.test(values.mail).valueOf() === false){
        message.error("邮箱格式不正确")
      }else{
        flag  = true;
      }

     if(flag === true){
     fetch(API_CONFIG.baseUrl+'/user/register',{
      mode:'cors',
      credentials:'include',
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-Type': 'application/json',
      }
     }).then(res =>{
       return res.json()
     }).then(data =>{
        if(data.code === 0){
            message.success(data.data);
            hashHistory.push('/');
        }

     }).catch(e =>{
       message.error("注册失败");
     })}
    });
  }
  back(){
    hashHistory.push("/");
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: '300px'}}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的学号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
          )}
        </FormItem>
        <FormItem>
        {getFieldDecorator('nickname', {
          rules: [{ required: true, message: '请输入您的昵称!' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="昵称" />
        )}
      </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
        {getFieldDecorator('mail', {
          rules: [{ required: true, message: '请输入您的邮箱!' }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="mail" placeholder="邮箱" />
        )}
      </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{width:'40%'}} className="login-form-button">
            注册
          </Button>
          <Button type="normal" style={{width:'40%',float:"right"}} onClick={this.back.bind(this)}>
            返回
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

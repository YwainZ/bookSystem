import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import fetch from 'isomorphic-fetch';
import API_CONFIG from '../config/config';
import { hashHistory } from 'react-router';


const FormItem = Form.Item;

moment.locale('zh-cn');

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      fetch(API_CONFIG.baseUrl+'/user/login',{
        mode:'cors',
        credentials:'include',
        method:'POST',
        body:JSON.stringify(values),
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res =>{
        if(res.status===200){
         hashHistory.push('/book')
        }
      }).catch(e =>{
        console.log()
      })


    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'300px'}} locale={zhCN}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
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

          <Checkbox >记住密码</Checkbox>

          <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
            登陆
          </Button>
           <a href="">立即注册</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm

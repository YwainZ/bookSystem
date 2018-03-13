import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import fetch from 'isomorphic-fetch';
import API_CONFIG from '../config/config';
import { message} from 'antd';
import { hashHistory } from 'react-router';



const FormItem = Form.Item;

moment.locale('zh-cn');

class NormalLoginForm extends React.Component {
constructor(props){
  super(props);
  this.state={
    rem:false
  }

}
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('hahahh'+this.state.rem)
    this.props.form.validateFields((err, values) => {
      fetch(API_CONFIG.baseUrl+'/user/login',{
        mode:'cors',
        credentials:'include',
        method:'POST',
        save:this.state.rem,
        body:JSON.stringify(values),
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res =>{
        return res.json()
      }).then(res =>{
        console.log(res)
        if(res.code===0){
          message.success("登录成功")
         hashHistory.push('/book')
        }else{
          message.error(res.msg)
        }
      }).catch(e =>{
        message.error('登录失败')
        console.log(e)
      })


    });
  }
  handleClick(){
    hashHistory.push('/register')
  }
  onAddClick = (e) =>{
    console.log(e.target.checked)
    if(e.target.checked===true){
         this.setState({rem:true})
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'300px'}} locale={zhCN}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的学号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
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

          <Checkbox onChange={this.onAddClick} >记住密码</Checkbox>

          <a className="login-form-forgot" href="" style={{float: 'right'}} >忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
            登陆
          </Button>
         <a onClick={this.handleClick}>立即注册</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm

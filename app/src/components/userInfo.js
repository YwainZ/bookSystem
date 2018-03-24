import React from "react";
import API_CONFIG from "../config/config";
import fetch from "isomorphic-fetch";
import { Table,Button} from "antd";
import{hashHistory} from 'react-router'


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo() {
    fetch(API_CONFIG.baseUrl + "/user/info", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ user: [res.data] });
        Object.assign(this.state.user[0], { key: "20" });
      })
      .catch(e => {
        console.log(e);
      });
  }
  columns = [
    { title: "学号", dataIndex: "username", key: "username" },
    { title: "昵称", dataIndex: "nickname", key: "nickname" },
    { title: "邮箱", dataIndex: "mail", key: "mail" }
  ];
  changepwd(){
    hashHistory.push("/forget")
  }
  render() {
    return (
      <div>
        <Table pagination={false} columns={this.columns} dataSource={this.state.user} />
         <Button type="primary" onClick={this.changepwd} style={{float:"right",margin:10}}>修改密码</Button>
      </div>
    );
  }
}
export default UserInfo;

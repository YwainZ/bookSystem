import { Table } from "antd";
import React from "react";
import API_CONFIG from "../config/config";
import fetch from "isomorphic-fetch";
import { message } from "antd";

class TableInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: []
    };
  }
  componentDidMount() {
    this.getBookInfo();
  }
  getBookInfo() {
    fetch(API_CONFIG.baseUrl + "/book/user/books", {
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
        var arr = res.data;
        if (res.data.length === 0 || res.data === null) {
          this.setState({resource:[]})
        } else {
          for (let i = 0; i < arr.length; i++) {
            Object.assign(res.data[i], { key: i + 1 });
          }
          this.setState({ resource: arr });
        }
      });
  }
  onClick(e) {
    this.state.resource.splice(e.key - 1, 1);
    this.setState({ resource: this.state.resource });
    fetch(API_CONFIG.baseUrl + "/book/books/" + e.id, {
      method: "DELETE",
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
        console.log(res);
        message.success(res.data);
      });
    console.log(e.key);
  }
  columns = [
    { title: "书名", dataIndex: "bookName", key: "bookName" },
    { title: "上传时间", dataIndex: "createTime", key: "createTime" },
    { title: "下载量", dataIndex: "downloadCount", key: "downloadCount" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: item => (
        <a
          onClick={() => {
            this.onClick(item);
          }}
        >
          删除
        </a>
      )
    }
  ];

  render() {
    return <Table columns={this.columns} dataSource={this.state.resource} />;
  }
}
export default TableInfo;

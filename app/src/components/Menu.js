import { Menu, Icon } from "antd";
import React from "react";
import { hashHistory } from "react-router";
import { Pagination } from "antd";
import { Card } from "antd";
import fetch from 'isomorphic-fetch';
import API_CONFIG from '../config/config';
const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class MenuDetail extends React.Component {
  componentDidMount(){
    this.getBookInfo();
  }
  getBookInfo(){
   fetch(API_CONFIG.baseUrl+'/book/books?pageIndex=1&pageSize=10',{
     method:'GET',
     mode:'cors',
     credentials:'include',
     headers:{
      'Content-Type': 'application/json',
    }
   }).then(res =>{
     console.log(res)
   })
  }
  handleClick(e) {
    if (e === "sub2") {
      hashHistory.push("/upload");
    } else if (e === "sub3") {
      hashHistory.push("/info");
    } else if (e === "sub4") {
      hashHistory.push("/about");
    }
  }
  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        <Menu
          theme="dark"
          style={{ width: 256, height: "100%", float: "left" }}
          mode="vertical"
        >
          <SubMenu
            key="sub1"
            style={{ marginTop: "50px" }}
            title={
              <span>
                <Icon type="appstore" />
                <span>图书列表</span>
              </span>
            }
            onTitleClick={this.handleClick.bind(this, "sub1")}
          />
          <SubMenu
            key="sub2"
            style={{ marginTop: "50px" }}
            title={
              <span>
                <Icon type="book" />
                <span>上传图书</span>
              </span>
            }
            onTitleClick={this.handleClick.bind(this, "sub2")}
          />
          <SubMenu
            key="sub3"
            style={{ marginTop: "50px" }}
            title={
              <span>
                <Icon type="user" />
                <span>个人信息</span>
              </span>
            }
            onTitleClick={this.handleClick.bind(this, "sub3")}
          />
          <SubMenu
            key="sub4"
            style={{ marginTop: "50px" }}
            title={
              <span>
                <Icon type="link" />
                <span>关于我们</span>
              </span>
            }
            onTitleClick={this.handleClick.bind(this, "sub4")}
          />
          <SubMenu
            key="sub5"
            style={{ marginTop: "50px" }}
            title={
              <span>
                <Icon type="logout" />
                <span>退出登录</span>
              </span>
            }
            onTitleClick={this.handleClick.bind(this, "sub5")}
          />
        </Menu>
        <div style={{ float: "left", marginLeft: "20px", height: "100%" }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <div style={{ position: "fixed", bottom: 0 }}>
            <Pagination
              showQuickJumper
              defaultCurrent={2}
              total={500}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MenuDetail;

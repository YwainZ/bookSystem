import { Menu, Icon } from "antd";
import React from "react";
import { hashHistory } from "react-router";

const SubMenu = Menu.SubMenu;

class MenuDetail extends React.Component {
  handleClick(e) {
    if(e === "sub1"){
       hashHistory.push("/book");
    }
    else if (e === "sub2") {
      hashHistory.push("/upload");
    } else if (e === "sub3") {
      hashHistory.push("/info");
    } else if (e === "sub4") {
      hashHistory.push("/about");
    }
  }
  render() {
    return (
        <Menu
          theme="dark"
          style={{ width: 256, height: "100%"}}
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
    );
  }
}
export default MenuDetail;

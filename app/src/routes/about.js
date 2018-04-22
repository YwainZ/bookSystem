import React from "react";
import Menu from "../components/Menu";
import fetch from "isomorphic-fetch";
import API_CONFIG from "../config/config";
import { Card } from "antd";
import { Rate, Button, Divider, Input, message } from "antd";
import { List} from "antd";
class About extends React.Component {
  listData = [];
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "",
      title: "",
      createTime: "",
      author: "",
      upload: "",
      url: "",
      stars: "",
      id: 0,
      type: "",
      score:'',
      user:0
    };
  }

  state = {
    value: 3
  };
  handleChange = value => {
    this.setState({ value });
    this.setState({ stars: value });
  };
  componentWillMount() {
    this.data = {
      name: this.props.location.search
    };
    this.getInfo();
  }
  getInfo() {
    var id = 0;
    for (let i = 0; i < this.data.name.length; i++) {
      if (this.data.name[i] === "=") {
        id = this.data.name.slice(i + 1);
        this.setState({ id: this.data.name.slice(i + 1) });
      }
    }
    fetch(API_CONFIG.baseUrl + "/book/books/" + id + "/info", {
      mode: "cors",
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.data.comments.length === 0) {
          this.listData.push({
            title: "暂无评论"
          });
        }
        for (let i = 0; i < res.data.comments.length; i++) {
          this.listData = [];
          this.listData.push({
            title: res.data.comments[i].nickname,
            content: res.data.comments[i].content,
            description: res.data.comments[i].type
          });
            this.setState({user:res.data.comments[i].score})

        }
        this.setState({score: res.data.book.score})
        this.setState({ imgSrc: res.data.book.coverUrl });
        this.setState({ title: res.data.book.bookName });
        this.setState({ author: res.data.book.nickname });
        this.setState({ createTime: res.data.book.createTime });
      });
    fetch(API_CONFIG.baseUrl + "/book/books/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ url: res.data});
      });
  }
  catchError(e) {
    if (e.type === "error") {
      this.setState({
        imgSrc:
          "http://upload-images.jianshu.io/upload_images/9381131-8732589b63da9040.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
      });
    }
  }
  addComment = () => {
    var comment = document.getElementsByTagName("TextArea")[0].value;
    var res = {
      content: comment,
      bookId: parseInt(this.state.id),
      score: this.state.stars
    };
    fetch(API_CONFIG.baseUrl + "/comment/comments", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify(res),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if(res.code===1){
          message.error("不能重复评论哦～");
        }else
        if (res.code === -1) {
          message.error(res.msg+"，不能评论哦～");
        } else if (comment.length === 0 || comment === "") {
          message.error("请输入评论信息");
        } else if (this.state.stars === 0 || this.state.stars === "") {
          message.error("请给图书打分");
        }else if(res.data!==""||res.data.length!==0){
          message.success(res.data);
          this.componentWillMount();
        }

      })
      .catch(e => {
        message.error(e.msg+"，不能评论哦～");
      });
  };
  render() {
    const { value } = this.state;
    const { TextArea } = Input;
    const pagination = {
      pageSize: 10,
      current: 1,
      total: this.listData.length,
      onChange: () => {}
    };

    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ minHeight: "70rem" }}>
          <Menu />
        </div>
        <div
          style={{
            border: "1px solid #ebedf0",
            width: "50rem",
            height: "100%",
            marginLeft: 100
          }}
        >
          <Card
            className={this.state.key}
            hoverable
            style={{ width: 200, float: "left", height: 280, marginLeft: 30 }}
            cover={
              <img
                id="bookImage"
                style={{ width: 200, height: 280 }}
                alt="example"
                src={this.state.imgSrc}
                onError={this.catchError.bind(this)}
              />
            }
          />
          <ul
            style={{
              fontSize: 18,
              margin: "50px auto 20px 230px",
              listStyle: "none"
            }}
          >
            <li style={{ margin: 15 }}>{this.state.title}</li>
            <li style={{ margin: 15 }}>上传者：{this.state.author}</li>
            <li style={{ margin: 15 }}>上传时间：{this.state.createTime}</li>
            <li style={{ margin: 15 }}>平均分：{this.state.score}.0分</li>
            <li style={{ margin: 15 }}>
              <span>
                评分：<Rate onChange={this.handleChange} value={value} />
                {value && <span className="ant-rate-text">{value} 星</span>}
              </span>
            </li>
            <li style={{ margin: 15 }}>
              <a href={this.state.url} download={this.state.title + ".pdf"}>
                <Button type="primary" icon="download" size="large" download>
                  下载
                </Button>
              </a>
            </li>
          </ul>
          <Divider />
          <h4 style={{ margin: 30 }}>评论</h4>
          <TextArea rows={6} style={{ width: "45rem", marginLeft: 30 }} />
          <Button
            type="normal"
            style={{ margin: "10px auto auto 662px" }}
            onClick={this.addComment}
          >
            添加评论
          </Button>
          <List
            style={{ marginLeft: 30 }}
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={this.listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[<div><Rate disabled defaultValue={this.state.user} /><span>{item.description}</span></div>]}

              >
                <List.Item.Meta title={item.title}/>
                {item.content}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
export default About;

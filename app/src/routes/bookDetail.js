import React from "react";
import Menu from "../components/Menu";
import API_CONFIG from "../config/config";
import { Pagination } from "antd";
import { Input } from "antd";
import { hashHistory } from "react-router";
import { List, Card } from "antd";

const Search = Input.Search;

const { Meta } = Card;

class bookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: [],
      num: "",
      key: 0,
      dataList: []
    };
  }

  onChange = (pageNumber, pageSize) => {
    this.getBookInfo(pageNumber);
  };
  componentDidMount() {
    this.getBookInfo(1);
  }
  getBookInfo(pageNumber) {
    console.log("page", pageNumber);
    fetch(
      API_CONFIG.baseUrl +
        "/book/books?pageIndex=" +
        pageNumber +
        "&pageSize=10",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "default",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState({ dataList: data.data.bookList });
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
  handleClick(e) {
    console.log(e);
  }

  onSearch = () => {
    var book = document.getElementById("serach").value;
    fetch(
      API_CONFIG.baseUrl +
        "/book/books?pageIndex=1&pageSize=10&key="+book,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        cache: "default",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ dataList: data.data.bookList });
        console.log('search',data)
      })

  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ minHeight: "70rem" }}>
          <Menu />
        </div>
        <div id="contain" style={{ width: "90%", minheight: "50rem" }}>
          <div style={{ margin: "10px" }}>
            <Search
              id="serach"
              style={{ width: "25%" }}
              placeholder="搜索图书"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div id="cardBox">
            <List
              grid={{ gutter: 10, column: 4 }}
              dataSource={this.state.dataList}
              renderItem={item => (
                <List.Item>
                  <Card
                    onClick = {()=>{ hashHistory.push({pathname:'/about',query:{name:item.id}})}}
                    id="card"
                    className={this.state.key}
                    hoverable
                    style={{
                      width: 200,
                      float: "left",
                      height: 320,
                      margin: 10
                    }}
                    cover={
                      <img
                        id={item.id}
                        style={{ width: 200, height: 260 }}
                        alt={item.bookName}
                        src={item.coverUrl}
                        onError={this.catchError.bind(this)}
                      />
                    }
                  >
                    <Meta title={item.bookName} style={{textAlign:'center'}} />
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <div
            style={{
              margin: "10rem auto auto 15rem"
            }}
          >
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={50}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default bookDetail;

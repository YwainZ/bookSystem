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
      dataList: [],
      pageNumber: 1
    };
  }

  onChange = (pageNumber, pageSize) => {
    this.setState({ pageNumber: pageNumber });
  };
  componentDidMount() {
    this.getBookInfo();
  }
  getBookInfo(value) {
    console.log("vbalue", value);
    let url =
      API_CONFIG.baseUrl +
      "/book/books?pageIndex=" +
      this.state.pageNumber +
      "&pageSize=8";
    if (value !== undefined) {
      console.log('2')
      url = API_CONFIG.baseUrl +  "/book/books?pageIndex=" +this.state.pageNumber + "&pageSize=8&key=" +value;
    }

    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState({ dataList: data.data.bookList });
        this.setState({ num: data.data.total });
        console.log('total', data.data.total)
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
              onSearch={value => this.getBookInfo(value)}
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
                    onClick={() => {
                      hashHistory.push({
                        pathname: "/about",
                        query: { name: item.id }
                      });
                    }}
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
                    <Meta
                      title={item.bookName}
                      style={{ textAlign: "center" }}
                    />
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
              total={this.state.num * 10}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default bookDetail;

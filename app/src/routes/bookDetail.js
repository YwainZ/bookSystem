import React from "react";
import Menu from "../components/Menu";
import API_CONFIG from "../config/config";
import { Pagination } from "antd";
import { Card } from "antd";
import { Input } from "antd";
const Search = Input.Search;

const { Meta } = Card;

class bookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "",
      imgTitle: "",
      pageNum: 1
    };

  }

  onChange(pageNumber,pageSize) {
    console.log("Page: ", pageNumber);
    this.setState({ pageNum: pageNumber }).bind(this);

  }
  componentDidMount() {

    this.getBookInfo();
  }
  getBookInfo() {
    fetch(API_CONFIG.baseUrl + "/book/books?pageIndex="+this.state.pageNum+"&pageSize=10", {
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
        var contain = document.getElementById("contain");
        var card = document.getElementById("card");
        let arr = data.data;
        console.log(arr);
        this.setState({ imgTitle: arr[0].bookName });
        this.setState({ imgSrc: arr[0].coverUrl });
        for (let i = 1; i < arr.length; i++) {
          var clone = card.cloneNode(true);
          this.setState({ imgTitle: arr[i].bookName });
          this.setState({ imgSrc: arr[i].coverUrl });
          contain.appendChild(clone);
        }
      })
      .catch(e => {
        console.log(e);
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
        <div style={{ width: 256 }}>
          <Menu />
        </div>
        <div
          id="contain"
          style={{ height: "1000px", border: "1px solid black" }}
        >
          <div style={{margin:'10px'}}>
            <Search style={{width:'25%'}}
              placeholder="搜索图书"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
          <div>
            <Card
              id="card"
              hoverable
              style={{ width: 200, float: "left", height: 330, margin: 10 }}
              cover={
                <img
                  id="bookImage"
                  style={{ width: 200, height: 280 }}
                  alt="example"
                  src={this.state.imgSrc}
                  onError={this.catchError.bind(this)}
                />
              }
            >
              <Meta title={this.state.imgTitle} />
            </Card>
          </div>
          <div
            style={{
              border: "1px solid red",
              position: "absolute",
              bottom: "-250px",
              left: "500px"
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

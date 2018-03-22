import React from "react";
import Menu from "../components/Menu";
import API_CONFIG from "../config/config";
import { Pagination } from "antd";
import { Card } from "antd";
import { Input } from "antd";
import { message } from "antd";
import { hashHistory} from 'react-router';
const Search = Input.Search;

const { Meta } = Card;

class bookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a:[],
      imgSrc: "",
      imgTitle: "",
      num: "",
      key: 0
    };
  }

  onChange = (pageNumber, pageSize) => {
    var contain = document.getElementById("cardBox");
    var card = document.getElementById("card");
    card.style.display = "block";
    contain.innerHTML = "";
    contain.appendChild(card);
    this.componentDidMount(pageNumber);
  };
  componentDidMount(temp) {
    if(typeof(temp)==="string"){
       this.getBookInfo(temp);
    }
   else{
     this.getBookInfo(1);
   }
  }

  getBookInfo(pageNumber) {
    if (pageNumber === undefined || pageNumber === 0 || pageNumber === null) {
      pageNumber = 1;
    }
    if(typeof (pageNumber)=== "number"){
      this.setState({ num: pageNumber });
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
        this.setState({ res: data });
        var contain = document.getElementById("cardBox");
        var card = document.getElementById("card");
        let arr = data.data;
        if (arr === undefined || arr.length === 0) {
          card.style.display = "none";
          message.error("暂无更多图书");
        }
        contain.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
          this.setState({ imgTitle: arr[i].bookName });
          this.setState({ imgSrc: arr[i].coverUrl });
          var clone = card.cloneNode(true);
          contain.appendChild(clone);

        }
        for(let i = 0; i<contain.childNodes.length; i++){
           contain.childNodes[i].addEventListener('click',function(){
             hashHistory.push({pathname:'/about',query:{name:arr[i].id}})
           })
        }
      })
      .catch(e => {
        console.log(e);
      });}
      else if(typeof(pageNumber)==="string"){
        fetch(
          API_CONFIG.baseUrl +
            "/book/books?pageIndex=1&pageSize=10&key="+pageNumber,
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
            var contain = document.getElementById("cardBox");
            var card = document.getElementById("card");
            var title = document.getElementsByClassName("ant-card-meta-title")[0];
            let arr = data.data;
            var img = card.getElementsByTagName("img")[0];
            contain.innerHTML = "";
            for(let i =0; i<arr.length; i++){
              img.src = arr[i].coverUrl;
              title.innerHTML = arr[i].bookName;
              var clone = card.cloneNode(true);
              contain.appendChild(clone);
            }
            for(let i = 0; i<contain.childNodes.length; i++){
              contain.childNodes[i].addEventListener('click',function(){
                hashHistory.push({pathname:'/about',query:{name:arr[i].id}})
              })
           }
          })
          .catch(e => {
            console.log(e);
          });
      }
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

  onSearch = ()=> {
    var book = document.getElementById("serach").value;
    if(book!==null||book.length!==0){
         this.componentDidMount(book);
    }
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ width: 256 }}>
          <Menu />
        </div>
        <div id="contain" style={{ width: "90%", height: "50rem" }}>
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
            <Card
              id="card"
              className = {this.state.key}
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
              position: "absolute",
              bottom: "0px",
              left: "500px"
            }}
          >
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={Number(this.state.num)}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default bookDetail;

import React from "react";
import Menu from "../components/Menu";
import API_CONFIG from "../config/config";
import { Pagination } from "antd";
import { Card } from "antd";
import { Input } from "antd";
import {message} from "antd";
const Search = Input.Search;

const { Meta } = Card;

class bookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "",
      imgTitle: "",
    };

  }

  onChange = (pageNumber,pageSize) => {
    console.log("Page: ", pageNumber);
    var contain = document.getElementById("cardBox");
    var card = document.getElementById('card');
    card.style.display = 'block'
    contain.innerHTML = "";
    contain.appendChild(card);
    this.getBookInfo(pageNumber);
  }
  componentDidMount() {
    console.log()
    this.getBookInfo();
  }
  getBookInfo(pageNumber) {
    if(pageNumber===undefined||pageNumber===0||pageNumber===null){
       pageNumber = 1;
    }
    fetch(API_CONFIG.baseUrl + "/book/books?pageIndex="+pageNumber+"&pageSize=10", {
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
        this.setState({res:data})
        var contain = document.getElementById("cardBox");
        var card = document.getElementById("card");
        let arr = data.data;
        console.log(arr);
        if(arr ===undefined||arr.length===0){
          card.style.display = 'none';
          message.error("暂无更多图书")
        }
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
  onSearch = (id)=>{
    console.log(id)
     fetch(API_CONFIG.baseUrl+'/book/books/'+id+'/info',{
      method: 'GET',
      mode:'cors',
      credentials:'include',
      headers:{
        "Content-type":"application/json"
      }
    }).then(res =>{
      return res.json();
    }).then(data =>{
      console.log(data.data.book.bookName)
      var info = data.data.book;
      var contain = document.getElementById("cardBox");
      var card = document.getElementById("card");
      contain.innerHTML = "";
      contain.appendChild(card);
      this.setState({imgTitle:info.bookName});
      this.setState({imgSrc:info.coverUrl});




    })
  }

  render() {

    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ width: 256 }}>
          <Menu />
        </div>
        <div
          id="contain"
          style={{ width:'90%',height: "1000px", border: "1px solid black" }}
        >
          <div style={{margin:'10px'}}>
            <Search style={{width:'25%'}}
              placeholder="搜索图书"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div id="cardBox">
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
              position: "absolute",
              bottom: "-300px",
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

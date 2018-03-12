import React from 'react';
import Menu from '../components/Menu';

class About extends React.Component{
  render(){
    return (
      <div style={{display:'flex',justifyContent:'flex-start'}}>
      <Menu/>
      <div style={{border:'1px solid red'}}> zheshi About</div>
      </div>
    )
  }
}
export default About;

import React, { Component } from 'react';

import './Carousel.css';

const listData = [
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  },
  {
    name: 'aaaa',
    age: 18
  }
]


class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIdx: -1
    };
  }

  rollUp = () => {
    
  }

  rollDown = () => {

  }

  renderList = () => {
    return listData.map((user, idx) => {
      return (
        <div className="user" key={idx}>
          <span>{user.name}</span>:&nbsp;
          <span>{user.age}세</span>
        </div>
      )
    })
  }

  render() {
    const list = this.renderList();
    return (
      <div className="container">
        { list }
      </div>
    );
  }
}

export default Carousel;
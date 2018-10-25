import React, { Component } from 'react';
import { Carousel } from './components';

const list = [
  {
    name: 'aaaa',
    age: 8
  },
  {
    name: 'bbbb',
    age: 10
  },
  {
    name: 'cccc',
    age: 19
  },
  {
    name: 'dddd',
    age: 22
  },
  {
    name: 'eeee',
    age: 38
  },
  {
    name: 'ffff',
    age: 42
  },
  {
    name: 'gggg',
    age: 13
  },
  {
    name: 'hhhh',
    age: 5
  }
]

class User extends Component {
  render() {
    const {
      name,
      age
    } = this.props;
    return (
      <div className="user">
        <span>{name}</span>:&nbsp;
        <span>{age} years old</span>
      </div>
    );
  }
}

class CarouselPage extends Component {
  onBtnUp = () => {
    if (this.carousel) {
      this.carousel.rollUp();
    }
  }

  onBtnDown = () => {
    if (this.carousel) {
      this.carousel.rollDown();
    }
  }

  renderUserList = () => {
    return list.map((user, idx) => {
      return <User name={user.name} age={user.age} key={idx} />
    });
  }

  render() {
    const userList = this.renderUserList();
    return (
      <div>
        <Carousel ref={r=>this.carousel=r}>
          { userList }
        </Carousel>
        <button onClick={this.onBtnUp}>UP</button>
        <button onClick={this.onBtnDown}>DOWN</button>
      </div>
    );
  }
}

export default CarouselPage;

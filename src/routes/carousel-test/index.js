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
  },
  {
    name: 'iiii',
    age: 53
  },
  {
    name: 'jjjj',
    age: 39
  },
  {
    name: 'kkkk',
    age: 29
  },
  {
    name: 'llll',
    age: 84
  },
  {
    name: 'mmm',
    age: 34
  },
  {
    name: 'nnnn',
    age: 53
  },
  {
    name: 'oooo',
    age: 34
  },
  {
    name: 'pppp',
    age: 2
  },
  {
    name: 'qqqq',
    age: 28
  }
  
]

class User extends Component {
  // componentWillUnmount() {
  //   const { idx, name } = this.props;
  //   console.error(`[${idx}:${name}] is unmounted`);
  // }

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

  onBtnStart = () => {
    if (this.carousel) {
      this.carousel.startRolling();
    }
  }

  onBtnStop = () => {
    if (this.carousel) {
      this.carousel.stopRolling();
    }
  }

  renderUserList = () => {
    return list.map((user, idx) => {
      return <User name={user.name} age={user.age} key={idx} idx={idx}/>
    });
  }

  render() {
    const userList = this.renderUserList();
    return (
      <div className="carousel-page-wrapper" style={{height: '100%'}}>
        <div className="carousel-outter-container" style={{overflow: 'hidden'}}>
          <Carousel 
            ref={r=>this.carousel=r}
          >
            { userList }
          </Carousel>
        </div>
        <div className="button-box" style={{position: 'absolute', bottom: '500px'}}>
          <button onClick={this.onBtnUp}>UP</button>
          <button onClick={this.onBtnDown}>DOWN</button>
          <button onClick={this.onBtnStop}>STOP</button>
          <button onClick={this.onBtnStart}>START</button>
        </div>
      </div>
    );
  }
}

export default CarouselPage;

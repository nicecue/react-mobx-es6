import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import saveRefs from 'react-save-refs';

import './Carousel.css';

class Carousel extends Component {
  static defaultProps = {
    animateDuration: 300,
    maxShowItem: 4
  }

  constructor(props) {
    super(props);

    this.state = {
      currentIdx: -1,
      animation: false,
      offsetY: 0
    };

    this.items = new Map();
    window.items = this.items;
  }

  componentDidMount() {
    const childs = React.Children.toArray(this.props.children);
    if (childs.length) {
      this.setState({currentIdx: 0});
    }
  }

  rollUp = () => {
    const { currentIdx } = this.state;
    const nextChild = ReactDOM.findDOMNode(this.items.get(currentIdx+1));

    window.nextChild = nextChild;
    const y = nextChild.offsetTop;
    const height = nextChild.offsetHeight;


    console.error('nextChild', nextChild);
  }

  rollDown = () => {

  }

  render() {
    const {
      className,
      children,
      maxShowItem,
      animateDuration
    } = this.props;
    const { 
      currentIdx,
      animation,
      offsetY
    } = this.state;

    if (currentIdx < 0) {
      return null;
    }

    const childs = React.Children.toArray(children);
    const lastIdx = childs.length - 1;

    const viewStart = currentIdx;
    let viewEnd = viewStart + maxShowItem;
    let fakeViewListTailCnt = 0;
    
    if (viewEnd > lastIdx) {
      viewEnd = lastIdx;
      fakeViewListTailCnt = viewEnd - lastIdx;
    } else {
      childs.slice(viewEnd + 1,)
    }

    console.error(`${viewStart} - ${viewEnd}`);

    let viewIdx = 0;
    const viewList = childs.slice(viewStart, viewEnd).map((child, idx) => {
      return React.cloneElement(child, {ref: saveRefs(this.items, viewStart + idx)});
    })
    if (fakeViewListTailCnt) {
      const viewListTail = childs.slice(0, fakeViewListTailCnt).map((child, idx) => {
        return React.cloneElement(child, {});
      });
      viewList.push(viewListTail);
    }

    const tailIdx = fakeViewListTailCnt? fakeViewListTailCnt: viewEnd + 1;

    const tail = React.cloneElement(childs[tailIdx], {});

    const fakeChildren = [];
    fakeChildren.push(viewList);
    fakeChildren.push(tail);

    const containerStyle = {
      transition: `transform ${animation? animateDuration: 0}ms ease-in-out`,
      transform: `translateY(${offsetY}px)`
    };
    
    return (
      <div className={`carousel-wrapper${className? ` ${className}`: ''}`}>
        <div 
          className="carousel-container" 
          style={containerStyle}
          ref={r=>this.container=r}
        >
          { fakeChildren }
        </div>
      </div>
    );
  }
}

export default Carousel;
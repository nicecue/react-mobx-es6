import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import saveRefs from 'react-save-refs';

import './Carousel.css';

class Carousel extends Component {
  static defaultProps = {
    animateDuration: 300,
    rollingDuration: 500,
    maxShowLine: 4,
    maxItemInLine: 2
  }

  constructor(props) {
    super(props);

    this.state = {
      currentIdx: -1,
      animation: false,
      offsetY: 0
    };

    this.items = new Map();
    this.timer = null;
  }

  componentDidMount() {
    const {
      children,
      autoRolling
    } = this.props;
    const childs = React.Children.toArray(children);
    if (childs.length) {
      this.setState({currentIdx: 0});
    }

    if (autoRolling !== undefined) {
      this.startRolling();
    }

    window.items = this.items;
  }

  startRolling = () => {
    const {
      rollingDuration
    } = this.props;
    this.timer = setInterval(() => {
      this.rollUp();
    }, rollingDuration);
  }

  stopRolling = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  rollUp = () => {
    const { 
      children,
      animateDuration,
      maxItemInLine
     } = this.props;
    const { currentIdx } = this.state;
    let nextIdx = (currentIdx + (1 * maxItemInLine ));
    
    const childs = React.Children.toArray(children);
    if (nextIdx > childs.length - 1) {
      nextIdx = 0;
    }

    const nextChild = ReactDOM.findDOMNode(this.items.get(nextIdx));
    // console.error(`   rollUp to => ${nextIdx}`);
    const height = nextChild.offsetHeight;

    this.setState({
      offsetY: -(height),
      animation: true
    }, () => {
      setTimeout(() => {
        this.setState({
          animation: false,
          offsetY: 0,
          currentIdx: nextIdx
        })
      }, animateDuration)
    })
  }

  rollDown = () => {

  }

  render() {
    const {
      className,
      children,
      maxShowLine,
      maxItemInLine,
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

    // TODO: list 의 갯수가 최대표시개수 보다 작을때는 그냥 리스트만 랜더하는 로직추가

    const childs = React.Children.toArray(children);
    const lastIdx = childs.length - 1;

    const viewStartIdx = currentIdx;
    let viewEndIdx = viewStartIdx + (maxShowLine * maxItemInLine) - 1;
    let fakeViewListTailCnt = 0;
    
    let isNeedDivider = false;

    // view 갯수가 모자라는 경우 체크
    if (viewEndIdx > lastIdx) {
      fakeViewListTailCnt = viewEndIdx - lastIdx;
      viewEndIdx = lastIdx;
      isNeedDivider = true;
    }

    const viewList = childs.slice(viewStartIdx, viewEndIdx + 1).map((child, idx) => {
      // return React.cloneElement(child, {ref: saveRefs(this.items, viewStartIdx + idx), key: child.props.idx});
      return React.cloneElement(child, {ref: saveRefs(this.items, child.props.idx), key: child.props.idx});
    });

    if (isNeedDivider) {
      viewList.push(React.createElement('div', {className: "divier", key: 'divier'}));
    }

    // view 에 item 이 모자란 경우 0번 인덱스부터 모자란 개수만큼 채움
    if (fakeViewListTailCnt) {
      const viewListTail = childs.slice(0, fakeViewListTailCnt).map((child, idx) => {
        return React.cloneElement(child, {ref: saveRefs(this.items, child.props.idx), key: child.props.idx});
      });
      viewList.push(...viewListTail);
      
    }

    // 화면 영역밖의 tail 은 모자랄 경우는 채워진 갯수 뒤의 item이고 
    // 아니라면 viewlist 의 다음 item 임
    let tailStartIdx = fakeViewListTailCnt? fakeViewListTailCnt: viewEndIdx + 1;
    if (tailStartIdx > lastIdx) {
      tailStartIdx = tailStartIdx - lastIdx - 1;
    }
    let tailEndIdx = tailStartIdx + maxItemInLine - 1;
    if (tailEndIdx > lastIdx) {
      tailEndIdx = lastIdx;
    }
      
    const tails = childs.slice(tailStartIdx, tailEndIdx+1).map((child, idx) => {
      // return React.cloneElement(child, {ref: saveRefs(this.items, tailStartIdx + idx),  key: child.props.idx});
      return React.cloneElement(child, {ref: saveRefs(this.items, child.props.idx), key: child.props.idx});
    })

    // console.error(`${animation?'   ':''}[${viewStartIdx} - ${viewEndIdx}${fakeViewListTailCnt?`{0 - ${fakeViewListTailCnt-1}}`: ''}][${tailStartIdx} - ${tailEndIdx}]: curIdx => ${currentIdx}, top => ${offsetY}, animate => ${animation?'on': 'off'}`);

    viewList.push(...tails);

    // const fakeChildren = [];
    // fakeChildren.push(viewList);
    // fakeChildren.push(tails);

    const containerStyle = {
      transition: `transform ${animation? animateDuration: 0}ms ease-in-out`,
      transform: `translateY(${offsetY}px)`
    };

    return (
      // <div className={`carousel-wrapper${className? ` ${className}`: ''}`}>
        <div 
          className="carousel-container" 
          style={containerStyle}
          ref={r=>this.container=r}
        >
          { viewList }
        </div>
      // </div>
    );
  }
}

export default Carousel;
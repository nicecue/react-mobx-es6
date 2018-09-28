import React, { Component } from 'react';
import { 
  observer,
  inject
} from 'mobx-react';

@inject("testStore")
@observer
class Home extends Component {
  onBtnAdd = () => {
    const { testStore } = this.props;
    testStore.add({
      name: 'test',
      position: 'test'
    })
  }

  render() {
    const { testStore } = this.props;
    return (
      <div>
        <h4>홈</h4>
        <button onClick={this.onBtnAdd}>추가</button>
        {
          testStore.links.map((link, idx) => {
            return <div>{`name: ${link.name}, pos: ${link.position}`}</div>
          })
        }
      </div>
    )
  }
}

export default Home;
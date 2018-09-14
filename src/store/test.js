import { 
  observable,
  action
} from 'mobx';
// import { observer } from 'mobx-react';


class TestStore {
  @observable links = [];

  @action
  add = (link) => {
    return this.links.push(link);
  }

  @action
  del = (idx) => {
    return this.links.splice(idx, 1);
  }
}


export default TestStore;
import React from 'react';
import ReactDOM from 'react-dom';

import {Atomizer, defaultRenderer, defaultStyleMap, defaultAtomizers} from '../src';

defaultAtomizers();


class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {}
    }
  }

  componentDidMount() {
    const self = this;
    fetch("http://localhost:8081/chuck/jokes/random")
      .then((e)=> {
        return e.json()
      }).then((e) => {
        self.setState({loading: false, data: e})
      });
  }

  render() {
    if(this.state.loading)
    {
      return <div>loading</div>
    }
    else {
      const Body = defaultRenderer("randomchuck", this.state.data, defaultStyleMap)
      return (<div>{Body}</div>)
    }
  }
}

ReactDOM.render(<Root />, document.getElementById('react-root'));

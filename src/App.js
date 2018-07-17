import React, {Component} from 'react';
import Geolocator2 from './geolocator2';
import MarkerMap from './MarkerMap';
class App extends Component {
    render() {
      return (
        <div className="App">
            <MarkerMap/>
            <div></div>
            <Geolocator2/>
        </div>
      );
    }
  }
  
  export default App;
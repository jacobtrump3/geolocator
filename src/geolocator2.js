import React, {Component} from 'react';


class Geolocator2 extends Component{
    constructor(props){
        super(props);
        this.updatePage = this.updatePage.bind(this);
        this.state = {
            lat: null, 
            lng: null,
            lat_api: null,
            lng_api: null,
            zip: null,
            addr: null
        };
    }

    componentDidMount(){
         // built in HTML
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updatePage);
        } else {
            alert('location disabled');
        }
    }

    updatePage(position){
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        var url = 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+ position.coords.latitude +'&lon=' + position.coords.longitude + '&addressdetails=1';
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //https://github.com/Rob--W/cors-anywhere
        fetch(proxyUrl + url)
        .then(res => res.json())
        .then(   
            (results) => {
                this.setState({
                    lat_api: results.lat,
                    lng_api: results.lon,
                    zip: results.address.postcode,
                    addr: results.address.house_number+" "+  results.address.road + " " + results.address.city + " " + results.address.state
                })
                console.log(results);
            },
            error =>{
                console.error(error);
            }
        );
    }


    render(){
        return(
            <div>
                <h1> Open Street Map API </h1>
                    <h2> Built in HTML: </h2>
                        <div>
                            Latitude: {this.state.lat}<br/>
                            Longitude: {this.state.lng} <br/>
                        </div>
                    <h2> From Open Street Map API </h2>
                        <div>
                            Latitude: {this.state.lat_api}<br/>
                            Longitude: {this.state.lng_api}<br/>
                            Zipcode: {this.state.zip}<br/>
                            Address: {this.state.addr}
                        </div>
            </div>
        );
    }
}

export default Geolocator2;
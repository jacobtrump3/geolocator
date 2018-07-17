import Geocode from "react-geocode";
import React, { Component } from 'react';

// Geocode.setApiKey("AIzaSyBw4kSonEavFjSP5bi4kv9pqdlOJi--3JM");

class Geocoder extends Component {
    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
        this.state = {
            lat: null,
            lng: null,
            lat_geocode: null,
            lng_geocode:null,
            zip_geocode: null,
            addr_geocode: null
        };
    }


    componentDidMount() {
        // built in HTML
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updatePage);
        } else {
            alert('location disabled');
        }
    }

    updatePage(position) {
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

        //React-Geocode
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            response => {
                this.setState({
                    lat_geocode: response.results[0].geometry.location.lat,
                    lng_geocode: response.results[0].geometry.location.lng,
                    zip_geocode: response.results[0].address_components[7].long_name,
                    addr_geocode: response.results[0].formatted_address
                });
                console.log(response.results);
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        return (
            <div>
                <h1>React-Geocode Module</h1>
                <div>
                    <h2>Built in HTML</h2>
                    Latitude: {this.state.lat} <br />
                    Longitude: {this.state.lng} <br />
                </div>
                <div>
                    <h2>React-Geocode Module</h2>
                    Latitude: {this.state.lat_geocode}<br/>
                    Longitude: {this.state.lng_geocode}<br/>
                    Zipcode: {this.state.zip_geocode} <br />
                    Address: {this.state.addr_geocode}
                </div>
                <hr />
            </div>
        );
    }
}

export default Geocoder;
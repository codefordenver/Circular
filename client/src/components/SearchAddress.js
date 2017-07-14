import React, { Component } from 'react';

class SearchAddress extends Component {
    render() {
        return (
            <div className="searchAddress">
                <h1 className="searchAddress-heading">Does your apartment building need recycling? Build Support!</h1>
                <div className="searchAddress-inputGroup">
                    <input type="text" className="searchAddress-input" placeholder="Search for your building"/>
                    <a className="searchAddress-button" href="www.google.com">Go</a>
                </div>
                <a className="searchAddress-link" href="/">Learn more first</a>

            </div>
        )
    }
}

export default SearchAddress;
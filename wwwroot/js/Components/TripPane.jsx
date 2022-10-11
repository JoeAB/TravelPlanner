var React = require('react');
const { default: Map } = require('./Map')

export default function TripPane({mapDataSource}) {

    return (
        <Map mapDataSource={mapDataSource} />
    )
}
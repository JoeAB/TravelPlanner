var React = require('react');
const { default: TripPane } = require('./TripPane')
import { Button } from 'react-bootstrap';
import { useState } from "react";




const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function Planner() {

    const [trips, setTrips] = useState([]);

    const handleAdd = () => {
        // 👇️ push to end of state array
        setTrips(trips => [...trips, { caption: 'new' }]);

    };
    return (
        <>
            <Button variant="danger" onClick={() => { handleAdd() }}>Add Trip</Button>
            {trips.map((element, index) => {
                return (
                    <div key={index}>
                        <TripPane mapDataSource={geoUrl} />
                    </div>
                );
            })}

        </>
    )
}
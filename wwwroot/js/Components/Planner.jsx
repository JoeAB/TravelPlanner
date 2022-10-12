var React = require('react');
const { default: TripPane } = require('./TripPane')
import { Button, Container, Col, Row } from 'react-bootstrap';
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
            <Container>
                <Row>
                    <Col>
                        <Button onClick={() => { handleAdd() }}>Add Trip</Button>
                    </Col>
                </Row>
                {trips.map((element, index) => {
                    return (
                        <div key={index}>
                            <TripPane mapDataSource={geoUrl} index={index} />
                        </div>
                    );
                })}
            </Container>
        </>
    )
}
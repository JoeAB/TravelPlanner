var React = require('react');
const { default: Map } = require('./Map')
import {  Collapse, Card, Container, Col, Row } from 'react-bootstrap';
import { useState } from "react";





export default function TripPane({mapDataSource, index}) {
    const [open, setOpen] = useState(false);
    const [tripName, setTripName] = useState('Trip ' +index);
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        {tripName}
                    </Card.Title>
                    <Collapse in={open}>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col>
                                        <input type="text" value={tripName} onChange={(e) => { setTripName(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row></Row>
                                <Row>
                                    <Map mapDataSource={mapDataSource} />
                                </Row>
                            </Container>
                        </Card.Text>
                    </Collapse>
                </Card.Body>
          </Card>
        </>
    )
}
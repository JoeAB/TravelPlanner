var React = require('react');
const { default: Map } = require('./Map')
import {  Collapse, Card, Container, Col, Row, Form } from 'react-bootstrap';
import { useState } from "react";





export default function TripPane({mapDataSource, index}) {
    const [open, setOpen] = useState(false);
    const [tripName, setTripName] = useState('Trip ' +index);
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="cardHeader" onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        {tripName}
                    </Card.Title>
                    <Collapse in={open}>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="tripName">
                                            <Form.Label>Trip Name</Form.Label>
                                            <Form.Control type="text" value={tripName} onChange={(e) => { setTripName(e.target.value) }}  />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="startDate">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="endDate">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control type="date"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
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
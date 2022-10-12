var React = require('react');
import  { useState } from "react";

import { ZoomableGroup, ComposableMap, Marker, Geographies, Geography } from "react-simple-maps"
import { geoPath } from "d3-geo";

//Thanks to this guy for the example on how to add markers with click events
//https://stackoverflow.com/questions/67792232/on-react-simple-maps-is-there-a-way-to-get-coordinates-of-location-in-map-by-cl

export default function Map({ mapDataSource }) {
    const [scale, setSclae] = useState(1);
    const [markers, setMarkers] = useState([]);

    return (
        <ComposableMap projection="geoMercator">
            <ZoomableGroup zoom={1} onMoveEnd={({ zoom }) => setSclae(zoom)}>
                <Geographies geography={mapDataSource}>
                    {({ geographies, projection }) =>
                        geographies
                            .map((geo) => {
                                var destName = "";
                                const onGeoEventFactory = (handleCoordinates) => {
                                    const gPath = geoPath().projection(projection);

                                    return (evt) => {
                                        const dim = evt.target.getBoundingClientRect();
                                        const cx = evt.clientX - dim.left;
                                        const cy = evt.clientY - dim.top;

                                        const [geoX, geoY] = gPath.bounds(geo)[0];

                                        //we need root SVG element of our map
                                        const svg = evt.nativeEvent.path[4];

                                        //adjust for SVG width on the page / internal rendering width
                                        const adjustScale =
                                            scale * (svg.clientWidth / svg.viewBox.baseVal.width);

                                        // these are the coords in SVG coordinate system
                                        const clickCoordsInsideSvg = [
                                            geoX + (cx / adjustScale),
                                            geoY + (cy / adjustScale)
                                        ];

                                        destName = prompt("Please enter destination name", "");

                                        // 'unproject' the SVG coords to get lat and long                 
                                        handleCoordinates(projection.invert(clickCoordsInsideSvg));
                                    };
                                };

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#EAEAEC"
                                        stroke="#D6D6DA"
                                        onClick={onGeoEventFactory((coordinates) => {
                                            const newMarkers = [
                                                ...markers,
                                                {
                                                    markerOffset: -30,
                                                    name: destName,
                                                    coordinates
                                                }
                                            ];
                                            setMarkers(newMarkers);
                                        })}
                                    />
                                );
                            })
                    }
                </Geographies>
                {markers.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <g
                            fill="none"
                            stroke="#FF5533"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                        >
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
};

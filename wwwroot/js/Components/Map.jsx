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

                                        if (destName == null) {
                                            return;
                                        }

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
                                                    markerOffset: -5,
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
          
                            <circle  r="3" />
                       
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            className="markerCaption`"
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
};

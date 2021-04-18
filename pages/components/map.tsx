import { useState } from "react";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { JSONLoader } from "@loaders.gl/json";

const extractCountyName = (info) => info?.object?.properties?.kreis_name;

const DEFAULT_INITIAL_VIEW_STATE = {
  longitude: 9.17702,
  latitude: 48.78232,
  zoom: 6,
  pitch: 0,
  bearing: 0,
};

interface Props {
  width: string;
  height: string;
  initialViewState?: {
    longitude?: number;
    latitude?: number;
    zoom?: number;
    pitch?: number;
    bearing?: number;
  };
}
export default function Map({ width, height, initialViewState }: Props) {
  const mergedInitialViewState = {
    ...DEFAULT_INITIAL_VIEW_STATE,
    ...initialViewState,
  };
  const [countyOfInterest, setCountyOfInterest] = useState<string | null>(null);
  const [zoom, setZoom] = useState(mergedInitialViewState.zoom);
  const countyLayer = new GeoJsonLayer({
    id: "county-layer",
    data: "/landkreise-bawu.geojson",
    loader: JSONLoader,
    pickable: true,
    stroked: false,
    filled: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, zoom < 10 ? 100 : 0],
    getLineWidth: 1,
    // visible: false,
    visible: zoom < 10,
    onHover: (info) => {
      setCountyOfInterest(extractCountyName(info));
    },
  });

  const indexLayer = new MVTLayer({
    id: "index-layer",
    data: `${process.env.tileServerBaseUrl}/maps/cargorocket/{z}/{x}/{y}.pbf`,
    minZoom: 10,
    maxZoom: 20,
    getLineColor: [192, 192, 192],
    getFillColor: [140, 170, 180],
    pickable: true,
    getLineWidth: 10,
    lineWidthMinPixels: 1,
    onClick: (info, event) => {
      console.log("click", info.object);
    },
  });

  const layers = [indexLayer, countyLayer];

  return (
    <>
      <DeckGL
        initialViewState={mergedInitialViewState}
        controller={true}
        layers={layers}
        width={width}
        height={height}
        onViewStateChange={({ viewState }) => {
          setZoom(Math.round(viewState.zoom));
          return viewState;
        }}
      >
        <StaticMap mapboxApiAccessToken={process.env.mapboxAccessToken} />
      </DeckGL>
      {countyOfInterest && countyOfInterest !== "" && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            pointerEvents: "none",
            left: 0,
            top: 0,
          }}
        >
          {countyOfInterest}
        </div>
      )}
    </>
  );
}

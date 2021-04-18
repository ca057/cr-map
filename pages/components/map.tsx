import { useState } from "react";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { JSONLoader } from "@loaders.gl/json";

const DEFAULT_INITIAL_VIEW_STATE = {
  longitude: 9.17702,
  latitude: 48.78232,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

interface Props {
  width: string;
  height: string;
  initialViewState: {
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
  const [zoom, setZoom] = useState(mergedInitialViewState.zoom);
  const kreiseLayer = new GeoJsonLayer({
    id: "index-layer",
    data: "/landkreise-bawu.geojson",
    loader: JSONLoader,
    pickable: true,
    stroked: false,
    filled: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 100],
    getLineWidth: 1,
    visible: zoom < 10,
  });

  const indexLayer = new MVTLayer({
    data: `${process.env.tileServerBaseUrl}/maps/cargorocket/{z}/{x}/{y}.pbf`,
    minZoom: 10,
    maxZoom: 20,
    getLineColor: [192, 192, 192],
    getFillColor: [140, 170, 180],
    pickable: true,
    getLineWidth: 5,
    lineWidthMinPixels: 1,
    onClick: (info, event) => {
      console.log("click", info.object);
    },
  });

  const layers = [indexLayer, kreiseLayer];

  return (
    <DeckGL
      initialViewState={mergedInitialViewState}
      controller={true}
      layers={layers}
      width={width}
      height={height}
      onViewStateChange={({ viewState }) => {
        setZoom(Math.round(viewState.zoom));
      }}
    >
      <StaticMap mapboxApiAccessToken={process.env.mapboxAccessToken} />
    </DeckGL>
  );
}

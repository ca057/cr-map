import Head from "next/head";
import DeckGL from "@deck.gl/react";
import { LineLayer, GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { JSONLoader } from "@loaders.gl/json";

import styles from "../styles/Home.module.css";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 9.17702,
  latitude: 48.78232,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

export default function Home() {
  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: "http://localhost:3000/streets_stuttgart.geojson",
    loader: JSONLoader,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    // getLineColor: (d) => colorToRGBArray(d.properties.cbindex_street_quality),
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  });

  const layers = [layer];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        >
          <StaticMap mapboxApiAccessToken={process.env.mapboxAccessToken} />
        </DeckGL>
      </main>
    </div>
  );
}

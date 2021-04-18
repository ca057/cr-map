import Head from "next/head";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "@deck.gl/geo-layers";
import { StaticMap } from "react-map-gl";

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
  const layer = new MVTLayer({
    data: `${process.env.tileServerBaseUrl}/maps/cargorocket/{z}/{x}/{y}.pbf`,

    minZoom: 10,
    maxZoom: 20,
    getLineColor: [192, 192, 192],
    getFillColor: [140, 170, 180],

    getLineWidth: (f) => {
      switch (f.properties.class) {
        case "street":
          return 6;
        case "motorway":
          return 10;
        default:
          return 10;
      }
    },
    lineWidthMinPixels: 1,
  });

  const layers = [layer];

  return (
    <div className={styles.container}>
      <Head>
        <title>Cargorocket Map</title>
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

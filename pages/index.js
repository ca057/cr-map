import Head from "next/head";

import Map from "./components/map";

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
  return (
    <div className={styles.container}>
      <Head>
        <title>Cargorocket Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          width="100%"
          height="calc(100vh - 50px)"
        />
      </main>
      <footer className={styles.footer}>
        <p>Cargorocket 2021</p>
      </footer>
    </div>
  );
}

import Head from "next/head";

import Map from "./components/map";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cargorocket Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Map width="100%" height="calc(100vh - 50px)" />
      </main>
      <footer className={styles.footer}>
        <p>Cargorocket 2021</p>
      </footer>
    </div>
  );
}

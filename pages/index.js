import Head from "next/head"
import LayoutJadwalSholat from "@/layout"

export default function Home() {
  return (
    <>
      <Head>
        <title>Jadwalsholat.api - next.js</title>
        <meta name="description" content="Contoh sample menggunakan @ernestoyoofi/jadwalsholat.api pada nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-full-box">
        <div className="center-box">
          <LayoutJadwalSholat />
        </div>
      </main>
    </>
  )
}

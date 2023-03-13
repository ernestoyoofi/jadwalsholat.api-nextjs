import { useEffect, useRef, useState } from "react"
import sty from "./main.module.css"

export default function LayoutJadwalSholat() {
  const [getLoading, setLoading] = useState(true)
  const dataResults = useRef()
  
  useEffect(() => {
    if(!document.body.getAttribute("jadwal-load")) {
      document.body.setAttribute("jadwal-load", "true")
      loadData(31)
    }
  })

  async function loadData(kota = 31) {
    if(isNaN(kota)) {
      return ;
    }
    setLoading(true)

    const mpra = await fetch(`/api/jadwal?kota=${kota}`)
    const json = await mpra.json()

    setLoading(false)

    dataResults.current = json

    console.log(json)
    console.log("Daerah Yg Seleksi: "+json.info.nama)

    return true;
  }

  function seleksiButton() {
    const kota = document.getElementById("daerah").value
    loadData(kota).then(z => {
      setTimeout(() => rmSelected(kota), 30)
    })
  }

  function rmSelected(kota = "31") {
    const selected = document.querySelectorAll("select#daerah option")
    selected.forEach((elements, key) => {
      elements?.removeAttribute("selected")

      if(elements.getAttribute("value") === kota) {
        elements.setAttribute("selected", "1")
      }
    })
  }

  return (
    <div className={sty.emty_box}>
      <select
        id="daerah"
        onChange={seleksiButton}
        className={sty.selected}
      >
        <option disabled selected={getLoading} key="disabled">{!getLoading? "Pilih Daerah":"Loading..."}</option>
        {!getLoading? 
          dataResults.current.status != 500?
          dataResults.current.ls_kota.map((lokasi, i) => (
            <option value={lokasi.id} key={i}>{lokasi.kota}</option>
          ))
        :""
        :""}
      </select>
      {!getLoading? 
        dataResults.current.statis != 500?
        <div>
          <iframe src={dataResults.current.info.maps_embed} width="100%" height="300px" className={sty.iframe_map}/>
          <div>
          {dataResults.current.jadwal.map((data, i) => (
            <div key={i} today={data.today?"ones":null} className={sty.cards}>
              <b>{data.hari_masehi}</b>
              <ul className={sty.cipper}>
                <li>Tanggal Hijriah: {data.hari_hijriah}</li>
                <li>Tanggal Pasaran: {data.hari_pasaran}</li>
              </ul>
              <ul className={sty.cipper}>
                <li>Subuh: {data.waktu_subuh}</li>
                <li>Dhuhur: {data.waktu_dhuhur}</li>
                <li>Asar: {data.waktu_asar}</li>
                <li>Magrib: {data.waktu_magrib}</li>
                <li>Isya: {data.waktu_isya}</li>
              </ul>
            </div>
          ))}
          </div>
        </div>
        :<div>
        </div>
      :""}
    </div>
  )
}

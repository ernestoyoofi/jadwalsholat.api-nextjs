// Disarankan untuk scrapping selalu pada backend / rest api
// Karena jika pada frontend / ui interface, tidak berkerja dengan baik

import { jadwal } from "@ernestoyoofi/jadwalsholat.api"

export default function JadwalSholatAPI(req, res) {
  jadwal({ ...req.query, logs: true })
  .then(z => {
    res.setHeader("content-type", "application/json")
    res.status(200).send(
      JSON.stringify(z,null,2)
    )
  })
  .catch(er => {
    res.status(500).send(er.to_server())
  })
}
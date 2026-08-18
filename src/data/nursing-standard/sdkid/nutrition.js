export const nutritionDiagnoses = [

  {
    code: "D.0019",

    name: "Defisit Nutrisi",

    domain: "Fisiologis",

    class: "Nutrisi",

    definition:
      "Asupan nutrisi tidak cukup untuk memenuhi kebutuhan metabolisme.",

    relatedFactors: [
      "Ketidakmampuan mengabsorpsi nutrisi",
      "Peningkatan kebutuhan metabolisme",
      "Kurang asupan makanan"
    ],

    definingCharacteristics: [
      "Berat badan menurun",
      "Nafsu makan menurun",
      "Kelemahan otot"
    ],

    slki: [
      "L.03030"
    ],

    siki: [
      "I.03119"
    ]
  },


  {
    code: "D.0032",

    name: "Risiko Defisit Volume Cairan",

    domain: "Fisiologis",

    class: "Cairan",

    definition:
      "Berisiko mengalami penurunan volume cairan intravaskuler, interstisial, dan/atau intraseluler.",

    relatedFactors: [
      "Kehilangan cairan aktif",
      "Gangguan mekanisme regulasi"
    ],

    definingCharacteristics: [],

    slki: [
      "L.03028"
    ],

    siki: [
      "I.03121"
    ]
  },


  {
    code: "D.0034",

    name: "Hipervolemia",

    domain: "Fisiologis",

    class: "Cairan",

    definition:
      "Peningkatan volume cairan intravaskuler, interstisial, dan/atau intraseluler.",

    relatedFactors: [
      "Gangguan mekanisme regulasi",
      "Kelebihan asupan cairan"
    ],

    definingCharacteristics: [
      "Edema",
      "Berat badan meningkat",
      "Sesak napas"
    ],

    slki: [
      "L.03020"
    ],

    siki: [
      "I.03114"
    ]
  }

];
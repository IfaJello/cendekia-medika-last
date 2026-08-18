export const physiologicalDiagnoses = [
  {
    code: "D.0077",

    name: "Nyeri Akut",

    domain: "Fisiologis",

    class: "Nyeri dan Kenyamanan",

    definition:
      "Pengalaman sensorik atau emosional yang berkaitan dengan kerusakan jaringan aktual atau fungsional.",

    relatedFactors: [
      "Agen pencedera fisik",
      "Agen pencedera fisiologis",
      "Agen pencedera kimiawi"
    ],

    definingCharacteristics: [
      "Mengeluh nyeri",
      "Meringis",
      "Gelisah",
      "Sulit tidur"
    ],

    slki: [
      "L.08066"
    ],

    siki: [
      "I.08238"
    ]
  },


  {
    code: "D.0142",

    name: "Risiko Infeksi",

    domain: "Keamanan dan Proteksi",

    class: "Infeksi",

    definition:
      "Berisiko mengalami peningkatan terserang organisme patogen.",

    relatedFactors: [
      "Penyakit kronis",
      "Efek prosedur invasif",
      "Ketidakadekuatan pertahanan tubuh"
    ],

    definingCharacteristics: [],

    slki: [
      "L.14137"
    ],

    siki: [
      "I.14539"
    ]
  },


  {
    code: "D.0005",

    name: "Gangguan Pertukaran Gas",

    domain: "Fisiologis",

    class: "Respirasi",

    definition:
      "Kelebihan atau kekurangan oksigenasi dan eliminasi karbon dioksida pada membran alveolus.",

    relatedFactors: [
      "Ketidakseimbangan ventilasi-perfusi",
      "Perubahan membran alveolus"
    ],

    definingCharacteristics: [
      "Dispnea",
      "Saturasi oksigen menurun",
      "Perubahan frekuensi napas"
    ],

    slki: [
      "L.01003"
    ],

    siki: [
      "I.01014"
    ]
  }
];
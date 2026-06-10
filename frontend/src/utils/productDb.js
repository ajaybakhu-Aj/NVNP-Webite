// Database utility: productDb.js
// A client-side IndexedDB database layer for NightVision products with a memory fallback.

const DB_NAME = "NightVisionDB";
const DB_VERSION = 1;
const STORE_NAME = "products";

const SEED_PRODUCTS = [
  {
    id: "y1-ratri-dome",
    name: "Y1-Ratri Dome",
    code: "NV-CAM-001",
    category: "Wireless CCTV Cameras",
    productType: "Indoor CCTV Cameras",
    cameraMp: "2 MP",
    tags: ["dome", "indoor", "wifi"],
    price: 4500,
    badge: "TOP RATED",
    status: "IN STOCK",
    description: "Panoramic 360° coverage with ultra-sensitive low-light sensor and two-way talk.",
    longDesc: "The Y1-Ratri Dome is a compact plug-and-play Wi-Fi surveillance camera designed for high-resolution residential and small business security. Featuring a 360° pan-tilt view, it allows you to monitor an entire room from a single device. Its night vision capability is enhanced with our proprietary Ratri low-light sensor.",
    bodySectionLabel: "TECHNICAL DOCUMENTATION",
    bodySectionTitle: "SYSTEM SPECIFICATIONS & FIELD ARCHITECTURE",
    guidePdf: "/assets/guides/nightvision-user-manual.pdf",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKHBBETCmvmUDQXf390HXH-OlLjt2T2Z4s9EC6-TW4V9RlTL9LDydP63qLr5Py_SRLNUliBf0UA5Y_fc94gecfuM7O-rD_-QNerIsTapATapXDASP7tBaQ8zVLuYLbb_eJ8KLKnrNCKfjx_ltLHGjxoWhsuAiuZ-f_Bjnoe_VT2SjWB7x_jc2-N3cjaIzw8XoX1Oypit-7Wtn5e0Q_MqH_iZ1wu78MZV0j44LdGzyX7vOrU66BFchUdarBt8rPcdnIgQ9SHW8Uhz8",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKHBBETCmvmUDQXf390HXH-OlLjt2T2Z4s9EC6-TW4V9RlTL9LDydP63qLr5Py_SRLNUliBf0UA5Y_fc94gecfuM7O-rD_-QNerIsTapATapXDASP7tBaQ8zVLuYLbb_eJ8KLKnrNCKfjx_ltLHGjxoWhsuAiuZ-f_Bjnoe_VT2SjWB7x_jc2-N3cjaIzw8XoX1Oypit-7Wtn5e0Q_MqH_iZ1wu78MZV0j44LdGzyX7vOrU66BFchUdarBt8rPcdnIgQ9SHW8Uhz8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo"
    ],
    colors: [{ name: "Gloss White", hex: "#ffffff" }, { name: "Obsidian Black", hex: "#111111" }],
    specs: [
      { icon: "360", label: "360° COVERAGE" },
      { icon: "wifi", label: "WI-FI 6" },
      { icon: "record_voice_over", label: "TWO-WAY AUDIO" },
      { icon: "nights_stay", label: "NIGHT SENSOR" }
    ],
    specTable: [
      ["Resolution", "1080p Full HD (1920x1080)"],
      ["Rotation", "355° Pan, 90° Tilt"],
      ["Night Vision", "20m Color Night Vision"],
      ["Audio", "Built-in Mic & Speaker"],
      ["Storage", "Up to 256GB MicroSD / Cloud"],
      ["Smart Alerts", "Human Motion Detection"],
      ["Power", "5V / 1.5A Micro USB"],
      ["Dimensions", "85 x 85 x 120mm"],
      ["Weight", "240g"]
    ]
  },
  {
    id: "t5p-ratri-bullet",
    name: "T5P-Ratri Bullet",
    code: "NV-CAM-002",
    category: "IP CCTV Cameras",
    productType: "Outdoor CCTV Cameras",
    cameraMp: "4 MP",
    tags: ["bullet", "outdoor", "waterproof"],
    price: 6200,
    badge: "IP67 RATED",
    status: "IN STOCK",
    description: "Weatherproof IP67 bullet camera engineered for the most extreme Himalayan environments.",
    longDesc: "The T5P-Ratri Bullet is built to withstand high-altitude blizzards, torrential monsoon downpours, and extreme temperatures. Outfitted with dual high-intensity infrared arrays, it offers ultra-long range zero-lux vision. Ideal for construction sites, warehouses, and perimeter guard posts.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgcCRYs_yF2xy-9uwk40FL--od49NB3LnYiZrjRPPbJIDk-HYXhCfyPdl9IqOcbeSPMOZeGqoY2EuJ0OF3iV88AhVjGANMwFRSY1HXDBd6SkGXEQuXgbZNVnfAtybEyF76OIFcMWJPhc2ugW6U5te7uPO4XWXVTcORKGHGg0BtooUmr3mMud1P4WFo1p-pSxOCNFSSinCjGDS9w4xh1wik9n0yTX-MbSPlXOb6GU6vT1ZqwbNl_GJILbfTPrf4y3L5pdn3DxGT_d0",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgcCRYs_yF2xy-9uwk40FL--od49NB3LnYiZrjRPPbJIDk-HYXhCfyPdl9IqOcbeSPMOZeGqoY2EuJ0OF3iV88AhVjGANMwFRSY1HXDBd6SkGXEQuXgbZNVnfAtybEyF76OIFcMWJPhc2ugW6U5te7uPO4XWXVTcORKGHGg0BtooUmr3mMud1P4WFo1p-pSxOCNFSSinCjGDS9w4xh1wik9n0yTX-MbSPlXOb6GU6vT1ZqwbNl_GJILbfTPrf4y3L5pdn3DxGT_d0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w"
    ],
    colors: [{ name: "Forest Green", hex: "#3a4a2f" }, { name: "Anodized Black", hex: "#0c0d0f" }],
    specs: [
      { icon: "shield", label: "IP67 RUGGED" },
      { icon: "visibility", label: "50M RANGE" },
      { icon: "thermostat", label: "-40°C TO 65°C" },
      { icon: "cloud_done", label: "DUAL CHANNEL" }
    ],
    specTable: [
      ["Resolution", "4MP Super HD (2560x1440)"],
      ["Lens", "4.0mm Fixed F1.6"],
      ["Weatherproofing", "IP67 Dust & Water Proof"],
      ["Night Vision", "50m Intelligent IR Matrix"],
      ["Housing", "Vandal-resistant Metal Shell"],
      ["Interface", "PoE RJ-45 & 12V DC Adapter"],
      ["Compression", "H.265+ Smart Codec"],
      ["Dimensions", "165 x 70 x 70mm"],
      ["Weight", "480g"]
    ]
  },
  {
    id: "ratri-g11",
    name: "Ratri G11",
    code: "NV-CAM-003",
    category: "Wireless CCTV Cameras",
    productType: "Outdoor CCTV Cameras",
    cameraMp: "4 MP",
    tags: ["bullet", "outdoor", "ai"],
    price: 8499,
    badge: "BESTSELLER",
    status: "IN STOCK",
    description: "AI-powered facial recognition, dynamic motion tracking, and active perimeter defense.",
    longDesc: "The Ratri G11 is our flagship professional surveillance camera. Equipped with an onboard Neural Processing Unit (NPU), it runs real-time object classification (vehicle, animal, human) and face recognition directly on the device. It has a high-decibel siren and dual floodlights to actively deter intruders.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo"
    ],
    colors: [{ name: "Matte Black", hex: "#1a1a1a" }, { name: "Desert Tan", hex: "#c4a882" }],
    specs: [
      { icon: "smart_toy", label: "NPU AI DETECT" },
      { icon: "notifications_active", label: "ACTIVE DEFENSE" },
      { icon: "hd", label: "4MP QUAD HD" },
      { icon: "security", label: "AES-256 SECURED" }
    ],
    specTable: [
      ["Resolution", "4MP Quad HD (2560x1440)"],
      ["Processor", "Dual-Core ARM + 1.2 TOPS NPU"],
      ["Night Vision", "40m Starlight Color Video"],
      ["Smart Tracking", "Automatic Pan-Tilt Tracking UPLINK"],
      ["Active Deterrence", "100dB Siren + White Floodlights"],
      ["Audio", "High-Gain Dual Microphone (5m pickup)"],
      ["Power Support", "PoE (802.3af) / 12V 2A DC"],
      ["Casing", "IK10 Impact Resistant Metal"],
      ["Weight", "620g"]
    ]
  },
  {
    id: "netra-v6z",
    name: "Netra V6Z",
    code: "NV-CAM-004",
    category: "IP CCTV Cameras",
    productType: "Indoor CCTV Cameras",
    cameraMp: "8 MP",
    tags: ["dome", "indoor", "zoom"],
    price: 12500,
    badge: "4K RESOLUTION",
    status: "LOW STOCK",
    description: "Premium vari-focal dome camera with 4× optical zoom and crystal clear 4K imaging.",
    longDesc: "The Netra V6Z is a premium grade indoor security dome camera designed for banks, jewelry stores, and luxury corporate spaces. Outfitted with a high-end Sony IMX sensor and a motorized 2.8mm-12mm vari-focal lens, it allows lossless optical zooming without sacrificing clarity. Includes complete tamper alerts.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_0jwAJrQ8dajeh88POWFOl_YsHl4_Mu62DwjESmhOUmZYOQDJr6pJUK4w-8QavfC9K7od-k8mmKZ0Fda6NWkPLO9Lnapojg8vwsQaC6WxaEVAryPVn-v_mtyLDWw6C4z0RIwM28IZ1lM2Iif4NNn2CKPdl17_R7hgIXk9JCsGC0sqAWLWIq3zU7Z0P0vuFpWVfiYw76QuNs_NtDFe5IrZOJ3k2PljfAadEo8B_Z-JJVsRsqvH5bgRMW_lsYl1qli9p8jtBeZVJqU",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_0jwAJrQ8dajeh88POWFOl_YsHl4_Mu62DwjESmhOUmZYOQDJr6pJUK4w-8QavfC9K7od-k8mmKZ0Fda6NWkPLO9Lnapojg8vwsQaC6WxaEVAryPVn-v_mtyLDWw6C4z0RIwM28IZ1lM2Iif4NNn2CKPdl17_R7hgIXk9JCsGC0sqAWLWIq3zU7Z0P0vuFpWVfiYw76QuNs_NtDFe5IrZOJ3k2PljfAadEo8B_Z-JJVsRsqvH5bgRMW_lsYl1qli9p8jtBeZVJqU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs"
    ],
    colors: [{ name: "Arctic White", hex: "#f8f9fa" }, { name: "Anodized Black", hex: "#111111" }],
    specs: [
      { icon: "zoom_in", label: "4X OPTICAL ZOOM" },
      { icon: "hd", label: "8MP 4K ULTRA HD" },
      { icon: "visibility_off", label: "DISCREET DOME" },
      { icon: "cloud_sync", label: "CLOUD BACKUP" }
    ],
    specTable: [
      ["Resolution", "8MP 4K UHD (3840x2160)"],
      ["Zoom Lens", "2.8mm - 12mm Motorized Vari-focal"],
      ["Angle of View", "35° to 105° Horizontal"],
      ["Sensor", "Sony Starvis 1/2.8\" CMOS"],
      ["Night Vision", "30m Smart IR Matrix"],
      ["Audio", "Built-in Microphone & Line In/Out"],
      ["Security", "IP54 Rating, IK10 Vandal-Proof Cover"],
      ["Dimensions", "120 x 120 x 95mm"],
      ["Weight", "520g"]
    ]
  },
  {
    id: "cctv-netra-s8",
    name: "CCTV Netra S8",
    code: "NV-CAM-005",
    category: "IP CCTV Cameras",
    productType: "Indoor and Outdoor CCTV Cameras",
    cameraMp: "3 MP",
    tags: ["dome", "indoor", "residential"],
    price: 5800,
    badge: "ELEGANT DESIGN",
    status: "IN STOCK",
    description: "Sleek minimalist design optimized for high-end residential interiors and offices.",
    longDesc: "The CCTV Netra S8 is built for customers who demand safety without compromising the interior aesthetics of their modern homes. With an organic shell and ultra-quiet motor, this camera blends seamlessly into plaster ceilings, providing sharp HD footage and smart anomaly alerts.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6nJ28PT7hwgDgMTnv4LwnYFRSuyv7f2dQaqjHSDFGw9xxwZJU_W3GuNkymfHqJt2__WFhPijujtvP4iyfDwVJ-1E7O1r6Ppiz9a6aCiy2bRPVAGASdO9Bc-q28Ev4KcukZlWIS_lTIdrLtFgAlJ6LaNltMGhp8b-PI8ajyxR7Y3UB5C81Hn8yiPvnvl42524i6_u5_LZ8pT0UUNybRbzERuc6VzHaYhGiXlKAhB-EhT_4t9cWj55oS_Fu08kiXYa7UJAhDxVKkps"
    ],
    colors: [{ name: "Satin White", hex: "#eaeaea" }, { name: "Charcoal Grey", hex: "#2f3136" }],
    specs: [
      { icon: "brush", label: "DESIGNER SHELL" },
      { icon: "visibility", label: "25M STARLIGHT" },
      { icon: "edgesensor_high", label: "APP TRIGGERED" },
      { icon: "security", label: "WPA3 SECURED" }
    ],
    specTable: [
      ["Resolution", "3MP Super HD (2048x1536)"],
      ["Angle of View", "95° Horizontal Wide-Angle"],
      ["Form Factor", "Slimline Ceiling Recessed"],
      ["Connection", "Dual-Band Wi-Fi (2.4GHz / 5GHz)"],
      ["Night Vision", "Starlight Sensor (0.005 Lux)"],
      ["Smart App Integration", "NightVision Mobile / Alexa / Google Home"],
      ["Dimensions", "100 x 100 x 68mm"],
      ["Weight", "310g"]
    ]
  },
  {
    id: "f7-netra-indoor-pt",
    name: "F7-Netra Indoor PT",
    code: "NV-CAM-006",
    category: "Wireless CCTV Cameras",
    productType: "Indoor CCTV Cameras",
    cameraMp: "2 MP",
    tags: ["ptz", "indoor", "wifi"],
    price: 3299,
    badge: "BUDGET FRIENDLY",
    status: "IN STOCK",
    description: "Compact pan-tilt smart camera with two-way voice call and automatic pet tracking.",
    longDesc: "The F7-Netra Indoor PT offers outstanding security and monitoring performance at an entry-level price. Perfect for nursery or pet monitoring, this camera can pan 355° and tilt 110°. When your child wakes up or your pet makes noise, it instantly fires a notification to your phone and initiates audio recording.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6nJ28PT7hwgDgMTnv4LwnYFRSuyv7f2dQaqjHSDFGw9xxwZJU_W3GuNkymfHqJt2__WFhPijujtvP4iyfDwVJ-1E7O1r6Ppiz9a6aCiy2bRPVAGASdO9Bc-q28Ev4KcukZlWIS_lTIdrLtFgAlJ6LaNltMGhp8b-PI8ajyxR7Y3UB5C81Hn8yiPvnvl42524i6_u5_LZ8pT0UUNybRbzERuc6VzHaYhGiXlKAhB-EhT_4t9cWj55oS_Fu08kiXYa7UJAhDxVKkps",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6nJ28PT7hwgDgMTnv4LwnYFRSuyv7f2dQaqjHSDFGw9xxwZJU_W3GuNkymfHqJt2__WFhPijujtvP4iyfDwVJ-1E7O1r6Ppiz9a6aCiy2bRPVAGASdO9Bc-q28Ev4KcukZlWIS_lTIdrLtFgAlJ6LaNltMGhp8b-PI8ajyxR7Y3UB5C81Hn8yiPvnvl42524i6_u5_LZ8pT0UUNybRbzERuc6VzHaYhGiXlKAhB-EhT_4t9cWj55oS_Fu08kiXYa7UJAhDxVKkps",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs"
    ],
    colors: [{ name: "Satin White", hex: "#f8f9fa" }],
    specs: [
      { icon: "360", label: "PAN TILT" },
      { icon: "record_voice_over", label: "BABY CALL / MIC" },
      { icon: "smart_toy", label: "PET DURATION" },
      { icon: "wifi", label: "PLUG & PLAY" }
    ],
    specTable: [
      ["Resolution", "1080p Full HD"],
      ["Pan Range", "355° Pan, 110° Tilt"],
      ["Infrared Range", "10m smart IR vision"],
      ["Speaker", "Integrated two-way high-fidelity speaker"],
      ["Storage", "Slot for 128GB MicroSD Card"],
      ["Installation", "Desk placement / Ceiling mount bracket included"],
      ["Dimensions", "80 x 80 x 115mm"],
      ["Weight", "180g"]
    ]
  },
  {
    id: "vanta-d2",
    name: "Vanta D2 Pro",
    code: "NV-CAM-007",
    category: "IP CCTV Cameras",
    productType: "Indoor and Outdoor CCTV Cameras",
    cameraMp: "8 MP",
    tags: ["ptz", "outdoor", "pro"],
    price: 14999,
    badge: "PRO SERIES",
    status: "LIMITED STOCK",
    description: "Pan-Tilt-Zoom powerhouse with 30× optical zoom and AI-driven auto-tracking for commercial perimeters.",
    longDesc: "The Vanta D2 Pro is NIGHTVISION™'s premier PTZ speed dome camera. With an industrial-strength motor and heavy-duty casing, it covers hundreds of meters with unparalleled detail. Its 30x optical zoom is combined with auto-tracking analytics to automatically zoom in on and follow vehicles and individuals entering secure perimeters.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo"
    ],
    colors: [{ name: "Stealth Black", hex: "#111215" }, { name: "Arctic White", hex: "#f1f3f5" }],
    specs: [
      { icon: "zoom_in", label: "30X OPTICAL ZOOM" },
      { icon: "track_changes", label: "AUTO TRACKING" },
      { icon: "visibility", label: "200M NIGHT RANGE" },
      { icon: "thermostat", label: "ALL WEATHER PROOF" }
    ],
    specTable: [
      ["Resolution", "8MP 4K UHD (3840x2160)"],
      ["Optical Zoom", "30× Optical Zoom, 16× Digital Zoom"],
      ["Pan/Tilt Range", "360° Endless Pan, -15° to 90° Auto-Flip Tilt"],
      ["Auto Tracking", "Deep Learning-based Human/Vehicle Tracking"],
      ["Laser IR Range", "Up to 200m Smart Night IR"],
      ["Casing & Rating", "IP66 Weatherproof, IK10 Vandal-Proof, TVS 6000V Surge Protection"],
      ["Dimensions", "Ø 220 x 360mm"],
      ["Weight", "3.2kg"]
    ]
  },
  {
    id: "ghost-m1",
    name: "Ghost M1",
    code: "NV-CAM-008",
    category: "Wireless CCTV Cameras",
    productType: "Indoor CCTV Cameras",
    cameraMp: "2 MP",
    tags: ["dome", "indoor", "wifi"],
    price: 4200,
    badge: "DISCREET",
    status: "IN STOCK",
    description: "Ultra-discreet mini dome for covert indoor monitoring. Invisible design meets full HD performance.",
    longDesc: "The Ghost M1 is engineered for premium environments where security devices should be completely unseen. Its flat profile and matte finish allow flush mounting in gypsum board ceilings, delivering crisp 1080p feeds with zero visual disruption. Features built-in Wi-Fi and SD backup.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs"
    ],
    colors: [{ name: "Ceiling White", hex: "#fbfcfc" }, { name: "Smoke Slate", hex: "#565c66" }],
    specs: [
      { icon: "visibility_off", label: "FLUSH COVERT" },
      { icon: "hd", label: "1080P FULL HD" },
      { icon: "wifi", label: "WI-FI CONNECT" },
      { icon: "cloud_done", label: "SD & CLOUD DUAL" }
    ],
    specTable: [
      ["Resolution", "2MP 1080p (1920x1080)"],
      ["Angle of View", "110° Ultra-Wide Field"],
      ["Form Factor", "Recessed Covert Flat Dome"],
      ["Night Vision", "10m Covert 940nm IR (Invisible Glow)"],
      ["Dimensions", "Ø 80 x 38mm (recessed depth 25mm)"],
      ["Weight", "120g"]
    ]
  },
  {
    id: "nv-nvr-08-pro",
    name: "NV-NVR-08 Pro",
    code: "NV-NVR-001",
    category: "Network Video Recoder (NVR)",
    productType: "",
    cameraMp: "",
    tags: ["nvr", "network", "recorder"],
    price: 9500,
    badge: "8 CHANNELS",
    status: "IN STOCK",
    description: "Professional 8-channel Network Video Recorder supporting 4K resolution streams and smart search.",
    longDesc: "The NV-NVR-08 Pro is designed for high-performance camera setups. It offers continuous recording across 8 channels with auto-backup, motion trigger alerts, and secure remote viewing through the NightVision cloud uplink. Fits standard racks.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk"
    ],
    colors: [{ name: "Anodized Black", hex: "#111111" }],
    specs: [
      { icon: "video_library", label: "8 CHANNELS" },
      { icon: "hd", label: "4K DECODING" },
      { icon: "settings_input_hdmi", label: "HDMI/VGA" },
      { icon: "cloud_upload", label: "AUTO UPLINK" }
    ],
    specTable: [
      ["IP Video Input", "8 Channels"],
      ["Output Resolution", "4K (3840x2160) / 1080p"],
      ["Decoding Format", "H.265+/H.265/H.264+/H.264"],
      ["SATA Interface", "1 SATA Interface (Up to 10TB Capacity)"],
      ["Network Interface", "1 RJ-45 10/100/1000 Mbps Ethernet"],
      ["USB Interface", "2 x USB 2.0"],
      ["Dimensions", "260 x 225 x 48 mm"],
      ["Weight", "1.2kg"]
    ]
  },
  {
    id: "nv-poe-08-gig",
    name: "GigaPower 8-Port POE Switch",
    code: "NV-NET-002",
    category: "POE Switch",
    productType: "",
    cameraMp: "",
    tags: ["poe", "switch", "network"],
    price: 3800,
    badge: "GIGABIT",
    status: "IN STOCK",
    description: "High performance 8-port PoE switch with 2 gigabit uplink ports, ideal for IP camera networks.",
    longDesc: "Ensure reliable power and data delivery to your IP security cameras. Supports up to 30W per PoE port with a total budget of 120W, and includes intelligent protection features.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w"
    ],
    colors: [{ name: "Steel Grey", hex: "#4a4a4a" }],
    specs: [
      { icon: "power", label: "8 POE PORTS" },
      { icon: "speed", label: "10/100/1000MBPS" },
      { icon: "offline_bolt", label: "120W BUDGET" },
      { icon: "security", label: "6KV SURGE PROT" }
    ],
    specTable: [
      ["PoE Ports", "8 x 10/100 Mbps RJ45"],
      ["Uplink Ports", "2 x 10/100/1000 Mbps RJ45"],
      ["PoE Standard", "IEEE 802.3af / IEEE 802.3at"],
      ["Max PoE Power", "30W per single port, total 120W"],
      ["Forwarding Mode", "Store-and-Forward"],
      ["MAC Address Table", "4K"],
      ["Surge Protection", "Differential Mode 4KV, Common Mode 6KV"],
      ["Dimensions", "190 x 130 x 35 mm"]
    ]
  },
  {
    id: "nv-hdd-2tb-sky",
    name: "Seagate SkyHawk 2TB HDD",
    code: "NV-MEM-003",
    category: "Hard Disk",
    productType: "",
    cameraMp: "",
    tags: ["hdd", "memory", "storage"],
    price: 7200,
    badge: "SURVEILLANCE",
    status: "IN STOCK",
    description: "Optimized for 24/7 surveillance workloads. Smooth video recording and high reliability storage.",
    longDesc: "Seagate SkyHawk surveillance drives are tuned for 24/7 video recording workloads. Outfitted with ImagePerfect firmware, they help minimize dropped frames and support multi-drive systems.",
    img: "/seagate_skyhawk_hdd.png",
    thumbs: [
      "/seagate_skyhawk_hdd.png"
    ],
    colors: [{ name: "Silver", hex: "#cccccc" }],
    specs: [
      { icon: "dns", label: "2TB CAPACITY" },
      { icon: "update", label: "5400 RPM" },
      { icon: "storage", label: "SATA 6 GB/S" },
      { icon: "verified", label: "24/7 WORKLOAD" }
    ],
    specTable: [
      ["Capacity", "2TB"],
      ["Interface", "SATA 6Gb/s"],
      ["Cache", "256MB"],
      ["Drive Bays Supported", "Up to 64 Cameras"],
      ["Reliability (MTBF)", "1,000,000 hours"],
      ["Dimensions", "147 x 101.8 x 20.2 mm"],
      ["Weight", "415g"]
    ]
  },
  {
    id: "nv-sd-128gb-ultra",
    name: "Sandisk Ultra 128GB MicroSD",
    code: "NV-MEM-004",
    category: "SD Card",
    productType: "",
    cameraMp: "",
    tags: ["sd", "memory", "storage"],
    price: 1999,
    badge: "CLASS 10",
    status: "IN STOCK",
    description: "High speed microSD card, optimized for edge-recording on Wi-Fi smart cameras.",
    longDesc: "Sandisk Ultra microSD card with Class 10 speed rating for Full HD video recording. Engineered for durability, temperature proof, waterproof, and shockproof. Ideal for smart cameras.",
    img: "/sandisk_microsd_card.png",
    thumbs: [
      "/sandisk_microsd_card.png"
    ],
    colors: [{ name: "Red/Grey", hex: "#d9534f" }],
    specs: [
      { icon: "sd_card", label: "128GB STORAGE" },
      { icon: "speed", label: "UP TO 120MB/S" },
      { icon: "security", label: "WEATHER PROOF" },
      { icon: "camera", label: "A1 RATED" }
    ],
    specTable: [
      ["Format", "microSDXC"],
      ["Capacity", "128GB"],
      ["Speed Class", "Class 10, UHS-I, A1 Rating"],
      ["Read Performance", "Up to 120MB/s"],
      ["Operating Temperature", "-25°C to 85°C"],
      ["Dimensions", "15 x 11 x 1 mm"]
    ]
  }
];
let memoryStore = [];

function getLocalStorageProducts() {
  try {
    const data = localStorage.getItem("nv_products");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function setLocalStorageProducts(products) {
  try {
    localStorage.setItem("nv_products", JSON.stringify(products));
  } catch (e) {
    // Ignore
  }
}

// Initialize memoryStore from local storage or SEED_PRODUCTS
const localData = getLocalStorageProducts();
if (localData && localData.length > 0) {
  memoryStore = localData;
} else {
  memoryStore = [...SEED_PRODUCTS];
  setLocalStorageProducts(memoryStore);
}

let dbInstance = null;
let dbInitializationPromise = null;

export function initDb() {
  if (dbInitializationPromise) {
    return dbInitializationPromise;
  }

  dbInitializationPromise = new Promise((resolve) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      dbInstance = db;

      // Force upsert seed products to update categories/types in the DB store
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      // We put all seed products to ensure they have the updated categories/productTypes/cameraMp
      SEED_PRODUCTS.forEach((product) => {
        store.put(product);
      });

      // Also ensure that memoryStore has the updated SEED_PRODUCTS
      const updatedMemoryStore = [...memoryStore];
      SEED_PRODUCTS.forEach((seedProd) => {
        const idx = updatedMemoryStore.findIndex((p) => p.id === seedProd.id);
        if (idx >= 0) {
          updatedMemoryStore[idx] = { ...updatedMemoryStore[idx], ...seedProd };
        } else {
          updatedMemoryStore.push(seedProd);
        }
      });
      memoryStore = updatedMemoryStore;
      setLocalStorageProducts(memoryStore);

      transaction.oncomplete = () => {
        resolve(db);
      };
      
      transaction.onerror = () => {
        resolve(db);
      };
    };

    request.onerror = () => {
      resolve(null);
    };
  });

  return dbInitializationPromise;
}

// Get all products
export function getAllProducts() {
  return new Promise((resolve) => {
    initDb()
      .then((db) => {
        if (!db) {
          resolve(memoryStore);
          return;
        }

        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = () => {
          resolve(memoryStore);
        };
      })
      .catch(() => {
        resolve(memoryStore);
      });
  });
}

// Get product by ID
export function getProductById(id) {
  return new Promise((resolve) => {
    initDb()
      .then((db) => {
        if (!db) {
          const prod = memoryStore.find((p) => p.id === id);
          resolve(prod || null);
          return;
        }

        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
          resolve(request.result || null);
        };
        request.onerror = () => {
          const prod = memoryStore.find((p) => p.id === id);
          resolve(prod || null);
        };
      })
      .catch(() => {
        const prod = memoryStore.find((p) => p.id === id);
        resolve(prod || null);
      });
  });
}

// Add or update a product
export function addProduct(product) {
  return new Promise((resolve, reject) => {
    // Add default values for missing specifications
    const completeProduct = {
      code: `NV-CAM-${Math.floor(100 + Math.random() * 900)}`,
      badge: "NEW ARRIVAL",
      status: "IN STOCK",
      thumbs: [product.img],
      colors: product.colors || [{ name: "Standard", hex: "#777777" }],
      specs: product.specs || [
        { icon: "hd", label: "FULL HD" },
        { icon: "wifi", label: "WI-FI ENABLED" },
        { icon: "security", label: "SECURE" }
      ],
      specTable: product.specTable || [
        ["Resolution", "1080p HD"],
        ["IP Rating", "Weatherproof Protection"],
        ["Connectivity", "Wi-Fi / Ethernet"],
        ["Audio", "Built-in Microphone"]
      ],
      ...product
    };

    // Push to fallback
    const idx = memoryStore.findIndex((p) => p.id === completeProduct.id);
    if (idx >= 0) {
      memoryStore[idx] = completeProduct;
    } else {
      memoryStore.push(completeProduct);
    }
    setLocalStorageProducts(memoryStore);

    initDb()
      .then((db) => {
        if (!db) {
          resolve(completeProduct);
          return;
        }

        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(completeProduct);

        request.onsuccess = () => {
          resolve(completeProduct);
        };
        request.onerror = (e) => {
          reject(e.target.error);
        };
      })
      .catch(() => {
        resolve(completeProduct);
      });
  });
}

// Delete product
export function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    memoryStore = memoryStore.filter((p) => p.id !== id);
    setLocalStorageProducts(memoryStore);

    initDb()
      .then((db) => {
        if (!db) {
          resolve(true);
          return;
        }

        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => {
          resolve(true);
        };
        request.onerror = (e) => {
          reject(e.target.error);
        };
      })
      .catch(() => {
        resolve(true);
      });
  });
}

// Reset database back to default seed list
export function resetDatabase() {
  return new Promise((resolve, reject) => {
    memoryStore = [...SEED_PRODUCTS];
    setLocalStorageProducts(memoryStore);

    initDb()
      .then((db) => {
        if (!db) {
          resolve(true);
          return;
        }

        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
          SEED_PRODUCTS.forEach((product) => {
            store.put(product);
          });
          resolve(true);
        };
        clearRequest.onerror = (e) => {
          reject(e.target.error);
        };
      })
      .catch(() => {
        resolve(true);
      });
  });
}

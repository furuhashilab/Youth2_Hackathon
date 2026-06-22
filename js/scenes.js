const IMPACT_MS = 1050;
const VENUE_TRANSITION_MS = 5000;
const APPROACH_MS = 4800;
const ORBIT_MS = 5200;
const SCENE_TOTAL_MS = IMPACT_MS + VENUE_TRANSITION_MS + APPROACH_MS + ORBIT_MS + 450;

function cameraStages(center, wideZoom, midZoom, closeZoom, bearing, closePitch = 74) {
  return [
    { center, zoom: wideZoom, pitch: 32, bearing: bearing - 36, duration: 1400 },
    { center, zoom: midZoom, pitch: 60, bearing: bearing - 12, duration: 1600 },
    { center, zoom: closeZoom, pitch: closePitch, bearing, duration: 1800 }
  ];
}

const STORY_SCENES = [
  {
    id: "scene-01",
    featureId: "jpn-mya-2023",
    name: "MATCH 01",
    titleLabel: "VS ミャンマー",
    date: "2023年11月16日",
    city: "大阪府吹田市",
    stadium: "パナソニック スタジアム 吹田",
    score: "日本 5 - 0 ミャンマー",
    description: "2026 FIFAワールドカップアジア2次予選初戦。上田綺世のハットトリックを軸に攻撃が爆発し、北中米への道を力強く開いた。",
    stages: cameraStages([135.538272, 34.802608], 12.6, 14.8, 16.55, -34, 74),
    orbit: { degrees: 138, pitch: 74 }
  },
  {
    id: "scene-02",
    featureId: "syr-jpn-2023",
    name: "MATCH 02",
    titleLabel: "VS シリア",
    date: "2023年11月21日",
    city: "ジッダ",
    stadium: "プリンス・アブドゥラー・アル・ファイサル・スタジアム",
    score: "日本 5 - 0 シリア",
    description: "中立地サウジアラビアでのアウェイ戦。久保建英の先制点から流れをつかみ、複数得点と無失点で予選序盤の支配力を示した。",
    stages: cameraStages([39.251693, 21.446608], 12.3, 14.5, 16.35, 42, 73),
    orbit: { degrees: -132, pitch: 73 }
  },
  {
    id: "scene-03",
    featureId: "jpn-prk-2024",
    name: "MATCH 03",
    titleLabel: "VS 北朝鮮",
    date: "2024年3月21日",
    city: "東京都新宿区",
    stadium: "国立競技場",
    score: "日本 1 - 0 北朝鮮",
    description: "国立競技場の大舞台で、開始早々に田中碧が先制。緊張感の高い展開を守り切り、2次予選突破へ大きく前進した。",
    stages: cameraStages([139.7147, 35.6780], 12.8, 15.0, 16.72, -58, 76),
    orbit: { degrees: 142, pitch: 76 }
  },
  {
    id: "scene-04",
    featureId: "jpn-chn-2024",
    name: "MATCH 04",
    titleLabel: "VS 中国",
    date: "2024年9月5日",
    city: "さいたま市",
    stadium: "埼玉スタジアム2002",
    score: "日本 7 - 0 中国",
    description: "最終予選初戦。埼玉スタジアム2002で日本は序盤から圧力をかけ続け、7得点の大勝でグループCの主導権を握った。",
    stages: cameraStages([139.7170, 35.9031], 12.4, 14.7, 16.62, 23, 76),
    orbit: { degrees: -146, pitch: 76 }
  },
  {
    id: "scene-05",
    featureId: "ksa-jpn-2024",
    name: "MATCH 05",
    titleLabel: "VS サウジアラビア",
    date: "2024年10月10日",
    city: "ジッダ",
    stadium: "キング・アブドゥラー・スポーツシティ",
    score: "日本 2 - 0 サウジアラビア",
    description: "最終予選の難所、ジッダでのアウェイ戦。鎌田大地と小川航基のゴールで勝ち切り、日本は首位争いを一歩抜け出した。",
    stages: cameraStages([39.1645, 21.7636], 12.1, 14.4, 16.28, 38, 74),
    orbit: { degrees: 134, pitch: 74 }
  },
  {
    id: "scene-06",
    featureId: "idn-jpn-2024",
    name: "MATCH 06",
    titleLabel: "VS インドネシア",
    date: "2024年11月15日",
    city: "ジャカルタ",
    stadium: "ゲロラ・ブン・カルノ・スタジアム",
    score: "日本 4 - 0 インドネシア",
    description: "熱狂的な大観衆の中で迎えたジャカルタ決戦。日本は相手の勢いを受け止めながら得点を重ね、敵地で堂々の勝利を収めた。",
    stages: cameraStages([106.8025, -6.2186], 12.4, 14.7, 16.45, -40, 74),
    orbit: { degrees: -140, pitch: 74 }
  },
  {
    id: "scene-07",
    featureId: "aus-jpn-2025",
    name: "MATCH 07",
    titleLabel: "VS オーストラリア",
    date: "2025年6月5日",
    city: "パース",
    stadium: "パース・スタジアム",
    score: "日本 0 - 1 オーストラリア",
    description: "本大会出場決定後のパース遠征。結果は敗戦となったが、強度の高い相手との一戦は、北中米へ向けた課題を浮かび上がらせた。",
    stages: cameraStages([115.8890, -31.9505], 12.0, 14.25, 16.18, 38, 72),
    orbit: { degrees: 132, pitch: 72 }
  },
  {
    id: "scene-08",
    featureId: "bhr-jpn-2024",
    name: "MATCH 08",
    titleLabel: "VS バーレーン",
    date: "2024年9月10日",
    city: "リファー",
    stadium: "バーレーン・ナショナル・スタジアム",
    score: "日本 5 - 0 バーレーン",
    description: "中東アウェイの第2戦。上田綺世、守田英正、小川航基らが得点し、日本は難しい環境でも攻守に隙を見せなかった。",
    stages: cameraStages([50.543664, 26.153594], 12.2, 14.5, 16.38, -28, 74),
    orbit: { degrees: -136, pitch: 74 }
  },
  {
    id: "scene-09",
    featureId: "jpn-bhr-2025",
    name: "MATCH 09",
    titleLabel: "VS バーレーン",
    date: "2025年3月20日",
    city: "さいたま市",
    stadium: "埼玉スタジアム2002",
    score: "日本 2 - 0 バーレーン",
    description: "鎌田大地と久保建英が決めた埼玉の夜。日本はバーレーンを下し、最終予選を突破する決定的な勝利をつかんだ。",
    stages: cameraStages([139.7170, 35.9031], 12.4, 14.8, 16.72, -76, 78),
    orbit: { degrees: 152, pitch: 78 }
  }
];



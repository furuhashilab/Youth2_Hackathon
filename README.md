# SAMURAI BLUE 2026 3D Story Map

2026 FIFAワールドカップ予選における日本代表の試合を、3D地図とカメラアニメーションでたどるストーリーマップです。

## 主な機能

- 起承転結の起と結を担うオープニング/クロージングシーン
- 2次予選から最終予選まで全16試合のストーリー表示
- 開催地間のカメラ移動
- スタジアム周辺の3D建物表示
- 3D視点でのオービットアニメーション
- 前後移動、一時停止、再生
- タイムラインによる試合選択

## 使用技術

- HTML
- CSS
- JavaScript
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
- [OpenFreeMap](https://openfreemap.org/)
- OpenStreetMap / OpenMapTiles建物データ

フレームワークやビルドツールは使用していません。

## 3D表示について

地図にはOpenFreeMap公式のLibertyスタイルを使用しています。

```text
https://tiles.openfreemap.org/styles/liberty
```

スタジアムを含む建物は、OpenStreetMap由来の建物輪郭と以下の属性をMapLibreの`fill-extrusion`で立体化しています。

- `render_height`: 建物の高さ
- `render_min_height`: 建物下端の高さ
- `building:part`: 建物を構成する部分形状

表示される形状と高さは、OpenStreetMap/OpenFreeMapに登録されているデータの精度に依存します。観客席、内部構造、詳細な屋根形状、写真テクスチャは含まれない場合があります。

## 起動方法

`fetch`でGeoJSONを読み込むため、`index.html`を直接開かず、ローカルHTTPサーバーから起動してください。

### Pythonを使う場合

```bash
python3 -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000
```

## ファイル構成

```text
.
├── README.md
├── index.html
├── css/
│   └── style.css
├── data/
│   └── japan_worldcup2026.geojson
└── js/
    ├── dataLoader.js
    ├── map.js
    ├── scenes.js
    └── story.js
```

### 各ファイルの役割

- `index.html`: 画面構造とスクリプト読み込み
- `css/style.css`: パネル、操作UI、演出のスタイル
- `data/japan_worldcup2026.geojson`: 試合・開催地データ
- `js/dataLoader.js`: GeoJSONの読み込み
- `js/map.js`: MapLibreの初期化、3D建物、カメラ制御
- `js/scenes.js`: 試合情報とカメラ設定
- `js/story.js`: シーン切り替え、再生制御、UI更新

## データを変更する場合

試合の表示内容とカメラ位置は`js/scenes.js`で設定します。

```js
{
  featureId: "jpn-mya-2023",
  titleLabel: "VS ミャンマー",
  stadium: "パナソニック スタジアム 吹田",
  stages: cameraStages(
    [135.538272, 34.802608],
    12.6,
    14.8,
    16.55,
    -34,
    74
  )
}
```

座標は`[経度, 緯度]`の順です。

試合データを追加・変更する場合は、`data/japan_worldcup2026.geojson`と`js/scenes.js`の`featureId`を一致させてください。

## 外部通信

実行時に以下の外部サービスへ接続します。

- MapLibre GL JS配信用CDN
- OpenFreeMapのスタイル、ベクタータイル、フォント、アイコン

オフライン環境では地図と3D建物を表示できません。

## ライセンスと帰属

地図上の帰属表示を削除しないでください。

- Map data: © OpenStreetMap contributors
- Vector tiles: © OpenFreeMap / © OpenMapTiles

アプリ内の試合情報を公開利用する場合は、別途その情報源と利用条件を確認してください。

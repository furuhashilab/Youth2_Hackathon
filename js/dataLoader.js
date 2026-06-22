async function loadStoryData() {
  const response = await fetch("data/japan_worldcup2026.geojson");

  if (!response.ok) {
    throw new Error(`GeoJSONを読み込めませんでした: ${response.status}`);
  }

  return response.json();
}

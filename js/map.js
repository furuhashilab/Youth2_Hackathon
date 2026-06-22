let storyMap;
let loadedGeoJson;
let routeAnimationId;
let orbitAnimationId;

const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const OPENFREEMAP_BUILDING_LAYER = "building-3d";

function createMap() {
  storyMap = new maplibregl.Map({
    container: "map",
    style: OPENFREEMAP_STYLE,
    center: [138.2529, 36.2048],
    zoom: 4.4,
    pitch: 58,
    bearing: -22,
    attributionControl: true,
    canvasContextAttributes: { antialias: true },
    maxPitch: 82
  });
  window.storyMap = storyMap;

  return storyMap;
}

function setStoryData(geoJson) {
  loadedGeoJson = geoJson;
}

function flyToScene(scene, animate = true) {
  stopOrbitCamera();
  const stages = scene.stages || [scene.camera];
  const finalCamera = stages[stages.length - 1];
  const transitionCamera = {
    ...stages[0],
    duration: VENUE_TRANSITION_MS
  };

  if (!animate) {
    setMapPhase("close");
    storyMap.jumpTo(finalCamera);
    return 0;
  }

  setMapPhase("wide");
  storyMap.flyTo({
    ...transitionCamera,
    essential: true,
    curve: 1.18
  });

  let elapsed = VENUE_TRANSITION_MS;
  stages.forEach((stage, index) => {
    window.setTimeout(() => {
      setMapPhase(index === 0 ? "wide" : index === 1 ? "mid" : "close");
      storyMap.flyTo({
        ...stage,
        essential: true,
        curve: 1.08
      });
    }, elapsed);
    elapsed += stage.duration || 1600;
  });

  return elapsed;
}

function setMapPhase(phase) {
  if (!storyMap.getLayer(OPENFREEMAP_BUILDING_LAYER)) {
    return;
  }

  const values = {
    wide: 0.15,
    mid: 0.65,
    close: 0.92
  }[phase];

  storyMap.setPaintProperty(
    OPENFREEMAP_BUILDING_LAYER,
    "fill-extrusion-opacity",
    values
  );
}

function startOrbitCamera(scene) {
  stopOrbitCamera();

  const startTime = performance.now();
  const cameras = scene.stages || [scene.camera];
  const camera = cameras[cameras.length - 1];
  const orbit = scene.orbit || {};
  const startBearing = storyMap.getBearing();
  const degrees = orbit.degrees || 135;
  const pitch = orbit.pitch || camera.pitch || 68;
  const zoom = camera.zoom;
  const center = camera.center;

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / ORBIT_MS);
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const breathingPitch = pitch + Math.sin(progress * Math.PI * 2) * 1.6;

    storyMap.jumpTo({
      center,
      zoom,
      pitch: breathingPitch,
      bearing: startBearing + degrees * eased
    });

    if (progress < 1) {
      orbitAnimationId = requestAnimationFrame(tick);
    }
  }

  orbitAnimationId = requestAnimationFrame(tick);
}

function stopOrbitCamera() {
  if (orbitAnimationId) {
    cancelAnimationFrame(orbitAnimationId);
    orbitAnimationId = null;
  }
}

function setMatchRouteData(geoJson) {
  return geoJson;
}

function animateRouteLine(targetProgress) {
  return targetProgress;
}

function setRouteProgressForScene(sceneIndex, sceneCount) {
  routeAnimationId = null;
  return { sceneIndex, sceneCount };
}

function getFeatureById(id) {
  return loadedGeoJson?.features.find((feature) => feature.properties.id === id);
}


const sceneCounter = document.getElementById("scene-counter");
const sceneName = document.getElementById("scene-name");
const sceneDescription = document.getElementById("scene-description");
const storyHeading = document.getElementById("story-heading");
const storyPanel = document.querySelector(".story-panel");
const matchDate = document.getElementById("match-date");
const matchCity = document.getElementById("match-city");
const matchStadium = document.getElementById("match-stadium");
const matchScore = document.getElementById("match-score");
const timelineScrub = document.getElementById("timeline-scrub");
const prevButton = document.getElementById("prev-button");
const playToggleButton = document.getElementById("play-toggle-button");
const nextButton = document.getElementById("next-button");
const impactOverlay = document.getElementById("impact-overlay");
const impactTitle = document.getElementById("impact-title");

let currentSceneIndex = 0;
let timerId = null;
let sequenceTimeouts = [];
let isPlaying = true;

async function bootStory() {
  const map = createMap();

  map.on("load", async () => {
    try {
      const geoJson = await loadStoryData();
      setStoryData(geoJson);
      timelineScrub.max = String(STORY_SCENES.length - 1);
      goToScene(0);
      scheduleNextScene();
    } catch (error) {
      sceneDescription.textContent = error.message;
    }
  });
}

function goToScene(index) {
  clearSequenceTimeouts();
  currentSceneIndex = (index + STORY_SCENES.length) % STORY_SCENES.length;
  const scene = STORY_SCENES[currentSceneIndex];

  showImpact(scene);
  setRouteProgressForScene(currentSceneIndex, STORY_SCENES.length);

  sequenceTimeouts.push(window.setTimeout(() => {
    updatePanel(scene);
    const flyDuration = flyToScene(scene, true);

    sequenceTimeouts.push(window.setTimeout(() => {
      startOrbitCamera(scene);
    }, flyDuration));
  }, IMPACT_MS));
}

function updatePanel(scene) {
  storyPanel.classList.add("is-changing");

  window.setTimeout(() => {
    sceneCounter.textContent = `Scene ${currentSceneIndex + 1} / ${STORY_SCENES.length}`;
    sceneName.textContent = scene.name;
    storyHeading.textContent = scene.titleLabel;
    storyHeading.setAttribute("aria-label", scene.titleLabel);
    matchDate.textContent = scene.date;
    matchCity.textContent = scene.city;
    matchStadium.textContent = scene.stadium;
    matchScore.textContent = scene.score;
    sceneDescription.textContent = scene.description;
    timelineScrub.value = String(currentSceneIndex);
    storyPanel.classList.remove("is-changing");
  }, 220);
}

function showImpact(scene) {
  impactTitle.textContent = scene.titleLabel;
  impactTitle.setAttribute("aria-label", scene.titleLabel);
  impactOverlay.classList.add("is-active");

  sequenceTimeouts.push(window.setTimeout(() => {
    impactOverlay.classList.remove("is-active");
  }, IMPACT_MS));
}

function scheduleNextScene() {
  clearTimer();

  if (!isPlaying) {
    return;
  }

  timerId = window.setTimeout(() => {
    goToScene(currentSceneIndex + 1);
    scheduleNextScene();
  }, SCENE_TOTAL_MS);
}

function clearTimer() {
  if (timerId) {
    window.clearTimeout(timerId);
    timerId = null;
  }
}

function clearSequenceTimeouts() {
  sequenceTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  sequenceTimeouts = [];
}

prevButton.addEventListener("click", () => {
  goToScene(currentSceneIndex - 1);
  scheduleNextScene();
});

nextButton.addEventListener("click", () => {
  goToScene(currentSceneIndex + 1);
  scheduleNextScene();
});

playToggleButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playToggleButton.textContent = isPlaying ? "一時停止" : "再生";

  if (!isPlaying) {
    clearTimer();
    clearSequenceTimeouts();
    stopOrbitCamera();
    impactOverlay.classList.remove("is-active");
    return;
  }

  goToScene(currentSceneIndex);
  scheduleNextScene();
});

timelineScrub.addEventListener("input", () => {
  isPlaying = true;
  playToggleButton.textContent = "一時停止";
  goToScene(Number(timelineScrub.value));
  scheduleNextScene();
});

bootStory();

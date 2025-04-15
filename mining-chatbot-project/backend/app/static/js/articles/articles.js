function openModal(title, image, desc, link) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-image").src = image;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("modal-link").href = link;
  document.getElementById("articleModal").style.display = "block";
}

function closeModal() {
  document.getElementById("articleModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("articleModal");
  if (event.target === modal) {
    closeModal();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    geocoder: false,
    navigationHelpButton: false
  });

  viewer.scene.globe.enableLighting = true;

  const miningLocations = [
    { name: "Jharia Coalfield, India", lat: 23.7486, lon: 86.4200 },
    { name: "Chuquicamata, Chile", lat: -22.3525, lon: -68.9296 },
    { name: "Kalgoorlie Super Pit, Australia", lat: -30.7495, lon: 121.4917 },
    { name: "Kirkland Lake, Canada", lat: 48.1510, lon: -80.0312 },
    { name: "Carajás Mine, Brazil", lat: -6.4956, lon: -50.1486 },
    { name: "Orapa Diamond Mine, Botswana", lat: -21.2872, lon: 25.3783 },
    { name: "Mponeng Gold Mine, South Africa", lat: -26.4244, lon: 27.4189 }
  ];

  miningLocations.forEach(location => {
    const entity = viewer.entities.add({
      name: location.name,
      position: Cesium.Cartesian3.fromDegrees(location.lon, location.lat),
      point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
      },
      description: `<strong>${location.name}</strong><br>Lat: ${location.lat}°<br>Lon: ${location.lon}°`
    });

    viewer.flyTo(entity);
  });

  // Optional: Auto rotate the Earth
  viewer.clock.onTick.addEventListener(() => {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.0002);
  });
});

<script>
  import { onMount } from 'svelte';
  let { data } = $props();

  onMount(() => {
    const countyColours = data.countyColours;
    const categoryLabels = { '#2d8a2d': 'A - Excellent', '#f5c518': 'B - Good', '#ff8c00': 'C - Fair', '#e03030': 'D - Poor' };

    const map = L.map('about-county-map').setView([53.2734, -7.7783], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17, attribution: '© OpenStreetMap'
    }).addTo(map);

    fetch('/ireland-counties.geojson')
      .then(r => r.json())
      .then(geojson => {
        L.geoJSON(geojson, {
          style: (feature) => ({
            fillColor: countyColours[feature.properties.name] || '#eeeeee',
            weight: 1.5, color: '#555', fillOpacity: 0.7
          }),
          onEachFeature: (feature, layer) => {
            const name = feature.properties.name;
            const colour = countyColours[name];
            const label = colour ? (categoryLabels[colour] || 'Data') : 'No POIs';
            layer.bindTooltip(`<strong>${name}</strong><br>${label}`);
          }
        }).addTo(map);
      });
  });
</script>

<section class="section">
  <h1 class="title">About Green Space</h1>
  <ul>
    <li>The money-saving, carbon-footprint-tracking platform.</li>
    <li>Green Space helps you monitor your CO2 emissions to create a practical solution to climate change.</li>
    <li>All while saving you money on steep electricity bills.</li>
  </ul>

  <h2 class="title is-5 mt-5">Ireland BER County Map</h2>
  <p class="subtitle is-6">Counties coloured by the majority BER rating of all tracked properties.</p>

  <div id="about-county-map" style="height: 500px; border-radius: 6px; margin-bottom: 1rem;"></div>

  <div class="box">
    <p class="is-size-7"><strong>Legend:</strong>
      <span style="color:#2d8a2d;">&#9679;</span> A - Excellent &nbsp;
      <span style="color:#f5c518;">&#9679;</span> B - Good &nbsp;
      <span style="color:#ff8c00;">&#9679;</span> C - Fair &nbsp;
      <span style="color:#e03030;">&#9679;</span> D - Poor &nbsp;
      <span style="color:#eeeeee; -webkit-text-stroke: 1px #aaa;">&#9679;</span> No data
    </p>
  </div>
</section>

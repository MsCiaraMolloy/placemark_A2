<script>
  import { onMount } from 'svelte';
  let { data } = $props();

  onMount(() => {
    const categoryColours = { A: '#2d8a2d', B: '#f5c518', C: '#ff8c00', D: '#e03030' };
    const categoryNames = { A: 'A - Excellent', B: 'B - Good', C: 'C - Fair', D: 'D - Poor' };

    // POI map
    const map = L.map('ourspace-map').setView([53.2734, -7.7783], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '© OpenStreetMap' }).addTo(map);

    const layers = { A: L.layerGroup().addTo(map), B: L.layerGroup().addTo(map), C: L.layerGroup().addTo(map), D: L.layerGroup() };
    data.allPois.forEach(poi => {
      const cat = (poi.category || '').toUpperCase().charAt(0);
      const layer = layers[cat];
      if (!layer) return;
      L.circleMarker([poi.lat, poi.lng], {
        radius: 10, fillColor: categoryColours[cat] || '#3388ff', color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
      }).bindPopup(`<strong>${poi.name}</strong><br>${poi.description}<br><em>${poi.location}</em><br>BER: <strong>${poi.category || 'N/A'}</strong><br>Owner: ${poi.owner}<br>County: ${poi.county}`)
        .addTo(layer);
    });
    const overlays = {};
    ['A', 'B', 'C', 'D'].forEach(c => { overlays[categoryNames[c]] = layers[c]; });
    L.control.layers(null, overlays, { collapsed: false }).addTo(map);

    // County map
    const countyMap = L.map('county-map').setView([53.2734, -7.7783], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '© OpenStreetMap' }).addTo(countyMap);
    fetch('/ireland-counties.geojson')
      .then(r => r.json())
      .then(geojson => {
        L.geoJSON(geojson, {
          style: (feature) => ({
            fillColor: data.countyColours[feature.properties.name] || '#eeeeee',
            weight: 1.5, color: '#555', fillOpacity: 0.7
          }),
          onEachFeature: (feature, layer) => {
            const name = feature.properties.name;
            const colour = data.countyColours[name];
            const label = colour ? 'BER Data' : 'No POIs';
            layer.bindTooltip(`<strong>${name}</strong><br>${label}`);
          }
        }).addTo(countyMap);
      });
  });
</script>

<style>
  .tree-icon { display: inline-block; margin: 0 2px; }
  .tree-icon.empty { opacity: 0.2; }
</style>

<section class="section">
  <h1 class="title">Our Space</h1>
  <p class="subtitle">Green scores based on POI categories</p>

  <div class="columns">
    <div class="column">
      <h2 class="title is-5">POI Map</h2>
      <div id="ourspace-map" style="height: 420px; border-radius: 6px;"></div>
    </div>
    <div class="column">
      <h2 class="title is-5">County BER Map</h2>
      <div id="county-map" style="height: 420px; border-radius: 6px;"></div>
    </div>
  </div>

  <div class="box my-4">
    <p class="is-size-7"><strong>Legend:</strong>
      <span style="color:#2d8a2d;">&#9679;</span> A - Excellent &nbsp;
      <span style="color:#f5c518;">&#9679;</span> B - Good &nbsp;
      <span style="color:#ff8c00;">&#9679;</span> C - Fair &nbsp;
      <span style="color:#e03030;">&#9679;</span> D - Poor &nbsp;
      <span style="color:#cccccc;">&#9679;</span> No data
    </p>
  </div>

  <table class="table is-fullwidth is-striped">
    <thead><tr><th>User</th><th>Green Score</th></tr></thead>
    <tbody>
      {#each data.users as u}
        <tr>
          <td>{u.firstName} {u.lastName}</td>
          <td>
            {#if u.greenScore !== null}
              {#each Array(u.treeCount) as _}
                <span class="tree-icon">🌲</span>
              {/each}
              {#each Array(u.emptyCount) as _}
                <span class="tree-icon empty">🌲</span>
              {/each}
              <span class="ml-2 has-text-grey">{u.greenScore}%</span>
            {:else}
              <span class="has-text-grey">No POIs yet</span>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

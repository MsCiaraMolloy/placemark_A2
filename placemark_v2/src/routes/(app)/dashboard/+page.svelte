<script>
  import { onMount } from 'svelte';
  let { data } = $props();

  onMount(() => {
    const map = L.map('dashboard-map').setView([53.2734, -7.7783], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const categoryColours = { A: '#2d8a2d', B: '#f5c518', C: '#ff8c00', D: '#e03030' };
    const layers = {};

    data.pois.forEach(poi => {
      if (!poi.lat || !poi.lng) return;
      const cat = (poi.category || '').toUpperCase().charAt(0);
      const layerKey = poi.category || 'Uncategorised';
      if (!layers[layerKey]) layers[layerKey] = L.layerGroup().addTo(map);
      L.circleMarker([poi.lat, poi.lng], {
        radius: 10,
        fillColor: categoryColours[cat] || '#3388ff',
        color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
      }).bindPopup(`<strong>${poi.name}</strong><br>${poi.description}<br><em>${poi.location}</em><br>BER: <strong>${poi.category || 'N/A'}</strong>`)
        .addTo(layers[layerKey]);
    });

    if (Object.keys(layers).length > 1) L.control.layers(null, layers).addTo(map);

    // Bar Chart
    const cats = ['A', 'B', 'C', 'D'];
    const counts = cats.map(c => data.pois.filter(p => (p.category || '').toUpperCase().charAt(0) === c).length);
    new Chart(document.getElementById('ber-chart'), {
      type: 'bar',
      data: {
        labels: ['A - Excellent', 'B - Good', 'C - Fair', 'D - Poor'],
        datasets: [{ label: 'POIs', data: counts, backgroundColor: ['#2d8a2d', '#f5c518', '#ff8c00', '#e03030'], borderRadius: 6 }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });

    // Doughnut Chart
    new Chart(document.getElementById('ber-doughnut'), {
      type: 'doughnut',
      data: {
        labels: ['A - Excellent', 'B - Good', 'C - Fair', 'D - Poor'],
        datasets: [{ data: counts, backgroundColor: ['#2d8a2d', '#f5c518', '#ff8c00', '#e03030'] }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    // Radar Chart - Sustainability
    const total = data.pois.length || 1;
    const solarCount = data.pois.filter(p => p.hasSolarPanels).length;
    const recyclingCount = data.pois.filter(p => p.hasRecyclingBin).length;
    const compostCount = data.pois.filter(p => p.hasCompostBin).length;
    const foodCount = data.pois.filter(p => p.growsOwnFood).length;
    new Chart(document.getElementById('sustainability-radar'), {
      type: 'radar',
      data: {
        labels: ['Solar Panels', 'Recycling', 'Compost', 'Grows Food'],
        datasets: [{
          label: '% of POIs',
          data: [
            Math.round((solarCount / total) * 100),
            Math.round((recyclingCount / total) * 100),
            Math.round((compostCount / total) * 100),
            Math.round((foodCount / total) * 100)
          ],
          backgroundColor: 'rgba(45, 138, 45, 0.2)',
          borderColor: '#2d8a2d',
          pointBackgroundColor: '#2d8a2d'
        }]
      },
      options: { responsive: true, scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 25 } } }, plugins: { legend: { display: false } } }
    });
  });
</script>

<section class="section">
  <h1 class="title" style="color: #2d8a2d;">Welcome to your Dashboard, {data.user.firstName} {data.user.lastName}</h1>

  <div class="box" style="border-left: 6px solid {data.footprintColour};">
    <h2 class="title is-5">User Info</h2>
    <div class="columns">
      <div class="column">
        <p><strong>Number of POIs:</strong> {data.poiCount}</p>
        <p><strong>Email:</strong> {data.user.email}</p>
      </div>
      <div class="column">
        <p><strong>Green Footprint:</strong></p>
        <span class="tag is-medium" style="background-color: {data.footprintColour}; color: white; font-size: 1rem; padding: 1rem 1.5rem;">
          {data.footprintLabel}
        </span>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div id="dashboard-map" style="height: 400px; border-radius: 6px;"></div>
    </div>
    <div class="column is-one-third">
      <div class="box" style="height: 400px; display: flex; flex-direction: column; justify-content: center;">
        <h2 class="title is-6 has-text-centered">POIs by BER Category</h2>
        <canvas id="ber-chart"></canvas>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-half">
      <div class="box" style="height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 class="title is-6 has-text-centered">BER Category Breakdown</h2>
        <canvas id="ber-doughnut"></canvas>
      </div>
    </div>
    <div class="column is-half">
      <div class="box" style="height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 class="title is-6 has-text-centered">Sustainability Adoption</h2>
        <canvas id="sustainability-radar"></canvas>
      </div>
    </div>
  </div>

  <!-- POI List -->
  {#each data.pois as poi}
    <div class="box" style="position: relative;">
      <div style="position: absolute; top: 0.75rem; right: 0.75rem; display: flex; gap: 0.5rem;">
        {#if poi.hasSolarPanels}<span title="Solar Panels" style="font-size: 1.8rem;">☀️</span>{/if}
        {#if poi.hasRecyclingBin}<span title="Recycling Bin" style="font-size: 1.8rem;">♻️</span>{/if}
        {#if poi.hasCompostBin}<span title="Compost Bin" style="font-size: 1.8rem;">🪱</span>{/if}
        {#if poi.growsOwnFood}<span title="Grows Own Food" style="font-size: 1.8rem;">🌱</span>{/if}
      </div>
      <div class="columns is-vcentered">
        <div class="column">
          <p><strong>Home Owner:</strong> {poi.name}</p>
          <p><strong>Category:</strong> {poi.category}</p>
          <p><strong>Description:</strong> {poi.description}</p>
          <p><strong>Location:</strong> {poi.location}</p>
          {#if poi.image}<p><img src={poi.image} alt={poi.name} style="max-height:120px;" /></p>{/if}
        </div>
        <div class="column is-narrow">
          <a href="/poi/{poi._id}" class="button is-info is-small"><span class="icon"><i class="fas fa-edit"></i></span></a>
          <form method="POST" action="?/deletePoi" style="display:inline;">
            <input type="hidden" name="id" value={poi._id} />
            <button class="button is-danger is-small"><span class="icon"><i class="fas fa-trash"></i></span></button>
          </form>
        </div>
      </div>
    </div>
  {/each}

  <!-- Add POI Form -->
  <form method="POST" action="?/addPoi" enctype="multipart/form-data">
    <div class="box">
      <h2 class="title is-5">Add a Point of Interest</h2>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" type="text" name="name" placeholder="e.g. alan_turing" required />
      </div>
      <div class="field">
        <label class="label">Building Description</label>
        <input class="input" type="text" name="description" placeholder="e.g. semi-detached" required />
      </div>
      <div class="field">
        <label class="label">Category - BER</label>
        <input class="input" type="text" name="category" placeholder="e.g. A" required />
      </div>
      <div class="field">
        <label class="label">Location - Eircode</label>
        <input class="input" type="text" name="location" placeholder="e.g. X91FE6T" required />
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Latitude</label>
            <input class="input" type="number" step="any" name="lat" placeholder="52.2593" />
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Longitude</label>
            <input class="input" type="number" step="any" name="lng" placeholder="-7.1101" />
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Image</label>
        <input class="input" type="file" name="image" accept="image/*" />
      </div>
      <div class="field">
        <label class="label">Sustainability</label>
        <div class="columns is-multiline">
          <div class="column is-half">
            <label class="checkbox">
              <input type="checkbox" name="hasSolarPanels" />
              ☀️ Do you have solar panels at this property?
            </label>
          </div>
          <div class="column is-half">
            <label class="checkbox">
              <input type="checkbox" name="hasRecyclingBin" />
              ♻️ Do you use a recycling bin?
            </label>
          </div>
          <div class="column is-half">
            <label class="checkbox">
              <input type="checkbox" name="hasCompostBin" />
              🪱 Do you have a compost bin?
            </label>
          </div>
          <div class="column is-half">
            <label class="checkbox">
              <input type="checkbox" name="growsOwnFood" />
              🌱 Do you grow your own food?
            </label>
          </div>
        </div>
      </div>
      <button class="button is-primary">Add POI</button>
    </div>
  </form>
</section>

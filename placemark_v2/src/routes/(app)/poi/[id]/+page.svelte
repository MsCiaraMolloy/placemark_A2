<script>
  let { data, form } = $props();
  const poi = data.poi;
</script>

<section class="section">
  {#if form?.error}
    <div class="notification is-danger">{form.error}</div>
  {/if}
  <form class="box" method="POST" style="max-width:600px;">
    <h2 class="title is-5">Edit Point of Interest</h2>
    <div class="field">
      <label class="label">Name</label>
      <input class="input" type="text" name="name" value={poi.name} />
    </div>
    <div class="field">
      <label class="label">Description</label>
      <input class="input" type="text" name="description" value={poi.description} />
    </div>
    <div class="field">
      <label class="label">Category - BER</label>
      <input class="input" type="text" name="category" value={poi.category} />
    </div>
    <div class="field">
      <label class="label">Location - Eircode</label>
      <input class="input" type="text" name="location" value={poi.location} />
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Latitude</label>
          <input class="input" type="number" step="any" name="lat" value={poi.lat} />
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Longitude</label>
          <input class="input" type="number" step="any" name="lng" value={poi.lng} />
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Image URL</label>
      <input class="input" type="text" name="image" value={poi.image || ''} />
    </div>
    <div class="field">
      <label class="label">Sustainability</label>
      <div class="columns is-multiline">
        <div class="column is-half">
          <label class="checkbox">
            <input type="checkbox" name="hasSolarPanels" checked={poi.hasSolarPanels} />
            ☀️ Solar panels at this property?
          </label>
        </div>
        <div class="column is-half">
          <label class="checkbox">
            <input type="checkbox" name="hasRecyclingBin" checked={poi.hasRecyclingBin} />
            ♻️ Use a recycling bin?
          </label>
        </div>
        <div class="column is-half">
          <label class="checkbox">
            <input type="checkbox" name="hasCompostBin" checked={poi.hasCompostBin} />
            🪱 Have a compost bin?
          </label>
        </div>
        <div class="column is-half">
          <label class="checkbox">
            <input type="checkbox" name="growsOwnFood" checked={poi.growsOwnFood} />
            🌱 Grow your own food?
          </label>
        </div>
      </div>
    </div>
    <button class="button is-primary">Update POI</button>
    <a href="/dashboard" class="button">Cancel</a>
  </form>
</section>

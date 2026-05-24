<script>
  let { data } = $props();
</script>

<section class="section">
  <h1 class="title" style="color: #1e5c1e;">{data.viewUser.firstName} {data.viewUser.lastName}</h1>
  <p class="subtitle">{data.viewUser.email}</p>
  <a href="/admin" class="button mb-4">← Back to Admin</a>

  {#if data.pois.length}
    <table class="table is-fullwidth is-striped">
      <thead style="background-color: #1e5c1e;">
        <tr>
          <th style="color:white;">Name</th>
          <th style="color:white;">Category</th>
          <th style="color:white;">Location</th>
          <th style="color:white;">Description</th>
          <th style="color:white;">Image</th>
        </tr>
      </thead>
      <tbody>
        {#each data.pois as poi}
          <tr>
            <td>{poi.name}</td>
            <td>{poi.category}</td>
            <td>{poi.location}</td>
            <td>{poi.description}</td>
            <td>{#if poi.image}<img src={poi.image} style="max-height:50px;" alt={poi.name} />{:else}<span class="has-text-grey">None</span>{/if}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="has-text-grey">This user has no POIs yet.</p>
  {/if}
</section>

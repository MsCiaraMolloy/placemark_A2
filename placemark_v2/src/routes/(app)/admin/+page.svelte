<script>
  let { data } = $props();
</script>

<section class="section">
  <h1 class="title" style="color: #1e5c1e;">Admin Dashboard</h1>
  <p class="subtitle">All registered users and their POI data.</p>

  <table class="table is-fullwidth is-striped is-hoverable">
    <thead style="background-color: #1e5c1e; color: white;">
      <tr>
        <th style="color:white;">Name</th>
        <th style="color:white;">Email</th>
        <th style="color:white;">POIs</th>
        <th style="color:white;">Green Score</th>
        <th style="color:white;">Footprint</th>
        <th style="color:white;">Role</th>
        <th style="color:white;">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.users as u}
        <tr>
          <td>{u.firstName} {u.lastName}</td>
          <td>{u.email}</td>
          <td>{u.poiCount}</td>
          <td>{u.greenScore !== null ? `${u.greenScore}%` : 'N/A'}</td>
          <td><span style="display:inline-block; width:20px; height:20px; border-radius:50%; background-color:{u.footprintColour}; vertical-align:middle;"></span></td>
          <td>{u.isAdmin ? 'Admin' : 'User'}</td>
          <td>
            <a href="/admin/user/{u._id}" class="button is-small is-info">View POIs</a>
            {#if !u.isAdmin}
              <form method="POST" action="?/deleteUser" style="display:inline;">
                <input type="hidden" name="id" value={u._id} />
                <button class="button is-small is-danger" onclick={(e) => { if (!confirm('Delete this user?')) e.preventDefault(); }}>Delete</button>
              </form>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

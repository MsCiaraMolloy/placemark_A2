<script>
  let { form } = $props();
</script>

<section class="section">
  <h1 class="title">Log in</h1>
  {#if form?.error}
    <div class="notification is-danger">{form.error}</div>
  {/if}
  <form method="POST" class="box" style="max-width:480px;">
    <div class="field">
      <label class="label">Email</label>
      <input class="input" type="email" name="email" placeholder="Enter email" required />
    </div>
    <div class="field">
      <label class="label">Password</label>
      <input class="input" type="password" name="password" placeholder="Enter password" required />
    </div>
    <button class="button is-link">Submit</button>
  </form>
</section>

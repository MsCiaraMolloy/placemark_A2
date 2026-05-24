<script>
  import { onMount } from 'svelte';
  let { active = '', user = null } = $props();

  onMount(() => {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('navMenu');
    if (burger && menu) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    }
  });
</script>

<nav class="navbar" style="background-color: #1e5c1e; padding: 0.5rem 1rem;">
  <div class="navbar-brand">
    <div class="title p-3 is-flex" style="color: white; align-items: center;">
      <i style="font-size: 48px; color: #39FF14;" class="fas fa-globe-europe"></i>
      <div class="ml-3" style="line-height: 1.2;">
        <div style="font-size: 2.4rem; font-weight: 700; color: white;">Green Space</div>
        <div style="font-size: 1.3rem; font-weight: 400; color: #39FF14;">The Carbon Footprint Tracker</div>
      </div>
    </div>
    <button class="navbar-burger" id="navBurger" aria-label="menu" aria-expanded="false" style="color: white; background: none; border: none; cursor: pointer;">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>
  <div class="navbar-menu" id="navMenu" style="background-color: #1e5c1e;">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a href="/dashboard" style="color: {active === 'dashboard' ? '#FFD700' : '#39FF14'}; font-size: 2rem; margin-right: 2rem;" title="Dashboard"><i class="fas fa-home"></i></a>
          <a href="/ourspace"  style="color: {active === 'ourspace'  ? '#FFD700' : '#39FF14'}; font-size: 2rem; margin-right: 2rem;" title="Our Space"><i class="fas fa-users"></i></a>
          <a href="/about"     style="color: {active === 'about'     ? '#FFD700' : '#39FF14'}; font-size: 2rem; margin-right: 2rem;" title="About"><i class="fas fa-info-circle"></i></a>
          {#if user?.isAdmin}
            <a class="button is-warning" href="/admin" style={active === 'admin' ? 'font-weight:700;' : 'font-weight:600;'}>Admin</a>
          {/if}
          <form method="POST" action="/logout" style="display:inline;">
            <button type="submit" style="background: none; border: none; cursor: pointer; color: #39FF14; font-size: 2rem; margin-right: 0;" title="Logout"><i class="fas fa-sign-out-alt"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</nav>

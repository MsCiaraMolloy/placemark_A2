<script>
  import { onMount } from 'svelte';

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
      <i style="font-size: 36px; color: #a8e6a8;" class="fas fa-globe-europe"></i>
      <div class="ml-3" style="line-height: 1.2;">
        <div style="font-size: 1.8rem; font-weight: 700; color: white;">Green Space</div>
        <div style="font-size: 1rem; font-weight: 400; color: #a8e6a8;">The Carbon Footprint Tracker</div>
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
          <a class="button is-light" href="/login" style="font-weight:600;">Log in</a>
          <a class="button" href="/signup" style="background-color:#a8e6a8;color:#1e5c1e;font-weight:700;">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</nav>

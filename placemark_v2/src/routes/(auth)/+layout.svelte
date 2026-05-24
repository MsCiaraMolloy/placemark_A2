<script>
  import WelcomeNav from '$lib/ui/WelcomeNav.svelte';
  let { children } = $props();
</script>

<WelcomeNav />
{@render children()}

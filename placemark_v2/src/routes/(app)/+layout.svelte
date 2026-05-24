<script>
  import Nav from '$lib/ui/Nav.svelte';
  let { data, children } = $props();
</script>

<Nav active={data.active || ''} user={data.user} />
{@render children()}

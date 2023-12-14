<script lang="ts">
	import putinSrc from '$lib/assets/putin.jpg';
	import { onDestroy, onMount } from 'svelte';

	let container: HTMLDivElement;
	let putin: HTMLImageElement;
	let interval: NodeJS.Timeout;

	onMount(() => {
		interval = setInterval(() => {
			container.appendChild(putin.cloneNode());
		}, 0);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div bind:this={container} class="flex flex-wrap">
	<img bind:this={putin} src={putinSrc} alt="Putin" />
</div>

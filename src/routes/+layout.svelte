<script>
	import '../app.pcss';
	import amogus from '$lib/assets/amogus.gif';
</script>

<div class="flex w-screen h-[100dvh] flex-col gap-3">
	<div
		class="flex-none sticky navbar bg-gradient-to-b from-white from-10% via-cyan-200 to-red-300 to-90% shadow"
	>
		<div class="navbar-start" />

		<div class="navbar-center">
			<img class="w-24" src={amogus} alt="Amogus Club Penguin Dance" />
			<a href="/" class="text-4xl font-black hidden md:inline">hooliganism hooliganism</a>
			<img class="w-24" src={amogus} alt="Amogus Club Penguin Dance" />
		</div>

		<div class="navbar-end" />
	</div>

	<div class="flex-1 mx-3 mb-3 flex flex-col gap-3">
		<slot />
	</div>
</div>

<script>
	import '../app.pcss';
	import amogus from '$lib/assets/amogus.gif';
</script>

<div class="flex h-screen w-screen flex-col gap-3">
	<div
		class="navbar sticky bg-gradient-to-b from-white from-10% via-cyan-200 to-primary to-90% shadow"
	>
		<div class="navbar-start" />

		<div class="navbar-center">
			<img class="w-24" src={amogus} alt="Amogus Club Penguin Dance" />
			<span class="text-4xl font-black">hooliganism hooliganism</span>
			<img class="w-24" src={amogus} alt="Amogus Club Penguin Dance" />
		</div>

		<div class="navbar-end" />
	</div>

	<div class="mx-3 mb-3 h-full flex flex-col gap-3">
		<slot />
	</div>
</div>

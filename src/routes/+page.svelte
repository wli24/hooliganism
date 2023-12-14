<script lang="ts">
	import { useCompletion } from 'ai/svelte';
	import type { Article } from '$lib/article';
	import { goto } from '$app/navigation';

	const { input, handleSubmit, completion } = useCompletion({
		api: '/api/compose',
		onFinish() {
			loading = false;
		},
	});

	const topics = [
		'activism',
		'authoritarianism',
		'censorship',
		'corruption',
		'economic hardship',
		'elections',
		'government',
		'hooliganism',
		'human rights',
		'Kremlin',
		'LGBTQ+',
		'nationalism',
		'Navalny',
		'political prisoners',
		'Pussy Riot',
		'Putin',
		'Prigozhin',
		'propaganda',
		'punishment of critics',
		'religious freedom',
		'Ukraine war',
		'Wagner Party',
	];

	let maximizedPanel: '' | 'lyrics' | 'sources' = '';
	let loading = false;
	let sources: Article[] = [];

	async function handleFormSubmit(ev: SubmitEvent): Promise<void> {
		loading = true;

		const valid = await (await fetch(`/api/validate/${$input}`)).json();
		if (!valid) {
			await goto('/oops');
		}

		handleSubmit(ev);
		sources = await (await fetch(`/api/search/${$input}`)).json();
	}

	const parseSong = (song: string) =>
		song.split('\n\n').map((section) => {
			const lyrics = section.split('\n');
			const title = lyrics[0].match(/\w.*\w/)?.[0];

			return {
				title,
				lyrics,
				color:
					(title &&
						{
							Verse: 'primary',
							Choru: 'secondary',
							Bridg: 'accent',
							Intro: 'neutral',
							Outro: 'neutral',
						}[title.slice(0, 5)]) ||
					'error',
			};
		});
</script>

<form class="flex flex-wrap gap-1" on:submit={handleFormSubmit}>
	<button type="submit" class="btn btn-outline btn-sm rounded-full" disabled={!$input || loading}>
		Generate

		<svg
			aria-hidden="true"
			role="status"
			class="h-5 w-5 fill-secondary transition-transform"
			class:animate-spin={loading}
			viewBox="0 0 100 105"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				class="transition-opacity"
				class:opacity-0={loading}
			></path>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
			></path>
		</svg>
	</button>

	{#each topics as topic}
		<button
			type="button"
			class="btn btn-neutral btn-sm rounded-full"
			class:btn-outline={!!topic.localeCompare($input.trim(), undefined, {
				sensitivity: 'accent',
			})}
			on:click={() => {
				if ($input) {
					$input = '';
					sources = [];
				} else {
					$input = topic;
				}
			}}
			disabled={!!$input &&
				!!topic.localeCompare($input.trim(), undefined, { sensitivity: 'accent' })}
		>
			{topic}
		</button>
	{/each}

	<input
		bind:value={$input}
		type="text"
		placeholder="custom"
		class="btn btn-neutral btn-sm rounded-full"
		class:btn-outline={topics.includes($input)}
	/>
</form>

<div class="flex-1 flex gap-3 text-xl justify-stretch">
	<section
		class="overflow-y-auto p-3 flex flex-col gap-3 rounded-2xl bg-base-200 shadow transition-all"
		class:flex-1={maximizedPanel !== 'sources'}
	>
		<button
			class="btn btn-sm rounded-2xl bg-base-100"
			on:click={() => (maximizedPanel = maximizedPanel ? '' : 'lyrics')}
		>
			Lyrics
		</button>

		<div class="relative">
			<div class="absolute inset-0 flex flex-col gap-1">
				{#each parseSong($completion) as { title, lyrics, color }}
					<div class="p-3 flex flex-col rounded-2xl bg-{color} text-{color}-content" {title}>
						{#each lyrics as line, i}
							<p
								class="transition-opacity"
								class:opacity-100={maximizedPanel !== 'sources'}
								class:opacity-0={maximizedPanel === 'sources'}
								class:font-black={!i}
							>
								{line}
							</p>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section
		class="overflow-y-auto p-3 flex flex-col gap-3 rounded-2xl bg-base-200 shadow transition-all"
		class:flex-1={maximizedPanel !== 'lyrics'}
	>
		<button
			class="btn btn-sm rounded-2xl bg-base-100"
			on:click={() => (maximizedPanel = maximizedPanel ? '' : 'sources')}
		>
			Sources
		</button>

		<div class="relative">
			<div class="absolute inset-0 flex flex-wrap justify-stretch gap-3 items-start">
				{#each sources as source}
					<div
						class="flex-1 card rounded-2xl bg-base-100 shadow min-w-[20rem] transition-opacity"
						class:opacity-100={maximizedPanel !== 'lyrics'}
						class:opacity-0={maximizedPanel === 'lyrics'}
					>
						<figure class="flex-1">
							{#if source.image}
								<img src={source.image} alt="Thumbnail for article {source.title}" />
							{/if}
						</figure>

						<div class="card-body flex-none">
							<a class="card-title" href={source.url}>
								{source.title}
								<br />
								<span class="text-sm">{source.source}, {source.relative_time}</span>
							</a>
							<p>{@html source.excerpt}</p>
							<div class="card-actions justify-end">
								<a class="btn btn-secondary" href={source.url}>Read</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

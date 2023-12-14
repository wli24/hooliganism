import memoize from 'memoizee';

export const getArticles = memoize(
	async (topic: string) => {
		const query = `Russia+${encodeURIComponent(topic)}`;

		const vqd = (await (await fetch(`https://duckduckgo.com/?q=${query}`)).text()).match(
			/vqd="([^"]*)"/,
		)![1];

		const url = `https://duckduckgo.com/news.js?l=us-en&o=json&noamp=1&q=${query}&vqd=${vqd}`;

		return ((await (await fetch(url)).json()).results as Article[]).slice(0, 10);
	},
	{
		maxAge: 600000, // 10 mins
	},
);

export interface News {
	// next: string;
	results: Article[];
}

export interface Article {
	url: string;
	source: string;
	title: string;
	excerpt: string;
	image?: string;
	// date: number; // in UNIX time
	relative_time: string;
}

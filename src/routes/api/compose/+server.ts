import type { RequestHandler } from './$types';
import { getArticles, type Article } from '$lib/article';
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { decode } from 'html-entities';

const systemPrompt = `Write a punk song about the topic given in the next message using the news articles given in the message after as context.`;

const openai = new OpenAI({});

export const config = {
	runtime: 'edge',
};

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();

	const articles = await getArticles(prompt);

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: prompt },
			{ role: 'user', content: formatArticles(articles) },
		],
		max_tokens: 2000,
		stream: true,
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
};

const formatArticles = (articles: Article[]) =>
	decode(articles.map((r) => `Title: ${r.title}\nSummary: ${r.excerpt}`).join('\n')).replace(
		/<\/?b>/g,
		'',
	);

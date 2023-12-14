import type { RequestHandler } from './$types';
import { OpenAI } from 'openai';

export const config = {
	runtime: 'edge',
};

const openai = new OpenAI({});

export const GET: RequestHandler = async ({ params }) => {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		messages: [
			{ role: 'system', content: 'Only answer true or false.' },
			{
				role: 'user',
				content:
					'In order to protest the state of present-day Russia, would someone write a punk song about the following topic:',
			},
			{
				role: 'user',
				content: `"""${params.topic}"""`,
			},
		],
		max_tokens: 100,
		temperature: 0,
	});

	return new Response(response.choices[0].message.content?.toLowerCase());
};

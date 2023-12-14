import type { RequestHandler } from './$types';
import { getArticles } from '$lib/article';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => json(await getArticles(params.topic));

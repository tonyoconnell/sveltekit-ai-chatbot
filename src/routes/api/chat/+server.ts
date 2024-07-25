import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const groq = createOpenAI({
//  baseURL: 'http://localhost:3100/chat/completions',
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: env.GROQ_API_KEY ?? ''
});


export const POST = (async ({ request }) => {
  const { messages } = await request.json();

	const result = await streamText({
		model: groq('llama-3.1-70b-versatile'),
		messages
	});

	return result.toAIStreamResponse();
}) as RequestHandler;
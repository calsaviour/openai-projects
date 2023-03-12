import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
    text: string;
}

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    }
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prompt = req.body.prompt;

    console.log(prompt);

    if(!prompt || prompt === '') {
        return new Response('Please send your prompt', { status: 400 });
    }

    // https://platform.openai.com/docs/api-reference/completions
    const aiResult = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `${prompt}`}],
        temperature: 0.7
    })

    const response = aiResult.data.choices[0].message?.content?.trim() || 'Sorry, there was a problem!';
    res.status(200).json({ text: response });
    
}
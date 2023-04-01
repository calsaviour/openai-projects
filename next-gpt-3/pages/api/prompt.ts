import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);  
    const text = req.body.text
    console.log(req.body.text)
    console.log(`this is the prompt ${text}`)

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${text}`,
        max_tokens: 500,
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
    });
    const data = completion.data.choices[0].text;
    res.status(200).json(data);
  }
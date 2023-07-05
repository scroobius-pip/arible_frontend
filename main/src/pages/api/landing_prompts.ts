import path from 'path';
import { promises as fs } from 'fs';
import { Prompt, Style } from '@/types';

export default async function handler(req: any, res: any) {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/landing.arible', 'utf8');

    res.setHeader('Cache-Control', 's-maxage=18000, stale-while-revalidate');

    const prompts = JSON.parse(fileContents) as { [key: string]: Prompt }
    const styles = Object.values(prompts).map(promptToStyle)
    res.status(200).json(styles)
}

const NEGATIVE_PROMPT = `(((naked, nsfw,  ugly mouth, ugly eyes, missing teeth, crooked teeth, out of frame))), multiple heads, multiple people, floating limbs, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, nudity`

const promptToStyle = (prompt: Prompt): Style => {
    return {

        id: prompt.summary,
        style: {
            name: prompt.summary,
            parameters: [
                // {
                //     parameter_type: {
                //         TextPrompt: {
                //             guidance_scale: 75,
                //             negative_prompt: '',
                //             prompt: '',
                //             seed: -1,
                //             num_inference_steps: 20,
                //             scheduler: 'K_EULER_ANCESTRAL'
                //         }
                //     }
                // },
                // {
                //     parameter_type: {
                //         ImageSize: {
                //             width: 768,
                //             height: 1024
                //         }
                //     }
                // }
            ],
            shared: true,
        },
        tags: prompt.tags,
        // image: prompt.images?.[0] ?? '',
        image: prompt.images?.[0] ?? '',
    }
}

// const makeGenderedPromptGeneric = (prompt: string): string => {
//     return prompt.replace(/(male|female|man|woman|boy|girl|guy|lady|gentleman)/g, '<PERSON_TYPE>');
// }
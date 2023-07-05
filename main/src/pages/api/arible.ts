import path from 'path';
import { promises as fs } from 'fs';
import { Person, Prompt, Style } from '@/types';

export default async function handler(req: any, res: any) {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/prompts.arible', 'utf8');
    //Return the content of the data file in json format
    // cache headers for 5 hours
    res.setHeader('Cache-Control', 's-maxage=18000, stale-while-revalidate');
    const prompts = JSON.parse(fileContents) as { [key: string]: Prompt };
    const styles = Object.values(prompts).map(promptToStyle);
    res.status(200).json(styles);
}
const DEFAULT_HEIGHT = 1024
const DEFAULT_WIDTH = 768
const PREFIX_PROMPT = `portrait of <PERSON_TYPE>, close-up`
const NEGATIVE_PROMPT = `(((naked, nsfw,  ugly mouth, ugly eyes, missing teeth, crooked teeth, out of frame))), multiple heads, multiple people, floating limbs, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, nudity`
const promptToStyle = (prompt: Prompt): Style => {
    return {

        id: prompt.summary,
        style: {
            name: prompt.summary,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            guidance_scale: 75,
                            negative_prompt: NEGATIVE_PROMPT,
                            prompt: `${PREFIX_PROMPT} ${makeGenderedPromptGeneric(prompt.male_prompt)}`,
                            seed: -1,
                            num_inference_steps: 20,
                            scheduler: 'K_EULER_ANCESTRAL'
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: DEFAULT_WIDTH,
                            height: DEFAULT_HEIGHT
                        }
                    }
                }
            ],
            shared: true,
        },
        tags: prompt.tags,
        image: prompt.images?.[0] ?? '',
    }
}

const makeGenderedPromptGeneric = (prompt: string): string => {
    let prompt_small_caps = prompt.toLocaleLowerCase();
    return prompt_small_caps.replace(/(male|female|man|woman|his|her|girl|guy|lady|gentleman|male's|female's|man's|woman's|boy's|girl's|guy's|lady's|gentleman's)/g, '')
        .replace(/'s/g, '')

}
// import { NEGATIVE_PROMPT, } from '@/pages/api/arible'
import { Style } from '@/types'
const NEGATIVE_PROMPT = `(((naked, nsfw,  ugly mouth, ugly eyes, missing teeth, crooked teeth, out of frame))), multiple heads, multiple people, floating limbs, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, nudity`
const PREFIX_PROMPT = ` a full body portrait, face in view`


const PromptTemplate = '<CAMERA_DISTANCE> <EMOTION>, wearing <CLOTH>, <POSTURE> in a <PLACE>, RAW, 8k UHD, DSLR, high quality'

const CAMERA_DISTANCE_PROMPT = [{
    summary: 'Close up',
    tags: ['close up'],
    prompt: 'portrait, close up'
},
{
    summary: 'Face',
    tags: ['face'],
    prompt: 'portrait, face in view'
},
{
    summary: 'Full body',
    tags: ['full body'],
    prompt: 'full body'

}
]

const EMOTION_PROMPT = [{
    summary: 'Happy',
    tags: ['happy', 'smiling'],
    prompt: 'grinning, smiling',
    negative_prompt: 'sad, crying, frowning, angry, mad, upset, depressed, crying'
},
{
    summary: 'Serious',
    tags: ['serious', 'serious face'],
    prompt: 'serious, serious face',
    negative_prompt: 'happy, smiling, grinning, laughing, laughing face, smiling face, smiling eyes, smiling mouth'
}
]

const POSTURE_PROMPT = [{
    summary: 'Standing',
    tags: ['standing'],
    prompt: 'standing, standing up',
    negative_prompt: ''
},
{
    summary: 'Sitting',
    tags: ['sitting'],
    prompt: 'sitting, sitting down',
    negative_prompt: ''
},
]

const outdoorPlaces = [
    { prompt: "The majestic Eiffel Tower in Paris, France.", summary: "Eiffel Tower" },
    { prompt: "The breathtaking Grand Canyon in Arizona, USA.", summary: "Grand Canyon" },
    { prompt: "The ancient ruins of Machu Picchu in Peru.", summary: "Machu Picchu" },
    { prompt: "The vibrant cityscape of Tokyo, Japan.", summary: "Tokyo Cityscape" },
    { prompt: "The serene beaches of Maldives.", summary: "Maldives Beaches" },
    { prompt: "The awe-inspiring Great Wall of China.", summary: "Great Wall" },
    { prompt: "The picturesque Amalfi Coast in Italy.", summary: "Amalfi Coast" },
    { prompt: "The iconic Sydney Opera House in Australia.", summary: "Sydney Opera House" },
    { prompt: "The lush tropical rainforest of Costa Rica.", summary: "Costa Rica Rainforest" },
    { prompt: "The historic and captivating city of Rome, Italy.", summary: "Rome City" },
    { prompt: "The stunning Victoria Falls in Zambia and Zimbabwe.", summary: "Victoria Falls" },
    { prompt: "The mesmerizing Northern Lights in Lapland, Finland.", summary: "Northern Lights" },
    { prompt: "The tranquil rice terraces of Bali, Indonesia.", summary: "Bali Rice Terraces" },
    { prompt: "The bustling and lively streets of New York City, USA.", summary: "New York Streets" },
    { prompt: "The enchanting cherry blossoms in Kyoto, Japan.", summary: "Kyoto Cherry Blossoms" },
    { prompt: "The awe-inspiring Pyramids of Giza in Egypt.", summary: "Pyramids of Giza" }
]

const indoorLocations = [
    { prompt: "The spacious and modern art gallery.", summary: "Art Gallery" },
    { prompt: "The cozy and intimate coffee shop.", summary: "Coffee Shop" },
    { prompt: "The elegant and luxurious hotel lobby.", summary: "Hotel Lobby" },
    { prompt: "The massive and awe-inspiring cathedral.", summary: "Cathedral" },
    { prompt: "The futuristic and innovative science museum.", summary: "Science Museum" },
    { prompt: "The colorful and lively dance studio.", summary: "Dance Studio" },
    { prompt: "The sleek and minimalist office space.", summary: "Office Space" },
    { prompt: "The beautifully designed and spacious library.", summary: "Library" },
    { prompt: "The bustling and energetic shopping mall.", summary: "Shopping Mall" },
    { prompt: "The serene and tranquil yoga studio.", summary: "Yoga Studio" },
    { prompt: "The vibrant and stimulating arcade room.", summary: "Arcade Room" },
    { prompt: "The historic and ornate opera house.", summary: "Opera House" },
    { prompt: "The luxurious and opulent ballroom.", summary: "Ballroom" },
    { prompt: "The atmospheric and enchanting jazz club.", summary: "Jazz Club" },
    { prompt: "The rustic and charming farmhouse kitchen.", summary: "Farmhouse Kitchen" },
    { prompt: "The welcoming and cozy bed and breakfast.", summary: "Bed and Breakfast" },
    { prompt: "The exotic and captivating aquarium.", summary: "Aquarium" },
    { prompt: "The chic and trendy fashion boutique.", summary: "Fashion Boutique" },
    { prompt: "The tranquil and soothing spa.", summary: "Spa" },
    { prompt: "The modern and well-equipped gym.", summary: "Gym" },
    { prompt: "The spacious and versatile conference room.", summary: "Conference Room" },
    { prompt: "The intimate and romantic restaurant.", summary: "Romantic Restaurant" },
    { prompt: "The lively and energetic indoor sports complex.", summary: "Sports Complex" },
    { prompt: "The sleek and state-of-the-art movie theater.", summary: "Movie Theater" },
    { prompt: "The cozy and inviting home living room.", summary: "Living Room" }
]

export const officialStyles: Style[] = [
    {
        id: "1",
        tags: ["arible", "realistic", "studio"],
        image: "https://replicate.delivery/pbxt/81uBq5VQC9Z3NBhaUfls3zxObASc8OZ4p05fel6f6KvpnT2CB/seed-63901.png",
        style: {
            name: "Arible Afro Studio",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait a close up of a person wearing glasses, by Chinwe Chukwuogo-Roy, featured on dribble, afrofuturism, wearing a linen shirt, official jil sander editorial, shoulders can be seen, long afro hair, white and blue color scheme, long sleeve, metallic neoprene <PERSON_TYPE>, official store photo, 2 0 2 1, '20, cropped shirt with jacket",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20

                        }
                    },
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]
        },
    },
    {
        id: "2",
        tags: ["arible", "realistic", "studio"],
        image: "https://replicate.delivery/pbxt/aze70mUheslKNUAV2oCZiMAgH08SrfrPDq44HldGWABgnychA/seed-323443333.png",
        style: {
            name: "Arible Studio",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait, a face portrait of a person, side view, realistic portrait, studio lighting, professional headshot, studio photo, dramatic lighting, digital,  8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]
        }
    },
    {
        id: "3",
        tags: ["arible", "illustration"],
        image: "https://replicate.delivery/pbxt/f7jDbC14CZT5XaxELa0pXwerbxybTxYJ0xZecloxBehnRc1CB/seed-55451.png",
        style: {
            name: "Arible Studio Illustration",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + " illustration, digital, dribbble, image generation, ai art, avatars, large <PERSON_TYPE>, portrait, side view, bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange,",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },
    {
        id: "4",
        tags: ["arible", "realistic"],
        image: "https://replicate.delivery/pbxt/gpfE69OteOvJ4UtzPtKsjQzFt3gBgaL1Fk7wUifZPpF0NsahA/seed-55262.png",
        style: {
            name: "Arible Studio Photo",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait, studio photo, dramatic lighting, digital, dribbble, image generation, ai art, avatars, large <PERSON_TYPE>, portrait, side view, bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange,  8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },
    {
        id: "5",
        tags: ["arible", "realistic", "studio"],
        image: "https://replicate.delivery/pbxt/F44XjQi7rWJVLdFbidJw1EjYm42R8n93JfmeY3AvRTuofsahA/seed-36743.png",
        style: {
            name: "Arible 3",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + " a close up of a <PERSON_TYPE> with colorful hair, trending on Artstation, holography on neck, daniela uhlig, 1 0 0 0 x 1 0 0 0 pixel art, highly detailed hyper real retro, side profile cenetered portrait, rainbow bg, gemini, bright vibrant color, full color drawing, icon for an ai app, colorful fashion, !updo hair, noir art house",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },
    {
        id: "6",
        tags: ["arible", "realistic", "studio"],
        image: "https://replicate.delivery/pbxt/UDeTulP63bWAESfMFO4VILhFVpbdpEjc19KOeq2QeP0A4a1CB/seed-42150.png",
        style: {
            name: "Arible 2",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + " studio photo, dramatic lighting, digital, dribbble, image generation, ai art, avatars, large beautiful, portrait, side view, bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, soft light",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },
    {
        id: "7",
        tags: ["arible"],
        image: "https://res.cloudinary.com/disn5401t/image/upload/fl_progressive,c_fill,f_auto,q_auto:best/v1679977033/hero_2_l98kjv.png",
        style: {
            name: "Arible",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + " digital, dribbble, image generation, ai art, avatars, large beautiful, portrait, side view, bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },

    {
        id: "8",
        tags: ["arible", "studio", "suit", "tuxedo"],
        image: "https://replicate.delivery/pbxt/Wwc1zvy6osJ1IpirPz3TWNmUcK04SFJCJy9qKUrvP8XtxHME/seed-384497613.png",
        style: {
            name: "Arible Tuxedo",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + "full body, RAW, 8k UHD, DSLR, high quality, person in a tuxedo ",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'K_EULER_ANCESTRAL',
                            num_inference_steps: 20
                        }
                    }
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: 768,
                            height: 1024
                        }
                    }
                }
            ]

        }
    },
]

const maleClothes = [
    { prompt: "A tailored two-piece tuxedo with satin lapels.", summary: "Tuxedo Suit" },
    { prompt: "A golden, shiny, sequined dinner jacket.", summary: "Golden Jacket" },
    { prompt: "A slim-fit black leather biker jacket with silver hardware.", summary: "Leather Jacket" },
    { prompt: "A soft, cozy cashmere sweater in a versatile navy color.", summary: "Cashmere Sweater" },
    { prompt: "A classic white button-down shirt with a crisp collar.", summary: "White Shirt" },
    { prompt: "A pair of stylish, slim-fit dark wash denim jeans.", summary: "Denim Jeans" },
    { prompt: "A dapper three-piece suit with a matching vest and pinstripes.", summary: "Three-Piece Suit" },
    { prompt: "A casual, short-sleeved Hawaiian shirt with a bold floral print.", summary: "Hawaiian Shirt" },
    { prompt: "A comfortable, cotton crewneck t-shirt in a neutral gray.", summary: "Crewneck Tee" },
    { prompt: "A versatile navy blazer with gold buttons and notched lapels.", summary: "Navy Blazer" },
    { prompt: "A timeless, wool peacoat with a double-breasted front.", summary: "Peacoat" },
    { prompt: "A sporty, lightweight windbreaker jacket with a hood.", summary: "Windbreaker" },
    { prompt: "A pair of classic beige chino pants with a tailored fit.", summary: "Chino Pants" },
    { prompt: "A cozy, oversized cable-knit sweater in cream.", summary: "Cable-Knit Sweater" },
    { prompt: "A trendy bomber jacket with a cool camo print.", summary: "Bomber Jacket" },
    { prompt: "A comfortable, breathable linen shirt in a light blue hue.", summary: "Linen Shirt" },
    { prompt: "A sophisticated velvet blazer with a shawl collar.", summary: "Velvet Blazer" },
    { prompt: "A pair of sleek, tailored dress pants in classic black.", summary: "Dress Pants" },
    { prompt: "A fun and casual graphic tee featuring a vintage band logo.", summary: "Graphic Tee" },
    { prompt: "A timeless plaid flannel shirt in warm autumnal tones.", summary: "Flannel Shirt" },
    { prompt: "A comfortable, moisture-wicking workout tank top.", summary: "Workout Tank" },
    { prompt: "A trendy, distressed denim jacket with a vintage wash.", summary: "Distressed Jacket" },
    { prompt: "A lightweight, moisture-wicking athletic polo shirt.", summary: "Polo Shirt" },
    { prompt: "A comfortable, fleece-lined hoodie with a front pocket.", summary: "Hoodie" },
    { prompt: "A classic, single-breasted trench coat in a neutral khaki color.", summary: "Trench Coat" },
    { prompt: "A pair of relaxed-fit cargo pants with multiple pockets.", summary: "Cargo Pants" },
    { prompt: "A cozy, quilted puffer jacket with a warm down filling.", summary: "Puffer Jacket" },
    { prompt: "A stylish, slim-fit corduroy blazer in a rich burgundy color.", summary: "Corduroy Blazer" },
]

// export const officialClothingMenStyles: Style[] = (() => {



//     return clothes.map((clothing, index): Style => {
//         return {
//             id: `${index + 9}`,
//             tags: ["arible", "studio", "clothing"],
//             image: '',
//             style: {
//                 name: clothing.summary,
//                 shared: true,
//                 parameters: [
//                     {
//                         parameter_type: {
//                             TextPrompt: {
//                                 prompt: ` full body, RAW, 8k UHD, DSLR, high quality, person in a ${clothing.prompt}, standing in a <PLACE>`,
//                                 negative_prompt: NEGATIVE_PROMPT,
//                                 seed: -1,
//                                 guidance_scale: 75,
//                                 scheduler: 'K_EULER_ANCESTRAL',
//                                 num_inference_steps: 20,
//                             }
//                         }
//                     },
//                     {
//                         parameter_type: {
//                             ImageSize: {
//                                 width: 768,
//                                 height: 1024
//                             }
//                         }
//                     }

//                 ]
//             }
//         } as Style
//     })
// })()



const femaleClothes = [
    { prompt: "A stunning floor-length silk gown with a plunging neckline.", summary: "Silk Gown" },
    { prompt: "A sleek, form-fitting little black dress with an open back.", summary: "Black Dress" },
    { prompt: "A chic, tailored blazer with gold button accents.", summary: "Tailored Blazer" },
    { prompt: "A flowing bohemian maxi dress with a vibrant floral print.", summary: "Maxi Dress" },
    { prompt: "A cozy, oversized cable-knit sweater in soft cream.", summary: "Cable-Knit Sweater" },
    { prompt: "A stylish, high-waisted A-line skirt in classic plaid.", summary: "Plaid Skirt" },
    { prompt: "A playful, ruffled off-the-shoulder top in a bold color.", summary: "Ruffled Top" },
    { prompt: "A classic, vintage-inspired midi dress with a flattering cinched waist.", summary: "Midi Dress" },
    { prompt: "A pair of versatile, dark wash skinny jeans with a comfortable stretch.", summary: "Skinny Jeans" },
    { prompt: "A timeless, double-breasted wool trench coat in a neutral camel hue.", summary: "Trench Coat" },
    { prompt: "A fashionable cropped leather jacket with silver hardware.", summary: "Leather Jacket" },
    { prompt: "A delicate, lace-trimmed silk camisole in a blush pink shade.", summary: "Silk Camisole" },
    { prompt: "A pair of high-waisted, wide-leg trousers in a crisp white.", summary: "Wide-Leg Trousers" },
    { prompt: "A comfortable, cotton wrap dress with a flattering tie waist.", summary: "Wrap Dress" },
    { prompt: "A flirty, tiered mini skirt in a bold, eye-catching pattern.", summary: "Mini Skirt" },
    { prompt: "A classic, fitted turtleneck sweater in a rich jewel tone.", summary: "Turtleneck Sweater" },
    { prompt: "A sophisticated, structured blazer dress with a belted waist.", summary: "Blazer Dress" },
    { prompt: "A pair of casual, high-waisted mom jeans with a relaxed fit.", summary: "Mom Jeans" },
    { prompt: "A feminine, off-the-shoulder midi dress with a flared skirt.", summary: "Off-Shoulder Dress" },
    { prompt: "A sporty, moisture-wicking workout tank top with a built-in bra.", summary: "Workout Tank" },
    { prompt: "A trendy, oversized denim jacket with a vintage wash.", summary: "Denim Jacket" },
    { prompt: "A comfortable, soft cotton graphic tee featuring a fun print.", summary: "Graphic Tee" },
    { prompt: "A chic, high-waisted pencil skirt in a timeless black.", summary: "Pencil Skirt" },
    { prompt: "A cozy, oversized hoodie with a statement graphic.", summary: "Oversized Hoodie" },
    { prompt: "A pair of sleek, faux leather leggings with a comfortable waistband.", summary: "Leather Leggings" },
    { prompt: "A lightweight, breezy linen blouse with a flattering V-neck.", summary: "Linen Blouse" },
    { prompt: "A classic, knee-length trench coat with a modern twist.", summary: "Modern Trench" },
    { prompt: "A trendy, cropped bomber jacket with a cool camo print.", summary: "Bomber Jacket" },
]

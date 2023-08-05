// import { NEGATIVE_PROMPT, } from '@/pages/api/arible'
import { Style } from '@/types'
const NEGATIVE_PROMPT = `(((naked, nsfw, ugly mouth, ugly eyes, missing teeth, crooked teeth, out of frame))), multiple heads, multiple people, floating limbs, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, nudity`
const PREFIX_PROMPT = `<PERSON_TYPE> `


const PromptTemplate = '<CAMERA_DISTANCE> <EXPRESSION>, wearing <CLOTH>, <PLACE>, plain background, minimal shadows, subtle contrast, crisp sharp details, RAW, 8k UHD, DSLR, high quality'

const CAMERA_DISTANCE_PROMPT = [
    {
        summary: 'Close up',
        tags: ['close up'],
        prompt: 'portrait, close up'
    },
    // {
    //     summary: 'Face',
    //     tags: ['face'],
    //     prompt: 'portrait, face in view'
    // },
    // {
    //     summary: 'Full body',
    //     tags: ['full body'],
    //     prompt: 'full body'

    // }
]

const DEFAULT_HEIGHT = 1024
const DEFAULT_WIDTH = 768
const DEFAULT_INFERENCE_STEPS = 30

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
    // {
    //     summary: 'Sitting',
    //     tags: ['sitting'],
    //     prompt: 'sitting, sitting down',
    //     negative_prompt: ''
    // },
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
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait a close up of a person wearing glasses, by Chinwe Chukwuogo-Roy, featured on dribble, afrofuturism, wearing a linen shirt, official jil sander editorial, shoulders can be seen, long afro hair, white and blue color scheme, long sleeve, metallic neoprene , official store photo, 2 0 2 1, '20, cropped shirt with jacket",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS

                        }
                    },
                },
                {
                    parameter_type: {
                        ImageSize: {
                            width: DEFAULT_WIDTH,
                            height: DEFAULT_HEIGHT
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
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait, a face portrait of a person,  realistic portrait, studio lighting, professional headshot, studio photo, dramatic lighting, digital,  8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
                            prompt: PREFIX_PROMPT + " illustration, digital, dribbble, image generation, ai art, avatars , portrait,  bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange,",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait, studio photo, dramatic lighting, digital, dribbble, image generation, ai art, avatars, large , portrait,  bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange,  8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
            ]

        }
    },
    // {
    //     id: "5",
    //     tags: ["arible", "realistic", "studio"],
    //     image: "https://replicate.delivery/pbxt/F44XjQi7rWJVLdFbidJw1EjYm42R8n93JfmeY3AvRTuofsahA/seed-36743.png",
    //     style: {
    //         name: "Arible 3",
    //         shared: true,
    //         parameters: [
    //             {
    //                 parameter_type: {
    //                     TextPrompt: {
    //                         prompt: PREFIX_PROMPT + " a close up of a  with colorful hair, trending on Artstation, holography on neck, daniela uhlig, 1 0 0 0 x 1 0 0 0 pixel art, highly detailed hyper real retro, side profile cenetered portrait, rainbow bg, gemini, bright vibrant color, full color drawing, icon for an ai app, colorful fashion, !updo hair, noir art house",
    //                         negative_prompt: NEGATIVE_PROMPT,
    //                         seed: -1,
    //                         guidance_scale: 75,
    //                         scheduler: 'DPMSolverMultistep',
    //                         num_inference_steps: DEFAULT_INFERENCE_STEPS
    //                     }
    //                 }
    //             },
    //             {
    //                 parameter_type: {
    //                     ImageSize: {
    //                         width: DEFAULT_WIDTH,
    //                         height: DEFAULT_HEIGHT
    //                     }
    //                 }
    //             }
    //         ]

    //     }
    // },
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
                            prompt: PREFIX_PROMPT + " studio photo, dramatic lighting, digital, dribbble, image generation, ai art, avatars, large beautiful, portrait,  bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, soft light",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
                            prompt: PREFIX_PROMPT + " digital, dribbble, image generation, ai art, avatars, large beautiful, portrait,  bubble gum colors, pink, orange, gray, realistic, photorealistic, rainbow hair, multiple colors, red, green, blue, yellow, orange",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
                            prompt: PREFIX_PROMPT + " in a tuxedo, full body, RAW, 8k UHD, DSLR, high quality, ",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
            ]

        }
    },
    {
        id: "9",
        tags: ["arible", "studio", "plants", "greenery", "vegetation", "illustration"],
        image: "https://replicate.delivery/pbxt/izSvKvKmnWbZHV39BwGiF3tpfkv5wfBOMPAJfMaMF10x6VihA/seed-1528857311.png",
        style: {
            name: "Arible Desert Plant",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: "Make a close-up illustration of <PERSON_TYPE> smiling, surrounded by desert plants in a Sahara style., 8k, hyper detailed, 50mm, f8",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: 1528857311,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
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
            ]

        }
    },
    {
        id: "10",
        tags: ["arible", "realistic", "studio", "scifi", "bladerunner", "sci-fi"],
        image: "https://replicate.delivery/pbxt/Gvt95G9IgxbpNBzXOjGH1DL6ezefd9hL6zY0nP4CHWc6OaihA/seed-666989952.png",
        style: {
            name: "Arible Studio Blade Runner",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: PREFIX_PROMPT + "RAW, 8k UHD, DSLR, high quality, film grain, Fujifilm XT3, RAW, analog style, detailed eyes, portrait, a face portrait of a person,  realistic portrait, studio lighting, professional headshot, studio photo, dramatic lighting, digital,  8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
                        }
                    }
                },
                {
                    parameter_type: {
                        Pose: [
                            "",
                            "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/d098a8a8-25e3-4951-8ba2-a05be2812d00/public"
                        ]
                    }
                },
                {
                    parameter_type: {
                        InitImage: {
                            image: "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/d098a8a8-25e3-4951-8ba2-a05be2812d00/public",
                            strength: 80 //doesn't work, hardcoded in the backend
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
            ]
        }
    },
    {
        id: "11",
        tags: ["arible", "realistic", "professional", "linkedin"],
        image: "https://replicate.delivery/pbxt/CczcQ5ulU5b2ChYf3jJTw7NOaxxH99X3TSm4AAYAXNhCsgbIA/seed-3805431190.png",
        style: {
            name: "Arible LinkedIn Pro Male",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: "((photo of sks man in a polished, tailored suit with a crisp, white button-down shirt., full-body, looking at camera, grainy, blazer, formal clothing)) (photo, sharp focus, big depth of field, sony a7, 50mm, canon 5d, blurry background, epic, face symmetry, natural lighting, hard light, pores, wrinkles, batman , Christopher Nolan, hyperrealistic, colors, hyperdetailed)  ",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
                        }
                    }
                },

                {
                    parameter_type: {
                        InitImage: {
                            image: "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/e3fd3696-d34f-42e6-fee1-4a63c85dfe00/public",
                            strength: 80 //doesn't work, hardcoded in the backend
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
            ]
        }
    },
    {
        id: "12",
        tags: ["arible", "realistic", "professional", "linkedin"],
        image: "https://replicate.delivery/pbxt/wKmq6IW8nUYjP5V7d9vvsf9vuauVtPOFirfjK8e1TrEIIEuhA/seed-754424091.png",
        style: {
            name: "Arible LinkedIn Pro Male 2",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: "((photo of sks man in a polished, tailored suit with a crisp, white button-down shirt, full-body, looking at camera, grainy, blazer, formal clothing)) (photo, sharp focus, big depth of field, sony a7, 50mm, canon 5d, blurry background, epic, face symmetry, natural lighting, hard light, pores, wrinkles, batman , Christopher Nolan, hyperrealistic, colors, hyperdetailed) ",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
                        }
                    }
                },

                {
                    parameter_type: {
                        InitImage: {
                            image: "https://cyggfpyiva.cloudimg.io/https://s.arible.co/BrpMw5rSQghub4T0izrZ6t.jpg?w=768&h=1024&func=crop",
                            strength: 80 //doesn't work, hardcoded in the backend
                        }
                    }
                },
                {
                    parameter_type: {
                        Pose: ["", "https://cyggfpyiva.cloudimg.io/https://s.arible.co/BrpMw5rSQghub4T0izrZ6t.jpg?w=768&h=1024&func=crop"]
                    },
                },

                {
                    parameter_type: {
                        ImageSize: {
                            width: DEFAULT_WIDTH,
                            height: DEFAULT_HEIGHT
                        }
                    }
                }
            ]
        }
    },
    {
        id: "13",
        tags: ["arible", "realistic", "professional", "linkedin"],
        image: "https://replicate.delivery/pbxt/SAc2YBPt3soOPVNyxUffjLQJCBfeTAlh5ehm5HZRJdVUhQ4GC/seed-2549650915.png",
        style: {
            name: "Arible LinkedIn Pro Male 3",
            shared: true,
            parameters: [
                {
                    parameter_type: {
                        TextPrompt: {
                            prompt: "((photo of sks man in a polished, tailored suit with a crisp, white button-down shirt., full-body, looking at camera, grainy, blazer, formal clothing)) (photo, sharp focus, big depth of field, sony a7, 50mm, canon 5d, blurry background, epic, face symmetry, natural lighting, hard light, pores, wrinkles, batman , Christopher Nolan, hyperrealistic, colors, hyperdetailed)",
                            negative_prompt: NEGATIVE_PROMPT,
                            seed: -1,
                            guidance_scale: 75,
                            scheduler: 'DPMSolverMultistep',
                            num_inference_steps: DEFAULT_INFERENCE_STEPS
                        }
                    }
                },

                {
                    parameter_type: {
                        InitImage: {
                            image: "https://cyggfpyiva.cloudimg.io/https://s.arible.co/BrpMw5rSQghub4T0izrZBA.jpg?w=768&h=1024&func=crop",
                            strength: 80 //doesn't work, hardcoded in the backend
                        }
                    }
                },
                {
                    parameter_type: {
                        Pose: ["",
                            "https://cyggfpyiva.cloudimg.io/https://s.arible.co/BrpMw5rSQghub4T0izrZBA.jpg?w=768&h=1024&func=crop",
                        ]

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
            ]
        }
    },

]

export const maleClothes = [
    { prompt: 'A sleek, minimalist black turtleneck and a pair of well-fitted blue jeans. modern, open-concept office', summary: 'Silicon Valley', image: 'https://replicate.delivery/pbxt/Keyzutw1VsyUB62GsQRXkgYQuFnJUYObHLef7V5fMQZC9zCDB/seed-3947990359.png' },
    { prompt: "A tailored two-piece tuxedo with satin lapels.", summary: "Tuxedo Suit", image: 'https://replicate.delivery/pbxt/qQYJvavLwOohIJXSNZNW3PeiTnRKGNzxyCSVJ0kZwlXxaUYIA/seed-3954830044.png' },
    { prompt: "A golden, shiny, sequined dinner jacket.", summary: "Golden Jacket", image: 'https://replicate.delivery/pbxt/8SIlThoh9BLEL5GVO7k2fQCXKjcWDy9ldwhDkv4fFG8nqnwQA/seed-3333.png' },
    { prompt: "A slim-fit black leather biker jacket with silver hardware.", summary: "Leather Jacket", image: 'https://replicate.delivery/pbxt/xxbB19QfPd0DN668NLBT5PUZcL0jaDkoYVAjUBGgJw9D2TYIA/seed-916867387.png' },
    { prompt: "A soft, cozy cashmere sweater in a versatile navy color.", summary: "Cashmere Sweater", image: 'https://replicate.delivery/pbxt/Domd9yWxGALJFNDza2438KdJUQozItZr8WcrMb7vJJS31KME/seed-1056531643.png' },
    { prompt: "A classic white button-down shirt with a crisp collar.", summary: "White Shirt", image: 'https://replicate.delivery/pbxt/3yBhU114045rKZshPYfPYQYc1Q5AXvHxlgpf88KTWHkHeVhhA/seed-624293126.png' },
    { prompt: "A pair of stylish, slim-fit dark wash denim jeans.", summary: "Denim Jeans", image: 'https://replicate.delivery/pbxt/eZCmONymAJSeyE6hC7vP0hKVstvg7STWa34ul1Di1UfnpWhhA/seed-2897357937.png' },
    { prompt: "A dapper three-piece suit with a matching vest and pinstripes.", summary: "Three-Piece Suit", image: 'https://replicate.delivery/pbxt/pMotmcLdXtabMxATANqeAK8Epfe7kD8kYer0Iz4ZLkBfuXFGC/seed-1942936287.png' },
    { prompt: "A casual, short-sleeved Hawaiian shirt with a bold floral print.", summary: "Hawaiian Shirt", image: 'https://replicate.delivery/pbxt/gnKAeaWY3p1CfUs2Vymcg19pXuTVi9f9rqc8lz5QmY5jkWhhA/seed-2853972088.png' },
    { prompt: "A comfortable, cotton crewneck t-shirt in a neutral gray.", summary: "Crewneck Tee", image: 'https://replicate.delivery/pbxt/IyTU7joDiXpbNlfKo5vDmD2vD08lkb4IvuhUpeKzstzEVrwQA/seed-3866201795.png' },
    { prompt: "A versatile navy blazer with gold buttons and notched lapels.", summary: "Navy Blazer", image: 'https://replicate.delivery/pbxt/OKXrRy2VfkU2EqewwAxgsNf6b2wrMhWbNLUr0gGFdKXf4rCDB/seed-274085379.png' },
    { prompt: "A timeless, wool peacoat with a double-breasted front.", summary: "Peacoat", image: 'https://replicate.delivery/pbxt/tSSBxcPfViRoNaRfTxJh7Cel2VxIq6fORyo8VsdN6s3D7sCDB/seed-3254681682.png' },
    { prompt: "A sporty, lightweight windbreaker jacket with a hood.", summary: "Windbreaker", image: 'https://replicate.delivery/pbxt/TMZrCU2PepSASiVWLPxX4XsCmAVp3bgQh7Uu8z9t6xqPnVYIA/seed-3287888696.png' },
    { prompt: "A pair of classic beige chino pants with a tailored fit.", summary: "Chino Pants", image: 'https://replicate.delivery/pbxt/VH4R4kHugfRZO6ewqIRZyuRTypgqgxJezYqFcdH7MGECerCDB/seed-1393697346.png' },
    { prompt: "A cozy, oversized cable-knit sweater in cream.", summary: "Cable-Knit Sweater", image: 'https://replicate.delivery/pbxt/K6yCafi4OU1LD6f4e6Q3snty0O1W04uY2PWwGAsbIRuQhWhhA/seed-1479466479.png' },
    { prompt: "A trendy bomber jacket with a cool camo print.", summary: "Bomber Jacket", image: 'https://replicate.delivery/pbxt/Ue2SNeOOjfMH6JIKn9LwXoAWKubDvtUx4PhxxV43LkvhCWhhA/seed-3663619167.png' },
    { prompt: "A comfortable, breathable linen shirt in a light blue hue.", summary: "Linen Shirt", image: 'https://replicate.delivery/pbxt/z5KdUeVUW5S7aqa0WVZMQ7JGLDgOblBXn6UHevBSfWutqWhhA/seed-942976741.png' },
    { prompt: "A sophisticated velvet blazer with a shawl collar.", summary: "Velvet Blazer", image: 'https://replicate.delivery/pbxt/MAffWWJLLprtUEnYHYyVO9OueYG6WBPmRHnnnWIDJkTjjWhhA/seed-2591261476.png' },
    { prompt: "A pair of sleek, tailored dress pants in classic black.", summary: "Dress Pants", image: 'https://replicate.delivery/pbxt/ZWSAiFB2dexqW68zQf3dEWjushAm6mNz4jBAsS960cVmSrwQA/seed-1670097179.png' },
    { prompt: "A fun and casual graphic tee featuring a vintage band logo.", summary: "Graphic Tee", image: 'https://replicate.delivery/pbxt/k1lfAhycCNUhC6fjqU5mfyTQbOrQ8IR8F0sDHCy8guY0HWhhA/seed-1402032636.png' },
    { prompt: "A timeless plaid flannel shirt in warm autumnal tones.", summary: "Flannel Shirt", image: 'https://replicate.delivery/pbxt/iTdojRnSr0ZiM5tlAFdNTQ1aO0A0IlDdUlNyY3DOFowt0KME/seed-1745356655.png' },
    { prompt: "A comfortable, moisture-wicking workout tank top.", summary: "Workout Tank", image: 'https://replicate.delivery/pbxt/iwBqMXwAIo7IGpmiYdFzX0qUxX4VYfA7NEo2RwfbE55eJWhhA/seed-2605817549.png' },
    { prompt: "A trendy, distressed denim jacket with a vintage wash.", summary: "Distressed Jacket", image: 'https://replicate.delivery/pbxt/cLRzTg7lcJYICxfrXOEWaSCfLPF0OCIckcnLps2rxraoYrwQA/seed-2533252650.png' },
    { prompt: "A lightweight, moisture-wicking athletic polo shirt.", summary: "Polo Shirt", image: 'https://replicate.delivery/pbxt/UMLblLvdZMKxPRw1sqzu8S7lDDi9MWCPIBCNH8wWJY4TxKME/seed-3641839743.png' },
    { prompt: "A comfortable, fleece-lined hoodie with a front pocket.", summary: "Hoodie", image: 'https://replicate.delivery/pbxt/AuDiOIk1sObLB5jx4rzESWN8hTRgNmpD0zSRXlPWWqeQrVYIA/seed-328350638.png' },
    { prompt: "A classic, single-breasted trench coat in a neutral khaki color.", summary: "Trench Coat", image: 'https://replicate.delivery/pbxt/0Q6BVYNEb7qNLRW61ZNQMBweBirjfghwx8LBvmWB0pkXFrwQA/seed-3167100413.png' },
    { prompt: "A pair of relaxed-fit cargo pants with multiple pockets.", summary: "Cargo Pants", image: 'https://replicate.delivery/pbxt/p2pj74vtJqL0EtPpUDczpp3Bh3V9TLe8oScYbDYIYQnLfqwQA/seed-1905364826.png' },
    { prompt: "A cozy, quilted puffer jacket with a warm down filling.", summary: "Puffer Jacket", image: 'https://replicate.delivery/pbxt/JqRFIIFHJuK8CZxfcMT0mkGFQo7eUVehkaiuPonyWezpwkCDB/seed-1385024165.png' },
    { prompt: "A stylish, slim-fit corduroy blazer in a rich burgundy color.", summary: "Corduroy Blazer", image: 'https://replicate.delivery/pbxt/2z3Au6xQSJ44G18zcdImeI1Q77Uujw1xNwVBGdncwAGPfqwQA/seed-1844923809.png' },
    {
        "prompt": "A sharp, tailored suit with a crisp dress shirt.",
        "summary": "Tailored Suit"
    },
    {
        "prompt": "A stylish, button-down shirt with slim-fit trousers.",
        "summary": "Button-Down Shirt"
    },
    {
        "prompt": "A classic, crew-neck sweater with straight-leg jeans.",
        "summary": "Crew-Neck Sweater"
    },
    {
        "prompt": "A sophisticated, blazer and chinos with a collared shirt.",
        "summary": "Blazer and Chinos"
    },
    {
        "prompt": "A trendy, bomber jacket with distressed denim.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sleek, turtleneck sweater with tailored trousers.",
        "summary": "Turtleneck Sweater"
    },
    {
        "prompt": "A polished, three-piece suit with a patterned tie.",
        "summary": "Three-Piece Suit"
    },
    {
        "prompt": "A casual, denim jacket with a basic tee and chinos.",
        "summary": "Denim Jacket"
    },
    {
        "prompt": "A modern, leather jacket with slim-fit jeans.",
        "summary": "Leather Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching tie and slacks.",
        "summary": "Dress Shirt and Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with dark wash jeans.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored shorts.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and trousers.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress pants.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed denim.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit trousers.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped jeans.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki pants.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored chinos.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress pants.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-leg trousers.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black jeans.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut pants.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit pants.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped denim.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki trousers.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored trousers.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress slacks.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-cut pants.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black pants.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit pants.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped denim.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki trousers.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored pants.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress slacks.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-cut pants.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black pants.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    }
    // { prompt: '((photo of sks man in a suit, full-body, grainy, jacket, formal clothing)) (photo, sharp focus, big depth of field, sony a7, 50mm, canon 5d, blurry background, epic, face symmetry, natural lighting, hard light, pores, wrinkles, batman , Christopher Nolan, hyperrealistic, colors, hyperdetailed) ', summary: 'LinkedIn Blazer', image: '' },
    // { prompt: 'A polished, tailored suit with a crisp, white button-down shirt.', summary: 'LinkedIn Pro', image: '' }
]


export const promptFromCloth = (clothes: Array<{ prompt: string, summary: string, image?: string }>) => {
    return clothes.map((clothing, index): Style => {
        const prompt = PromptTemplate.replace("<CAMERA_DISTANCE>", CAMERA_DISTANCE_PROMPT[0].prompt)
            .replace("<PLACE>", 'studio setup')
            .replace("<CLOTH>", clothing.prompt)
            // .replace("<POSTURE>", "standing")
            .replace("<EXPRESSION>", "smiling")

        return {
            id: clothing.summary + index,
            tags: ["arible", "studio", "clothing", "professional", "pro", "linkedin", "fashion"],
            image: clothing.image ?? '',
            style: {
                name: `${clothing.summary}`,
                shared: true,
                parameters: [
                    {
                        parameter_type: {
                            TextPrompt: {
                                prompt: `<PERSON_TYPE> ${prompt}`,
                                negative_prompt: NEGATIVE_PROMPT,
                                seed: -1,
                                guidance_scale: 75,
                                scheduler: 'DPMSolverMultistep',
                                num_inference_steps: DEFAULT_INFERENCE_STEPS,
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

                ]
            }
        } as Style
    })
}
// 


export const femaleClothes = [
    { prompt: 'A sleek, minimalist black turtleneck and a pair of well-fitted blue jeans. modern, open-concept office', summary: 'Silicon Valley', image: 'https://replicate.delivery/pbxt/8SIlThoh9BLEL5GVO7k2fQCXKjcWDy9ldwhDkv4fFG8nqnwQA/seed-3333.png' },
    { prompt: "A stunning floor-length silk gown with a plunging neckline.", summary: "Silk Gown", image: 'https://replicate.delivery/pbxt/FI6oZTdd1lbYB5vOSdlsW5ftznqWODeKNoh8PcOIRqEcdqwQA/seed-3172981170.png' },
    { prompt: "A sleek, form-fitting little black dress with an open back.", summary: "Black Dress", image: 'https://replicate.delivery/pbxt/Z3EcPREaY5pkJlkd3tAnfm5DaAx7SKii7ZcX8LXcAaIYZVYIA/seed-3899611304.png' },
    { prompt: "A chic, tailored blazer with gold button accents.", summary: "Tailored Blazer", image: 'https://replicate.delivery/pbxt/1QDImUdemCSDDCjCCiCOKRuvBuP144LQLKG6jiB4QtaeJrwQA/seed-426229009.png' },
    { prompt: "A flowing bohemian maxi dress with a vibrant floral print.", summary: "Maxi Dress", image: 'https://replicate.delivery/pbxt/oP0dx0KAJb4TGVlWF7EtQa6ZAj3mNxKHV0tPk4WPjsOsdKME/seed-3528752601.png' },
    { prompt: "A cozy, oversized cable-knit sweater in soft cream.", summary: "Cable-Knit Sweater", image: 'https://replicate.delivery/pbxt/jZUgF3XFebUgA63jwWKf02VQep5FyGfjT1jb79sdMszuqsCDB/seed-3715746473.png' },
    { prompt: "A stylish, high-waisted A-line skirt in classic plaid.", summary: "Plaid Skirt", image: 'https://replicate.delivery/pbxt/HVoMWGqDXoYEH1am3VMfkgoO6AgwpkqF5We5QeaUmiaMGVhhA/seed-2029212444.png' },
    { prompt: "A playful, ruffled off-the-shoulder top in a bold color.", summary: "Ruffled Top", image: 'https://replicate.delivery/pbxt/czwJmGkVPUalBRcmjUHwveAF1wb9ceHOcg9EdmfvfSesWUFGC/seed-3681252529.png' },
    { prompt: "A classic, vintage-inspired midi dress with a flattering cinched waist.", summary: "Midi Dress", image: 'https://replicate.delivery/pbxt/ctj6q88KciadGdz8X841NwuXIChBcC2jzh10wBGoQi2dyKME/seed-3479240985.png' },
    { prompt: "A pair of versatile, dark wash skinny jeans with a comfortable stretch.", summary: "Skinny Jeans", image: 'https://replicate.delivery/pbxt/zFk7J1RUCVYoKNqBPgAz1x5ukgaGLIN11daLzwB3LxOjyKME/seed-2166973879.png' },
    { prompt: "A timeless, double-breasted wool trench coat in a neutral camel hue.", summary: "Trench Coat", image: 'https://replicate.delivery/pbxt/WM5aKtd7hjqSLByNveagR28op7prc0UzSkmM6pOoH5XgZVYIA/seed-3751665275.png' },
    { prompt: "A fashionable cropped leather jacket with silver hardware.", summary: "Leather Jacket", image: 'https://replicate.delivery/pbxt/GNtTQqwihpJtPx5NTtZdg9ApD6eLq6JlfHkFFLdfZGObuVhhA/seed-3460951971.png' },
    { prompt: "A delicate, lace-trimmed silk camisole in a blush pink shade.", summary: "Silk Camisole", image: 'https://replicate.delivery/pbxt/v01t1zblgAKrE9kLpd7aDStvg6Az0AjeCqQJR8eIQ4F8MrwQA/seed-800478648.png' },
    { prompt: "A pair of high-waisted, wide-leg trousers in a crisp white.", summary: "Wide-Leg Trousers", image: 'https://replicate.delivery/pbxt/rXboOxgDez1EQyXmBCSMCTcbtdpHBXrffskBQJXIGtJ7uVhhA/seed-1899927967.png' },
    { prompt: "A comfortable, cotton wrap dress with a flattering tie waist.", summary: "Wrap Dress", image: 'https://replicate.delivery/pbxt/fBpjGhut8kQiIq6Wfq7Nf7bJfaNfgaURGC8e5rHneVBB5dRYIA/seed-1756825458.png' },
    { prompt: "A flirty, tiered mini skirt in a bold, eye-catching pattern.", summary: "Mini Skirt", image: 'https://replicate.delivery/pbxt/hao7xedxCFyodKX3NnDwqJUVSdd3EepnieE4NVpqMmAhkVhhA/seed-2163031918.png' },
    { prompt: "A classic, fitted turtleneck sweater in a rich jewel tone.", summary: "Turtleneck Sweater", image: 'https://replicate.delivery/pbxt/gfTALmfn88meOIPAzGNYHakZ7hVonfRrJes3DjgAq0DeKzKME/seed-3818404638.png' },
    { prompt: "A sophisticated, structured blazer dress with a belted waist.", summary: "Blazer Dress", image: 'https://replicate.delivery/pbxt/ERjBNudsdm4ELlicOpK2juPF7LmVSddXuzNM5lUQLiKosKME/seed-3063731155.png' },
    { prompt: "A pair of casual, high-waisted mom jeans with a relaxed fit.", summary: "Mom Jeans", image: 'https://replicate.delivery/pbxt/e5rNicyNqM2CMSaXuXFDZmJpdqacaswuKmJj6lR5WLIzcVYIA/seed-543944120.png' },
    { prompt: "A feminine, off-the-shoulder midi dress with a flared skirt.", summary: "Off-Shoulder Dress", image: 'https://replicate.delivery/pbxt/hCLrR9DpBapaIp2GJYyCrz5utJuiPn0nXPRXHfTA7ggkcVYIA/seed-2252814093.png' },
    { prompt: "A sporty, moisture-wicking workout tank top with a built-in bra.", summary: "Workout Tank", image: 'https://replicate.delivery/pbxt/2eLt4eepCfBGmSYYTwFOiKTiAjbz7RMse2c0dewdLFEAMxKME/seed-3151828526.png' },
    { prompt: "A trendy, oversized denim jacket with a vintage wash.", summary: "Denim Jacket", image: 'https://replicate.delivery/pbxt/N3SUpbgZ2grfdqKWijTcKyDe2hUGvvaYU011kdifHWnzuVhhA/seed-641399513.png' },
    { prompt: "A comfortable, soft cotton graphic tee featuring a fun print.", summary: "Graphic Tee", image: 'https://replicate.delivery/pbxt/yER8PH08DlbfMycDnLfUxemXqpiieChoSkXCdXwofyxjTZFGC/seed-3271484082.png' },
    { prompt: "A chic, high-waisted pencil skirt in a timeless black.", summary: "Pencil Skirt", image: 'https://replicate.delivery/pbxt/slVFdcYHtN5qPte7ffjf8kYAVLfssHso7a6Fd6HvRjJW9WFGC/seed-223575073.png' },
    { prompt: "A cozy, oversized hoodie with a statement graphic.", summary: "Oversized Hoodie", image: 'https://replicate.delivery/pbxt/dRqMKz3EEBKZMVQPsj64Y0zpqvdxWbEHFowZ24SwFCYWtKME/seed-1086794986.png' },
    { prompt: "A pair of sleek, faux leather leggings with a comfortable waistband.", summary: "Leather Leggings", image: 'https://replicate.delivery/pbxt/dCKI6mkHi1rYF9xB4yrhtrOu5ZLZhw3C1613kdBRh2YemVYIA/seed-1995704180.png' },
    { prompt: "A lightweight, breezy linen blouse with a flattering V-neck.", summary: "Linen Blouse", image: 'https://replicate.delivery/pbxt/lX0c9yWUEMbSNNMgTdPOkjfEcttm9HmFz6gg5MzFmpMBaUYIA/seed-3543036950.png' },
    { prompt: "A classic, knee-length trench coat with a modern twist.", summary: "Modern Trench", image: 'https://replicate.delivery/pbxt/TmUZMIfNliWewU7YXVmj0OGu4l5uDJz7HUMJKCNNmOhh9qwQA/seed-3745615147.png' },
    { prompt: "A trendy, cropped bomber jacket with a cool camo print.", summary: "Bomber Jacket", image: 'https://replicate.delivery/pbxt/DMF0mSdq52qDLhF7JCunHI5kfKTsxUfLoj2G7bWE2mxd7qwQA/seed-2821715855.png' },

    {
        "prompt": "A crisp, tailored blazer and fitted trousers.",
        "summary": "Tailored Blazer"
    },
    {
        "prompt": "A flowy, knee-length sundress with delicate patterns.",
        "summary": "Knee-Length Sundress"
    },
    {
        "prompt": "A classic, button-down white shirt and high-waisted pants.",
        "summary": "White Button-Down"
    },
    {
        "prompt": "A sophisticated, knee-length pencil skirt and tucked-in blouse.",
        "summary": "Pencil Skirt"
    },
    {
        "prompt": "A chic, sleeveless jumpsuit with a belted waist.",
        "summary": "Sleeveless Jumpsuit"
    },
    {
        "prompt": "A trendy, oversized denim jacket with distressed details.",
        "summary": "Oversized Denim Jacket"
    },
    {
        "prompt": "A stylish, wide-brimmed hat and flowing maxi dress.",
        "summary": "Wide-Brimmed Hat"
    },
    {
        "prompt": "A polished, knee-length sheath dress with a tailored fit.",
        "summary": "Sheath Dress"
    },
    {
        "prompt": "A cozy, cable-knit sweater and collared shirt.",
        "summary": "Cable-Knit Sweater"
    },
    {
        "prompt": "A modern, structured leather jacket with zipper accents.",
        "summary": "Structured Leather Jacket"
    },
    {
        "prompt": "A sleek, high-necked bodysuit and wide-leg trousers.",
        "summary": "High-Neck Bodysuit"
    },
    {
        "prompt": "A sophisticated, tailored pantsuit with a crisp blazer.",
        "summary": "Tailored Pantsuit"
    },
    {
        "prompt": "A trendy, off-the-shoulder top and distressed denim shorts.",
        "summary": "Off-Shoulder Top"
    },
    {
        "prompt": "A classic, knee-length trench coat and fitted dress.",
        "summary": "Knee-Length Trench Coat"
    },
    {
        "prompt": "A stylish, wide-legged jumpsuit with a halter neckline.",
        "summary": "Wide-Leg Jumpsuit"
    },
    {
        "prompt": "A chic, tailored vest and button-down shirt.",
        "summary": "Tailored Vest"
    },
    {
        "prompt": "A fashionable, pleated midi skirt and tucked-in blouse.",
        "summary": "Pleated Midi Skirt"
    },
    {
        "prompt": "A trendy, cropped leather jacket with zipper details.",
        "summary": "Cropped Leather Jacket"
    },
    {
        "prompt": "A relaxed, oversized sweater and skinny jeans.",
        "summary": "Oversized Sweater"
    },
    {
        "prompt": "A modern, asymmetrical wrap dress with a cinched waist.",
        "summary": "Asymmetrical Wrap Dress"
    },
    {
        "prompt": "A sleek, tailored blazer and matching pencil skirt.",
        "summary": "Tailored Blazer"
    },
    {
        "prompt": "A feminine, ruffled blouse and high-waisted trousers.",
        "summary": "Ruffled Blouse"
    },
    {
        "prompt": "A stylish, cropped jumpsuit with wide-legged pants.",
        "summary": "Cropped Jumpsuit"
    },
    {
        "prompt": "A sophisticated, knee-length wrap dress with a V-neckline.",
        "summary": "Knee-Length Wrap Dress"
    },
    {
        "prompt": "A trendy, oversized blazer and basic tee.",
        "summary": "Oversized Blazer"
    },
    {
        "prompt": "A classic, knee-length A-line skirt and fitted top.",
        "summary": "A-Line Skirt"
    },
    {
        "prompt": "A chic, sleeveless peplum top and slim-fit pants.",
        "summary": "Sleeveless Peplum Top"
    },
    {
        "prompt": "A modern, cropped trench coat and midi dress.",
        "summary": "Cropped Trench Coat"
    },
    {
        "prompt": "A cozy, oversized cardigan and leggings.",
        "summary": "Oversized Cardigan"
    },
    {
        "prompt": "A stylish, faux fur coat and sweater dress.",
        "summary": "Faux Fur Coat"
    },
    {
        "prompt": "A polished, knee-length shift dress and boat neckline.",
        "summary": "Shift Dress"
    },
    {
        "prompt": "A trendy, cropped denim jacket with a distressed finish.",
        "summary": "Cropped Denim Jacket"
    },
    {
        "prompt": "A sophisticated, tailored blazer and trousers.",
        "summary": "Tailored Blazer"
    },
    {
        "prompt": "A fashionable, wrap-front jumpsuit with wide-legged pants.",
        "summary": "Wrap-Front Jumpsuit"
    },
    {
        "prompt": "A chic, off-the-shoulder midi dress with a belted waist.",
        "summary": "Off-Shoulder Midi Dress"
    },
    {
        "prompt": "A sleek, form-fitting bodysuit and high-waisted jeans.",
        "summary": "Form-Fitting Bodysuit"
    },
    {
        "prompt": "A trendy, oversized knit sweater and leggings.",
        "summary": "Oversized Knit Sweater"
    },
    {
        "prompt": "A modern, asymmetrical top and wide-leg trousers.",
        "summary": "Asymmetrical Top"
    },
    {
        "prompt": "A stylish, tailored blazer and trousers with a printed blouse.",
        "summary": "Printed Blouse"
    },
    {
        "prompt": "A sophisticated, knee-length wrap dress with a belt.",
        "summary": "Belted Wrap Dress"
    },
    {
        "prompt": "A chic, off-the-shoulder jumpsuit with wide-legged pants.",
        "summary": "Off-Shoulder Jumpsuit"
    },
    {
        "prompt": "A trendy, cropped blazer and high-waisted shorts.",
        "summary": "Cropped Blazer"
    },
    {
        "prompt": "A classic, knee-length pencil skirt and silk blouse.",
        "summary": "Silk Blouse"
    },
    {
        "prompt": "A cozy, oversized knit sweater and leggings.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A modern, tailored jumpsuit with a plunging neckline.",
        "summary": "Tailored Jumpsuit"
    },
    {
        "prompt": "A fashionable, pleated midi skirt and fitted top.",
        "summary": "Pleated Midi Skirt"
    },
    {
        "prompt": "A trendy, oversized blazer and skinny jeans.",
        "summary": "Oversized Blazer"
    },
    {
        "prompt": "A sleek, form-fitting bodysuit and high-waisted skirt.",
        "summary": "Form-Fitting Bodysuit"
    },
    {
        "prompt": "A sophisticated, knee-length sheath dress with a belt.",
        "summary": "Belted Sheath Dress"
    },
    {
        "prompt": "A chic, sleeveless romper with a cinched waist.",
        "summary": "Sleeveless Romper"
    },
    {
        "prompt": "A stylish, cropped leather jacket and jeans.",
        "summary": "Cropped Leather Jacket"
    },
    {
        "prompt": "A polished, knee-length shift dress and statement necklace.",
        "summary": "Statement Necklace"
    },
    {
        "prompt": "A trendy, oversized sweater and pleated skirt.",
        "summary": "Oversized Sweater"
    },
    {
        "prompt": "A modern, asymmetrical top and tailored trousers.",
        "summary": "Asymmetrical Top"
    },
    {
        "prompt": "A feminine, ruffled blouse and high-waisted skirt.",
        "summary": "Ruffled Blouse"
    },
    {
        "prompt": "A stylish, wide-legged jumpsuit with a wrap-front.",
        "summary": "Wrap-Front Jumpsuit"
    },
    {
        "prompt": "A sophisticated, knee-length wrap dress and statement belt.",
        "summary": "Statement Belt"
    },
    {
        "prompt": "A trendy, oversized blazer and mini skirt.",
        "summary": "Oversized Blazer"
    },
    {
        "prompt": "A classic, knee-length A-line skirt and printed top.",
        "summary": "Printed Top"
    },
    {
        "prompt": "A chic, sleeveless peplum top and wide-legged pants.",
        "summary": "Sleeveless Peplum Top"
    },
    {
        "prompt": "A fashionable, cropped trench coat and jeans.",
        "summary": "Cropped Trench Coat"
    },
    {
        "prompt": "A cozy, oversized cardigan and leggings.",
        "summary": "Oversized Cardigan"
    },
    {
        "prompt": "A stylish, faux fur coat and jeans.",
        "summary": "Faux Fur Coat"
    },
    {
        "prompt": "A polished, knee-length pencil dress and blazer.",
        "summary": "Pencil Dress"
    },
    {
        "prompt": "A trendy, cropped denim jacket and skirt.",
        "summary": "Cropped Denim Jacket"
    },
    {
        "prompt": "A sophisticated, tailored blazer and pants with a silk blouse.",
        "summary": "Silk Blouse"
    },
    {
        "prompt": "A fashionable, wrap-front jumpsuit and heels.",
        "summary": "Wrap-Front Jumpsuit"
    },
    {
        "prompt": "A chic, off-the-shoulder midi dress and statement earrings.",
        "summary": "Statement Earrings"
    },
    {
        "prompt": "A sleek, form-fitting bodysuit and high-waisted pants.",
        "summary": "Form-Fitting Bodysuit"
    },
    {
        "prompt": "A trendy, oversized knit sweater and leather leggings.",
        "summary": "Oversized Knit Sweater"
    },
    {
        "prompt": "A modern, asymmetrical top and wide-legged trousers.",
        "summary": "Asymmetrical Top"
    },
    {
        "prompt": "A stylish, tailored blazer and shorts with a printed blouse.",
        "summary": "Printed Blouse"
    },
    {
        "prompt": "A sophisticated, knee-length wrap dress and belt.",
        "summary": "Belted Wrap Dress"
    },
    {
        "prompt": "A chic, off-the-shoulder jumpsuit and wide-legged pants.",
        "summary": "Off-Shoulder Jumpsuit"
    },
    {
        "prompt": "A trendy, cropped blazer and high-waisted shorts.",
        "summary": "Cropped Blazer"
    },
    {
        "prompt": "A classic, knee-length pencil skirt and silk blouse.",
        "summary": "Silk Blouse"
    },
    {
        "prompt": "A cozy, oversized knit sweater and leggings.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A modern, tailored jumpsuit and plunging neckline.",
        "summary": "Tailored Jumpsuit"
    },
    {
        "prompt": "A fashionable, pleated midi skirt and fitted top.",
        "summary": "Pleated Midi Skirt"
    },
    {
        "prompt": "A trendy, oversized blazer and skinny jeans.",
        "summary": "Oversized Blazer"
    },
    {
        "prompt": "A sleek, form-fitting bodysuit and high-waisted skirt.",
        "summary": "Form-Fitting Bodysuit"
    },
    {
        "prompt": "A sophisticated, knee-length sheath dress and belt.",
        "summary": "Belted Sheath Dress"
    },
    {
        "prompt": "A chic, sleeveless romper and cinched waist.",
        "summary": "Sleeveless Romper"
    },
    {
        "prompt": "A stylish, cropped leather jacket and jeans.",
        "summary": "Cropped Leather Jacket"
    },
    {
        "prompt": "A polished, knee-length shift dress and statement necklace.",
        "summary": "Statement Necklace"
    },
    {
        "prompt": "A trendy, oversized sweater and pleated skirt.",
        "summary": "Oversized Sweater"
    },
    {
        "prompt": "A modern, asymmetrical top and tailored trousers.",
        "summary": "Asymmetrical Top"
    },
    {
        "prompt": "A feminine, ruffled blouse and high-waisted skirt.",
        "summary": "Ruffled Blouse"
    },
    {
        "prompt": "A stylish, wide-legged jumpsuit and wrap-front.",
        "summary": "Wrap-Front Jumpsuit"
    },
    {
        "prompt": "A sophisticated, knee-length wrap dress and statement belt.",
        "summary": "Statement Belt"
    },
    {
        "prompt": "A trendy, oversized blazer and mini skirt.",
        "summary": "Oversized Blazer"
    },
    {
        "prompt": "A classic, knee-length A-line skirt and printed top.",
        "summary": "Printed Top"
    },
    {
        "prompt": "A chic, sleeveless peplum top and wide-legged pants.",
        "summary": "Sleeveless Peplum Top"
    },
    {
        "prompt": "A fashionable, cropped trench coat and jeans.",
        "summary": "Cropped Trench Coat"
    },
    {
        "prompt": "A cozy, oversized cardigan and leggings.",
        "summary": "Oversized Cardigan"
    },
    {
        "prompt": "A stylish, faux fur coat and jeans.",
        "summary": "Faux Fur Coat"
    },
    {
        "prompt": "A polished, knee-length pencil dress and blazer.",
        "summary": "Pencil Dress"
    },
    {
        "prompt": "A trendy, cropped denim jacket and skirt.",
        "summary": "Cropped Denim Jacket"
    },
    {
        "prompt": "A sophisticated, tailored blazer and pants with a silk blouse.",
        "summary": "Silk Blouse"
    },
    {
        "prompt": "A fashionable, wrap-front jumpsuit and heels.",
        "summary": "Wrap-Front Jumpsuit"
    },
    {
        "prompt": "A chic, off-the-shoulder midi dress and statement earrings.",
        "summary": "Statement Earrings"
    },
    {
        "prompt": "A sleek, form-fitting bodysuit and high-waisted pants.",
        "summary": "Form-Fitting Bodysuit"
    },
    {
        "prompt": "A trendy, oversized knit sweater and leather leggings.",
        "summary": "Oversized Knit Sweater"
    },
    {
        "prompt": "A modern, asymmetrical top and wide-legged trousers.",
        "summary": "Asymmetrical Top"
    },
    {
        "prompt": "A sharp, tailored suit with a crisp dress shirt.",
        "summary": "Tailored Suit"
    },
    {
        "prompt": "A stylish, button-down shirt with slim-fit trousers.",
        "summary": "Button-Down Shirt"
    },
    {
        "prompt": "A classic, crew-neck sweater with straight-leg jeans.",
        "summary": "Crew-Neck Sweater"
    },
    {
        "prompt": "A sophisticated, blazer and chinos with a collared shirt.",
        "summary": "Blazer and Chinos"
    },
    {
        "prompt": "A trendy, bomber jacket with distressed denim.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sleek, turtleneck sweater with tailored trousers.",
        "summary": "Turtleneck Sweater"
    },
    {
        "prompt": "A polished, three-piece suit with a patterned tie.",
        "summary": "Three-Piece Suit"
    },
    {
        "prompt": "A casual, denim jacket with a basic tee and chinos.",
        "summary": "Denim Jacket"
    },
    {
        "prompt": "A modern, leather jacket with slim-fit jeans.",
        "summary": "Leather Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching tie and slacks.",
        "summary": "Dress Shirt and Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with dark wash jeans.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored shorts.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and trousers.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress pants.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed denim.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit trousers.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped jeans.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki pants.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored chinos.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress pants.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-leg trousers.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black jeans.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut pants.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit pants.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped denim.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki trousers.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored trousers.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress slacks.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-cut pants.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black pants.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    },
    {
        "prompt": "A casual, hoodie with jogger pants.",
        "summary": "Hoodie"
    },
    {
        "prompt": "A modern, suede jacket with slim-fit pants.",
        "summary": "Suede Jacket"
    },
    {
        "prompt": "A sophisticated, tuxedo with a bow tie.",
        "summary": "Tuxedo"
    },
    {
        "prompt": "A trendy, leather biker jacket with ripped denim.",
        "summary": "Biker Jacket"
    },
    {
        "prompt": "A classic, oxford shirt with khaki trousers.",
        "summary": "Oxford Shirt"
    },
    {
        "prompt": "A stylish, knit sweater with tailored pants.",
        "summary": "Knit Sweater"
    },
    {
        "prompt": "A fashionable, checkered blazer with dress slacks.",
        "summary": "Checkered Blazer"
    },
    {
        "prompt": "A sleek, turtleneck with straight-cut pants.",
        "summary": "Turtleneck"
    },
    {
        "prompt": "A polished, single-breasted suit with a patterned tie.",
        "summary": "Single-Breasted Suit"
    },
    {
        "prompt": "A casual, denim shirt with chino shorts.",
        "summary": "Denim Shirt"
    },
    {
        "prompt": "A modern, bomber jacket with jogger pants.",
        "summary": "Bomber Jacket"
    },
    {
        "prompt": "A sophisticated, dress shirt with a matching bow tie and slacks.",
        "summary": "Dress Shirt and Bow Tie"
    },
    {
        "prompt": "A trendy, plaid blazer with black pants.",
        "summary": "Plaid Blazer"
    },
    {
        "prompt": "A classic, polo shirt with tailored trousers.",
        "summary": "Polo Shirt"
    },
    {
        "prompt": "A stylish, v-neck sweater with straight-cut trousers.",
        "summary": "V-Neck Sweater"
    },
    {
        "prompt": "A fashionable, trench coat with a button-up shirt and chinos.",
        "summary": "Trench Coat"
    },
    {
        "prompt": "A sleek, button-up shirt with dress slacks.",
        "summary": "Button-Up Shirt"
    },
    {
        "prompt": "A trendy, graphic tee with distressed jeans.",
        "summary": "Graphic Tee"
    },
    {
        "prompt": "A polished, double-breasted suit with a patterned pocket square.",
        "summary": "Double-Breasted Suit"
    }

]


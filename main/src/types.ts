import { IGenerated, IStyleInput } from './lib/api';

export interface User {
    id: string;
    name: string;
    persons: Person[]
}

export interface Generated extends IGenerated {
    marked_for_deletion?: boolean
}

export interface Person {
    person_type?: 'Male' | 'Female' | 'Couple' | 'Product' | 'Dog' | 'Cat'
    created_at: number
    name: string
    avatar: string
    id: number
    is_done: boolean // is the person model done? 
    error?: string
    generated?: Generated[],
    demo?: boolean
}


export interface PersonInput {
    name: string
    images_zip_url?: string
    person_type: 'Male' | 'Female'
}

// only used to deserialize data from prompts endpoint
export interface Prompt {
    summary: string,
    camera: string,
    tags: string[],
    female_prompt: string,
    male_prompt: string,
    negative_prompt?: string,
    images: string[],
    approved?: boolean
}


export interface Style {
    id: string
    style: IStyleInput
    tags: string[]
    image: string
}

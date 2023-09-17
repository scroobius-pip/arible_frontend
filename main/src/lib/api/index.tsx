import { Person, PersonInput, Style } from '@/types';
import JSONbig from 'json-bigint';
import LosslessJSON from 'lossless-json';


// const ckpt_url = 
declare var Rewardful: any;
export interface IUser {
    id: string;
    created_at: string;
    email: string;
    credits: number;
    persons: IPerson[];
    default_person_id: number | null;
    subscribed: boolean | null;
}

export interface IPerson {
    id: number;
    created_at: number;
    name: string;
    person_type: 'Male' | 'Female' | 'Couple' | 'Product' | 'Dog' | 'Cat';
    model: IModel | null;

}

export function personFromIPerson(iPerson: IPerson): Person {
    return {
        id: iPerson.id,
        name: iPerson.name,
        created_at: iPerson.created_at,
        avatar: '',
        is_done: (iPerson.model?.status ?? {}).hasOwnProperty('Done'),
        error: (iPerson.model?.status ?? {}).hasOwnProperty('Error') ? iPerson.model?.status.Error : undefined,
        generated: [],
        person_type: iPerson.person_type
    }
}

type TextPrompt = {
    prompt: string;
    negative_prompt: string;
    seed: number;
    guidance_scale: number;
    scheduler: string;
    num_inference_steps: number;
};

type InitImage = {
    image: string;
    strength: number;
};

type ImageSize = {
    width: number;
    height: number;
};

type Pose = [string, string];
type InPaint = string;
type Background = [string, string];
type Clothing = [string, string];

type IStyleParameterType =
    | { TextPrompt: TextPrompt }
    | { Pose: Pose }
    | { InitImage: InitImage }
    | { InPaint: InPaint }
    | { Background: Background }
    | { ImageSize: ImageSize }
    | { Clothing: Clothing };

export interface IGeneratedInput {
    pinned: boolean;
    person_id: number;
    style: IStyleInput;
}

export interface IStyleInput {
    name: string;
    // owner_id: string;
    shared: boolean;
    parameters: Array<IStyleParameterInput>
}


export interface IStyleParameterInput {
    parameter_type: IStyleParameterType;
}

export function randomizeStyle(style: IStyle): IStyle {
    const newSeedU32 = Math.floor(Math.random() * 4294967296);
    // Loop through the parameters array
    style.parameters.forEach((param, index) => {
        // Check if the parameter is of type TextPrompt
        if ('TextPrompt' in param.parameter_type) {
            // Update the seed value with the new seed
            (style as any).parameters[index].parameter_type['TextPrompt'].seed = newSeedU32;
        }
    });

    return style;
}

export function randomizeStyleIfNegativeSeed(style: IStyleInput): IStyleInput {
    // Loop through the parameters array
    style.parameters.forEach((param, index) => {
        // Check if the parameter is of type TextPrompt
        if ('TextPrompt' in param.parameter_type) {
            const { parameter_type } = param;
            const { TextPrompt } = parameter_type;
            const { seed } = TextPrompt;
            // If the seed is negative, update the seed value with a new seed
            if (seed < 0) {
                const newSeedU32 = Math.floor(Math.random() * 4294967296);
                (style as any).parameters[index].parameter_type['TextPrompt'].seed = newSeedU32;
            }
        }
    });

    return style;
}


export function genderTextPrompt(style: IStyleInput, person_type: Person['person_type']): IStyleInput {
    style.parameters.forEach((param, index) => {
        if ('TextPrompt' in param.parameter_type) {
            const { parameter_type } = param;
            const { TextPrompt } = parameter_type;
            const { prompt } = TextPrompt;
            // replace <PERSON_TYPE>
            const replaceString = person_type === 'Male' ? `sks man` : `sks woman`

            const newPrompt = prompt.replace(/<PERSON_TYPE>/g, replaceString);
            console.log(newPrompt);
            (style as any).parameters[index].parameter_type['TextPrompt'].prompt = `${newPrompt}`;

        }
    });
    return style;
}


export function getImageSize(style: IStyle): ImageSize {
    for (const param of style.parameters) {
        const { parameter_type } = param;
        if ('ImageSize' in parameter_type) {
            return parameter_type['ImageSize'];
        }
    }
    return { width: 768, height: 768 };
}

// Usage example


export function addPoseImage(style: IStyle, image: string): IStyle {
    style.parameters.push({
        parameter_type: {
            Pose: [
                "",
                image,
            ]
        }
    });

    style.parameters.push({
        parameter_type: {
            InitImage: {
                image: image,
                strength: 80 //doesn't work, hardcoded in the backend
            }
        }
    });

    return style;
}


export interface IStyle {
    id: string;
    created_at: string;
    name: string;
    owner_id: string;
    shared: boolean;
    parameters: Array<{
        parameter_type: IStyleParameterType;
    }>
}


export interface IGenerated {
    status: IGeneratedStatus;
    upscaled_url?: string;
    id: number;
    created_at: number;
    is_pinned: boolean;
    is_public: boolean;
    owner: number;
    person_id?: number;
    style_id: string;
}

export type IGeneratedStatus = {
    Done: string
} | "Error" | "Pending" | {
    Submitted: string
}

export interface IPage {
    title: string;
    description: string;
    keywords: string;
    slug: string;
    items: Array<IPageItem>;
    updated_at: string;
}

export interface IPageItem {
    url: string;
    description: string;
    title: string;
    person_id: number;
    generated_id: number;
}

export interface IModel {
    input_zip_url: string;
    status: ModelStatus;
    ckpt_url: string;
    supported_styles: StyleType[];
}

export interface ModelStatus {
    Error?: string;
    Done?: string;
    Pending?: void;
}

export enum StyleType {
    TextPrompt,
    Pose,
    InitImage,
    InPaint,
    Background,
    ImageSize,
    Clothing,
}
interface RequestResult<T> {
    data?: T
    error?: ErrorType
}

export enum ErrorType {
    Unknown = 'Unknown',
    Network = 'Network',
    NotFound = 'NotFound',
    Server = 'Server',
    Auth = 'Auth',
    Credits = 'Credits'
}

export type UserResult = RequestResult<IUser>;
export type CreatePersonResult = RequestResult<IPerson>;
export type GeneratedResult = RequestResult<IGenerated[]>;
export type CheckoutSessionResult = RequestResult<string>;
export type PageResult = RequestResult<IPage>;
export type PagesResult = RequestResult<IPage[]>;


export class ApiService {
    private static readonly BASE_URL = 'https://api.arible.co';
    private _token = '';
    private _header = {}


    constructor(token: string) {

        this._token = token;
        this._header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._token}`
        }
    }

    private static async handleResponse<T>(response: Response, isJson: boolean = true): Promise<RequestResult<T>> {
        const data = isJson ? await response.json() : await response.text();

        if (!data.error) {
            return { data };
        }

        switch (data.error) {
            case 'NOT_ENOUGH_CREDITS':
                return { error: ErrorType.Credits };
            case 'NOT_SUBSCRIBED':
                return { error: ErrorType.Credits };
            case 'INVALID_TOKEN':
                return { error: ErrorType.Auth };
            default:
                return { error: ErrorType.Unknown };

        }
    }

    public async getMe(): Promise<UserResult> {
        const response = await fetch(`${ApiService.BASE_URL}/me`, {
            method: 'GET',
            headers: this._header
        })

        return ApiService.handleResponse<IUser>(response);
    }

    public async createPerson(person_input: PersonInput, type: 'art' | 'real'): Promise<RequestResult<IPerson>> {
        const url = person_input.images_zip_url ? `${ApiService.BASE_URL}/create_person_model` : `${ApiService.BASE_URL}/create_person`

        const ckpt_url = "https://huggingface.co/simdi/CyberRealistic/resolve/main/CyberRealistic.ckpt"
        // const ckpt_url = ckpt_url_realistic
        const response = await fetch(url, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: person_input.name,
                person_type: person_input.person_type,
                model: person_input.images_zip_url ? {
                    ckpt_url,
                    input_zip_url: person_input.images_zip_url,
                } : undefined
            })
        })

        return ApiService.handleResponse<IPerson>(response);
    }

    public async setDefaultPerson(person_id: number): Promise<RequestResult<void>> {
        const url = `${ApiService.BASE_URL}/default_person/${person_id}`
        const response = await fetch(url, {
            method: 'POST',
            headers: this._header,
        })

        return ApiService.handleResponse<void>(response, false);
    }

    public async newCheckoutSession(product_id: string, success_path: string, discountID?: string, subscription = true): Promise<RequestResult<string>> {
        //check for referral code from getrewardful
        console.log(product_id, discountID)
        const discount_id = discountID ?? 'null'
        const type = subscription ? 'subscription' : 'payment'
        try {

            const ref_id = (Rewardful)?.referral ?? (console.log('no ref_id'), null);
            const url = `${ApiService.BASE_URL}/checkout_session/${product_id}/${type}/${success_path}/${discount_id}${ref_id ? `?ref_id=${ref_id}&frontend_host=https://www.arible.co` : '?frontend_host=https://www.arible.co'}`


            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    ...this._header,
                    'Content-Type': 'text/plain',
                },
            })

            const data = await response.text();
            return {
                data
            }
        } catch (error) {
            console.error('Rewardful probably not found: ' + error)
            // const url = `${ApiService.BASE_URL}/checkout_session/${product_id}/subscription/${success_path}`

            const url = `${ApiService.BASE_URL}/checkout_session/${product_id}/${type}/${success_path}/${discount_id}?frontend_host=https://www.arible.co`

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    ...this._header,
                    'Content-Type': 'text/plain',
                },
            })

            const data = await response.text();
            return {
                data
            }
        }
    }

    public async generate(input: IGeneratedInput): Promise<RequestResult<IGenerated>> {
        const url = `${ApiService.BASE_URL}/create_generated`
        const response = await fetch(url, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify(input)
        })

        return ApiService.handleResponse<IGenerated>(response);
    }


    public static async generateDemo(input: IGeneratedInput): Promise<RequestResult<IGenerated>> {
        const url = `${ApiService.BASE_URL}/create_generated_demo`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        })

        return ApiService.handleResponse<IGenerated>(response);
    }



    public async deleteGenerated(generated_id: number, person_id: number): Promise<RequestResult<void>> {
        const url = `${ApiService.BASE_URL}/delete_generated/${generated_id}/${person_id}`
        const response = await fetch(url, {
            method: 'POST',
            headers: this._header,
        })

        return ApiService.handleResponse<void>(response, false);
    }

    public static async getStyle(style_id: string): Promise<RequestResult<IStyle>> {
        const url = `${ApiService.BASE_URL}/style/${style_id}`
        const response = await fetch(url, {
            method: 'GET',
        })

        return ApiService.handleResponse<IStyle>(response);
    }


    public async getGenerated(person_id: number): Promise<GeneratedResult> {
        const url = `${ApiService.BASE_URL}/generated/${person_id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: this._header,
        })

        return ApiService.handleResponse<IGenerated[]>(response);
    }

    public static async getGeneratedDemo(person_id: number): Promise<GeneratedResult> {
        const url = `${ApiService.BASE_URL}/generated_demo/${person_id}`
        const response = await fetch(url, {
            method: 'GET',
        })

        return ApiService.handleResponse<IGenerated[]>(response);
    }


    public async generatedStatus(person_id: number): Promise<GeneratedResult> {
        const url = `${ApiService.BASE_URL}/generated_status/${person_id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: this._header,
        })

        return ApiService.handleResponse<IGenerated[]>(response);
    }

    public async registerDiscord(code: string): Promise<{
        success: boolean,
    }> {

        try {
            const url = `${ApiService.BASE_URL}/discord_auth?code=${code}`
            await fetch(url, {
                method: 'GET',
                headers: this._header,
            })

            return {
                success: true,
            }
        } catch (e) {
            console.error(e)
            return {
                success: false,
            }
        }
    }

    public static async getPage(slug: string): Promise<PageResult> {
        const url = `${ApiService.BASE_URL}/page/${slug}`
        const response = await fetch(url, {
            method: 'GET',
        })

        return ApiService.handleResponse<IPage>(response);
    }

    public static async allPages(): Promise<PagesResult> {
        const url = `${ApiService.BASE_URL}/pages`
        const response = await fetch(url, {
            method: 'GET',
        })

        return ApiService.handleResponse<IPage[]>(response);
    }
}

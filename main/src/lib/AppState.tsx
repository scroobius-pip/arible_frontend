import { Generated, Person, PersonInput, Prompt, Style } from '@/types';
import { useSession } from '@supabase/auth-helpers-react';
import pMap from 'p-map';
import { createContext, useEffect, useState } from 'react';
import { ApiService, CheckoutSessionResult, CreatePersonResult, ErrorType, GeneratedResult, IStyleInput, personFromIPerson, UserResult, genderTextPrompt, randomizeStyleIfNegativeSeed } from './api';
import useInterval from 'use-interval'
import { femaleClothes, maleClothes, officialStyles, promptFromCloth } from '../../official_styles';


interface AppState {
    persons: Person[];
    user?: UserResult & {
        profile_image?: string;
    }
    demoGeneratedCount: number
    selectedPerson?: Person | null
    styles: Style[]
    generatedList: {
        person_id?: number,
        loading: boolean,
        data?: Generated[],
        error?: string
    }
    pendingStyles: Style[]
    operations: {
        imFeelingLucky: () => void;
        selectPerson: (id: number) => void;
        createNewPerson: (input: PersonInput, type: 'real' | 'art') => Promise<CreatePersonResult>;
        getGenerated: (person_id: number) => Promise<GeneratedResult>;
        deleteGenerated: (generated_id: number, person_id: number) => Promise<void>;
        addStylesToPending: (prompt: Style[], shouldGenerate: boolean) => void;
        generateIStyle: (style: IStyleInput, person_id: number) => void;
        registerDiscord: (code: string) => Promise<{ success: boolean }>;
        getCheckoutSession: (product_id: string, success_path: string, discountID?: string, subscription?: boolean) => Promise<CheckoutSessionResult>;
    }
}

const initialState: AppState = {
    persons: [],
    demoGeneratedCount: 0,
    generatedList: {
        loading: false,
    },
    styles: [],
    pendingStyles: [],
    operations: {
        imFeelingLucky: () => { },
        generateIStyle: () => { },
        addStylesToPending: () => { },
        getCheckoutSession: async (product_id: string, success_path: string) => {
            return { error: ErrorType.Unknown }
        },
        selectPerson: () => { },
        createNewPerson: async (input: PersonInput) => {
            return { error: ErrorType.Unknown }
        },
        // generate: async () => false,
        getGenerated: async () => {
            alert('From default getGenerated')
            return { error: ErrorType.Unknown }
        },
        deleteGenerated: async () => { },
        registerDiscord: async () => {
            return { success: false }
        }

    }
};



const personOptions = [
    {
        is_done: false,
        created_at: 0,
        id: -1,
        name: 'New Person',
        avatar: '',

    },
    {
        is_done: false,
        created_at: 0,
        id: -2,
        name: 'New Product',
        avatar: '',

    },
]

const defaultPersons: Person[] = [
    {
        is_done: true,
        created_at: 0,
        id: 39715,
        name: 'Anthony - Male',
        demo: true,
        person_type: 'Male',
        avatar: 'https://img.arible.co/cdn-cgi/image/format=webp/https://replicate.delivery/pbxt/mZ58onJ001plDxeMUaiuy8iNsKk5Y03JmfDw7BNiZDwMEEFRA/seed-3241200307.png'
    },
    {
        is_done: true,
        created_at: 0,
        id: 24195,
        name: 'Anna - Female',
        avatar: 'https://replicate.delivery/pbxt/ImVxk4RqbKr2GFHKTxlVNzn5OLlMVoklES0hmyJi8RaOnKME/seed-32412872.png',
        demo: true,
        person_type: 'Female'
    },
    {
        is_done: true,
        created_at: 0,
        id: 46024,
        name: 'Abby - Female',
        avatar: 'https://replicate.delivery/pbxt/xsBQeO9iPy1RWCzsdMnFqQgSpBbhzY7nEnkJl748lapxRVYIA/seed-3591249643.png',
        demo: true,
        person_type: 'Female'
    },
    {
        is_done: true,
        created_at: 0,
        id: 13024,
        name: 'Aoi - Male',
        avatar: 'https://replicate.delivery/pbxt/JqRFIIFHJuK8CZxfcMT0mkGFQo7eUVehkaiuPonyWezpwkCDB/seed-1385024165.png',
        demo: true,
        person_type: 'Male'
    },
    // {
    //     is_done: true,
    //     created_at: 0,
    //     id: 54536,
    //     name: 'Yara - Female',
    //     avatar: 'https://replicate.delivery/pbxt/fBpjGhut8kQiIq6Wfq7Nf7bJfaNfgaURGC8e5rHneVBB5dRYIA/seed-1756825458.png',
    //     demo: true,
    //     person_type: 'Female'
    // },

    // {
    //     is_done: true,
    //     created_at: 0,
    //     id: 46163,
    //     name: 'Simdi - Male',
    //     demo: true,
    //     person_type: 'Male',
    //     avatar: 'https://img.arible.co/cdn-cgi/image/format=webp/https://replicate.delivery/pbxt/T0zDPjcRpmLqMpMEPX38bKmeY9hyVJS3wAWe3fca9Hsbs4bhA/seed-386127896.png'
    // }



];



const fetcher = (url: string) => fetch(url).then((res) => {
    const result = res.json()
    return result
});


const setLastSelectedPerson = (person_id: number) => {
    localStorage.setItem('last_selected_person', person_id.toString())
}

const incrementGeneratedCount = () => {
    const generatedCount = localStorage.getItem('generated_count')
    if (generatedCount) {
        localStorage.setItem('generated_count', (parseInt(generatedCount) + 1).toString())
    } else {
        localStorage.setItem('generated_count', '1')
    }
}

const resetGeneratedCount = () => {
    localStorage.setItem('generated_count', '0')
}





const getLastSelectedPerson = () => {
    const lastSelectedPerson = localStorage.getItem('last_selected_person')
    if (lastSelectedPerson) {
        return parseInt(lastSelectedPerson)
    }
    return
}

const getGeneratedCount = () => {
    const generatedCount = localStorage.getItem('generated_count')
    if (generatedCount) {
        return parseInt(generatedCount)
    }
    return 0
}


const getStyleId = (style: Style) => {
    return style.style.name
}


export const AppContext = createContext<AppState>(initialState);

export const AppProvider = ({ children }: any) => {

    const [user, setUser] = useState<UserResult & {
        profile_image?: string;
    }>();
    const [persons, setPersons] = useState<Person[]>(defaultPersons);
    const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);
    const session = useSession();
    const [generatedList, setGeneratedList] = useState<AppState['generatedList']>({
        loading: false,
        person_id: getLastSelectedPerson()
        // person_id: getLastSelectedPerson() ?? persons[0].id
    });
    const [apiService, setApiService] = useState<ApiService>(new ApiService(
        session?.access_token || '',
    ));
    const [styles, setStyles] = useState<{ styles: Array<Style>, loading: boolean }>({ styles: [], loading: true });
    const [pendingStyles, setPendingStyles] = useState<Style[]>([]);


    useEffect(() => {
        if (selectedPerson) {
            fetcher('/api/arible').then((data: Style) => {
                const genericStyles: Style[] = Object.values((data))
                const officialGenderStyles = selectedPerson.person_type === 'Male' ?
                    promptFromCloth(maleClothes) :
                    selectedPerson.person_type === 'Female' ?
                        promptFromCloth(femaleClothes) : []

                setStyles({
                    styles: [...officialStyles, ...officialGenderStyles, ...genericStyles],
                    loading: false
                })

            })
        }
    }, [selectedPerson])


    useInterval(() => {
        // if (pendingCount > 0)
        // pollGenerated()
    }, 15000);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getUser();
    //     }, 30000); // 30 seconds
    //     return () => clearInterval(interval);
    // }, [])
    // update apiService when session changes
    useEffect(() => {
        setApiService(new ApiService(
            session?.access_token || '',
        ));
    }, [session?.access_token])


    useEffect(() => {
        if (apiService && session?.access_token) {
            getUser();
        }
    }, [apiService])

    useEffect(() => {
        if (!selectedPerson) {
            const lastSelectedPersonId = getLastSelectedPerson()
            const lastSelectedPerson = persons.find((person) => person.id === lastSelectedPersonId)
            setSelectedPerson(lastSelectedPerson ?? persons[0]);
        }
    }, [persons])

    useEffect(() => {
        if (selectedPerson && selectedPerson.id > 0) {
            getGenerated(selectedPerson.id);
            setLastSelectedPerson(selectedPerson.id)
        }
    }, [selectedPerson])

    useEffect(() => {
        if (user) {
            const _persons = (user?.data?.persons ?? []).map(personFromIPerson)
            resetGeneratedCount()
            const persons = [..._persons, ...defaultPersons, ...personOptions]
            const uniquePersons = persons.filter((person, index, self) =>
                index === self.findIndex((p) => (
                    p.id === person.id
                ))
            )

            setPersons(uniquePersons);
        } else {
            setPersons([...defaultPersons, ...personOptions]);
        }
    }, [user])


    async function pollGenerated() {

        if (generatedList.person_id) {
            const person = persons.find((person) => person.id === generatedList.person_id)
            if (!person) return;

            const data = !person.demo ? await apiService.generatedStatus(generatedList.person_id) : await ApiService.getGeneratedDemo(generatedList.person_id)
            if (data?.data?.length) {
                data.data.map((gen) => {
                    const index = generatedList.data?.findIndex((g) => g.id === gen.id)
                    if (index !== undefined && index > -1) {
                        const updated = [...generatedList.data!];
                        updated[index] = gen;
                        setGeneratedList({
                            ...generatedList,
                            data: updated
                        })
                    }
                })
            }
        }
    }

    async function generateOfficialStyle() {
        const firstTenPrompts = styles.styles.slice(0, 10)
        generate(firstTenPrompts)
    }

    async function createNewPerson(input: PersonInput, type: 'real' | 'art'): Promise<CreatePersonResult> {
        let data = await apiService.createPerson(input, type);
        return data
    }

    function selectPerson(id: number) {
        const person = persons.find((person) => person.id === id);
        if (!person) {
            setSelectedPerson(persons[0]);
            return;
        }
        setSelectedPerson(person);
    }

    async function getGenerated(person_id: number): Promise<GeneratedResult> {

        setGeneratedList({
            loading: true,
            person_id,
        })

        const person = persons.find((person) => person.id === person_id)
        if (!person) {
            return {
                error: ErrorType.NotFound
            }
        }

        const data = !person.demo ? await apiService.getGenerated(person_id) : await ApiService.getGeneratedDemo(person_id);


        if (data?.error) {
            setGeneratedList({
                loading: false,
                error: data.error,
                person_id
            })
            return data;
        }

        setGeneratedList({
            loading: false,
            data: data.data,
            person_id
        })
        return data;
    }

    async function getUser() {
        if (!session?.access_token) return;
        try {
            const data = await apiService.getMe();
            if (data?.error) {
                return;
            }
            setUser({ ...data, profile_image: session?.user?.user_metadata?.avatar_url ?? '' });
        } catch (error) {
            console.log(error);
        }
    }

    async function addStylesToPending(styles: Style[], shouldGenerate = false) {
        if (shouldGenerate) {
            generate(styles);
        } else {
            setPendingStyles([...pendingStyles, ...styles]);
        }
    }

    async function generateIStyle(_style: IStyleInput, person_id: number) {
        const style = {
            ..._style,
            style: randomizeStyleIfNegativeSeed(_style)
        }

        const person = persons.find((person) => person.id === person_id);
        if (!person) {
            return;
        }

        const result = !person.demo ? await apiService.generate({
            pinned: false,
            person_id,
            style
        }) : (!user && incrementGeneratedCount(), await ApiService.generateDemo({
            pinned: false,
            person_id,
            style
        }));

        if (result.data) {
            const generated = result.data;
            setGeneratedList((prev) => {
                const newGeneratedList = prev.data?.length ? [generated, ...prev.data] : [generated];
                return {
                    ...prev,
                    data: newGeneratedList
                }
            })

            return true;
        } else {
            console.log(result.error);
            return false;
        }
    }

    async function generate(styles: Style[]) {

        // const userId = user?.data?.id;
        if (!selectedPerson) return


        const mapper = async (_style: Style) => {
            const genderedStyle = randomizeStyleIfNegativeSeed(genderTextPrompt(_style.style, selectedPerson.person_type))
            const style = {
                ..._style,
                style: genderedStyle
            }

            const result = !selectedPerson.demo ? await apiService.generate({
                person_id: selectedPerson.id,
                style: style.style,
                pinned: false
            }) : (!user && incrementGeneratedCount(), await ApiService.generateDemo({
                person_id: selectedPerson.id,
                style: style.style,
                pinned: false
            }));

            if (result.data) {
                const generated = result.data;
                setGeneratedList((prev) => {
                    const newGeneratedList = prev.data?.length ? [generated, ...prev.data] : [generated];
                    return {
                        ...prev,
                        data: newGeneratedList
                    }
                })
                // setPendingCount(prev => prev + 1)
                return true;
            } else {
                console.log(result.error);
                return false;
            }
        }
        const result = await pMap(styles, mapper, { concurrency: 10 });
        result.forEach((r) => {
            if (!r) {
                console.log('error');
            }
        })
    }

    async function deleteGenerated(generatedId: number, personId: number) {
        setGeneratedList((prev) => {

            const index = prev.data?.findIndex((g) => g.id === generatedId);
            if (index !== undefined && index > -1) {
                const updated = [...prev.data!];
                updated[index].marked_for_deletion = true;

                return {
                    ...prev,
                    data: updated
                }
            } else {
                return prev;
            }
        })

        const data = await apiService.deleteGenerated(generatedId, personId);
        if (data?.error) {
            console.error(data.error);
            return;
        }

    }

    async function registerDiscord(code: string) {
        return await apiService.registerDiscord(code);
    }

    async function getCheckoutSession(product_id: string, success_path: string, discountID?: string, subscription?: boolean) {
        const data = await apiService.newCheckoutSession(product_id, success_path, discountID, subscription);
        return data;
    }

    const state: AppState = {
        persons,
        user,
        get demoGeneratedCount() {
            return user ? 0 : getGeneratedCount()
        },
        styles: styles.styles,
        selectedPerson,
        pendingStyles,
        operations: {
            imFeelingLucky: generateOfficialStyle,
            generateIStyle,
            deleteGenerated,
            getCheckoutSession,
            selectPerson,
            getGenerated,
            createNewPerson,
            registerDiscord,
            // generate,
            addStylesToPending,
        },
        generatedList
    };

    return <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>;
};

async function stall(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
}
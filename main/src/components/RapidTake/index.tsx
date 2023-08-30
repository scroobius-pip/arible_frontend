//@ts-nochecppk
import React, { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Button, Loading, Progress } from '@nextui-org/react';
import { ArrowRightCircle, CameraIcon, Delete, Trash2 } from 'lucide-react';
import cameraAnimation from './camera.json';
// import Lottie from 'lottie-react';
// import { ArrowRightSquare, Delete } from '@odyssoft/iconly-clone';
import { Toaster, toast } from 'react-hot-toast';
import { AsyncZippable } from 'fflate';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'));

const IMAGE_COUNT = 30;
const MIN_DISTANCE = 15;

interface Props {
    setFileUrl: (url: string) => void;
}

const CameraComponent: React.FC<Props> = (props) => {
    const { images, captureImages, progress, feedbackMessage, stream, removeImage, loading, video } = useCamera();
    const finished = images.length === IMAGE_COUNT;
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        stream && video.current && (video.current.srcObject = stream);
    }, [stream]);

    const startCapturing = () => {
        captureImages();
    }

    const getFileNameFromSignedUrl = (signedUrl: string) => {
        let fileName = signedUrl.split('?')[0].split('/').pop()
        return `https://s.arible.co/${fileName}`
    }

    const uploadImages = async () => {
        try {
            setUploading(true);
            const zipped = await zipImages(images.map(({ image }) => image));
            toast.success('Images compressed successfully');
            const signedUrl = await getSignedUrl('zip');
            await uploadZipped(signedUrl, zipped);
            toast.success('Images uploaded successfully');
            props.setFileUrl(getFileNameFromSignedUrl(signedUrl));
            setUploading(false);
        } catch (error) {
            setUploading(false);
            console.log(error);
            toast.error('An error occured while uploading images, please try again later');

        }
    }

    const uploadZipped = async (signedUrl: string, zipped: Uint8Array): Promise<void> => {
        try {

            await import('axios').then(({ default: axios }) => axios.put(signedUrl, zipped))
        } catch (error) {
            console.error(error);
            toast.error('An error occured while uploading images, please try again later');
        }
    }

    const getSignedUrl = async (extension: string) => {
        let request_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/presigned_upload_url/${extension}/true`;

        return await import('axios').then(({ default: axios }) => axios.get<string>(request_url)).then(({ data }) => data);
    };


    const blobToUint8Array = async (blob: Blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }

    const zipImages = async (images: Blob[]) => {
        try {

            const zip = await import('fflate').then(({ zip }) => zip);
            const zipper = (data: AsyncZippable) => new Promise<Uint8Array>((resolve, reject) => {
                zip(data, { level: 1 }, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                })
            })
            const uint8Array = await Promise.all(images.map(blobToUint8Array));

            const folder = uint8Array.reduce((acc, bytes, index) => {
                acc[index.toString() + '.png'] = bytes;
                return acc;
            }, {} as { [key: string]: Uint8Array })

            const zipped = await zipper(folder);


            return zipped;
        } catch (error) {
            toast.error('Zip Failed')
            throw error
        }
    }


    return (
        <div className="flex flex-col justify-center items-center p-4 gap-2 h-full w-full max-w-md">
            {stream && <div className="flex-1 relative rounded-3xl">
                <video
                    ref={video}
                    style={{
                        transform: 'rotateY(180deg)'
                    }} autoPlay playsInline id='video' className="w-full h-auto rounded-3xl" >
                    {/* Your video source */}

                </video>
                <div className={`absolute max-w-md h-full z-20 inset-0 flex justify-center items-center aspect-square rounded-3xl ${feedbackMessage && ' bg-neutral-900 bg-blend-color-dodge bg-opacity-90'}`}>
                    {feedbackMessage && <div className='flex flex-col items-center p-4' >
                        <Lottie className='animate-pulse duration-100 max-w-sm' animationData={cameraAnimation} loop={true} />
                        <div className='flex flex-col gap-2 p-4'>
                            <h1 className=" text-neutral-100 text-2xl font-black capitalize">{feedbackMessage.split('.')[0]}</h1>
                            <p className='text-xl font-medium'>{feedbackMessage.split('.')?.[1]}</p>
                            <p className='text-xl font-medium'>{feedbackMessage.split('.')?.[2] ?? ''}</p>

                        </div>
                    </div>}
                </div>
            </div>}
            {!stream && images.length < IMAGE_COUNT &&
                <div className='p-4 gap-4 flex flex-col bg-neutral-900 rounded-3xl border-solid border-neutral-800 '>
                    <div className='flex flex-col gap-2'>
                        <span className='rounded-3xl bg-neutral-800 w-fit p-2 font-bold text-xs'>Arible RapidTake v2.7</span>
                        <p className='mt-4 font-extrabold text-2xl '>
                            Face Capture
                        </p>
                        <p className='font-extrabold text-xl'>
                            Arible will take a few photos of you to learn how your face looks.
                        </p>
                        <p className='font-medium text-sm'>
                            It's very easy, just walk around your environment while waving your phone selfie camera up & down, left & right, far & near
                        </p>
                        {/* <p className='font-bold text-sm'>
                            Multiple expressions too: 😃😆😂🤪😗
                        </p> */}
                        <p className='font-extrabold text-lg text-purple-600 text-center mt-4 animate-pulse '>No hats, hoods, masks or sun-glasses</p>
                    </div>
                    <Button
                        disabled={loading}
                        onClick={startCapturing}
                        size={'xl'}
                        auto
                        className='w-full'
                        icon={loading ? <Loading color='white' type='spinner' size='xl' /> : <CameraIcon />}

                    >
                        {loading ? 'Downloading Model' : images.length ? 'Continue Capture' : 'Start Capture'}
                        {/* {!!loading && <Loading color='white' type='spinner' size='xl' />} */}
                    </Button>
                </div>

            }
            {
                finished && <div className='p-4 flex-row gap-4 bg-neutral-800 rounded-3xl w-full'>
                    <Button
                        disabled={uploading}
                        onClick={uploadImages}
                        size={'xl'}
                        color={'success'}
                        className='w-full'
                        // icon={uploading ? <Loading color='white' type='spinner' size='xl' /> :
                        //     <ArrowRightSquare />}
                        icon={uploading ? <Loading color='white' type='spinner' size='xl' /> : <ArrowRightCircle />}
                    >
                        Continue
                    </Button>
                    <p className='font-medium text-sm mt-4 '>
                        Please check the captured images. Remove blurred and duplicate photos.
                    </p>

                </div>
            }
            {!!images.length && <div className='bg-neutral-900 p-4 w-full rounded-3xl flex flex-col justify-end gap-4 border-solid border-neutral-800 '>


                <Progress
                    value={progress}
                    color='success'
                    shadow
                    striped
                    size={'xl'}
                />

                <div className={`min-h-[6rem]   ${finished ? 'grid grid-cols-3 gap-2 ' : 'overflow-x-scroll overflow-y-hidden flex gap-2 '} hide-scrollbar ${feedbackMessage ? 'opacity-25' : 'opacity-100'}`}>
                    {images.map((image, i) => (
                        <div key={i} className='relative w-24 rounded-3xl min-w-[6rem] inline'
                            style={{
                                backgroundImage: `url(${URL.createObjectURL(image.image)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                aspectRatio: '1/1',

                            }}

                        >

                            <div className='absolute w-full h-full flex justify-center items-end rounded-3xl p-2 '>
                                <Button

                                    onClick={() => removeImage(i)}
                                    size={'xs'}
                                    className=' bg-neutral-900  p-4 rounded-3xl bg-opacity-20 hover:bg-opacity-100 aspect-square'
                                // icon={}
                                >

                                    {/* <Delete set='bold' primaryColor='' /> */}
                                    <Trash2 />

                                </Button>
                            </div>
                        </div>
                    ))}
                    {/* Add more images as needed */}
                </div>
            </div>
            }
            <Toaster />
        </div>
    );

};
export default CameraComponent;
// export default () => {
//     return (
//         <div className='min-h-screen'>
//             <CameraComponent />
//         </div>
//     )
// }

type UseCameraHook = {
    images: ImageHashData[];
    captureImages: () => Promise<void>;
    progress: number;
    feedbackMessage: string;
    stream: MediaStream | null;
    loading: boolean;
    removeImage: (index: number) => void;
    closeCamera: () => void,
    video: MutableRefObject<HTMLVideoElement | null>;
};

interface ImageHashData {
    hash: string;
    image: Blob;
}

const hammingDistance = (hexA: string, hexB: string) => {

    const a = hexToBinary(hexA);
    const b = hexToBinary(hexB);
    let distance = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) distance++;
    }
    return distance;

}

const hexToBinary = (hex: string) => {
    const lookupTable = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        'a': '1010',
        'b': '1011',
        'c': '1100',
        'd': '1101',
        'e': '1110',
        'f': '1111',
    };

    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        //@ts-ignore
        if (lookupTable[hex[i]]) {
            //@ts-ignore
            binary += lookupTable[hex[i]];
        }
    }
    return binary;
}




export const useCamera = (): UseCameraHook => {

    const [images, setImages] = useState<ImageHashData[]>([]);
    const imagesRef = useRef<ImageHashData[]>([]);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [progress, setProgress] = useState<number>(0);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');  // Feedback message state
    const [stream, setStream] = useState<MediaStream | null>(null);
    const beepContext = useRef<AudioContext | null>(null);
    const bopContext = useRef<AudioContext | null>(null);
    // const context = useRef<AudioContext | null>(null);

    const setupSounds = () => {
        try {

            beepContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            bopContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        saveImages(images);
    }, [images]);

    const loadImages = async () => {
        const images = await retrieveImages();
        imagesRef.current = images;
        if (images.length) {
            const currentPercentage = Math.round((images.length / IMAGE_COUNT) * 100);
            setProgress(currentPercentage);
        }
        setImages(images);
    };

    useEffect(() => {
        setupSounds();
        loadImages();
    }, []);


    useEffect(() => {
        return () => {

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, []);



    const bop = () => {

        if (bopContext.current) {

            const o1 = bopContext.current.createOscillator();
            const o2 = bopContext.current.createOscillator();
            const g = bopContext.current.createGain();

            o1.connect(g);
            o2.connect(g);
            g.connect(bopContext.current.destination);

            o1.type = 'sine'; // Sine wave, sounds smooth
            o1.frequency.value = 110.0; // Frequency in hertz, lower for a more ominous sound

            o2.type = 'sine'; // Sine wave, sounds smooth
            o2.frequency.value = 115.0; // Slightly different frequency to create a "beat" effect

            // Fade out the sound
            g.gain.exponentialRampToValueAtTime(
                0.00001, bopContext.current.currentTime + 1
            );

            o1.start(0);
            o2.start(0);
        }
    }

    const beep = () => {
        if (beepContext.current) {
            const beepOscillator = beepContext.current.createOscillator();
            const beepGain = beepContext.current.createGain();

            beepOscillator.connect(beepGain);
            beepGain.connect(beepContext.current.destination);

            beepOscillator.type = 'sine';
            beepOscillator.frequency.value = 520.0;

            beepGain.gain.exponentialRampToValueAtTime(
                0.00001, beepContext.current.currentTime + 1
            );

            beepOscillator.start(0)
        }

    }

    const hashImage = async (image: ImageData): Promise<string> => {
        const prcp = (await import('prcp')).default;
        const hash = prcp(image)
        return hash
    }

    const isDuplicate = (hash: string): boolean => {
        if (imagesRef.current.length === 0) {
            return false
        }

        for (let i = 0; i < imagesRef.current.length; i++) {
            const imageHash = imagesRef.current[i].hash;
            const distance = hammingDistance(hash, imageHash);
            if (distance < MIN_DISTANCE) {
                return true
            }
        }
        return false
    }

    const vibrate = (durations: number[]) => {
        try {
            if (navigator?.vibrate && typeof navigator?.vibrate === 'function') {
                navigator.vibrate(durations);
            }
        } catch (e) {
            console.error(e);
        }
    }


    const closeCamera = () => {
        stream?.getTracks().forEach(track => track.stop())
    }

    const captureImages = async () => {
        setLoading(true)
        setFeedbackMessage('');

        let duplicateCounter = 0;
        let noFaceDetectedCounter = 0;

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: {
                    ideal: 1024
                },
                height: {
                    ideal: 1024
                }
            }
        });

        setStream(stream);

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
            }

            let canvas: HTMLCanvasElement;
            canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const context = canvas.getContext('2d');

            if (!context) {
                throw new Error('Unable to get 2d context from canvas');
            }

            const handleBlob = (blob: Blob | null, hash: string) => {
                if (!blob) {
                    throw new Error('blob is null');
                }
                setImages(previousImages => {
                    const updatedImages = [...previousImages, { hash: hash, image: blob }];
                    const currentPercentage = Math.round((updatedImages.length / IMAGE_COUNT) * 100);
                    setProgress(currentPercentage);
                    imagesRef.current = updatedImages;
                    return updatedImages;
                });
            };


            while (true) {
                await delay(1000);
                if (imagesRef.current.length === IMAGE_COUNT) {
                    continue;
                }

                if (!videoRef.current) {
                    continue;
                }

                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const faceDetected = await detectFace(imageData)

                if (!faceDetected) {
                    setFeedbackMessage("Arible cannot detect any faces. Please get in view of the camera.")
                    if (++noFaceDetectedCounter >= 3 && noFaceDetectedCounter < 15) {
                        vibrate([200, 100, 200, 100, 200])
                        bop()
                    }
                    continue;
                } else {
                    noFaceDetectedCounter = 0;
                }

                const hash = await hashImage(imageData);
                const imageBlob: Blob = await new Promise((resolve, reject) => {
                    (canvas as HTMLCanvasElement).toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Unable to convert canvas to blob'));
                        }
                    }, 'image/png', 1);
                });

                if (!imageBlob) {
                    throw new Error('imageBlob is null');
                }

                if (isDuplicate(hash)) {
                    setFeedbackMessage('Arible needs more unique photos. Walk around your environment, while waving your phone selfie camera up & down, left & right, far & near. Multiple face angles too')
                    if (++duplicateCounter >= 3 && duplicateCounter < 15) {
                        vibrate([200, 100, 200, 100, 200]);
                        bop();
                    }
                    continue
                } else {
                    handleBlob(imageBlob, hash);

                    duplicateCounter = 0;
                    setFeedbackMessage('')
                    beep();
                    vibrate([200]);
                }
                setLoading(false)
            };
        } catch (err) {
            console.error(err);
        }
    }

    const removeImage = (index: number) => {
        setImages(previousImages => {
            let hash = previousImages[index].hash;
            removeImageDB(hash)

            const updatedImages = previousImages.filter((_, i) => i !== index);
            imagesRef.current = updatedImages;

            const currentPercentage = Math.round((updatedImages.length / IMAGE_COUNT) * 100);
            setProgress(currentPercentage);

            return updatedImages;
        });
    };

    return {
        images, progress, captureImages, feedbackMessage, stream, removeImage, loading, closeCamera, video: videoRef
    }
};

async function detectFace(image: ImageData): Promise<boolean> {
    const faceDetector = await createFaceDetector()
    const result = await faceDetector.detect(image)
    return result.detections.length === 1 // only one face
}

async function createFaceDetector() {
    const { FilesetResolver, FaceDetector } = await import('@mediapipe/tasks-vision')
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    )

    const faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: 'https://pub-7bbc6377635e4e588a0a4c5fdfb0df93.r2.dev/blaze_face_short_range.tflite',
        },
        minDetectionConfidence: 0.5,
        runningMode: 'IMAGE'
    })
    return faceDetector
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const openDatabase = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('imagesDatabase', 1);

        request.onerror = () => {
            reject('Failed to open database.');
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            db.createObjectStore('imagesStore', { keyPath: 'hash' });
        };
    });
};

const saveImages = async (images: ImageHashData[]) => {
    if (images.length === 0) {
        return;
    }
    const db = await openDatabase();
    const transaction = db.transaction('imagesStore', 'readwrite');
    const store = transaction.objectStore('imagesStore');

    return new Promise<void>((resolve, reject) => {
        images.forEach(image => {
            const request = store.put(image);
            //@ts-ignore
            request.onsuccess = resolve;
            request.onerror = () => reject('Failed to store image.');
        })
    });
}


const removeImageDB = async (hash: string) => {
    const db = await openDatabase();
    const transaction = db.transaction('imagesStore', 'readwrite');
    const store = transaction.objectStore('imagesStore');

    return new Promise<void>((resolve, reject) => {
        const request = store.delete(hash);
        //@ts-ignore
        request.onsuccess = resolve;
        request.onerror = () => reject('Failed to remove image.');
    });
}

const retrieveImages = async (): Promise<ImageHashData[]> => {
    const db = await openDatabase();
    const transaction = db.transaction('imagesStore', 'readonly');
    const store = transaction.objectStore('imagesStore');

    return new Promise<ImageHashData[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to retrieve images.');
    });
};
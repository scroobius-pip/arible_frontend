import React from 'react';
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker';
import pMap from 'p-map';
// import compress from 'browser-image-compression'
interface ImageSelectProps {
    openSelect: () => void
    result: { fileName: string, error: string }
    uploading: boolean
    progress: number
}

export default function useImageSelectZippedC(): ImageSelectProps {
    // const [zippedBlob, setZippedBlob] = useState<Uint8Array | null>(null)
    const [result, setResult] = useState<{ fileName: string, error: string }>({ fileName: '', error: '' })
    const [uploading, setUploading] = useState(false)
    const [openFileSelector, { plainFiles, loading, errors }] = useFilePicker({
        accept: 'image/*, .heic, .heif',
        readAs: 'ArrayBuffer',
        multiple: true,
    })
    const [percentageProgress, setPercentageProgress] = useState(0)

    let loadingRef = React.useRef(loading)

    function isHEIC(file: any) { // check file extension since windows returns blank mime for heic
        let x = file.type ? file.type.split('image/').pop() : file.name.split('.').pop().toLowerCase();
        return x == 'heic' || x == 'heif';
    }

    useEffect(() => {
        if (errors.length > 0) {
            alert('Error uploading images')
            console.log(errors)
        }
    }, [errors])


    useEffect(() => {
        if (plainFiles.length < 15 && plainFiles.length > 0) {
            alert('Please select at least 15 images')
        }

        if (plainFiles.length >= 15 && !loadingRef.current) {
            loadingRef.current = true
            setUploading(true)
            processImages(plainFiles).then(setResult).finally(() => setUploading(false))
        }

    }, [plainFiles])

    const cropImage = async (s3Url: string): Promise<[Uint8Array, string]> => {
        const cloudinary_face_crop = `https://cyggfpyiva.cloudimg.io/${s3Url}?w=512&h=512&func=crop`;
        const response = await fetch(cloudinary_face_crop);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const fileName = s3Url.split('/').pop()
        if (!fileName) throw new Error('Error getting file name from signed url')
        return [new Uint8Array(arrayBuffer), fileName];
    };


    const getFileNameFromSignedUrl = (signedUrl: string) => {
        let fileName = signedUrl.split('?')[0].split('/').pop()
        return `https://s.arible.co/${fileName}`
    }

    const uploadImage = async (signedUrl: string, image: File): Promise<void> => {
        let retries = 0;
        while (true) {
            try {
                await import('axios').then(({ default: axios }) => axios.put(signedUrl, image));
                break;
            } catch {
                if (retries++ > 10) {
                    console.log('Error uploading image, giving up');
                    break;
                } else {
                    console.log('Error uploading image, retrying');
                    continue;
                }
            }
        }
    };

    const uploadZipped = async (signedUrl: string, zipped: Uint8Array): Promise<void> => {

        // let result = await axios.put(signedUrl, zipped,)
        await import('axios').then(({ default: axios }) => axios.put(signedUrl, zipped))
    }

    const getSignedUrl = async (extension: string) => {
        let request_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/presigned_upload_url/${extension}/true`;
        // const response = await axios.get<string>(request_url);
        // return response.data;
        return await import('axios').then(({ default: axios }) => axios.get<string>(request_url)).then(({ data }) => data);
    };

    const compressImage = async (image: File): Promise<File> => {

        if (image.size < 5 * 1024 * 1024) return image;

        const compressed = await import('browser-image-compression').then(({ default: compress }) => compress(image, {
            maxSizeMB: 5,
            useWebWorker: true,
            maxWidthOrHeight: 512,
        }));

        return new File([compressed], image.name, { type: image.type });
    };


    const processImages = async (_files: File[]): Promise<{ fileName: string, error: string }> => {
        try {

            const images = await pMap(Array.from(_files), async (file) => {

                const extension = file.name.split('.').pop();
                if (!extension) throw new Error('Error getting file extension');
                const signedUrl = await getSignedUrl(extension);
                const compressedImage = await compressImage(file);

                await uploadImage(signedUrl, compressedImage);
                const s3Url = getFileNameFromSignedUrl(signedUrl);
                const croppedImage = cropImage(s3Url);
                // setProgress((prev) => prev + 1)
                // limit progress to only add up to 90% to allow for zipping, it should be relative to the number of images
                setPercentageProgress((prev) => prev + 90 / _files.length)
                return croppedImage;
            }, { concurrency: 5 });


            const zipSync = await import('fflate').then(({ zipSync }) => zipSync);
            const zip = zipSync(
                images.reduce((acc, [bytes, name]) => {
                    acc[name] = bytes;
                    return acc;
                }, {} as { [key: string]: Uint8Array }),
                { level: 0 }
            );

            const signedUrl = await getSignedUrl('zip');
            const fileName = getFileNameFromSignedUrl(signedUrl);
            if (!fileName) throw new Error('Error getting file name from signed url');
            await uploadZipped(signedUrl, zip);
            setPercentageProgress(100)
            return { fileName, error: '' };
        } catch (error) {
            console.log(error);
            return { fileName: '', error: 'Error processing images' };
        }
    };





    const openSelect = () => {
        openFileSelector()
    }

    return {
        openSelect,
        result,
        uploading,
        progress: percentageProgress
    }

} 
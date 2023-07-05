import { useState } from 'react'
// import axios from 'axios'
// import imageCompression from 'browser-image-compression'

interface FileWithStyleID {
    file: File,
    styleID: string
}

interface ImageDropProps {
    onDrop: (files: FileWithStyleID[]) => void;
    result: { fileName: string, error: string, styleID: string }[];
    uploading: boolean;
}

export const useImageDropCompressed = (): ImageDropProps => {
    const [result, setResult] = useState<{ fileName: string, error: string, styleID: string }[]>([])
    const [uploading, setUploading] = useState(false)

    const compressImage = async ({ file, styleID }: FileWithStyleID): Promise<[FileWithStyleID, string]> => {
        const options = {
            useWebWorker: true,
            alwaysKeepResolution: true,
        };
        const compressedFile = await import('browser-image-compression').then(({ default: imageCompression }) => imageCompression(file, options));
        // const compressedFile = await imageCompression(file, options);
        return [{ file: compressedFile, styleID }, file.name];
    };

    const getFileNameFromSignedUrl = (signedUrl: string) => {
        let fileName = signedUrl.split('?')[0].split('/').pop();
        return `https://s.arible.co/${fileName}`;
    };

    const uploadImage = async (signedUrl: string, image: File): Promise<void> => {

        // await axios.put(signedUrl, image);
        await import('axios').then(({ default: axios }) => axios.put(signedUrl, image));
    };

    const getSignedUrl = async (extension: string) => {
        let request_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/presigned_upload_url/${extension}/false`;
        // const response = await axios.get<string>(request_url);
        // return response.data;
        return await import('axios').then(({ default: axios }) => axios.get<string>(request_url)).then(({ data }) => data);
    };

    const processImages = async (files: FileWithStyleID[]) => {
        try {
            const compressedImages = await Promise.all(files.map(compressImage));
            const results = [];

            for (const [compressedImage, name] of compressedImages) {
                const extension = name.split('.').pop() ?? (console.log('Error getting extension falling back to jpg'), 'jpg');
                const signedUrl = await getSignedUrl(extension);
                const fileName = getFileNameFromSignedUrl(signedUrl);

                if (!fileName) {
                    throw new Error('Error getting file name from signed url');
                }

                await uploadImage(signedUrl, compressedImage.file);
                results.push({ fileName, error: '' });
                setResult((prevResult) => [...prevResult, { fileName, styleID: compressedImage.styleID, error: '' }]);
            }

            return results;
        } catch (error) {
            console.log(error);
            return [{ fileName: '', error: 'Error processing images' }];
        }
    };

    const onDrop = async (files: FileWithStyleID[]) => {
        setUploading(true);
        await processImages(files);
        setUploading(false);
    };

    return {
        onDrop,
        result,
        uploading,
    };
}
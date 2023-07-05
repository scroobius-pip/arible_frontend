import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker';

import smartCrop from './smartCrop';
interface ImageSelectProps {
    openSelect: () => void
    result: { fileName: string, error: string }
    uploading: boolean
}

export default function useImageSelectZipped(): ImageSelectProps {
    // const [zippedBlob, setZippedBlob] = useState<Uint8Array | null>(null)
    const [result, setResult] = useState<{ fileName: string, error: string }>({ fileName: '', error: '' })
    const [uploading, setUploading] = useState(false)
    const [openFileSelector, { plainFiles, loading, errors }] = useFilePicker({
        accept: 'image/*, .heic, .heif',
        readAs: 'ArrayBuffer',
        multiple: true,
    })


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

        if (plainFiles.length >= 15) {
            setUploading(true)
            processImages(plainFiles).then(setResult).finally(() => setUploading(false))
        }

    }, [plainFiles])


    const cropImage = async (file: File): Promise<[Uint8Array, string]> => {
        const buffer = await file.arrayBuffer()
        const bytes = new Uint8Array(buffer)
        try {
            const croppedBytes = await smartCrop(bytes, 512, 512, file.type)
            return [croppedBytes, file.name]
        } catch (error) {
            console.error('Error cropping image: smartCrop issue')
            throw error
        }
    }


    const getFileNameFromSignedUrl = (signedUrl: string) => {
        let fileName = signedUrl.split('?')[0].split('/').pop()
        return `https://s.arible.co/${fileName}`
    }
    const uploadZipped = async (signedUrl: string, zipped: Uint8Array): Promise<void> => {

        // let result = await axios.put(signedUrl, zipped,)
        await import('axios').then(({ default: axios }) => axios.put(signedUrl, zipped))
    }

    const getSignedUrl = async () => {
        let request_url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/presigned_upload_url/zip/true`
        // const response = await axios.get<string>(request_url)
        const response = await import('axios').then(({ default: axios }) => axios.get<string>(request_url))
        return response.data
    }

    const processImages = async (_files: File[]) => {
        try {

            const images = await Promise.all(Array.from(_files).map(cropImage))

            const zipSync = await import('fflate').then(({ zipSync }) => zipSync)
            const zip = zipSync(images.reduce((acc, [bytes, name],) => {
                acc[name] = bytes
                return acc
            }, {} as { [key: string]: Uint8Array }), { level: 0 })

            const signedUrl = await getSignedUrl()
            const fileName = getFileNameFromSignedUrl(signedUrl)
            if (!fileName) throw new Error('Error getting file name from signed url')
            await uploadZipped(signedUrl, zip)
            return { fileName, error: '' }
        } catch (error) {
            console.log(error)
            return { fileName: '', error: 'Error processing images' }
        }
    }




    const openSelect = () => {
        openFileSelector()
    }
    return {
        openSelect,
        result,
        uploading
    }

} 
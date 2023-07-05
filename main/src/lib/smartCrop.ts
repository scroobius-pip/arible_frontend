// import smartcrop, { CropBoost } from 'smartcrop'
// import * as blazeFace from '@tensorflow-models/blazeface'
// import '@tensorflow/tfjs'

export default async (imageData: Uint8Array, width: number, height: number, type: string): Promise<Uint8Array> => {
    try {

        const smartcrop = (await import('smartcrop')).default

        // await import('@tensorflow/tfjs')


        const blob = new Blob([imageData], { type })
        const img = await loadImage(blob)
        const faceBox = await getFaceBox(img)
        if (!faceBox) console.log('no face detected fallback to smartcrop')
        const result = faceBox ? await smartcrop.crop(img, { width, height, boost: [faceBox] }) : await smartcrop.crop(img, { width, height })

        let canvas: any;
        let ctx;
        let mode: "oc" | "c" = "oc"

        if (typeof OffscreenCanvas !== 'undefined') {
            mode = 'oc'

            canvas = new OffscreenCanvas(width, height)
            ctx = canvas.getContext('2d')!
        } else {
            mode = 'c'
            canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            ctx = canvas.getContext('2d')!
        }


        ctx.drawImage(img, result.topCrop.x, result.topCrop.y, result.topCrop.width, result.topCrop.height, 0, 0, width, height)

        return new Promise((resolve) => {
            const handleBlob = (blob: Blob | null) => {
                if (!blob) {
                    throw new Error('blob is null')
                }
                let reader: any = new FileReader()
                reader.readAsArrayBuffer(blob)
                reader.onload = () => {
                    const buffer = reader.result as ArrayBuffer
                    const bytes = new Uint8Array(buffer)
                    resolve(bytes)

                    reader = null
                }

            }

            if (mode === 'oc') {
                canvas.convertToBlob({ type }).then((blob: any) => {
                    canvas = null
                    handleBlob(blob)
                })
            } else {
                canvas.toBlob((blob: any) => {
                    canvas = null
                    handleBlob(blob)
                }, type)
            }
        })
    } catch (error) {
        console.error(error)

        throw error
    }
}


async function getFaceBox(img: any): Promise<any | null> {
    try {
        // const blazeFace = await import('@tensorflow-models/blazeface')
        // const model = await blazeFace.load()
        // const predictions = await model.estimateFaces(img)
        // if (predictions.length === 0) return null

        // const { topLeft, } = predictions[0]
        // const [xMin, yMax] = topLeft as [number, number]
        // const { bottomRight } = predictions[0]
        // const [xMax, yMin] = bottomRight as [number, number]

        // const result = {
        //     x: xMin,
        //     y: yMax,
        //     width: xMax - xMin,
        //     height: yMax - yMin,
        //     weight: 1
        // }
        // console.log(result)
        // return result
    } catch (e) {

        console.error(e)
        return null
    }

}

function loadImage(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
}
import { Circle, Layer, Rect, Stage } from 'react-konva';
import dynamic from 'next/dynamic';
import { useMeasure } from 'react-use';
import { createRef, useEffect, useRef } from 'react';

export default ({ containerRef }: any) => {
    const [ref, { width, height }] = useMeasure() as any;

    return <div ref={ref}
        className='w-full h-full bg-neutral-900 p-4 '

    >
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
        </Stage>
    </div>

}

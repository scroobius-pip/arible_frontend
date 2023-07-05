//@ts-nocheck
import React, { useEffect, useRef } from 'react';

interface AnimatedImageGridProps {
    images: string[];
    id: string;
    className?: string;
    small?: boolean;
}

const AnimatedImageGrid = ({ images, id, className, small = false, ...props }: AnimatedImageGridProps) => {
    const imageRefs = [useRef(null), useRef(null), useRef(null)];
    const [currentImages, setCurrentImages] = React.useState(images);

    useEffect(() => {
        const animateIn = () => {
            imageRefs.forEach((ref, index) => {
                setTimeout(() => {
                    ref.current?.classList.remove('animate-fade-out');

                    ref.current?.classList.add('animate-fade-in');
                }, index * 200)
            });
        };

        const animateOut = () => {
            imageRefs.slice().reverse().forEach((ref, index) => {
                setTimeout(() => {
                    ref.current?.classList.remove('animate-fade-in');
                    ref.current?.classList.add('animate-fade-out');

                }, index * 500)
            });
        };

        // First, animate the current images out
        animateOut();

        // Then, after enough time has passed for the animation out to complete,
        // change the images and animate them in
        setTimeout(() => {

            imageRefs.forEach((ref, index) => {
                if (!ref.current) return;
                ref.current.style.backgroundImage = `url(${images[index]})`;
            });
            animateIn();
        }, imageRefs.length * 500);
    }, [id]);

    const visibilityClass = className ?? ''
    const LargeComponent =
        (
            <div className={`${visibilityClass} grid grid-cols-4 grid-rows-2 gap-6`} >
                <div className='col-span-2 row-span-2 rounded-3xl'
                    ref={imageRefs[0]}
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${currentImages[0]})`,
                        backgroundPosition: 'center',
                    }}>
                </div>
                <div className='col-span-2 row-span-2 gap-6 grid grid-row-2 grid-cols-1'>
                    <div className='row-span-1 rounded-3xl'
                        ref={imageRefs[1]}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${currentImages[1]})`,
                            backgroundPosition: 'center',
                        }}>
                    </div>
                    <div className='row-span-1 rounded-3xl'
                        ref={imageRefs[2]}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${currentImages[2]})`,
                            backgroundPosition: 'center',
                        }}>
                    </div>
                </div>
            </div>
        );

    const SmallComponent = (

        <div className={`rounded-3xl ${visibilityClass}`}
            ref={imageRefs[0]}
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${currentImages[0]})`,
                // height: '100%',
                // width: '100%',
                aspectRatio: '1/1',
            }}>
        </div>

    );

    return small ? SmallComponent : LargeComponent;
}

export default AnimatedImageGrid;

import React, { useEffect, useRef } from 'react';

const ScrollingText = ({ children, ...props }: any) => {
    const textRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-effect');
                        // Disconnect the observer once the effect is applied
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, []);

    return (
        //@ts-ignore
        <div ref={textRef} className="scrolling-text" {...props}>
            {children}
        </div>
    );
};

export default ScrollingText;
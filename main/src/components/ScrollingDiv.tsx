import React, { useEffect, useRef } from 'react';

const ScrollingDiv = ({ children, className, ...props }: any) => {
    const divRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-effect-div');
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (divRef.current) {
            observer.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
        };
    }, []);

    return (
        //@ts-ignore
        <div ref={divRef} className={"scrolling-div " + className} {...props}>
            {children}
        </div>
    );
};

export default ScrollingDiv;

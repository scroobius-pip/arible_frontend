//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

const AnimatedParagraph = ({ sentence, className, ...props }) => {
    const [currentSentence, setCurrentSentence] = useState(sentence);
    const [animatingOut, setAnimatingOut] = useState(false);

    const divRef = useRef();

    useEffect(() => {
        const div = divRef.current;
        if (div && !animatingOut) {
            const spans = div.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('animate-fade-out');
                    span.classList.add('animate-fade-in');
                }, index * 100)
            })
        }
    }, [currentSentence, animatingOut]);

    useEffect(() => {
        if (currentSentence !== sentence) {
            setAnimatingOut(true);
            const div = divRef.current;
            if (div) {

                const spans = Array.from(div.querySelectorAll('span')).reverse();
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.remove('animate-fade-in');
                        span.classList.add('animate-fade-out');
                    }, index * 100)
                })
                setTimeout(() => {
                    setAnimatingOut(false);
                    setCurrentSentence(sentence);
                }, spans.length * 100);
            }
        }
    }, [sentence]);

    const splitSentenceIntoSpans = (sentence) => {
        return sentence.split(' ').map((word, index) => {
            return <span key={index} className='text-3xl md:text-7xl text-neutral-900 font-bold animate-fade-out'>{word} </span>;
        });
    }

    return (
        <p style={{ overflowWrap: 'anywhere', wordBreak: 'keep-all' }} className={className} ref={divRef} {...props}>
            {splitSentenceIntoSpans(currentSentence)}
        </p>
    );
}

export default AnimatedParagraph;

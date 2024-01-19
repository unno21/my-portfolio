import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

type Props = {
  text: string | string[];
  delay?: number;
  once?: boolean;
};

const AnimatedText: React.FC<Props> = ({ text, delay, once }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once ? true : false });
  const textArray = Array.isArray(text) ? text : [text];
  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 400,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 0.03, 0.26, 1],
      },
    },
  };

  return (
    <p ref={ref}>
      <Text
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          delayChildren: delay ? delay : 0,
          staggerChildren: 0.05,
          transition: 'easeOut',
        }}
      >
        {textArray.map((line, lineIndex) => (
          <SpanBlock key={lineIndex}>
            {line.split(' ').map((word, wordIndex, wordArray) => (
              <SpanInlineFlex key={wordIndex}>
                {word.split('').map((char, charIndex) => (
                  <SpanBlock key={charIndex} variants={defaultAnimations}>
                    {char}
                  </SpanBlock>
                ))}
                {wordIndex < wordArray.length - 1 && (
                  <SpanBlock>&nbsp;</SpanBlock>
                )}
              </SpanInlineFlex>
            ))}
          </SpanBlock>
        ))}
      </Text>
    </p>
  );
};

export default AnimatedText;

const Text = styled(motion.span)`
  display: block;
`;
const SpanBlock = styled(motion.span)`
  display: block;
`;
const SpanInlineFlex = styled.span`
  display: inline-flex;
  overflow: hidden;
`;

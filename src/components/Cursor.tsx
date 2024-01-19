import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = React.createContext<any>(null);

export const CursorProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isContact, setIsContact] = useState(false);

  return (
    <CursorContext.Provider
      value={{ isHovering, setIsHovering, isContact, setIsContact }}
    >
      {children}
    </CursorContext.Provider>
  );
};

const Cursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const cursorBlend = useMotionValue('difference');
  const { isHovering, isContact } = useContext(CursorContext);

  const springConfig = { damping: 50, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);

  useEffect(() => {
    if (isHovering) {
      cursorScale.set(4);
      if (isContact) {
        cursorScale.set(4);
        cursorBlend.set('normal');
      }
    }
    const moveCursor = (e: any) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursorScale.set(1);
      cursorBlend.set('difference');
    };
  }, [isHovering]);

  return (
    <CursorDiv
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: cursorScaleSpring,
        mixBlendMode: cursorBlend,
      }}
    ></CursorDiv>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export default Cursor;

const CursorDiv = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.white};
  z-index: 99999;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

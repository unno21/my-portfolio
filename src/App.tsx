import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { isBrowser } from 'react-device-detect';
import { useDarkMode } from 'theme/darkModeProvider';
import { Noise } from 'assets/images';
import Cursor from 'components/Cursor';
import TopNav from 'components/TopNav';
import Hero from 'components/Sections/Hero';
import Projects from 'components/Sections/Projects';
import About from 'components/Sections/About';
import Footer from 'components/Sections/Footer';

function App() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const projectRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInProjectView = useInView(projectRef, { amount: 0.3 });
  const isInFooterView = useInView(footerRef, { amount: 0.3 });

  useEffect(() => {
    if (isInProjectView || isInFooterView) {
      setIsDarkMode(true);
    }
    return () => setIsDarkMode(false);
  }, [isInProjectView, isInFooterView]);

  return (
    <>
      {isBrowser && <Cursor />}
      <StyledApp
        animate={{ backgroundColor: isDarkMode ? '#0c0a09' : '#d6d3d1' }}
      >
        {/* <AnimatePresence> */}
        <TopNav />
        <Hero />
        <Projects myRef={projectRef} />
        <About myRef={aboutRef} />
        <Footer myRef={footerRef} />
        {/* </AnimatePresence> */}
      </StyledApp>
    </>
  );
}

export default App;

const StyledApp = styled(motion.div)`
  width: 100%;
  background-color: ${props => props.theme.colors.gray[300]};
  &:after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120vh;
    background: url(${Noise});
    opacity: 0.5;
    animation: noise 0.09s infinite;
    pointer-events: none;
    z-index: 120;
    transform: translateZ(0);
  }
  @keyframes noise {
    0%,
    100% {
      background-position: 0 0;
    }
    10% {
      background-position: -5% -10%;
    }
    20% {
      background-position: -15% 5%;
    }
    30% {
      background-position: 7% -25%;
    }
    40% {
      background-position: 20% 25%;
    }
    50% {
      background-position: -25% 10%;
    }
    60% {
      background-position: 15% 5%;
    }
    70% {
      background-position: 0 15%;
    }
    80% {
      background-position: 25% 35%;
    }
    90% {
      background-position: -10% 10%;
    }
  }
`;

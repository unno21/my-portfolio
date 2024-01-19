import styled from 'styled-components';
import AnimatedText from 'components/AnimatedText';
import { motion, useInView } from 'framer-motion';
import { useDarkMode } from 'theme/darkModeProvider';
import { useRef } from 'react';

const Hero = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(homeRef, { amount: 0.3 });
  const { isDarkMode } = useDarkMode();

  const jobDescAnimation = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: 'easeOut',
      },
    },
  };
  return (
    <HeroContainer ref={homeRef}>
      <IntroWrapper>
        <HelloText>
          <AnimatedText text={'Hello, I am'} once />
        </HelloText>
        <Grid>
          <NameText isDarkMode={isDarkMode}>
            <motion.span>
              <AnimatedText text={['Richard', 'Roncales']} delay={0.6} once />
            </motion.span>
          </NameText>
          <JobDescWrapper
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{
              delayChildren: 2,
              staggerChildren: 0.2,
              transition: 'easeOut',
            }}
          >
            <JobDescText variants={jobDescAnimation}>
              Software Engineer
            </JobDescText>
            <JobDescText variants={jobDescAnimation}>
              Front-end Developer
            </JobDescText>
            <JobDescText variants={jobDescAnimation}>
              Based in The Philippines
            </JobDescText>
          </JobDescWrapper>
        </Grid>
      </IntroWrapper>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-bottom: ${props => props.theme.pxToRem(32)};
  padding: ${props => props.theme.pxToRem(20)};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    align-items: flex-end;
    padding: ${props =>
      `${props.theme.pxToRem(32)} ${props.theme.pxToRem(48)}`};
  }
`;
const IntroWrapper = styled.div`
  position: relative;
`;
const HelloText = styled.div`
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fontHeading};
  font-size: 5.5vw;
  margin-bottom: ${props => props.theme.pxToRem(24)};

  /* @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.pxToRem(80)};
  } */
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: flex-end;
  gap: ${props => props.theme.pxToRem(16)};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.pxToRem(32)};
  }
`;
const NameText = styled.div<{ isDarkMode?: boolean }>`
  font-family: ${props => props.theme.fontHeading};
  font-size: 18vw;
  margin-left: -0.3rem;
  line-height: 1;
  grid-column: span 7 / span 7;
  text-transform: uppercase;
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray[200]
      : props.theme.colors.gray[900]};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 11vw;
  }
`;
const JobDescWrapper = styled(motion.div)`
  position: relative;
  margin-bottom: 8%;
  overflow: hidden;
  grid-column: span 12 / span 12;
  grid-column-start: 1;
  grid-row-start: 2;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-column: span 5 / span 5;
    grid-column-start: 8;
    grid-row-start: 1;
  }
`;
const JobDescText = styled(motion.p)`
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fontHeading};
  font-size: ${props => props.theme.pxToRem(20)};
  margin-top: ${props => props.theme.pxToRem(8)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 5vw;
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.75vw;
  }
`;

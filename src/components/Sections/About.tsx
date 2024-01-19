import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  motion,
  useInView,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import { useDarkMode } from 'theme/darkModeProvider';

type AboutProps = {
  myRef: React.RefObject<HTMLDivElement>;
};
type ParallaxTitleProps = {
  title: string;
  baseVelocity: number;
};

const experienceList = [
  {
    title: 'Front-end Developer (React JS)',
    company: 'Sattelite Office',
    date: 'Aug 2022 – Present',
  },
  {
    title: 'Application Development Analyst (React JS)',
    company: 'Accenture',
    date: 'Aug 2021 - Aug 2022',
  },
  {
    title: 'Web Developer',
    company: 'Cafe 24 Philippines',
    date: 'Apr 2019 - Aug 2021',
  },
  {
    title: 'Bachelor of Science in Computer Science',
    company: 'University of Caloocan City',
    date: '2019',
  },
];
const skillsList = [
  'React Js',
  'TypeScript',
  'Vue JS',
  'JavaScript',
  'Bootstrap',
  'TailwindCSS',
  'CSS',
  'SASS',
  'BEM',
  'REST API',
  'Git',
  'Responsive Design',
];

const ParallaxTitle: React.FC<ParallaxTitleProps> = ({
  title,
  baseVelocity,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <SectionTitle style={{ x }}>
      <span>{title}</span>
      <span>{title}</span>
      <span>{title}</span>
      <span>{title}</span>
    </SectionTitle>
  );
};

const About: React.FC<AboutProps> = ({ myRef }) => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInExperience = useInView(experienceRef, { amount: 0.3 });
  const isInSkills = useInView(skillsRef, { amount: 0.3 });
  const isInView = useInView(myRef, { amount: 0.3 });
  const { isDarkMode } = useDarkMode();
  const descVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 0.03, 0.26, 1],
      },
    },
  };
  const subtitleVariant = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 1,
      transition: {
        duration: 1,
        ease: [0.22, 0.03, 0.26, 1],
      },
    },
  };
  const dividerVariant = {
    initial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 1,
        ease: [0.22, 0.03, 0.26, 1],
      },
    },
  };
  return (
    <div ref={myRef}>
      <AboutContainer>
        <ParallaxTitle title="About." baseVelocity={5} />
        <AboutSectionWrapper>
          <AboutDesc isDarkMode={isDarkMode}>
            <motion.span
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
            >
              <motion.span variants={descVariant}>
                I am a skilled ReactJS Frontend Developer with a talent for
                transforming complex concepts into captivating interfaces.
                Leveraging my expertise in ReactJS, HTML, CSS, and JavaScript, I
                thrive on crafting visually stunning and highly functional web
                applications. From wireframing to responsive design
                implementation and seamless API integrations. I made sure to
                follow best practices and coding standards as well as utilize
                unit tests to improve the quality of the codebase, making it
                more maintainable and less error-prone. With a keen eye for
                detail and a commitment to staying up-to-date with the latest
                industry trends.
              </motion.span>
            </motion.span>
          </AboutDesc>
          <AboutExperience ref={experienceRef}>
            <AboutSubtitle
              initial="initial"
              animate={isInExperience ? 'animate' : 'initial'}
            >
              <motion.span variants={subtitleVariant}>Experience</motion.span>
            </AboutSubtitle>
            <motion.div
              initial="initial"
              animate={isInExperience ? 'animate' : 'initial'}
              transition={{
                delayChildren: 0.7,
                staggerChildren: 0.1,
                transition: 'easeOut',
              }}
            >
              {experienceList.map((data, key) => (
                <AboutExperienceContent key={`${data.title}_${key}`}>
                  <AboutExperienceItemWrapper>
                    <AboutExperienceItemText
                      isDarkMode={isDarkMode}
                      variants={descVariant}
                    >
                      {data.title}
                    </AboutExperienceItemText>
                    <AboutExperienceItemSubtext isDarkMode={isDarkMode}>
                      <motion.span variants={descVariant}>
                        <i>{data.company}</i>
                      </motion.span>
                      <motion.span variants={descVariant}>
                        {data.date}
                      </motion.span>
                    </AboutExperienceItemSubtext>
                    <AboutExperienceItemDivider variants={dividerVariant} />
                  </AboutExperienceItemWrapper>
                </AboutExperienceContent>
              ))}
            </motion.div>
          </AboutExperience>
          <AboutSkills ref={skillsRef}>
            <AboutSubtitle
              initial="initial"
              animate={isInSkills ? 'animate' : 'initial'}
            >
              <motion.span variants={subtitleVariant}>
                Skills and Expertise
              </motion.span>
            </AboutSubtitle>
            <AboutSkillsContent>
              <AboutSkillsGrid
                isDarkMode={isDarkMode}
                initial="initial"
                animate={isInSkills ? 'animate' : 'initial'}
                transition={{
                  delayChildren: 0.5,
                  staggerChildren: 0.1,
                  transition: 'easeOut',
                }}
              >
                {skillsList.map((data, key) => (
                  <span key={`${data}_${key}`}>
                    <motion.span variants={subtitleVariant}>
                      {`- ${data}`}
                    </motion.span>
                  </span>
                ))}
              </AboutSkillsGrid>
            </AboutSkillsContent>
          </AboutSkills>
        </AboutSectionWrapper>
      </AboutContainer>
    </div>
  );
};

export default About;

const AboutContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.div)`
  font-size: ${props => props.theme.pxToRem(320)};
  font-family: ${props => props.theme.fontHeading};
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray[400]};
  display: flex;

  & > span {
    display: block;
    margin-right: ${props => props.theme.pxToRem(20)};
  }
`;

const AboutSectionWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.containerMaxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: ${props => props.theme.pxToRem(20)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props =>
      `${props.theme.pxToRem(32)} ${props.theme.pxToRem(48)}`};
  }
`;
const AboutDesc = styled.div<{ isDarkMode?: boolean }>`
  grid-column: span 12 / span 12;
  line-height: 1.5;
  font-size: ${props => props.theme.pxToRem(20)};
  margin-bottom: ${props => props.theme.pxToRem(80)};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.pxToRem(28)};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    margin-bottom: ${props => props.theme.pxToRem(160)};
    grid-column: span 8 / span 8;
  }
  & > span > span {
    color: ${props =>
      props.isDarkMode
        ? props.theme.colors.gray['200']
        : props.theme.colors.gray['900']};
  }
`;

const AboutSubtitle = styled(motion.span)`
  display: block;
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.pxToRem(20)};
  font-family: ${props => props.theme.fontHeading};
  margin-bottom: ${props => props.theme.pxToRem(40)};
  text-transform: uppercase;
  overflow: hidden;
  & > span {
    display: block;
  }
`;

// Experience

const AboutExperience = styled.div`
  grid-column: span 12 / span 12;
  grid-column-start: 1;
  grid-row-start: 2;
  margin-bottom: ${props => props.theme.pxToRem(56)};
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-column: span 6 / span 6;
    grid-column-start: 7;
    margin-bottom: ${props => props.theme.pxToRem(128)};
  }
`;
const AboutExperienceContent = styled.div`
  position: relative;
`;
const AboutExperienceItemWrapper = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.pxToRem(32)};
  font-weight: ${props => props.theme.fontWeights.semibold};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-bottom: ${props => props.theme.pxToRem(40)};
  }
`;
const AboutExperienceItemText = styled(motion.span)<{ isDarkMode?: boolean }>`
  display: block;
  font-size: ${props => props.theme.pxToRem(20)};
  margin-bottom: ${props => props.theme.pxToRem(12)};
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray['200']
      : props.theme.colors.gray['900']};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(24)};
    margin-bottom: ${props => props.theme.pxToRem(16)};
  }
`;
const AboutExperienceItemSubtext = styled.div<{ isDarkMode?: boolean }>`
  display: flex;
  justify-content: start;
  font-size: ${props => props.theme.pxToRem(16)};
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray['400']
      : props.theme.colors.gray['600']};
  flex-direction: column;
  gap: ${props => props.theme.pxToRem(12)};
  margin-bottom: ${props => props.theme.pxToRem(20)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(20)};
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: ${props => props.theme.pxToRem(32)};
  }
`;
const AboutExperienceItemDivider = styled(motion.div)`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.gray[400]};
`;

// Skills
const AboutSkills = styled.div`
  grid-column: span 12 / span 12;
  grid-row-start: 3;
  margin-bottom: ${props => props.theme.pxToRem(72)};
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-column: span 8 / span 8;
  }
`;
const AboutSkillsContent = styled.div`
  position: relative;
`;
const AboutSkillsGrid = styled(motion.div)<{ isDarkMode?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  font-size: ${props => props.theme.pxToRem(16)};
  font-weight: ${props => props.theme.fontWeights.semibold};
  gap: ${props => props.theme.pxToRem(16)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    font-size: ${props => props.theme.pxToRem(24)};
  }
  & > span {
    overflow: hidden;
  }
  & > span > span {
    color: ${props =>
      props.isDarkMode
        ? props.theme.colors.gray['200']
        : props.theme.colors.gray['900']};
    display: block;
    grid-column: span 1 / span 1;
  }
`;

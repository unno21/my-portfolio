import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useDarkMode } from 'theme/darkModeProvider';
import AnimatedText from 'components/AnimatedText';
import {
  MeaScreenPng,
  MeaScreenWebp,
  XcrScreenPng,
  XcrScreenWebp,
} from 'assets/images';

type Props = {
  myRef: React.RefObject<HTMLDivElement>;
};
type ProjectCardProps = {
  title: string;
  subtitle: string;
  png: string;
  webp: string;
  isDarkMode: boolean;
};

const projectList = [
  {
    title: 'Mea',
    subtitle: 'Accounting and Inventory System',
    png: MeaScreenPng,
    webp: MeaScreenWebp,
  },
  {
    title: 'Xcr',
    subtitle: 'Credit Collections Services Admin',
    png: XcrScreenPng,
    webp: XcrScreenWebp,
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  png,
  webp,
  isDarkMode,
}) => {
  return (
    <StyledProjectCard>
      <ProjectCardTitle isDarkMode={isDarkMode}>{title}</ProjectCardTitle>
      <ProjectCardSubtitle isDarkMode={isDarkMode}>
        {subtitle}
      </ProjectCardSubtitle>
      <ProjectCardImageWrapper>
        <picture>
          <source srcSet={webp} />
        </picture>
        <ProjectCardImage src={png} />
      </ProjectCardImageWrapper>
    </StyledProjectCard>
  );
};

const Projects: React.FC<Props> = ({ myRef }) => {
  const isInView = useInView(myRef, { amount: 0.3 });
  const { isDarkMode } = useDarkMode();
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
  return (
    <div ref={myRef}>
      <ProjectContainer>
        <ProjectGrid>
          {/* Grid item */}
          <SectionHeaderWrapper>
            <SectionHeader>
              <SectionSubtitle
                initial="initial"
                animate={isInView ? 'animate' : 'initial'}
              >
                <motion.span variants={subtitleVariant}>
                  Selected Projects
                </motion.span>
              </SectionSubtitle>
              <SectionTitle isDarkMode={isDarkMode}>
                <AnimatedText text="Works" />
              </SectionTitle>
            </SectionHeader>
          </SectionHeaderWrapper>

          {/* Grid item */}
          <SectionCards>
            {projectList.map((item, index) => (
              <ProjectCard
                key={index + '_' + item.title}
                title={item.title}
                subtitle={item.subtitle}
                png={item.png}
                webp={item.webp}
                isDarkMode={isDarkMode}
              />
            ))}
          </SectionCards>
        </ProjectGrid>
      </ProjectContainer>
    </div>
  );
};

export default Projects;

const ProjectContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.containerMaxWidth};
  margin: 0 auto;
  padding: ${props => `${props.theme.pxToRem(32)} ${props.theme.pxToRem(48)}`};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props =>
      `${props.theme.pxToRem(160)} ${props.theme.pxToRem(80)}`};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props =>
      `${props.theme.pxToRem(240)} ${props.theme.pxToRem(80)}`};
  }
`;
const ProjectGrid = styled.div`
  @media screen and (min-width: ${props => props.theme.breakpoints.xl}) {
    padding: ${props =>
      `${props.theme.pxToRem(160)} ${props.theme.pxToRem(80)}`};
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: ${props => props.theme.pxToRem(12)};
  }
`;
const SectionHeaderWrapper = styled.div`
  grid-column: span 4 / span 4;
`;
const SectionHeader = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.pxToRem(64)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    position: sticky;
    top: ${props => props.theme.pxToRem(240)};
  }
`;
const SectionSubtitle = styled(motion.span)`
  display: block;
  margin-bottom: ${props => props.theme.pxToRem(16)};
  color: ${props => props.theme.colors.accent};
  overflow: hidden;
  text-transform: uppercase;
  font-size: ${props => props.theme.pxToRem(12)};
  & > span {
    display: block;
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(16)};
  }
`;
const SectionTitle = styled.p<{ isDarkMode?: boolean }>`
  font-family: ${props => props.theme.fontHeading};
  font-size: ${props => props.theme.pxToRem(32)};
  text-transform: uppercase;
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray['200']
      : props.theme.colors.gray['900']};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(48)};
  }
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.pxToRem(80)};
  }
`;
const SectionCards = styled.div`
  grid-column: span 8 / span 8;
  grid-column-start: 5;
`;

const StyledProjectCard = styled.div`
  margin-bottom: ${props => props.theme.pxToRem(112)};
`;
const ProjectCardTitle = styled.p<{ isDarkMode?: boolean }>`
  font-size: ${props => props.theme.pxToRem(32)};
  font-weight: 700;
  text-transform: uppercase;
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray['200']
      : props.theme.colors.gray['900']};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(48)};
  }
`;
const ProjectCardSubtitle = styled.span<{ isDarkMode?: boolean }>`
  text-transform: uppercase;
  margin-bottom: ${props => props.theme.pxToRem(24)};
  display: block;
  color: ${props =>
    props.isDarkMode
      ? props.theme.colors.gray['400']
      : props.theme.colors.gray['700']};
`;
const ProjectCardImageWrapper = styled.div``;
const ProjectCardImage = styled.img`
  width: 100%;
`;

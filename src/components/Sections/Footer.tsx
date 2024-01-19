import React from 'react';
import styled from 'styled-components';
import { useInView, motion } from 'framer-motion';
import { useDarkMode } from 'theme/darkModeProvider';
import { useCursor } from 'components/Cursor';
import { LinkSvg } from 'components/TopNav';
import { IconChevronUp } from 'assets/images';
import AnimatedText from 'components/AnimatedText';

type Props = {
  myRef: React.RefObject<HTMLDivElement>;
};

const Footer: React.FC<Props> = ({ myRef }) => {
  const isInView = useInView(myRef, { amount: 0.3 });
  const { isDarkMode } = useDarkMode();
  const { setIsHovering } = useCursor();

  const opacityVariant = {
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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div ref={myRef}>
      <StyledFooter>
        <FooterMainContent>
          <LetsGetInTouch>
            <motion.span>
              <AnimatedText text="Let's get in touch" delay={0.2} />
            </motion.span>
          </LetsGetInTouch>
          <EmailWrapper>
            <Email
              href="mailto:richardroncales@gmail.com"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                delayChildren: 1,
                transition: 'easeOut',
              }}
            >
              <motion.span variants={opacityVariant}>
                richardroncales@gmail.com
              </motion.span>
              <LinkSvg id="email" />
            </Email>
          </EmailWrapper>
        </FooterMainContent>
        <FooterLinks>
          <Credits>©2023 – ALL RIGHTS RESERVED</Credits>
          <BackToTop
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconWrapper>
              <BackToTopIcon src={IconChevronUp} />
            </IconWrapper>
            Back to top
            <LinkSvg id="backToTop" />
          </BackToTop>
          <FooterSocials>
            <FooterSocialLink
              href="#"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Linkedin
              <LinkSvg id="linkedin" />
            </FooterSocialLink>
            <FooterSocialLink
              href="#"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Github
              <LinkSvg id="github" />
            </FooterSocialLink>
            <FooterSocialLink
              href="#"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Credits
              <LinkSvg id="credits" />
            </FooterSocialLink>
          </FooterSocials>
        </FooterLinks>
      </StyledFooter>
    </div>
  );
};

export default Footer;

const StyledFooter = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: ${props =>
    `${props.theme.pxToRem(80)} ${props.theme.pxToRem(
      20
    )} ${props.theme.pxToRem(48)}`};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props =>
      `${props.theme.pxToRem(32)} ${props.theme.pxToRem(48)}`};
    height: 100vh;
  }
`;

const FooterMainContent = styled.div`
  margin-bottom: ${props => props.theme.pxToRem(80)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    margin: auto;
  }
`;

const LetsGetInTouch = styled.span`
  font-size: ${props => props.theme.pxToRem(48)};
  color: ${props => props.theme.colors.gray[400]};
  text-align: center;
  text-transform: uppercase;
  display: block;
  font-family: ${props => props.theme.fontHeading};
  margin-bottom: ${props => props.theme.pxToRem(48)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 10vw;
    margin-bottom: ${props => props.theme.pxToRem(48)};
    white-space: nowrap;
  }
`;
const EmailWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Email = styled(motion.a)`
  font-size: ${props => props.theme.pxToRem(20)};
  color: ${props => props.theme.colors.gray[50]};
  text-align: center;
  display: inline-block;
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(48)};
    margin-bottom: ${props => props.theme.pxToRem(48)};
  }
  &:hover > svg > path {
    stroke-dashoffset: 0px !important;
  }
`;

const FooterLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${props => props.theme.pxToRem(48)};
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: end;
  }
`;
const Credits = styled.span`
  color: ${props => props.theme.colors.white};
  text-align: center;
  font-size: ${props => props.theme.pxToRem(12)};
  order: 2;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.pxToRem(16)};
    order: 0;
  }
`;
const BackToTop = styled.div`
  position: relative;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  &:hover > svg > path {
    stroke-dashoffset: 0px !important;
  }
  display: none;
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    display: inline-block;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.pxToRem(4)};
`;
const BackToTopIcon = styled.img`
  display: block;
  width: ${props => props.theme.pxToRem(32)};
`;
const FooterSocials = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.pxToRem(48)};
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`;
const FooterSocialLink = styled.a`
  color: ${props => props.theme.colors.white};
  display: block;
  position: relative;
  font-size: ${props => props.theme.pxToRem(14)};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.pxToRem(16)};
  }
  &:hover > svg > path {
    stroke-dashoffset: 0px !important;
  }
`;

import styled from 'styled-components';
import { LogoTextBlack, LogoTextWhite } from 'assets/images';
import theme from 'theme/index';
import { useDarkMode } from 'theme/darkModeProvider';
import { useCursor } from './Cursor';

export const LinkSvg: React.FC<{ id: string }> = ({ id }) => {
  const accentColor = theme.colors.accent;
  return (
    <StyledSVG
      width="100%"
      height="11"
      viewBox="0 0 116 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8C24.127 3.74086 60.2262 -0.711957 113 7.99989"
        stroke={`url(#${id}_underline_path)`}
        strokeWidth="5"
        strokeLinecap="round"
        style={{ strokeDashoffset: `${106}px` }}
      ></path>
      <defs>
        <linearGradient
          id={`${id}_underline_path`}
          x1="113"
          y1="8.00001"
          x2="3"
          y2="5.99995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentColor} stopOpacity="0"></stop>
          <stop offset="1" stopColor={accentColor}></stop>
        </linearGradient>
      </defs>
    </StyledSVG>
  );
};

const navlinks = ['Work', 'About', 'Contact'];

const TopNav = () => {
  const { isDarkMode } = useDarkMode();
  const { setIsHovering } = useCursor();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <Header>
      <LogoImg
        src={isDarkMode ? LogoTextWhite : LogoTextBlack}
        alt="Richard Roncales"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <StyledUl>
        {navlinks.map((item, index) => (
          <Navlink
            key={index}
            isDarkMode={isDarkMode}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item}
            <LinkSvg id={item} />
          </Navlink>
        ))}
      </StyledUl>
    </Header>
  );
};

export default TopNav;

const Header = styled.div`
  padding: ${props => props.theme.pxToRem(16)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props =>
      `${props.theme.pxToRem(32)} ${props.theme.pxToRem(48)}`};
    position: fixed;
  }
`;
const LogoImg = styled.img`
  width: ${props => props.theme.pxToRem(48)};
`;

const StyledUl = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.pxToRem(24)};
`;
const Navlink = styled.span<{ isDarkMode?: boolean }>`
  color: ${props => props.theme.colors.gray[500]};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s;
  pointer-events: auto;
  position: relative;
  display: inline-block;
  font-weight: ${props => props.theme.fontWeights.bold};
  /* font-family: ${props => props.theme.fontHeading}; */
  margin-bottom: ${props => props.theme.pxToRem(8)};
  &:hover {
    color: ${props =>
      props.isDarkMode
        ? props.theme.colors.gray['50']
        : props.theme.colors.gray['900']};
  }
  &:hover > svg > path {
    stroke-dashoffset: 0px !important;
  }
`;
const StyledSVG = styled.svg`
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  & > path {
    stroke-dasharray: 106px;
    transition: all 0.3s;
  }
`;

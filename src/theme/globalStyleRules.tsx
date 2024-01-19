import { createGlobalStyle } from 'styled-components';
import { normalize } from 'theme/normalize';
import { ThemeType } from 'theme/index';
import { PPAcma } from 'assets/fonts';

const GlobalStyle: any = createGlobalStyle<{ theme: ThemeType }>`
  @font-face {
    font-family: 'Acma';
    src: url(${PPAcma}) format('woff2');
  }
  ${normalize}
  * {
    box-sizing: border-box;
  }
  a {
    cursor: pointer;
  }
  body {
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.colors.gray['900']};
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .fadeIn-enter,
  .fadeIn-appear {
    opacity: 0;
  }
  .fadeIn-enter-active,
  .fadeIn-appear-active {
    opacity: 1;
    transition: all .3s;
  }

  .projects-grid > :nth-child(even) {
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      transform: translateY(${({ theme }) => theme.pxToRem(224)})
    }
  }

  [data-aos="custom-slide-up"] {
    overflow: hidden;
    display: block;
  }
  [data-aos="custom-slide-up"] span {
    transform: translateY(102%);
    display: inline-block;
    transition: all 1s ease-in-out;
  }
  [data-aos="custom-slide-up"].aos-animate span {
    transform: translateY(0);
  }
  [data-aos-delay="300"] span {
    transition-delay: 300ms;
  }
  [data-aos-delay="500"] span, [data-aos-delay="500"] {
    transition-delay: 500ms;
  }
  [data-aos-delay="700"] span {
    transition-delay: 700ms;
  }
  [data-aos-delay="1000"] span {
    transition-delay: 1000ms;
  }
  [data-aos="clip-reveal-1"]{
    transition: all .7s;
    transform: translateY(${({ theme }) => theme.pxToRem(64)}) scale(.75);
    clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
    animation-fill-mode: backwards;
    animation-duration: 700ms;
    animation-timing-function: ease-in-out;
  }
  [data-aos="clip-reveal-1"].aos-animate {
    transform: translateY(0) scale(1);
    animation-name: clipPathReveal;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  @keyframes clipPathReveal {
    0% { clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%); }
    100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  }
  [data-aos="fade"] span, [data-aos="fade"] {
    opacity: 0;
    transition: all .5s;
  }
  [data-aos="fade"].aos-animate span, [data-aos="fade"].aos-animate {
    opacity: 1;
  }
`;

export default GlobalStyle;

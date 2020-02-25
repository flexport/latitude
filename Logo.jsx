/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

const LOGO_BLUE = "#324354";
const CORAL = "#FA5959";
const BLACK = "#000000";
const GREY = "#B8C1CB";
const WHITE = "#FFFFFF";

const LOGO_COLORS = {
  default: {
    fill: LOGO_BLUE,
    accent: CORAL,
  },
  reversed: {
    fill: WHITE,
    accent: CORAL,
  },
  dark: {
    fill: BLACK,
    accent: GREY,
  },
  light: {
    fill: WHITE,
    accent: GREY,
  },
  monoBlack: {
    fill: BLACK,
    accent: BLACK,
  },
  monoWhite: {
    fill: WHITE,
    accent: WHITE,
  },
};

type Props = {
  +colorScheme:
    | "default"
    | "reversed"
    | "dark"
    | "light"
    | "monoBlack"
    | "monoWhite",
  +width: number,
};

const defaultProps = {
  colorScheme: "default",
  width: 120,
};

/**
 * @short The main logo that represents our brand by spelling out our name.
 * @brandStatus V2
 * @status Stable
 * @category General
 * @group Logo
 */
function Logo({colorScheme, width}: Props) {
  const w = 1405;
  const h = 312;
  const viewBox = `0 0 ${w} ${h}`;
  return (
    <svg
      viewBox={viewBox}
      width={w}
      height={h}
      style={{
        width: width ? `${width}px` : "100%",
        height: `${(width * h) / w}px`,
      }}
      role="img"
      aria-hidden="true"
      aria-labelledby="title desc"
      className={css(styles.logo)}
    >
      <title id="title">Flexport.</title>
      <desc id="desc">Making global trade easy for everyone.</desc>
      <g fillRule="nonzero" fill="none">
        <g fill={LOGO_COLORS[colorScheme].fill}>
          <path d="M157.792 196.69V1.368h63.687V188.65c0 13.186 2.897 16.404 16.404 16.404h5.473l7.504 51.673c-4.824.643-24.55 2.045-36.453 2.045-35.065 0-56.615-12.222-56.615-62.081" />
          <path d="M779.15 168.063c0-21.55-3.861-40.53-31.526-40.53-29.591 0-38.276 15.12-38.276 40.53 0 25.411 6.43 39.247 38.276 39.247 27.024 0 31.526-17.697 31.526-39.247zM645.656 77.386l49.534-3.859 4.831 14.766c9.97-9.334 27.337-18.66 64.65-18.66 64.337 0 79.129 45.354 79.129 95.853 0 50.828-16.404 95.541-82.988 95.541-29.592 0-43.422-6.758-51.464-14.158v64.336h-63.692V77.386z" />
          <path d="M1071.025 77.386l49.536-3.86 6.436 19.27c8.043-10.94 30.235-20.267 56.615-21.228v61.304c-42.464.32-48.892 12.998-48.892 38.089v87.17h-63.695V77.385z" />
          <path d="M1201.38 71.67h32.81l10.29-37.416 49.214-10.617V71.67h40.21v61.272h-40.21v53.139c0 12.544 1.935 18.973 21.872 18.973h18.339v53.076c-9.648.641-20.267.963-32.168.963-53.718 0-71.407-17.047-71.407-63.366v-62.785h-28.95V71.67z" />
          <path d="M.423 73.815h34.736v-3.539c0-46.319 17.368-69.481 77.2-69.481 15.764 0 18.653.328 26.374.97V53.55h-17.69c-18.33 0-22.191 4.503-22.191 16.404v3.862h39.881v54.038H98.852V258.13H35.159V127.853H.423V73.815z" />
          <path d="M350.61 121.872c26.212 0 28.135 12.47 29.092 27.497h-65.54c2.56-17.589 10.872-27.497 36.448-27.497zm38.895 81.25c-10.535 6.166-15.97 7.543-36.98 7.543-24.938 0-34.526-8.864-37.724-23.892h122.448c2.241-64.901-3.199-117.334-84.724-117.334-81.846 0-99.11 45.078-99.11 95.27 0 51.476 17.264 96.794 99.11 96.794 32.276 0 52.624-5.98 74.228-20.015l-37.248-38.365z" />
          <path d="M563.53 258.208l-31.233-44.64-31.225 44.64h-71.199l66.65-94.964-60.535-85.79 71.97-.058 24.645 35.019 24.67-35.012 72.763.05-61.685 85.374 66.856 95.38z" />
          <path d="M992.729 167.42c0-23.161-5.787-39.888-35.707-39.888-29.913 0-35.7 16.727-35.7 39.888 0 22.843 5.787 39.89 35.7 39.89 29.92 0 35.707-17.047 35.707-39.89m-135.743-1.933c0-61.11 27.987-95.855 100.036-95.855 72.056 0 99.721 34.745 99.721 95.855 0 61.117-27.665 96.182-99.721 96.182-72.05 0-100.036-35.065-100.036-96.182" />
        </g>
        <path
          fill={LOGO_COLORS[colorScheme].accent}
          d="M1404.608 258.09h-53.045v-53.045h53.045z"
        />
      </g>
    </svg>
  );
}
Logo.defaultProps = defaultProps;

export default Logo;

const styles = StyleSheet.create({
  logo: {
    transitionProperty: "width",
    transitionDuration: "300ms",
  },
});

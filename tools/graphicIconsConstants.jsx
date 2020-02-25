/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";

/**
 * This is extracted from graphicIcons.jsx because it is needed in
 * demoTypes.js, and because that script is run in a non-webpack env,
 * it fails if the files it includes have certain deps.
 */
const _graphicIcons = {
  // eslint-disable-next-line autofix/no-unused-vars
  document: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="document-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="292.73"
            x2="80.47"
            y1="67.1"
            y2="279.37"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="document-linear-gradient-2"
            x1="91.24"
            x2="177.81"
            y1="270.74"
            y2="162.02"
            xlinkHref="#document-linear-gradient"
          />
          <linearGradient
            id="document-linear-gradient-3"
            gradientTransform="translate(4003.64 6518.82)"
            x1="-3849.84"
            x2="-3849.84"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#document-linear-gradient"
          />
          <linearGradient
            id="document-linear-gradient-4"
            gradientTransform="translate(3979.41 6543.05)"
            x1="-3825.61"
            x2="-3825.61"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#document-linear-gradient"
          />
          <linearGradient
            id="document-linear-gradient-5"
            gradientTransform="translate(3955.18 6567.28)"
            x1="-3801.37"
            x2="-3801.37"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#document-linear-gradient"
          />
          <linearGradient
            id="document-linear-gradient-6"
            gradientTransform="translate(4073.4 6632.97)"
            gradientUnits="userSpaceOnUse"
            x1="-3827.64"
            x2="-3827.64"
            y1="-6559.84"
            y2="-6411.03"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="document-linear-gradient-7"
            gradientTransform="translate(4123.95 6620.01)"
            x1="-3859.4"
            x2="-3859.4"
            y1="-6601.37"
            y2="-6415.92"
            xlinkHref="#document-linear-gradient-6"
          />
          <linearGradient
            id="document-linear-gradient-8"
            gradientTransform="translate(4155.71 6588.26)"
            x1="-3891.15"
            x2="-3891.15"
            y1="-6601.37"
            y2="-6415.92"
            xlinkHref="#document-linear-gradient-6"
          />
        </defs>
        <g style={{isolation: "isolate"}}>
          <g id="Layer_2">
            <g id="Layer_1-2">
              <rect height="360" style={{fill: "none"}} width="360" />
              <circle
                style={{fill: primary, opacity: "0.1"}}
                cx="180.04"
                cy="179.8"
                r="160"
              />
              <circle
                style={{
                  opacity: "0.05",
                  fill: "url(#document-linear-gradient)",
                }}
                cx="180.04"
                cy="179.8"
                r="160"
              />
              <path
                style={{fill: primary}}
                d="M88.18,112a1,1,0,0,0-1,1V277.81a1,1,0,0,0,1,1H214.27a1,1,0,0,0,1-1V140.52a2.78,2.78,0,0,0-.7-1.71L188.45,112.7a2.76,2.76,0,0,0-1.7-.71Z"
              />
              <g style={{opacity: "0.25"}}>
                <path
                  style={{fill: "url(#document-linear-gradient-2)"}}
                  d="M88.18,112a1,1,0,0,0-1,1V277.81a1,1,0,0,0,1,1H214.27a1,1,0,0,0,1-1V140.52a2.78,2.78,0,0,0-.7-1.71L188.45,112.7a2.76,2.76,0,0,0-1.7-.71Z"
                />
              </g>
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#document-linear-gradient-3)",
                }}
                width="8"
                transform="translate(297.1 -10.51) rotate(90)"
                x="149.8"
                y="94.89"
              />
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#document-linear-gradient-4)",
                }}
                width="8"
                transform="translate(321.33 13.72) rotate(90)"
                x="149.8"
                y="119.12"
              />
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#document-linear-gradient-5)",
                }}
                width="8"
                transform="translate(345.56 37.96) rotate(90)"
                x="149.8"
                y="143.35"
              />
              <polyline
                style={{fill: "#7e8598"}}
                points="215.92 139.8 187.72 139.8 187.72 111.59"
              />
              <g style={{opacity: "0.2", mixBlendMode: "luminosity"}} />
              <g style={{mixBlendMode: "luminosity"}}>
                <path
                  style={{fill: "#fff"}}
                  d="M154.8,80.11a1,1,0,0,0-1,1V235.44a1,1,0,0,0,1,1h118a1,1,0,0,0,1-1V81.69a1,1,0,0,0-1-1Z"
                />
              </g>
              <rect
                height="152.64"
                style={{
                  opacity: "0.5",
                  fill: "url(#document-linear-gradient-6)",
                }}
                width="12.08"
                transform="translate(411.25 -80.27) rotate(90)"
                x="239.72"
                y="89.17"
              />
              <rect
                height="190.22"
                style={{
                  opacity: "0.5",
                  fill: "url(#document-linear-gradient-7)",
                }}
                width="12.08"
                transform="translate(398.29 -130.82) rotate(90)"
                x="258.52"
                y="38.62"
              />
              <rect
                height="190.22"
                style={{
                  opacity: "0.5",
                  fill: "url(#document-linear-gradient-8)",
                }}
                width="12.08"
                transform="translate(366.53 -162.58) rotate(90)"
                x="258.52"
                y="6.87"
              />
            </g>
          </g>
        </g>
      </g>
    ),
  }),
  document_add: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="add-document-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="292.73"
            x2="80.47"
            y1="67.1"
            y2="279.37"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="add-document-linear-gradient-2"
            x1="91.24"
            x2="177.81"
            y1="270.74"
            y2="162.02"
            xlinkHref="#add-document-linear-gradient"
          />
          <linearGradient
            id="add-document-linear-gradient-3"
            gradientTransform="translate(4003.64 6518.82)"
            x1="-3849.84"
            x2="-3849.84"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#add-document-linear-gradient"
          />
          <linearGradient
            id="add-document-linear-gradient-4"
            gradientTransform="translate(3979.41 6543.05)"
            x1="-3825.61"
            x2="-3825.61"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#add-document-linear-gradient"
          />
          <linearGradient
            id="add-document-linear-gradient-5"
            gradientTransform="translate(3955.18 6567.28)"
            x1="-3801.37"
            x2="-3801.37"
            y1="-6434.1"
            y2="-6339.72"
            xlinkHref="#add-document-linear-gradient"
          />
          <linearGradient
            id="add-document-linear-gradient-6"
            gradientTransform="translate(4073.4 6632.97)"
            gradientUnits="userSpaceOnUse"
            x1="-3827.64"
            x2="-3827.64"
            y1="-6559.84"
            y2="-6411.03"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="add-document-linear-gradient-7"
            gradientTransform="translate(4123.95 6620.01)"
            x1="-3859.4"
            x2="-3859.4"
            y1="-6601.37"
            y2="-6415.92"
            xlinkHref="#add-document-linear-gradient-6"
          />
          <linearGradient
            id="add-document-linear-gradient-8"
            gradientTransform="translate(4155.71 6588.26)"
            x1="-3891.15"
            x2="-3891.15"
            y1="-6601.37"
            y2="-6415.92"
            xlinkHref="#add-document-linear-gradient-6"
          />
        </defs>
        <g style={{isolation: "isolate"}}>
          <g id="Layer_2">
            <g id="Layer_1-2">
              <rect height="360" style={{fill: "none"}} width="360" />
              <circle
                style={{fill: primary, opacity: "0.1"}}
                cx="180.04"
                cy="179.8"
                r="160"
              />
              <circle
                style={{
                  opacity: "0.05",
                  fill: "url(#add-document-linear-gradient)",
                }}
                cx="180.04"
                cy="179.8"
                r="160"
              />
              <path
                style={{fill: primary}}
                d="M88.18,112a1,1,0,0,0-1,1V277.81a1,1,0,0,0,1,1H214.27a1,1,0,0,0,1-1V140.52a2.78,2.78,0,0,0-.7-1.71L188.45,112.7a2.76,2.76,0,0,0-1.7-.71Z"
              />
              <g style={{opacity: "0.25"}}>
                <path
                  style={{fill: "url(#add-document-linear-gradient-2)"}}
                  d="M88.18,112a1,1,0,0,0-1,1V277.81a1,1,0,0,0,1,1H214.27a1,1,0,0,0,1-1V140.52a2.78,2.78,0,0,0-.7-1.71L188.45,112.7a2.76,2.76,0,0,0-1.7-.71Z"
                />
              </g>
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#add-document-linear-gradient-3)",
                }}
                width="8"
                transform="translate(297.1 -10.51) rotate(90)"
                x="149.8"
                y="94.89"
              />
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#add-document-linear-gradient-4)",
                }}
                width="8"
                transform="translate(321.33 13.72) rotate(90)"
                x="149.8"
                y="119.12"
              />
              <rect
                height="96.81"
                style={{
                  opacity: "0.1",
                  fill: "url(#add-document-linear-gradient-5)",
                }}
                width="8"
                transform="translate(345.56 37.96) rotate(90)"
                x="149.8"
                y="143.35"
              />
              <polyline
                style={{fill: "#7e8598"}}
                points="215.92 139.8 187.72 139.8 187.72 111.59"
              />
              <g style={{opacity: "0.2", mixBlendMode: "luminosity"}} />
              <g style={{mixBlendMode: "luminosity"}}>
                <path
                  style={{fill: "#fff"}}
                  d="M154.8,80.11a1,1,0,0,0-1,1V235.44a1,1,0,0,0,1,1h118a1,1,0,0,0,1-1V81.69a1,1,0,0,0-1-1Z"
                />
              </g>
              <rect
                height="152.64"
                style={{
                  opacity: "0.5",
                  fill: "url(#add-document-linear-gradient-6)",
                }}
                width="12.08"
                transform="translate(411.25 -80.27) rotate(90)"
                x="239.72"
                y="89.17"
              />
              <rect
                height="190.22"
                style={{
                  opacity: "0.5",
                  fill: "url(#add-document-linear-gradient-7)",
                }}
                width="12.08"
                transform="translate(398.29 -130.82) rotate(90)"
                x="258.52"
                y="38.62"
              />
              <rect
                height="190.22"
                style={{
                  opacity: "0.5",
                  fill: "url(#add-document-linear-gradient-8)",
                }}
                width="12.08"
                transform="translate(366.53 -162.58) rotate(90)"
                x="258.52"
                y="6.87"
              />
              <circle
                style={{fill: brighterPrimary}}
                cx="64.47"
                cy="72.43"
                r="26.01"
              />
              <path
                style={{fill: "#fff"}}
                d="M54.4,70.41h8v-8.2h4.2v8.2h8v4h-8v8.2h-4.2v-8.2h-8Z"
              />
            </g>
          </g>
        </g>
      </g>
    ),
  }),
  document_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="document-none-linear-gradient"
            x1="292.732"
            y1="67.101"
            x2="80.465"
            y2="279.368"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="document-none-linear-gradient-2"
            x1="91.236"
            y1="270.738"
            x2="177.812"
            y2="162.015"
            xlinkHref="#document-none-linear-gradient"
          />
          <linearGradient
            id="document-none-linear-gradient-3"
            x1="-6385.811"
            y1="-7801.672"
            x2="-6385.811"
            y2="-7707.284"
            gradientTransform="translate(6539.615 7886.387)"
            xlinkHref="#document-none-linear-gradient"
          />
          <linearGradient
            id="document-none-linear-gradient-4"
            x1="-6361.578"
            y1="-7801.672"
            x2="-6361.578"
            y2="-7707.284"
            gradientTransform="translate(6515.382 7910.62)"
            xlinkHref="#document-none-linear-gradient"
          />
          <linearGradient
            id="document-none-linear-gradient-5"
            x1="-6337.345"
            y1="-7801.672"
            x2="-6337.345"
            y2="-7707.284"
            gradientTransform="translate(6491.149 7934.853)"
            xlinkHref="#document-none-linear-gradient"
          />
          <linearGradient
            id="document-none-linear-gradient-6"
            x1="-6363.616"
            y1="-7927.406"
            x2="-6363.616"
            y2="-7778.593"
            gradientTransform="translate(6609.377 8000.54)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="document-none-linear-gradient-7"
            x1="-6395.371"
            y1="-7968.942"
            x2="-6395.371"
            y2="-7783.484"
            gradientTransform="translate(6659.926 7987.578)"
            xlinkHref="#document-none-linear-gradient-6"
          />
          <linearGradient
            id="document-none-linear-gradient-8"
            x1="-6427.126"
            y1="-7968.942"
            x2="-6427.126"
            y2="-7783.484"
            gradientTransform="translate(6691.68 7955.823)"
            xlinkHref="#document-none-linear-gradient-6"
          />
        </defs>
        <title>Asset 62</title>
        <g style={{isolation: "isolate"}}>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <rect width="360" height="360" style={{fill: "none"}} />
              <circle
                cx="180.036"
                cy="179.797"
                r="160"
                style={{fill: primary, opacity: 0.1}}
              />
              <circle
                cx="180.036"
                cy="179.797"
                r="160"
                style={{
                  opacity: 0.05,
                  fill: "url(#document-none-linear-gradient)",
                }}
              />
              <path
                d="M88.183,111.99a1,1,0,0,0-1,1V277.808a1,1,0,0,0,1,1H214.274a1,1,0,0,0,1-1V140.518a2.784,2.784,0,0,0-.707-1.708L188.453,112.7a2.782,2.782,0,0,0-1.707-.707Z"
                style={{fill: primary}}
              />
              <g style={{opacity: 0.25}}>
                <path
                  d="M88.183,111.99a1,1,0,0,0-1,1V277.808a1,1,0,0,0,1,1H214.274a1,1,0,0,0,1-1V140.518a2.784,2.784,0,0,0-.707-1.708L188.453,112.7a2.782,2.782,0,0,0-1.707-.707Z"
                  style={{fill: "url(#document-none-linear-gradient-2)"}}
                />
              </g>
              <rect
                x="149.804"
                y="94.887"
                width="8"
                height="96.814"
                transform="translate(297.098 -10.51) rotate(90)"
                style={{
                  opacity: 0.1,
                  fill: "url(#document-none-linear-gradient-3)",
                }}
              />
              <rect
                x="149.804"
                y="119.12"
                width="8"
                height="96.814"
                transform="translate(321.331 13.723) rotate(90)"
                style={{
                  opacity: 0.1,
                  fill: "url(#document-none-linear-gradient-4)",
                }}
              />
              <rect
                x="149.804"
                y="143.353"
                width="8"
                height="96.814"
                transform="translate(345.564 37.956) rotate(90)"
                style={{
                  opacity: 0.1,
                  fill: "url(#document-none-linear-gradient-5)",
                }}
              />
              <polyline
                points="215.924 139.797 187.715 139.797 187.715 111.589"
                style={{fill: "#7e8598"}}
              />
              <g style={{opacity: 0.2, mixBlendMode: "luminosity"}}>
                <image
                  width="101"
                  height="101"
                  transform="translate(151.386 75.523)"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAACXBIWXMAAAsSAAALEgHS3X78AAAEk0lEQVR4Xu2bX4hVVRTGv6VdYuCakAVFMVTgGBJDVFAGk2A6YBKVTho1DoEhvkQRRT5kTn8IUggkhGmoIawe0skM0UjDkqBhIDR7EHOgwuahv0IIsxjEvh7OmXvvac4916frd6/rB5t79t5r73vgx157nwPHSCLQYk6jgKD5hBRBQoogIUWQkCJISBEkpAgSUgQJKYKEFEFCiiAhRZCQIkhIESSkCBJSBAkpgoQUQUKKICFFkJAiSEgRJKQIElIECSmChBRBQoogIUWQkCJISBEkpAgSUgQJKYKEFEFCiiByUsyMZnZZf4hpah+iGsxhyTXJjuLo9kRPitnZ2jrJq+vFtity6Qv8ZgrA1M/EFHdiyswmGw1pN65oFNB0rMcfJ3BzmsKeBWFmEyQXFg9sHxTT1w/1+kh21+trJ/TSF+Azhad3e219tWG8cGSbICiFFQkruk56bf1TmJvZ14XD2wDF9PU57wI2lIiRMZsdQABYAeLQytmd7YHgSoHbd/CRMXNiR5LGtsHBNxyAf2t02GE3s72NJmpVFFfKR4UBXArYUfD9Q7Ane0HyicL4FkRRyrvVGgEYePdC2PhE/oDDBJfjqfzO1kQyfVWLOQC38YlqG+dlTmS7l693M3u7/nSth7iUnGLnHIDfNkw/Bvpa+9AB+MBz2FZ3xhZDMX29MqsxyWKFbCIwZADJrcWR+kivFOJgujrqr5w7mfwOGZw3wc1sc72JWwVJKdPpA+MeTmYEPMJ96b4C5/Or/NxO+pe4UOm3X+BbeL+b2TMF88ujmL42Zho4BtiS9BpJGqtJZzwPWCl57rcOgC8Ath0A/wKxYBgtiORKmSl8bbHD7qnZ5OFcCd9i1VcvVqJv7qBbB3w++9y2z8Re42a2vuB/ZFFcKX219ZlFMTgADO7Kxu66khiYTpbM+aNEaWn+aYDkaG6HKIpSVjWK+T833DiIyQODsG7kn9IIEDyQ0yOJopRlRf089Qmwbg3sBMB/AJtfFJ2O2dQH7B0FfueRRrEKyO0pJ/lB5sRFwL+aV7OH3LrG7UR6fdXqTOx9XXSWUDmhVcYMjTr+eNnX3osl+f+qheJKuf1NvocXbUOl7RYQP6V5iXsAezRpf/1v4qUF2XzFhwHbB2wEMQwDLwA2NxMCkt9DGEUpi2rrpwl0FTzN8zPAHqrWTxFYZA/AcLDStuw64shvqVSkp2ryR4iiKKUz773KRbxpycQYAdYZcIYPotP2g+SZ/IhLi9yeAsCRvh0G4OvY6wC8l3Dw18weAsCJrdW9I/19jPB/70iu+99J9qORs6zsNZ2233ewx83s2tw7uNSQlCoAynwV5WmwDGBW6eHcMoDy9cfz+4vKW+yv1v9MxncvZrnRPTW7NAxodkGyegsL8XFu+xfgHPYn1xOstnc/zeL5LuK+mlnk9pRAc0+57AkpgoQUQUKKICFFkJAiSEgRJKQIElIECSmChBRBQoogIUWQkCJISBEkpAgSUgQJKYKEFEFCiiAhRZCQIkhIESSkCBJSBAkpgoQUQUKKICFFkJAiSEgRJKQIElIECSmChBRB/gMU1YIcmY7D5gAAAABJRU5ErkJggg=="
                />
              </g>
              <g style={{mixBlendMode: "luminosity"}}>
                <path
                  d="M154.8,80.11a1,1,0,0,0-1,1V235.437a1,1,0,0,0,1,1H272.843a1,1,0,0,0,1-1V81.685a1.009,1.009,0,0,0-1-1Z"
                  style={{fill: "#fff"}}
                />
              </g>
              <rect
                x="239.724"
                y="89.17"
                width="12.075"
                height="152.638"
                transform="translate(411.251 -80.272) rotate(90)"
                style={{
                  opacity: 0.5,
                  fill: "url(#document-none-linear-gradient-6)",
                }}
              />
              <rect
                x="258.517"
                y="38.622"
                width="12.075"
                height="190.224"
                transform="translate(398.289 -130.821) rotate(90)"
                style={{
                  opacity: 0.5,
                  fill: "url(#document-none-linear-gradient-7)",
                }}
              />
              <rect
                x="258.517"
                y="6.867"
                width="12.075"
                height="190.224"
                transform="translate(366.534 -162.575) rotate(90)"
                style={{
                  opacity: 0.5,
                  fill: "url(#document-none-linear-gradient-8)",
                }}
              />
              <rect
                x="19.191"
                y="82.06"
                width="40.611"
                height="40.611"
                rx="3.518"
                ry="3.518"
                style={{fill: brighterPrimary}}
              />
              <path
                d="M32.386,102.365c0-5.444,2.81-8.9,7.136-8.9,4.4,0,7.085,3.431,7.085,8.9,0,5.421-2.685,8.9-7.11,8.9C35.146,111.266,32.386,107.786,32.386,102.365Zm10.691,0c0-3.6-1.044-6.017-3.555-6.017-2.536,0-3.606,2.387-3.606,6.017,0,3.606,1.07,6.017,3.606,6.017S43.077,106.02,43.077,102.365Z"
                style={{fill: "#fff"}}
              />
            </g>
          </g>
        </g>
      </g>
    ),
  }),
  container: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="container-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="292.88"
            x2="80.62"
            y1="66.86"
            y2="279.12"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="container-linear-gradient-2"
            x1="87.66"
            x2="283.03"
            y1="177.77"
            y2="177.77"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-3"
            x1="180.19"
            x2="180.19"
            y1="339.55"
            y2="270.76"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-4"
            x1="103.46"
            x2="103.46"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-5"
            x1="134.15"
            x2="134.15"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-6"
            x1="164.84"
            x2="164.84"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-7"
            x1="195.33"
            x2="195.33"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-8"
            x1="226.1"
            x2="226.1"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
          <linearGradient
            id="container-linear-gradient-9"
            x1="256.73"
            x2="256.73"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-linear-gradient"
          />
        </defs>
        <g style={{isolation: "isolate"}}>
          <g id="Layer_2">
            <g id="Layer_1-2">
              <rect height="360" style={{fill: "none"}} width="360" y="0.18" />
              <circle
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient)",
                }}
                cx="180.19"
                cy="179.55"
                r="160"
              />
              <rect
                height="100.84"
                style={{fill: primary}}
                width="225.66"
                rx="2"
                ry="2"
                x="70.42"
                y="127.55"
              />
              <rect
                height="89.51"
                style={{
                  opacity: "0.2",
                  mixBlendMode: "luminosity",
                  fill: "url(#container-linear-gradient-2)",
                }}
                width="204.13"
                x="86.47"
                y="133.01"
              />
              <path
                style={{fill: brighterPrimary}}
                d="M317.41,261.86H43a160,160,0,0,0,274.45,0Z"
              />
              <path
                style={{
                  opacity: "0.2",
                  fill: "url(#container-linear-gradient-3)",
                }}
                d="M317.41,261.86H43a160,160,0,0,0,274.45,0Z"
              />
              <polygon
                style={{fill: brighterPrimary}}
                points="271.15 119.29 183.25 73.12 95.35 119.29 92.56 113.98 183.25 66.34 273.94 113.98 271.15 119.29"
              />
              <path
                style={{fill: primary}}
                d="M70.42,233.66H296.08a0,0,0,0,1,0,0v9.94a2,2,0,0,1-2,2H72.42a2,2,0,0,1-2-2v-9.94a0,0,0,0,1,0,0Z"
              />
              <path
                style={{fill: primary}}
                d="M63.2,148.89H75.55a1,1,0,0,1,1,1V151a0,0,0,0,1,0,0H62.2a0,0,0,0,1,0,0v-1.09A1,1,0,0,1,63.2,148.89Z"
                transform="translate(-80.56 219.31) rotate(-90)"
              />
              <path
                style={{fill: primary}}
                d="M63.2,205H75.55a1,1,0,0,1,1,1v1.09a0,0,0,0,1,0,0H62.2a0,0,0,0,1,0,0V206A1,1,0,0,1,63.2,205Z"
                transform="translate(-136.64 275.39) rotate(-90)"
              />
              <rect
                height="69.73"
                style={{fill: brighterPrimary}}
                width="6"
                x="180.25"
              />
              <path
                style={{fill: primary}}
                d="M72.42,110.67H294.08a2,2,0,0,1,2,2v9.94a0,0,0,0,1,0,0H70.42a0,0,0,0,1,0,0v-9.94A2,2,0,0,1,72.42,110.67Z"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="105.94"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="259.17"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="228.52"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="197.88"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="167.23"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="136.59"
                y="133.02"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-4)",
                }}
                width="5"
                x="100.96"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-5)",
                }}
                width="5"
                x="131.65"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-6)",
                }}
                width="5"
                x="162.34"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-7)",
                }}
                width="5"
                x="192.83"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-8)",
                }}
                width="5"
                x="223.6"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-linear-gradient-9)",
                }}
                width="5"
                x="254.23"
                y="132.5"
              />
            </g>
          </g>
        </g>
      </g>
    ),
  }),
  container_check: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="container-check-a"
            x1={292.883}
            y1={66.857}
            x2={80.616}
            y2={279.124}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#141414" stopOpacity={0} />
            <stop offset={1} stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="container-check-b"
            x1={87.661}
            y1={177.768}
            x2={283.031}
            y2={177.768}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-c"
            x1={180.187}
            y1={339.553}
            x2={180.187}
            y2={270.763}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-d"
            x1={103.461}
            y1={123.048}
            x2={103.461}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-e"
            x1={134.152}
            y1={123.048}
            x2={134.152}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-f"
            x1={164.842}
            y1={123.048}
            x2={164.842}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-g"
            x1={195.331}
            y1={123.048}
            x2={195.331}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-h"
            x1={226.098}
            y1={123.048}
            x2={226.098}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
          <linearGradient
            id="container-check-i"
            x1={256.725}
            y1={123.048}
            x2={256.725}
            y2={210.793}
            xlinkHref="#container-check-a"
          />
        </defs>
        <title>Asset 80</title>
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path fill="none" d="M0 .18h360v360H0z" />
            <circle cx={282.141} cy={56} r={26.012} fill={brighterPrimary} />
            <path
              fill="none"
              stroke="#fff"
              strokeMiterlimit={10}
              strokeWidth={6}
              d="M274.01 54.354l6.703 6.703 12.01-12.01"
            />
            <circle
              cx={180.187}
              cy={179.553}
              r={160}
              opacity={0.1}
              fill="url(#container-check-a)"
            />
            <rect
              x={70.418}
              y={127.554}
              width={225.663}
              height={100.841}
              rx={2}
              ry={2}
              fill={primary}
            />
            <path
              style={{mixBlendMode: "luminosity"}}
              opacity={0.2}
              fill="url(#container-check-b)"
              d="M86.465 133.012h204.127v89.512H86.465z"
            />
            <path
              d="M317.413 261.859H42.96a160.035 160.035 0 0 0 274.453 0z"
              fill={brighterPrimary}
            />
            <path
              d="M317.413 261.859H42.96a160.035 160.035 0 0 0 274.453 0z"
              opacity={0.2}
              fill="url(#container-check-c)"
            />
            <path
              fill={brighterPrimary}
              d="M271.147 119.29L183.25 73.12l-87.897 46.17-2.79-5.312 90.687-47.635 90.687 47.635-2.79 5.312z"
            />
            <path
              d="M70.418 233.655h225.663v9.936a2 2 0 0 1-2 2H72.418a2 2 0 0 1-2-2v-9.936zM68.329 156.109v-12.346a1 1 0 0 1 1-1h1.089v14.346h-1.089a1 1 0 0 1-1-1zM68.329 212.186V199.84a1 1 0 0 1 1-1h1.089v14.346h-1.089a1 1 0 0 1-1-1z"
              fill={primary}
            />
            <path fill={brighterPrimary} d="M180.25 0h6v69.731h-6z" />
            <path
              d="M72.418 110.666h221.663a2 2 0 0 1 2 2v9.934H70.418v-9.936a2 2 0 0 1 2-1.998zM105.943 133.018h10.928v89.913h-10.928zM259.168 133.018h10.928v89.913h-10.928zM228.523 133.018h10.928v89.913h-10.928zM197.878 133.018h10.928v89.913h-10.928zM167.233 133.018h10.928v89.913h-10.928zM136.588 133.018h10.928v89.913h-10.928z"
              fill={primary}
            />
            <path
              opacity={0.1}
              fill="url(#container-check-d)"
              d="M100.961 132.504h5v90h-5z"
            />
            <path
              opacity={0.1}
              fill="url(#container-check-e)"
              d="M131.652 132.504h5v90h-5z"
            />
            <path
              opacity={0.1}
              fill="url(#container-check-f)"
              d="M162.342 132.504h5v90h-5z"
            />
            <path
              opacity={0.1}
              fill="url(#container-check-g)"
              d="M192.831 132.504h5v90h-5z"
            />
            <path
              opacity={0.1}
              fill="url(#container-check-h)"
              d="M223.598 132.504h5v90h-5z"
            />
            <path
              opacity={0.1}
              fill="url(#container-check-i)"
              d="M254.225 132.504h5v90h-5z"
            />
          </g>
        </g>
      </g>
    ),
  }),
  container_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="container-none-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="292.88"
            x2="80.62"
            y1="66.86"
            y2="279.12"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="container-none-linear-gradient-2"
            x1="87.66"
            x2="283.03"
            y1="177.77"
            y2="177.77"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-3"
            x1="180.19"
            x2="180.19"
            y1="339.55"
            y2="270.76"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-4"
            x1="103.46"
            x2="103.46"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-5"
            x1="134.15"
            x2="134.15"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-6"
            x1="164.84"
            x2="164.84"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-7"
            x1="195.33"
            x2="195.33"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-8"
            x1="226.1"
            x2="226.1"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
          <linearGradient
            id="container-none-linear-gradient-9"
            x1="256.73"
            x2="256.73"
            y1="123.05"
            y2="210.79"
            xlinkHref="#container-none-linear-gradient"
          />
        </defs>
        <g style={{isolation: "isolate"}}>
          <g id="Layer_2">
            <g id="Layer_1-2">
              <rect height="360" style={{fill: "none"}} width="360" y="0.18" />
              <circle
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient)",
                }}
                cx="180.19"
                cy="179.55"
                r="160"
              />
              <rect
                height="100.84"
                style={{fill: primary}}
                width="225.66"
                rx="2"
                ry="2"
                x="70.42"
                y="127.55"
              />
              <rect
                height="89.51"
                style={{
                  opacity: "0.2",
                  mixBlendMode: "luminosity",
                  fill: "url(#container-none-linear-gradient-2)",
                }}
                width="204.13"
                x="86.47"
                y="133.01"
              />
              <path
                style={{fill: brighterPrimary}}
                d="M317.41,261.86H43a160,160,0,0,0,274.45,0Z"
              />
              <path
                style={{
                  opacity: "0.2",
                  fill: "url(#container-none-linear-gradient-3)",
                }}
                d="M317.41,261.86H43a160,160,0,0,0,274.45,0Z"
              />
              <rect
                height="40.61"
                style={{fill: brighterPrimary}}
                width="40.61"
                rx="3.52"
                ry="3.52"
                x="263.6"
                y="40.1"
              />
              <path
                style={{fill: "#fff"}}
                d="M276.79,60.41c0-5.45,2.81-8.9,7.14-8.9s7.08,3.43,7.08,8.9-2.68,8.9-7.11,8.9S276.79,65.83,276.79,60.41Zm10.69,0c0-3.61-1-6-3.55-6s-3.61,2.39-3.61,6,1.07,6,3.61,6S287.48,64.06,287.48,60.41Z"
              />
              <polygon
                style={{fill: brighterPrimary}}
                points="271.15 119.29 183.25 73.12 95.35 119.29 92.56 113.98 183.25 66.34 273.94 113.98 271.15 119.29"
              />
              <path
                style={{fill: primary}}
                d="M70.42,233.66H296.08a0,0,0,0,1,0,0v9.94a2,2,0,0,1-2,2H72.42a2,2,0,0,1-2-2v-9.94A0,0,0,0,1,70.42,233.66Z"
              />
              <path
                style={{fill: primary}}
                d="M63.2,148.89H75.55a1,1,0,0,1,1,1V151a0,0,0,0,1,0,0H62.2a0,0,0,0,1,0,0v-1.09A1,1,0,0,1,63.2,148.89Z"
                transform="translate(-80.56 219.31) rotate(-90)"
              />
              <path
                style={{fill: primary}}
                d="M63.2,205H75.55a1,1,0,0,1,1,1v1.09a0,0,0,0,1,0,0H62.2a0,0,0,0,1,0,0V206A1,1,0,0,1,63.2,205Z"
                transform="translate(-136.64 275.39) rotate(-90)"
              />
              <rect
                height="69.73"
                style={{fill: brighterPrimary}}
                width="6"
                x="180.25"
              />
              <path
                style={{fill: primary}}
                d="M72.42,110.67H294.08a2,2,0,0,1,2,2v9.94a0,0,0,0,1,0,0H70.42a0,0,0,0,1,0,0v-9.94A2,2,0,0,1,72.42,110.67Z"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="105.94"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="259.17"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="228.52"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="197.88"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="167.23"
                y="133.02"
              />
              <rect
                height="89.91"
                style={{fill: primary}}
                width="10.93"
                x="136.59"
                y="133.02"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-4)",
                }}
                width="5"
                x="100.96"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-5)",
                }}
                width="5"
                x="131.65"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-6)",
                }}
                width="5"
                x="162.34"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-7)",
                }}
                width="5"
                x="192.83"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-8)",
                }}
                width="5"
                x="223.6"
                y="132.5"
              />
              <rect
                height="90"
                style={{
                  opacity: "0.1",
                  fill: "url(#container-none-linear-gradient-9)",
                }}
                width="5"
                x="254.23"
                y="132.5"
              />
            </g>
          </g>
        </g>
      </g>
    ),
  }),
  invoices: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="invoice-d-a"
            x1={292.755}
            y1={67.101}
            x2={80.489}
            y2={279.368}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#141414" stopOpacity={0} />
            <stop offset={1} stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="invoice-d-c"
            x1={178.831}
            y1={166.768}
            x2={178.831}
            y2={247.935}
            xlinkHref="#invoice-d-a"
          />
          <linearGradient
            id="invoice-d-b"
            x1={319.446}
            y1={130.702}
            x2={159.557}
            y2={130.702}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor={primary} stopOpacity={0} />
            <stop offset={1} stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="invoice-d-d"
            x1={345.576}
            y1={226.236}
            x2={289.497}
            y2={226.236}
            xlinkHref="#invoice-d-b"
          />
        </defs>
        <title>Asset 75</title>
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path fill="none" d="M0 0h360v360H0z" />
            <circle
              cx={180.059}
              cy={179.797}
              r={160}
              fill={primary}
              opacity={0.1}
            />
            <circle
              cx={180.059}
              cy={179.797}
              r={160}
              opacity={0.05}
              fill="url(#invoice-d-a)"
            />
            <path
              d="M73.119 164.965V253.2a3.547 3.547 0 0 0 3.537 3.537h205.137a3.547 3.547 0 0 0 3.537-3.537v-88.235z"
              fill={primary}
            />
            <path
              d="M72.726 165.358v88.234a3.547 3.547 0 0 0 3.536 3.537H281.4a3.547 3.547 0 0 0 3.537-3.537v-88.234z"
              opacity={0.25}
              fill="url(#invoice-d-c)"
            />
            <path
              opacity={0.5}
              fill="url(#invoice-d-b)"
              d="M72.859 118.952h286.945v23.5H72.859z"
            />
            <rect
              x={206.163}
              y={219}
              width={56.085}
              height={14.473}
              rx={3.776}
              ry={3.776}
              fill="#fff"
            />
            <path
              opacity={0.5}
              fill="url(#invoice-d-d)"
              d="M259.089 219h100.642v14.473H259.089z"
            />
            <path
              d="M285.33 116.274V106.9a3.546 3.546 0 0 0-3.537-3.536H76.656a3.546 3.546 0 0 0-3.537 3.536v35.548H285.33v-26.174z"
              fill={brighterPrimary}
            />
          </g>
        </g>
      </g>
    ),
  }),
  invoices_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="invoices-none-a"
            x1={292.755}
            y1={67.101}
            x2={80.489}
            y2={279.368}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#141414" stopOpacity={0} />
            <stop offset={1} stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="invoices-none-c"
            x1={178.831}
            y1={166.768}
            x2={178.831}
            y2={247.935}
            xlinkHref="#invoices-none-a"
          />
          <linearGradient
            id="invoices-none-b"
            x1={319.365}
            y1={130.702}
            x2={159.529}
            y2={130.702}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor={primary} stopOpacity={0} />
            <stop offset={1} stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="invoices-none-d"
            x1={345.549}
            y1={226.236}
            x2={289.488}
            y2={226.236}
            xlinkHref="#invoices-none-b"
          />
        </defs>
        <title>Asset 61</title>
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path fill="none" d="M0 0h360v360H0z" />
            <circle
              cx={180.059}
              cy={179.797}
              r={160}
              fill={primary}
              opacity={0.1}
            />
            <circle
              cx={180.059}
              cy={179.797}
              r={160}
              opacity={0.05}
              fill="url(#invoices-none-a)"
            />
            <path
              d="M73.119 164.965V253.2a3.547 3.547 0 0 0 3.537 3.537h205.137a3.547 3.547 0 0 0 3.537-3.537v-88.235z"
              fill={primary}
            />
            <path
              d="M72.726 165.358v88.234a3.547 3.547 0 0 0 3.536 3.537H281.4a3.547 3.547 0 0 0 3.537-3.537v-88.234z"
              opacity={0.25}
              fill="url(#invoices-none-c)"
            />
            <path
              opacity={0.5}
              fill="url(#invoices-none-b)"
              d="M72.859 118.952H359.71v23.5H72.859z"
            />
            <rect
              x={206.163}
              y={219}
              width={56.085}
              height={14.473}
              rx={3.776}
              ry={3.776}
              fill="#fff"
            />
            <path
              opacity={0.5}
              fill="url(#invoices-none-d)"
              d="M259.089 219H359.7v14.473H259.089z"
            />
            <path
              d="M285.33 116.274V106.9a3.546 3.546 0 0 0-3.537-3.536H76.656a3.546 3.546 0 0 0-3.537 3.536v35.548H285.33v-26.174z"
              fill={brighterPrimary}
            />
            <rect
              x={268.796}
              y={43.589}
              width={40.611}
              height={40.611}
              rx={3.518}
              ry={3.518}
              fill={brighterPrimary}
            />
            <path
              d="M281.991 63.9c0-5.445 2.81-8.9 7.136-8.9 4.4 0 7.085 3.431 7.085 8.9 0 5.42-2.685 8.9-7.11 8.9-4.351 0-7.111-3.485-7.111-8.9zm10.691 0c0-3.605-1.044-6.017-3.555-6.017-2.536 0-3.605 2.387-3.605 6.017 0 3.6 1.069 6.017 3.605 6.017s3.555-2.367 3.555-6.017z"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    ),
  }),
  products_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="products-none-linear-gradient"
            x1="274.018"
            y1="47.304"
            x2="61.751"
            y2="259.571"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="products-none-linear-gradient-2"
            x1="235.403"
            y1="230.38"
            x2="81.477"
            y2="82.592"
            xlinkHref="#products-none-linear-gradient"
          />
        </defs>
        <title>Asset 60</title>
        <g id="Layer_2" dataName="products-none-2">
          <g id="Layer_1-2" dataName="products-none-1">
            <circle
              cx="161.322"
              cy="160"
              r="160"
              style={{fill: primary, opacity: "0.1"}}
            />
            <circle
              cx="161.322"
              cy="160"
              r="160"
              style={{
                opacity: "0.05",
                fill: "url(#products-none-linear-gradient)",
              }}
            />
            <path
              d="M284.53,177.009,185.474,77.937a10.843,10.843,0,0,0-6.655-2.757H82.047a3.909,3.909,0,0,0-3.9,3.9v96.777a10.851,10.851,0,0,0,2.757,6.655l99.063,99.061a3.908,3.908,0,0,0,5.513,0l99.049-99.048A3.91,3.91,0,0,0,284.53,177.009Zm-164.937-51.3a11.56,11.56,0,1,1,11.559-11.561A11.56,11.56,0,0,1,119.593,125.706Z"
              style={{fill: primary}}
            />
            <path
              d="M284.431,176.959,185.374,77.887a10.834,10.834,0,0,0-6.654-2.757H81.947a3.909,3.909,0,0,0-3.9,3.9v96.777a10.85,10.85,0,0,0,2.756,6.655l99.063,99.061a3.909,3.909,0,0,0,5.514,0l99.049-99.048A3.912,3.912,0,0,0,284.431,176.959Zm-164.938-51.3a11.56,11.56,0,1,1,11.56-11.561A11.56,11.56,0,0,1,119.493,125.656Z"
              style={{opacity: "0.25", fill: "url(#linear-gradient-2)"}}
            />
            <path
              d="M78.148,132.124a62.028,62.028,0,1,1,30.3-14.963,11.518,11.518,0,0,0,2.4,4.53,66.934,66.934,0,1,0-32.7,15.511Z"
              style={{fill: brighterPrimary}}
            />
            <rect
              x="256.466"
              y="35.36"
              width="40.611"
              height="40.611"
              rx="3.518"
              ry="3.518"
              style={{fill: brighterPrimary}}
            />
            <path
              d="M269.661,55.666c0-5.445,2.81-8.9,7.136-8.9,4.4,0,7.085,3.431,7.085,8.9,0,5.42-2.685,8.9-7.11,8.9C272.421,64.567,269.661,61.086,269.661,55.666Zm10.691,0c0-3.6-1.044-6.017-3.555-6.017-2.536,0-3.606,2.387-3.606,6.017,0,3.605,1.07,6.017,3.606,6.017S280.352,59.321,280.352,55.666Z"
              style={{fill: "#fff"}}
            />
          </g>
        </g>
      </g>
    ),
  }),
  plane: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="plane-default-linear-gradient"
            x1="272.696"
            y1="47.304"
            x2="60.429"
            y2="259.571"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="plane-default-linear-gradient-2"
            x1="160"
            y1="321.791"
            x2="160"
            y2="265.719"
            xlinkHref="#plane-default-linear-gradient"
          />
          <linearGradient
            id="plane-default-linear-gradient-3"
            x1="214.237"
            y1="110.453"
            x2="292.237"
            y2="110.453"
            xlinkHref="#plane-default-linear-gradient"
          />
          <linearGradient
            id="plane-default-linear-gradient-4"
            x1="61.951"
            y1="156.823"
            x2="227.127"
            y2="156.823"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="0.018" stopColor="#141414" stopOpacity="0.031" />
            <stop offset="0.551" stopColor="#141414" stopOpacity="0.751" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="plane-default-linear-gradient-5"
            x1="286.492"
            y1="157.564"
            x2="108.42"
            y2="157.564"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="plane-default-linear-gradient-6"
            x1="17.045"
            y1="146.59"
            x2="42.954"
            y2="146.59"
            xlinkHref="#plane-default-linear-gradient"
          />
          <linearGradient
            id="plane-default-linear-gradient-7"
            x1="308.712"
            y1="171.658"
            x2="186.813"
            y2="171.658"
            xlinkHref="#plane-default-linear-gradient-5"
          />
          <linearGradient
            id="plane-default-linear-gradient-8"
            x1="329.276"
            y1="88.563"
            x2="288.454"
            y2="88.563"
            xlinkHref="#plane-default-linear-gradient-5"
          />
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle
              cx="160"
              cy="160"
              r="160"
              opacity="0.1"
              fill="url(#plane-default-linear-gradient)"
            />
            <path
              d="M41.364,267.332a159.949,159.949,0,0,0,237.272,0Z"
              fill={brighterPrimary}
            />
            <path
              d="M41.364,267.332a159.949,159.949,0,0,0,237.272,0Z"
              opacity="0.2"
              fill="url(#plane-default-linear-gradient-2)"
            />
            <polygon
              points="214.237 134.122 270.552 86.785 292.237 86.791 269.175 134.05 214.237 134.122"
              fill={primary}
            />
            <polygon
              points="214.237 134.122 270.552 86.785 292.237 86.791 269.175 134.05 214.237 134.122"
              opacity="0.2"
              fill="url(#plane-default-linear-gradient-3)"
            />
            <path
              d="M51.185,133.936c-8.131,0-38.766,13.041-39.335,23.261s30.395,22.514,40.1,22.514h56.96l7.371-.064V170.8a6.391,6.391,0,0,1,6.384-6.384h36.813a6.391,6.391,0,0,1,6.384,6.384v8.413l1.212-.01h31.137l70.652-33.514.367-11.754Zm5.566,16.224a1.114,1.114,0,0,1-1.111,1.111H53.376a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452H55.3a1.457,1.457,0,0,1,1.453,1.452Zm11.225,0a1.115,1.115,0,0,1-1.112,1.111H64.6a1.457,1.457,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.923a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111H75.826a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.922a1.457,1.457,0,0,1,1.453,1.452Zm11.224,0a1.114,1.114,0,0,1-1.111,1.111H87.051a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.923a1.456,1.456,0,0,1,1.451,1.452Zm11.226,0a1.115,1.115,0,0,1-1.112,1.111H98.276a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452H100.2a1.457,1.457,0,0,1,1.453,1.452Zm11.224,0a1.114,1.114,0,0,1-1.111,1.111H109.5a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111h-2.263a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111h-2.263a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.456,1.456,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Z"
              fill={primary}
            />
            <path
              d="M51.185,133.936c-8.131,0-38.766,13.041-39.335,23.261s30.395,22.514,40.1,22.514h56.96l7.371-.064V170.8a6.391,6.391,0,0,1,6.384-6.384h36.813a6.391,6.391,0,0,1,6.384,6.384v8.413l1.212-.01h31.137l70.652-33.514.367-11.754Zm5.566,16.224a1.114,1.114,0,0,1-1.111,1.111H53.376a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452H55.3a1.457,1.457,0,0,1,1.453,1.452Zm11.225,0a1.115,1.115,0,0,1-1.112,1.111H64.6a1.457,1.457,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.923a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111H75.826a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.922a1.457,1.457,0,0,1,1.453,1.452Zm11.224,0a1.114,1.114,0,0,1-1.111,1.111H87.051a1.456,1.456,0,0,1-1.452-1.452v-6.442a1.456,1.456,0,0,1,1.452-1.452h1.923a1.456,1.456,0,0,1,1.451,1.452Zm11.226,0a1.115,1.115,0,0,1-1.112,1.111H98.276a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452H100.2a1.457,1.457,0,0,1,1.453,1.452Zm11.224,0a1.114,1.114,0,0,1-1.111,1.111H109.5a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111h-2.263a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.457,1.457,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Zm11.225,0a1.114,1.114,0,0,1-1.111,1.111h-2.263a1.457,1.457,0,0,1-1.453-1.452v-6.442a1.456,1.456,0,0,1,1.453-1.452h1.922a1.456,1.456,0,0,1,1.452,1.452Z"
              opacity="0.2"
              fill="url(#plane-default-linear-gradient-4)"
            />
            <path
              d="M122.668,168.862H159.48a1.94,1.94,0,0,1,1.94,1.94v15.524a1.939,1.939,0,0,1-1.939,1.939H122.668a1.939,1.939,0,0,1-1.939-1.939V170.8A1.939,1.939,0,0,1,122.668,168.862Z"
              fill={brighterPrimary}
            />
            <path
              d="M12.542,154.786a6.69,6.69,0,0,0-.673,2.431,6.245,6.245,0,0,0,.745,3.126H331.439v-5.557Z"
              opacity="0.5"
              fill="url(#plane-default-linear-gradient-5)"
            />
            <path
              d="M20.837,151.263H38.281a4.673,4.673,0,1,0,0-9.346H28.336A60.573,60.573,0,0,0,17.045,149.3,4.659,4.659,0,0,0,20.837,151.263Z"
              opacity="0.2"
              fill="url(#plane-default-linear-gradient-6)"
            />
            <path
              d="M231.348,140.616l-108.34,23.8h36.43a6.391,6.391,0,0,1,6.384,6.384l.07,3.2-.03.429h21l60.762-33.814Z"
              fill={primary}
            />
            <path
              d="M122.717,168.849H339.48a0,0,0,0,1,0,0v5.618a0,0,0,0,1,0,0H120.714a0,0,0,0,1,0,0v-3.616A2,2,0,0,1,122.717,168.849Z"
              opacity="0.5"
              fill="url(#plane-default-linear-gradient-7)"
            />
            <polygon
              points="339.581 90.343 266.318 90.343 270.55 86.782 339.581 86.782 339.581 90.343"
              opacity="0.5"
              fill="url(#plane-default-linear-gradient-8)"
            />
          </g>
        </g>
      </g>
    ),
  }),
  // eslint-disable-next-line autofix/no-unused-vars
  requests: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="requests-default-a"
            x1={292.779}
            y1={67.101}
            x2={80.512}
            y2={279.368}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#141414" stopOpacity={0} />
            <stop offset={1} stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="requests-default-b"
            x1={178.986}
            y1={56.534}
            x2={178.986}
            y2={156.991}
            xlinkHref="#requests-default-a"
          />
          <linearGradient
            id="requests-default-c"
            x1={290.225}
            y1={169.762}
            x2={231.36}
            y2={231.08}
            xlinkHref="#requests-default-a"
          />
          <linearGradient
            id="requests-default-d"
            x1={67.891}
            y1={159.04}
            x2={126.055}
            y2={230.519}
            xlinkHref="#requests-default-a"
          />
        </defs>
        <title>Asset 77</title>
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path fill="none" d="M0 0h360v360H0z" />
            <circle
              cx={180.083}
              cy={179.797}
              r={160}
              fill={primary}
              opacity={0.1}
            />
            <circle
              cx={180.083}
              cy={179.797}
              r={160}
              opacity={0.05}
              fill="url(#requests-default-a)"
            />
            <path
              d="M281.139 273.2a1 1 0 0 1-1 1H77.529a1 1 0 0 1-1-1V127.65a2.248 2.248 0 0 1 .8-1.6l100.779-74.777a1.432 1.432 0 0 1 1.6 0l100.624 74.779a2.251 2.251 0 0 1 .8 1.6z"
              fill={primary}
            />
            <path
              d="M281.291 273.2a1 1 0 0 1-1 1H77.681a1 1 0 0 1-1-1V127.65a2.244 2.244 0 0 1 .8-1.6l100.778-74.777a1.434 1.434 0 0 1 1.606 0l100.624 74.779a2.251 2.251 0 0 1 .8 1.6z"
              fill="url(#requests-default-b)"
              opacity={0.25}
            />
            <path fill="#fff" d="M88.952 70.262h179.764v141.905H88.952z" />
            <path
              fill={primary}
              d="M281.139 126.65l-102.228 64.102 102.228 83.437V126.65zM76.529 126.65l102.229 64.102-102.229 83.437V126.65z"
            />
            <path
              opacity={0.25}
              fill="url(#requests-default-c)"
              d="M281.139 126.65l-102.228 64.102 102.228 83.437V126.65z"
            />
            <path
              opacity={0.25}
              fill="url(#requests-default-d)"
              d="M76.529 126.65l102.229 64.102-102.229 83.437V126.65z"
            />
            <path
              fill={primary}
              d="M279.919 267.645l-101.008-76.893-101.144 76.88-1.238.979v5.578h204.61v-5.578l-1.22-.966z"
            />
          </g>
        </g>
      </g>
    ),
  }),
  requests_check: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="requests-check-a"
            x1={292.779}
            y1={67.101}
            x2={80.512}
            y2={279.368}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#141414" stopOpacity={0} />
            <stop offset={1} stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="requests-check-b"
            x1={178.986}
            y1={56.534}
            x2={178.986}
            y2={156.991}
            xlinkHref="#requests-check-a"
          />
          <linearGradient
            id="requests-check-c"
            x1={290.225}
            y1={169.762}
            x2={231.36}
            y2={231.08}
            xlinkHref="#requests-check-a"
          />
          <linearGradient
            id="requests-check-d"
            x1={67.891}
            y1={159.04}
            x2={126.055}
            y2={230.519}
            xlinkHref="#requests-check-a"
          />
        </defs>
        <title>Asset 64</title>
        <g data-name="Layer 2">
          <g data-name="Layer 1">
            <path fill="none" d="M0 0h360v360H0z" />
            <circle
              cx={180.083}
              cy={179.797}
              r={160}
              fill={primary}
              opacity={0.1}
            />
            <circle
              cx={180.083}
              cy={179.797}
              r={160}
              opacity={0.05}
              fill="url(#requests-check-a)"
            />
            <path
              d="M281.139 273.2a1 1 0 0 1-1 1H77.529a1 1 0 0 1-1-1V127.65a2.248 2.248 0 0 1 .8-1.6l100.779-74.777a1.432 1.432 0 0 1 1.6 0l100.624 74.779a2.251 2.251 0 0 1 .8 1.6z"
              fill={primary}
            />
            <path
              d="M281.291 273.2a1 1 0 0 1-1 1H77.681a1 1 0 0 1-1-1V127.65a2.244 2.244 0 0 1 .8-1.6l100.778-74.777a1.434 1.434 0 0 1 1.606 0l100.624 74.779a2.251 2.251 0 0 1 .8 1.6z"
              fill="url(#requests-check-b)"
              opacity={0.25}
            />
            <path fill="#fff" d="M88.952 70.262h179.764v141.905H88.952z" />
            <path
              fill={primary}
              d="M281.139 126.65l-102.228 64.102 102.228 83.437V126.65zM76.529 126.65l102.229 64.102-102.229 83.437V126.65z"
            />
            <path
              opacity={0.25}
              fill="url(#requests-check-c)"
              d="M281.139 126.65l-102.228 64.102 102.228 83.437V126.65z"
            />
            <path
              opacity={0.25}
              fill="url(#requests-check-d)"
              d="M76.529 126.65l102.229 64.102-102.229 83.437V126.65z"
            />
            <path
              fill={primary}
              d="M279.919 267.645l-101.008-76.893-101.144 76.88-1.238.979v5.578h204.61v-5.578l-1.22-.966z"
            />
            <circle
              cx={332.453}
              cy={142.531}
              r={26.012}
              fill={brighterPrimary}
            />
            <path
              fill="none"
              stroke="#fff"
              strokeMiterlimit={10}
              strokeWidth={6}
              d="M324.321 140.885l6.703 6.703 12.01-12.009"
            />
          </g>
        </g>
      </g>
    ),
  }),
  requests_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="requests-none-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="293.41"
            x2="81.14"
            y1="67.55"
            y2="279.82"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="requests-none-linear-gradient-2"
            x1="179.62"
            x2="179.62"
            y1="56.98"
            y2="157.44"
            xlinkHref="#requests-none-linear-gradient"
          />
          <linearGradient
            id="requests-none-linear-gradient-3"
            x1="290.86"
            x2="231.99"
            y1="170.21"
            y2="231.53"
            xlinkHref="#requests-none-linear-gradient"
          />
          <linearGradient
            id="requests-none-linear-gradient-4"
            x1="68.52"
            x2="126.69"
            y1="159.49"
            y2="230.97"
            xlinkHref="#requests-none-linear-gradient"
          />
        </defs>
        <g id="Layer_2">
          <g id="Layer_1-2">
            <rect height="360" style={{fill: "none"}} width="360" />
            <circle
              style={{fill: primary, opacity: "0.1"}}
              cx="180.71"
              cy="180.25"
              r="160"
            />
            <circle
              style={{
                opacity: "0.05",
                fill: "url(#requests-none-linear-gradient)",
              }}
              cx="180.71"
              cy="180.25"
              r="160"
            />
            <path
              style={{fill: primary}}
              d="M281.77,273.64a1,1,0,0,1-1,1H78.16a1,1,0,0,1-1-1V128.1a2.26,2.26,0,0,1,.8-1.6L178.74,51.72a1.43,1.43,0,0,1,1.61,0L281,126.5a2.26,2.26,0,0,1,.8,1.6Z"
            />
            <g style={{opacity: "0.25"}}>
              <path
                style={{fill: "url(#requests-none-linear-gradient-2)"}}
                d="M281.92,273.64a1,1,0,0,1-1,1H78.31a1,1,0,0,1-1-1V128.1a2.23,2.23,0,0,1,.81-1.6L178.89,51.72a1.43,1.43,0,0,1,1.61,0L281.12,126.5a2.26,2.26,0,0,1,.8,1.6Z"
              />
            </g>
            <rect
              height="141.91"
              style={{fill: "#fff"}}
              width="179.76"
              x="89.58"
              y="70.71"
            />
            <polygon
              style={{fill: primary}}
              points="281.77 127.1 179.54 191.2 281.77 274.64 281.77 127.1"
            />
            <polygon
              style={{fill: primary}}
              points="77.16 127.1 179.39 191.2 77.16 274.64 77.16 127.1"
            />
            <polygon
              style={{
                opacity: "0.25",
                fill: "url(#requests-none-linear-gradient-3)",
              }}
              points="281.77 127.1 179.54 191.2 281.77 274.64 281.77 127.1"
            />
            <polygon
              style={{
                opacity: "0.25",
                fill: "url(#requests-none-linear-gradient-4)",
              }}
              points="77.16 127.1 179.39 191.2 77.16 274.64 77.16 127.1"
            />
            <polygon
              style={{fill: primary}}
              points="280.55 268.09 179.54 191.2 78.4 268.08 77.16 269.06 77.16 274.64 281.77 274.64 281.77 269.06 280.55 268.09"
            />
            <rect
              height="40.61"
              style={{fill: brighterPrimary}}
              width="40.61"
              rx="3.52"
              ry="3.52"
              x="18.68"
              y="83.27"
            />
            <path
              style={{fill: "#fff"}}
              d="M31.88,103.58c0-5.45,2.8-8.9,7.13-8.9s7.09,3.43,7.09,8.9-2.69,8.9-7.11,8.9S31.88,109,31.88,103.58Zm10.69,0c0-3.61-1-6-3.56-6s-3.6,2.39-3.6,6,1.06,6,3.6,6S42.57,107.23,42.57,103.58Z"
            />
          </g>
        </g>
      </g>
    ),
  }),
  results_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="results-none-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="293.39"
            x2="81.12"
            y1="66.95"
            y2="279.21"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="results-none-linear-gradient-2"
            x1="180.69"
            x2="180.69"
            y1="338.34"
            y2="268.41"
            xlinkHref="#results-none-linear-gradient"
          />
          <linearGradient
            id="results-none-linear-gradient-3"
            gradientTransform="translate(125.39 -76.56) rotate(35.78)"
            x1="138.18"
            x2="223.19"
            y1="199.02"
            y2="114.02"
            xlinkHref="#results-none-linear-gradient"
          />
          <linearGradient
            id="results-none-linear-gradient-4"
            x1="296.34"
            x2="273.41"
            y1="249.15"
            y2="272.08"
            xlinkHref="#results-none-linear-gradient"
          />
          <linearGradient
            id="results-none-linear-gradient-5"
            gradientUnits="userSpaceOnUse"
            x1="108.14"
            x2="366.3"
            y1="140.69"
            y2="140.69"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="results-none-linear-gradient-6"
            gradientTransform="matrix(1, 0, 0, -1, -10.82, -805.88)"
            gradientUnits="userSpaceOnUse"
            x1="119.16"
            x2="364.8"
            y1="-975.26"
            y2="-975.26"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="0.93" stopColor="#fff" />
          </linearGradient>
        </defs>
        <g id="Layer_2">
          <g id="Layer_1-2">
            <rect height="360" style={{fill: "none"}} width="360" />
            <circle
              style={{
                opacity: "0.1",
                fill: "url(#results-none-linear-gradient)",
              }}
              cx="180.69"
              cy="179.64"
              r="160"
            />
            <rect
              height="40.61"
              style={{fill: brighterPrimary}}
              width="40.61"
              rx="3.52"
              ry="3.52"
              x="271.18"
              y="39.45"
            />
            <path
              style={{fill: "#fff"}}
              d="M284.37,59.76c0-5.45,2.81-8.9,7.14-8.9s7.08,3.43,7.08,8.9-2.68,8.9-7.11,8.9S284.37,65.18,284.37,59.76Zm10.69,0c0-3.61-1-6-3.55-6s-3.61,2.39-3.61,6,1.07,6,3.61,6S295.06,63.41,295.06,59.76Z"
            />
            <path
              style={{fill: brighterPrimary}}
              d="M315.44,266a160,160,0,0,1-269.5,0"
            />
            <path
              style={{
                opacity: "0.2",
                fill: "url(#results-none-linear-gradient-2)",
              }}
              d="M315.44,266a160,160,0,0,1-269.5,0"
            />
            <path
              style={{fill: primary}}
              d="M247.94,89.5a94.07,94.07,0,1,0-13.2,144l76.4,76.39a1,1,0,0,0,1.41,0l22.78-22.77a1,1,0,0,0,0-1.42l-76.4-76.39A94.09,94.09,0,0,0,247.94,89.5ZM230.47,205.06a69.36,69.36,0,1,1,0-98.09A69.35,69.35,0,0,1,230.47,205.06Z"
            />
            <circle
              style={{
                opacity: "0.2",
                fill: "url(#results-none-linear-gradient-3)",
              }}
              cx="181.27"
              cy="155.93"
              r="69.36"
              transform="translate(-56.96 135.43) rotate(-35.78)"
            />
            <path
              style={{
                opacity: "0.2",
                fill: "url(#results-none-linear-gradient-4)",
              }}
              d="M335.21,285.61l-76-76a94.92,94.92,0,0,1-24.12,24.26l76,76a1,1,0,0,0,1.41,0L335.21,287A1,1,0,0,0,335.21,285.61Z"
            />
            <path
              style={{
                opacity: "0.5",
                fill: "url(#results-none-linear-gradient-5)",
              }}
              d="M233,128.73H117.64c-3.27,7.55-6.11,23.93-5.22,23.93H353.71V128.73Z"
            />
            <path
              style={{
                opacity: "0.5",
                fill: "url(#results-none-linear-gradient-6)",
              }}
              d="M228.15,176.23H115.06a95.11,95.11,0,0,1-2.81-13.71H342v13.71Z"
            />
          </g>
        </g>
      </g>
    ),
  }),
  search: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="272.696"
            y1="47.304"
            x2="60.429"
            y2="259.571"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="160"
            y1="318.701"
            x2="160"
            y2="248.767"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-3"
            x1="117.491"
            y1="179.379"
            x2="202.495"
            y2="94.376"
            gradientTransform="translate(110 -68.169) rotate(35.783)"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-4"
            x1="275.652"
            y1="229.505"
            x2="252.715"
            y2="252.442"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-5"
            x1="87.45"
            y1="121.051"
            x2="345.607"
            y2="121.051"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-6"
            x1="98.473"
            y1="-994.898"
            x2="344.112"
            y2="-994.898"
            gradientTransform="matrix(1, 0, 0, -1, -10.824, -845.163)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="0.931" stopColor="#fff" />
          </linearGradient>
        </defs>
        <title>Search Graphic</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle
              cx="160"
              cy="160"
              r="160"
              style={{
                opacity: 0.1,
                fill: "url(#linear-gradient)",
              }}
            />
            <path
              d="M294.753,246.3a160.043,160.043,0,0,1-269.506,0"
              style={{
                fill: brighterPrimary,
              }}
            />
            <path
              d="M294.753,246.3a160.043,160.043,0,0,1-269.506,0"
              style={{
                opacity: 0.2,
                fill: "url(#linear-gradient-2)",
              }}
            />
            <path
              d="M227.248,69.86a94.063,94.063,0,1,0-13.195,144.02l76.391,76.391a1,1,0,0,0,1.415,0L314.635,267.5a1,1,0,0,0,0-1.414L238.243,189.69A94.09,94.09,0,0,0,227.248,69.86ZM209.781,185.418a69.36,69.36,0,1,1,0-98.09A69.362,69.362,0,0,1,209.781,185.418Z"
              style={{
                fill: primary,
              }}
            />
            <circle
              cx="160.583"
              cy="136.288"
              r="69.36"
              transform="translate(-49.377 119.62) rotate(-35.783)"
              style={{
                opacity: 0.2,
                fill: "url(#linear-gradient-3)",
              }}
            />
            <path
              d="M314.518,265.969l-76.037-76.037a94.974,94.974,0,0,1-24.127,24.254l75.974,75.973a1,1,0,0,0,1.414,0l22.776-22.776A1,1,0,0,0,314.518,265.969Z"
              style={{
                opacity: 0.2,
                fill: "url(#linear-gradient-4)",
              }}
            />
            <path
              d="M212.26,109.089H96.948c-3.273,7.55-6.106,23.924-5.22,23.924H333.015V109.089Z"
              style={{
                opacity: 0.5,
                fill: "url(#linear-gradient-5)",
              }}
            />
            <path
              d="M207.463,156.588H94.373a94.754,94.754,0,0,1-2.81-13.706H321.306v13.706Z"
              style={{
                opacity: 0.5,
                fill: "url(#linear-gradient-6)",
              }}
            />
          </g>
        </g>
      </g>
    ),
  }),
  shipments: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="shipments-default-linear-gradient"
            x1="272.696"
            y1="47.304"
            x2="60.429"
            y2="259.571"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="shipments-default-linear-gradient-2"
            x1="160"
            y1="316.11"
            x2="160"
            y2="206.84"
            xlinkHref="#shipments-default-linear-gradient"
          />
          <linearGradient
            id="shipments-default-linear-gradient-3"
            x1="292.496"
            y1="147.763"
            x2="184.834"
            y2="147.763"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="shipments-default-linear-gradient-4"
            x1="168.52"
            y1="165.478"
            x2="168.52"
            y2="197.331"
            xlinkHref="#shipments-default-linear-gradient"
          />
          <linearGradient
            id="shipments-default-linear-gradient-5"
            x1="87.486"
            y1="113.369"
            x2="87.486"
            y2="155.823"
            xlinkHref="#shipments-default-linear-gradient"
          />
          <linearGradient
            id="shipments-default-linear-gradient-6"
            x1="339.869"
            y1="168.728"
            x2="113.38"
            y2="168.728"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="0.999" stopColor="#fff" />
          </linearGradient>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle
              cx="160"
              cy="160"
              r="160"
              opacity="0.1"
              fill="url(#shipments-default-linear-gradient)"
            />
            <path
              d="M6.279,204.505a160.047,160.047,0,0,0,307.442,0Z"
              fill={primary}
            />
            <path
              d="M6.279,204.505a160.047,160.047,0,0,0,307.442,0Z"
              opacity="0.2"
              fill="url(#shipments-default-linear-gradient-2)"
            />
            <rect
              x="126.455"
              y="139.435"
              width="193.216"
              height="16.655"
              opacity="0.5"
              fill="url(#shipments-default-linear-gradient-3)"
            />
            <path
              d="M265.071,204.911H65.168a21.654,21.654,0,0,1-21.654-21.655v-18.09A2.165,2.165,0,0,1,45.679,163H293.525Z"
              fill={primary}
              fillRule="evenodd"
            />
            <path
              d="M265.071,204.911H65.168a21.654,21.654,0,0,1-21.654-21.655v-18.09A2.165,2.165,0,0,1,45.679,163H293.525Z"
              fillRule="evenodd"
              opacity="0.2"
              fill="url(#shipments-default-linear-gradient-4)"
            />
            <path
              d="M73.853,125.247V112.029a1.083,1.083,0,0,0-1.083-1.083H63.048a1.083,1.083,0,0,0-1.083,1.083v51.45h51.041V127.413a1.082,1.082,0,0,0-1.082-1.083H74.936A1.083,1.083,0,0,1,73.853,125.247Z"
              fill={primary}
              fillRule="evenodd"
            />
            <path
              d="M73.853,125.247V112.029a1.083,1.083,0,0,0-1.083-1.083H63.048a1.083,1.083,0,0,0-1.083,1.083v51.45h51.041V127.413a1.082,1.082,0,0,0-1.082-1.083H74.936A1.083,1.083,0,0,1,73.853,125.247Z"
              fillRule="evenodd"
              opacity="0.2"
              fill="url(#shipments-default-linear-gradient-5)"
            />
            <path
              d="M158.218,133.058H126.455V116.374h31.763ZM195.1,116.374H163.339v16.684H195.1Zm36.884,0H200.223v16.684h31.762Zm-73.767,23.032H126.455v16.685h31.763Zm37.315,0H163.771v16.685h31.762Zm36.452,0H200.223v16.685h31.762Z"
              fill={brighterPrimary}
            />
            <rect
              x="112.977"
              y="163.001"
              width="226.892"
              height="11.455"
              opacity="0.5"
              fill="url(#shipments-default-linear-gradient-6)"
            />
          </g>
        </g>
      </g>
    ),
  }),
  shipments_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="shipments-none-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="292.84"
            x2="80.57"
            y1="67.94"
            y2="280.21"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="shipments-none-linear-gradient-2"
            x1="180.14"
            x2="180.14"
            y1="336.75"
            y2="227.48"
            xlinkHref="#shipments-none-linear-gradient"
          />
          <linearGradient
            id="shipments-none-linear-gradient-3"
            gradientUnits="userSpaceOnUse"
            x1="312.64"
            x2="204.98"
            y1="168.4"
            y2="168.4"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="shipments-none-linear-gradient-4"
            x1="188.66"
            x2="188.66"
            y1="186.12"
            y2="217.97"
            xlinkHref="#shipments-none-linear-gradient"
          />
          <linearGradient
            id="shipments-none-linear-gradient-5"
            x1="107.63"
            x2="107.63"
            y1="134.01"
            y2="176.46"
            xlinkHref="#shipments-none-linear-gradient"
          />
          <linearGradient
            id="shipments-none-linear-gradient-6"
            gradientUnits="userSpaceOnUse"
            x1="360.01"
            x2="133.52"
            y1="189.37"
            y2="189.37"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <g id="Layer_2">
          <g id="Layer_1-2">
            <rect height="360" style={{fill: "none"}} width="360" />
            <circle
              style={{
                opacity: "0.1",
                fill: "url(#shipments-none-linear-gradient)",
              }}
              cx="180.14"
              cy="180.64"
              r="160"
            />
            <path
              style={{fill: primary}}
              d="M26.42,225.14a160,160,0,0,0,307.44,0Z"
            />
            <path
              style={{
                opacity: "0.2",
                fill: "url(#shipments-none-linear-gradient-2)",
              }}
              d="M26.42,225.14a160,160,0,0,0,307.44,0Z"
            />
            <rect
              height="16.66"
              style={{
                opacity: "0.5",
                fill: "url(#shipments-none-linear-gradient-3)",
              }}
              width="193.22"
              x="146.6"
              y="160.07"
            />
            <path
              style={{fill: primary, fillRule: "evenodd"}}
              d="M285.21,225.55H85.31a21.65,21.65,0,0,1-21.65-21.66V185.8a2.16,2.16,0,0,1,2.16-2.16H313.67Z"
            />
            <path
              style={{
                fillRule: "evenodd",
                opacity: "0.2",
                fill: "url(#shipments-none-linear-gradient-4)",
              }}
              d="M285.21,225.55H85.31a21.65,21.65,0,0,1-21.65-21.66V185.8a2.16,2.16,0,0,1,2.16-2.16H313.67Z"
            />
            <path
              style={{fill: primary, fillRule: "evenodd"}}
              d="M94,145.88V132.67a1.08,1.08,0,0,0-1.08-1.09H83.19a1.08,1.08,0,0,0-1.08,1.09v51.45h51V148.05a1.08,1.08,0,0,0-1.08-1.08h-37A1.09,1.09,0,0,1,94,145.88Z"
            />
            <path
              style={{
                fillRule: "evenodd",
                opacity: "0.2",
                fill: "url(#shipments-none-linear-gradient-5)",
              }}
              d="M94,145.88V132.67a1.08,1.08,0,0,0-1.08-1.09H83.19a1.08,1.08,0,0,0-1.08,1.09v51.45h51V148.05a1.08,1.08,0,0,0-1.08-1.08h-37A1.09,1.09,0,0,1,94,145.88Z"
            />
            <path
              style={{fill: brighterPrimary}}
              d="M178.36,153.7H146.6V137h31.76ZM215.24,137H183.48V153.7h31.76Zm36.89,0H220.36V153.7h31.77Zm-73.77,23H146.6v16.69h31.76Zm37.32,0H183.91v16.69h31.77Zm36.45,0H220.36v16.69h31.77Z"
            />
            <rect
              height="40.61"
              style={{fill: brighterPrimary}}
              width="40.61"
              rx="3.52"
              ry="3.52"
              x="273.25"
              y="45.36"
            />
            <path
              style={{fill: "#fff"}}
              d="M286.44,65.67c0-5.45,2.81-8.9,7.14-8.9s7.08,3.43,7.08,8.9-2.68,8.9-7.11,8.9S286.44,71.09,286.44,65.67Zm10.69,0c0-3.61-1-6-3.55-6S290,62,290,65.67s1.07,6,3.61,6S297.13,69.32,297.13,65.67Z"
            />
            <rect
              height="11.45"
              style={{
                opacity: "0.5",
                fill: "url(#shipments-none-linear-gradient-6)",
              }}
              width="226.89"
              x="133.12"
              y="183.64"
            />
          </g>
        </g>
      </g>
    ),
  }),
  truck: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="truck-linear-gradient"
            x1="293.33"
            y1="47.3"
            x2="81.07"
            y2="259.57"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="truck-linear-gradient-2"
            x1="180.64"
            y1="320"
            x2="180.64"
            y2="228.53"
            xlinkHref="#truck-linear-gradient"
          />
          <linearGradient
            id="truck-linear-gradient-3"
            x1="168.65"
            y1="200"
            x2="168.65"
            y2="186.02"
            xlinkHref="#truck-linear-gradient"
          />
          <linearGradient
            id="truck-linear-gradient-4"
            x1="228.76"
            y1="70.65"
            x2="228.76"
            y2="183.28"
            xlinkHref="#truck-linear-gradient"
          />
          <linearGradient
            id="truck-linear-gradient-5"
            x1="271.5"
            y1="225.67"
            x2="271.5"
            y2="194.05"
            xlinkHref="#truck-linear-gradient"
          />
          <linearGradient
            id="truck-linear-gradient-6"
            x1="106.59"
            y1="225.67"
            x2="106.59"
            y2="194.05"
            xlinkHref="#truck-linear-gradient"
          />
          <linearGradient
            id="truck-linear-gradient-7"
            x1="-6845.85"
            y1="-2930.26"
            x2="-6845.85"
            y2="-2793.77"
            gradientTransform="translate(6915.85 2904.71)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="truck-linear-gradient-8"
            x1="1.57"
            y1="176.63"
            x2="305.57"
            y2="176.63"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="truck-linear-gradient-9"
            x1="0.67"
            y1="193.22"
            x2="123.58"
            y2="193.22"
            gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
            xlinkHref="#truck-linear-gradient-7"
          />
        </defs>
        <title>Truck Graphic</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle
              cx="180.64"
              cy="160"
              r="160"
              style={{opacity: 0.1, fill: "url(#truck-linear-gradient)"}}
            />
            <path
              d="M326.6,225.64a160.07,160.07,0,0,1-291.92,0"
              style={{fill: brighterPrimary}}
            />
            <path
              d="M326.6,225.64a160.07,160.07,0,0,1-291.92,0"
              style={{opacity: 0.2, fill: "url(#truck-linear-gradient-2)"}}
            />
            <circle cx="180.64" cy="160" r="160" style={{fill: "none"}} />
            <path
              d="M25.73,200.85a1.34,1.34,0,0,0,1.23,1H313.84a1,1,0,0,0,1-1V185.34a1,1,0,0,0-1-1H23.27a.8.8,0,0,0-.82,1Z"
              style={{fill: primary}}
            />
            <g style={{opacity: 0.2}}>
              <path
                d="M25.79,201.08a1.34,1.34,0,0,0,1.23,1H313.84a1,1,0,0,0,1-1V185.57a1,1,0,0,0-1-1H23.31a.8.8,0,0,0-.82,1Z"
                style={{fill: "url(#truck-linear-gradient-3)"}}
              />
            </g>
            <path
              d="M20.64,160q0,8,.77,15.73H140V45H69.39A159.51,159.51,0,0,0,20.64,160Z"
              style={{fill: brighterPrimary}}
            />
            <path
              d="M150.56,183.41a1,1,0,0,0,1,1H306a1,1,0,0,0,1-1V129.47a1,1,0,0,0-1-1H237.44a1,1,0,0,1-1-1V98.2a1,1,0,0,1,1-1H242a1,1,0,0,0,1-1V87a1,1,0,0,0-1-1H180.49a1,1,0,0,1-1-1l-.19-17a.58.58,0,0,0-.91-.55l-11,5.53a1.74,1.74,0,0,0-.89,1.45l0,10.57a1,1,0,0,1-1,1h-14a1,1,0,0,0-1,1Zm44.15-85a1,1,0,0,1,1-1h30.7a1,1,0,0,1,1,1v29a1,1,0,0,1-1,1h-30.7a1,1,0,0,1-1-1Z"
              style={{fill: primary}}
            />
            <g style={{opacity: 0.2}}>
              <path
                d="M150.56,183.41a1,1,0,0,0,1,1H306a1,1,0,0,0,1-1V129.47a1,1,0,0,0-1-1H237.44a1,1,0,0,1-1-1V98.2a1,1,0,0,1,1-1H242a1,1,0,0,0,1-1V87a1,1,0,0,0-1-1H180.49a1,1,0,0,1-1-1l-.19-17a.58.58,0,0,0-.91-.55l-11,5.53a1.74,1.74,0,0,0-.89,1.45l0,10.57a1,1,0,0,1-1,1h-14a1,1,0,0,0-1,1Zm44.15-85a1,1,0,0,1,1-1h30.7a1,1,0,0,1,1,1v29a1,1,0,0,1-1,1h-30.7a1,1,0,0,1-1-1Z"
                style={{fill: "url(#truck-linear-gradient-4)"}}
              />
            </g>
            <circle cx="271.5" cy="206.92" r="16.32" style={{fill: primary}} />
            <path
              d="M271.5,193.6a13.33,13.33,0,1,1-13.33,13.32A13.34,13.34,0,0,1,271.5,193.6m0-6a19.33,19.33,0,1,0,19.32,19.32A19.32,19.32,0,0,0,271.5,187.6Z"
              style={{fill: primary}}
            />
            <path
              d="M106.59,223.25a16.33,16.33,0,1,1,16.33-16.33A16.34,16.34,0,0,1,106.59,223.25Z"
              style={{fill: primary}}
            />
            <path
              d="M106.59,193.6a13.33,13.33,0,1,1-13.32,13.32,13.34,13.34,0,0,1,13.32-13.32m0-6a19.33,19.33,0,1,0,19.33,19.32,19.32,19.32,0,0,0-19.33-19.32Z"
              style={{fill: primary}}
            />
            <circle
              cx="271.5"
              cy="206.92"
              r="19.32"
              style={{opacity: 0.2, fill: "url(#truck-linear-gradient-5)"}}
            />
            <circle
              cx="106.59"
              cy="206.92"
              r="19.32"
              style={{opacity: 0.2, fill: "url(#truck-linear-gradient-6)"}}
            />
            <rect
              x="66.87"
              y="-10.84"
              width="6.25"
              height="139.99"
              transform="translate(10.84 129.16) rotate(-90)"
              style={{opacity: 0.5, fill: "url(#truck-linear-gradient-7)"}}
            />
            <rect
              x="0.67"
              y="168.99"
              width="306.32"
              height="15.27"
              style={{opacity: 0.5, fill: "url(#truck-linear-gradient-8)"}}
            />
            <path
              d="M113.67,189H.67v8.39H123.58A20.75,20.75,0,0,0,113.67,189Z"
              style={{opacity: 0.5, fill: "url(#truck-linear-gradient-9)"}}
            />
          </g>
        </g>
      </g>
    ),
  }),
  truck_none: (primary: string, brighterPrimary: string) => ({
    svgData: (
      <g>
        <defs>
          <linearGradient
            id="truck-none-linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="293.33"
            x2="81.07"
            y1="67.32"
            y2="279.59"
          >
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="1" stopColor="#141414" />
          </linearGradient>
          <linearGradient
            id="truck-none-linear-gradient-2"
            x1="180.64"
            x2="180.64"
            y1="340.02"
            y2="248.55"
            xlinkHref="#truck-none-linear-gradient"
          />
          <linearGradient
            id="truck-none-linear-gradient-3"
            x1="168.65"
            x2="168.65"
            y1="220.02"
            y2="206.04"
            xlinkHref="#truck-none-linear-gradient"
          />
          <linearGradient
            id="truck-none-linear-gradient-4"
            x1="228.76"
            x2="228.76"
            y1="90.67"
            y2="203.3"
            xlinkHref="#truck-none-linear-gradient"
          />
          <linearGradient
            id="truck-none-linear-gradient-5"
            x1="271.5"
            x2="271.5"
            y1="245.69"
            y2="214.06"
            xlinkHref="#truck-none-linear-gradient"
          />
          <linearGradient
            id="truck-none-linear-gradient-6"
            x1="106.59"
            x2="106.59"
            y1="245.69"
            y2="214.06"
            xlinkHref="#truck-none-linear-gradient"
          />
          <linearGradient
            id="truck-none-linear-gradient-7"
            gradientTransform="translate(5316.96 2144.42)"
            gradientUnits="userSpaceOnUse"
            x1="-5246.96"
            x2="-5246.96"
            y1="-2149.95"
            y2="-2013.46"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="truck-none-linear-gradient-8"
            gradientUnits="userSpaceOnUse"
            x1="1.57"
            x2="305.57"
            y1="196.65"
            y2="196.65"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient
            id="truck-none-linear-gradient-9"
            gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
            x1="0.67"
            x2="123.58"
            y1="213.24"
            y2="213.24"
            xlinkHref="#truck-none-linear-gradient-7"
          />
        </defs>
        <g id="Layer_2">
          <g id="Layer_1-2">
            <rect height="360" style={{fill: "none"}} width="360" x="0.08" />
            <circle
              style={{opacity: "0.1", fill: "url(#truck-none-linear-gradient)"}}
              cx="180.64"
              cy="180.02"
              r="160"
            />
            <path
              style={{fill: brighterPrimary}}
              d="M326.6,245.66a160.07,160.07,0,0,1-291.92,0"
            />
            <path
              style={{
                opacity: "0.2",
                fill: "url(#truck-none-linear-gradient-2)",
              }}
              d="M326.6,245.66a160.07,160.07,0,0,1-291.92,0"
            />
            <circle style={{fill: "none"}} cx="180.64" cy="180.02" r="160" />
            <path
              style={{fill: primary}}
              d="M25.73,220.87a1.34,1.34,0,0,0,1.23,1H313.84a1,1,0,0,0,1-1V205.36a1,1,0,0,0-1-1H23.27a.8.8,0,0,0-.82,1Z"
            />
            <g style={{opacity: "0.2"}}>
              <path
                style={{fill: "url(#truck-none-linear-gradient-3)"}}
                d="M25.79,221.1a1.34,1.34,0,0,0,1.23,1H313.84a1,1,0,0,0,1-1V205.59a1,1,0,0,0-1-1H23.31a.8.8,0,0,0-.82,1Z"
              />
            </g>
            <path
              style={{fill: brighterPrimary}}
              d="M20.64,180c0,5.3.26,10.55.77,15.72H140V65H69.39A159.51,159.51,0,0,0,20.64,180Z"
            />
            <path
              style={{fill: primary}}
              d="M150.56,203.42a1,1,0,0,0,1,1H306a1,1,0,0,0,1-1V149.49a1,1,0,0,0-1-1H237.44a1,1,0,0,1-1-1V118.22a1,1,0,0,1,1-1H242a1,1,0,0,0,1-1V107a1,1,0,0,0-1-1H180.49a1,1,0,0,1-1-1l-.19-17a.58.58,0,0,0-.91-.55l-11,5.53a1.74,1.74,0,0,0-.89,1.45l0,10.57a1,1,0,0,1-1,1h-14a1,1,0,0,0-1,1Zm44.15-85a1,1,0,0,1,1-1h30.7a1,1,0,0,1,1,1v29.05a1,1,0,0,1-1,1h-30.7a1,1,0,0,1-1-1Z"
            />
            <g style={{opacity: "0.2"}}>
              <path
                style={{fill: "url(#truck-none-linear-gradient-4)"}}
                d="M150.56,203.42a1,1,0,0,0,1,1H306a1,1,0,0,0,1-1V149.49a1,1,0,0,0-1-1H237.44a1,1,0,0,1-1-1V118.22a1,1,0,0,1,1-1H242a1,1,0,0,0,1-1V107a1,1,0,0,0-1-1H180.49a1,1,0,0,1-1-1l-.19-17a.58.58,0,0,0-.91-.55l-11,5.53a1.74,1.74,0,0,0-.89,1.45l0,10.57a1,1,0,0,1-1,1h-14a1,1,0,0,0-1,1Zm44.15-85a1,1,0,0,1,1-1h30.7a1,1,0,0,1,1,1v29.05a1,1,0,0,1-1,1h-30.7a1,1,0,0,1-1-1Z"
              />
            </g>
            <circle style={{fill: primary}} cx="271.5" cy="226.94" r="16.32" />
            <path
              style={{fill: primary}}
              d="M271.5,213.62a13.33,13.33,0,1,1-13.33,13.32,13.34,13.34,0,0,1,13.33-13.32m0-6a19.33,19.33,0,1,0,19.32,19.32,19.32,19.32,0,0,0-19.32-19.32Z"
            />
            <path
              style={{fill: primary}}
              d="M106.59,243.27a16.33,16.33,0,1,1,16.33-16.33A16.35,16.35,0,0,1,106.59,243.27Z"
            />
            <path
              style={{fill: primary}}
              d="M106.59,213.62a13.33,13.33,0,1,1-13.32,13.32,13.34,13.34,0,0,1,13.32-13.32m0-6a19.33,19.33,0,1,0,19.33,19.32,19.32,19.32,0,0,0-19.33-19.32Z"
            />
            <circle
              style={{
                opacity: "0.2",
                fill: "url(#truck-none-linear-gradient-5)",
              }}
              cx="271.5"
              cy="226.94"
              r="19.32"
            />
            <circle
              style={{
                opacity: "0.2",
                fill: "url(#truck-none-linear-gradient-6)",
              }}
              cx="106.59"
              cy="226.94"
              r="19.32"
            />
            <rect
              height="139.99"
              style={{
                opacity: "0.5",
                fill: "url(#truck-none-linear-gradient-7)",
              }}
              width="6.25"
              transform="translate(-9.18 149.18) rotate(-90)"
              x="66.87"
              y="9.18"
            />
            <rect
              height="15.27"
              style={{
                opacity: "0.5",
                fill: "url(#truck-none-linear-gradient-8)",
              }}
              width="306.32"
              x="0.67"
              y="189.01"
            />
            <path
              style={{
                opacity: "0.5",
                fill: "url(#truck-none-linear-gradient-9)",
              }}
              d="M113.67,209.05H.67v8.39H123.58A20.69,20.69,0,0,0,113.67,209.05Z"
            />
            <rect
              height="40.61"
              style={{fill: brighterPrimary}}
              width="40.61"
              rx="3.52"
              ry="3.52"
              x="288.11"
              y="49.97"
            />
            <path
              style={{fill: "#fff"}}
              d="M301.31,70.28c0-5.45,2.81-8.9,7.13-8.9s7.09,3.43,7.09,8.9-2.69,8.9-7.11,8.9S301.31,75.7,301.31,70.28Zm10.69,0c0-3.61-1.05-6-3.56-6s-3.6,2.39-3.6,6,1.07,6,3.6,6S312,73.93,312,70.28Z"
            />
          </g>
        </g>
      </g>
    ),
  }),
};

export type GraphicIcons = $Keys<typeof _graphicIcons>;
export const graphicIconNames: $ReadOnlyArray<GraphicIcons> = Object.keys(
  _graphicIcons
);

export default _graphicIcons;

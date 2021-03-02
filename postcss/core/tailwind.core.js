//
// Modifications:
// * core doesn't have any colors
//
module.exports = {
  purge: {
    content: [
      './src/*.html',
      './src/**/*.html',
      './src/**/*.svelte',
      './src/**/*.js',
    ],
  },
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  },
  variants: {
    borderStyle: ['responsive', 'focus'],
    borderWidth: ['responsive', 'focus'],
    display: ['responsive', 'focus'],
    opacity: ['disabled', 'focus'],
  },
  corePlugins: [
    'preflight',
    'container',
    'space',
    'divideWidth',
    'divideStyle',
    'divideOpacity',
    'accessibility',
    'appearance',
    'backgroundAttachment',
    'backgroundClip',
    'backgroundImage',
    'backgroundOpacity',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'borderCollapse',
    'borderOpacity',
    'borderRadius',
    'borderStyle',
    'borderWidth',
    'boxSizing',
    'cursor',
    'display',
    'flexDirection',
    'flexWrap',
    'placeItems',
    'placeContent',
    'placeSelf',
    'alignItems',
    'alignContent',
    'alignSelf',
    'justifyItems',
    'justifyContent',
    'justifySelf',
    'flex',
    'flexGrow',
    'flexShrink',
    'order',
    'float',
    'clear',
    'fontFamily',
    'fontWeight',
    'height',
    'fontSize',
    'lineHeight',
    'listStylePosition',
    'listStyleType',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'objectFit',
    'objectPosition',
    'opacity',
    'outline',
    'overflow',
    'overscrollBehavior',
    'padding',
    'placeholderOpacity',
    'pointerEvents',
    'position',
    'inset',
    'resize',
    'boxShadow',
    'ringWidth',
    'ringOffsetWidth',
    'ringOpacity',
    'fill',
    'stroke',
    'strokeWidth',
    'tableLayout',
    'textAlign',
    'textOpacity',
    'textOverflow',
    'fontStyle',
    'textTransform',
    'textDecoration',
    'fontSmoothing',
    'fontVariantNumeric',
    'letterSpacing',
    'userSelect',
    'verticalAlign',
    'visibility',
    'whitespace',
    'wordBreak',
    'width',
    'zIndex',
    'gap',
    'gridAutoFlow',
    'gridTemplateColumns',
    'gridAutoColumns',
    'gridColumn',
    'gridColumnStart',
    'gridColumnEnd',
    'gridTemplateRows',
    'gridAutoRows',
    'gridRow',
    'gridRowStart',
    'gridRowEnd',
    'transform',
    'transformOrigin',
    'scale',
    'rotate',
    'translate',
    'skew',
    'transitionProperty',
    'transitionTimingFunction',
    'transitionDuration',
    'transitionDelay',
    'animation',
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
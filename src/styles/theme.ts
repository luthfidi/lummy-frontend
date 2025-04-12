import { extendTheme } from '@chakra-ui/react';

// Lummy theme colors - refined for better UI friendliness
const colors = {
  lummy: {
    pink: '#FF9EC3', // Slightly deeper for better contrast
    purple: '#A78BFA', // More vibrant purple
    mint: '#88D7B0', // Softer mint
    blue: '#90CDF4', // Softer blue
    gray: '#F7F7FB', // Very light gray for backgrounds
    dark: '#333333', // Dark text
    // Additional colors
    success: '#38A169', // Standard green for better visibility
    warning: '#DD6B20', // Standard orange
    error: '#E53E3E', // Standard red
  },
};

// Typography
const fonts = {
  heading: '"Quicksand", sans-serif',
  body: '"Inter", sans-serif',
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'full',
    },
    variants: {
      primary: {
        bg: 'purple.500',
        color: 'white',
        _hover: {
          bg: 'purple.600',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
      },
      secondary: {
        bg: 'pink.400',
        color: 'white',
        _hover: {
          bg: 'pink.500',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'purple.500',
        color: 'purple.500',
        _hover: {
          bg: 'purple.50',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Card: {
    baseStyle: {
      p: 4,
      borderRadius: 'lg',
      bg: 'white',
      boxShadow: 'sm',
      transition: 'all 0.3s ease',
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      px: 2,
      py: 1,
      fontWeight: 'medium',
    },
  },
};

// Create the theme
const theme = extendTheme({
  colors,
  fonts,
  components,
  styles: {
    global: {
      body: {
        bg: 'lummy.gray',
        color: 'gray.800',
      },
    },
  },
});

export default theme;
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Nunito Sans', sans-serif`,
    body: `'Nunito Sans', sans-serif`
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "1px"
        }
      }
    },
    Button: {
      baseStyle: {
        borderRadius: '0'
      },
      variants: {
        'navbutton': {
          height: "4.5rem",
          position: "relative",
          color: "white",

          _hover: {
            transform: "translateY(-5px)"
          },
        },
        'darkblue': {
          borderRadius: "1px",
          color: "white",
          background: "#041C45"
        }
      },
    }
  }
})

export default theme
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: { _focus: { boxShadow: 'none' } },
		},
	},
	styles: {
		global: {
			'*': {
				fontFamily:
					' -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
			},
		},
	},
})

export default MyApp

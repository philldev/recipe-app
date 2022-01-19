import { chakra, Flex, FlexProps } from '@chakra-ui/react'
import Head from 'next/head'

export const Layout = ({
	title = 'Home',
	...props
}: FlexProps & { title?: string }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Flex flexDir='column' w='100%' minH='100vh' {...props}>
				{props.children}
			</Flex>
		</>
	)
}

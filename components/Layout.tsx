import { Flex, FlexProps } from '@chakra-ui/react'
import Head from 'next/head'

export const Layout = ({ ...props }: FlexProps) => {
	return (
		<>
			<Head>
				<title>RecipeApp</title>
			</Head>
			<Flex
				bg='gray.50'
				flexDir='column'
				w='100%'
				minH='100vh'
				py='4'
				{...props}
			>
				{props.children}
			</Flex>
		</>
	)
}

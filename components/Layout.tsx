import {
	Box,
	Container,
	Flex,
	FlexProps,
	HStack,
	Icon,
	IconButton,
	Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { FiUser } from 'react-icons/fi'
import { GoBook } from 'react-icons/go'
import NextLink from '../helpers/next-link'

export const Layout = ({
	title = 'Home',
	...props
}: FlexProps & {
	title?: string
	rightToolbar?: ReactNode
	hideHeader?: boolean
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Flex flexDir='column' w='100%' minH='100vh' {...props}>
				{!props.hideHeader && (
					<Box borderBottomWidth='1px'>
						<Container maxW='container.xl'>
							<Flex
								py='2'
								justifyContent='space-between'
								alignItems='center'
								w='100%'
							>
								<HStack spacing='4'>
									<NextLink href='/' passHref>
										<HStack cursor='pointer'>
											<Icon as={GoBook} />
											<Text fontSize='sm'>Recipe App</Text>
										</HStack>
									</NextLink>
								</HStack>
								<HStack>
									{props.rightToolbar}
									<IconButton
										aria-label='User'
										title='User'
										icon={<Icon as={FiUser} />}
										variant='ghost'
									/>
								</HStack>
							</Flex>
						</Container>
					</Box>
				)}
				{props.children}
			</Flex>
		</>
	)
}

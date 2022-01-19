import { Button, Container, Flex, Icon, IconButton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FiPlus } from 'react-icons/fi'
import { Layout } from '../components/Layout'
import NextLink from '../helpers/next-link'

const Home: NextPage = () => {
	return (
		<Layout
			title='Recipe App'
			rightToolbar={
				<NextLink passHref href='/recipes/new'>
					<IconButton
						aria-label='User'
						title='User'
						icon={<Icon as={FiPlus} />}
						variant='ghost'
					/>
				</NextLink>
			}
		>
			<Container>
				<Flex py='4' flexDir='column'></Flex>
			</Container>
		</Layout>
	)
}

export default Home

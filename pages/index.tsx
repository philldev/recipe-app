import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	IconButton,
	List,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FiPlus } from 'react-icons/fi'
import { Layout } from '../components/Layout'
import { useRecipes } from '../context/recipes'
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
				<Flex py='4' flexDir='column'>
					<RecipesList />
				</Flex>
			</Container>
		</Layout>
	)
}

const RecipesList = () => {
	const { items } = useRecipes()
	return (
		<Box>
			<Heading mb='4'>Recipes</Heading>
			<VStack alignItems='stretch'>
				{items?.map((item) => (
					<Flex p='4' rounded='md' bg='white' shadow='sm' key={item.id}>
						<Flex w='14' h='14' flexShrink='0' mr='2' bg='gray.200'></Flex>
						<Text fontSize='sm' fontWeight='bold' flex='1'>
							{item.title}
						</Text>
					</Flex>
				))}
			</VStack>
			{items?.length === 0 && <Text color='gray.500'>No Recipes Found!</Text>}
		</Box>
	)
}

export default Home

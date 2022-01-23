import {
	Button,
	Container,
	Flex,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { useRecipes } from '../context/recipes'

const Home: NextPage = () => {
	return (
		<Layout>
			<Container py='4'>
				<Flex mb='4' alignItems='center' justifyContent='space-between'>
					<Heading>Recipes</Heading>
					<Button colorScheme='purple'>Create Recipe</Button>
				</Flex>
				<RecipesList />
			</Container>
		</Layout>
	)
}

const RecipesList = () => {
	const { items } = useRecipes()
	return (
		<>
			<VStack alignItems='stretch'>
				{items?.map((item) => (
					<Link passHref href={`/recipes/${item.id}`} key={item.id}>
						<Flex
							borderWidth='1px'
							p='4'
							rounded='md'
							bg='white'
							shadow='sm'
							key={item.id}
						>
							<Flex w='14' h='14' flexShrink='0' mr='2' bg='gray.200'></Flex>
							<Text fontSize='sm' fontWeight='bold' flex='1'>
								{item.title}
							</Text>
						</Flex>
					</Link>
				))}
			</VStack>
			{items?.length === 0 && <Text color='gray.500'>No Recipes Found!</Text>}
		</>
	)
}

export default Home

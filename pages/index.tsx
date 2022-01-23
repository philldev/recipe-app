import {
	Button,
	chakra,
	Container,
	Divider,
	Flex,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { useRecipes } from '../context/recipes'

const Home: NextPage = () => {
	return (
		<Layout>
			<Container bg='white' shadow='md' rounded='xl' py='4'>
				<Flex alignItems='center' justifyContent='space-between'>
					<Text fontSize='xl'>Recipes</Text>
					<Link href='/recipes/new' passHref>
						<Button as='a' colorScheme='purple'>
							Create Recipe
						</Button>
					</Link>
				</Flex>
				<Divider my='4' />
				<RecipesList />
			</Container>
		</Layout>
	)
}

const RecipesList = () => {
	const { items } = useRecipes()
	return (
		<>
			<VStack alignItems='stretch' divider={<Divider />} my='4'>
				{items?.map((item) => (
					<Flex key={item.id}>
						<Flex
							w='125px'
							h='125px'
							flexShrink='0'
							mr='4'
							bg='gray.200'
						></Flex>
						<Flex flexDir='column' flex='1'>
							<Text fontSize='xl' fontWeight='bold' flex='1'>
								{item.title}
							</Text>
							<Link passHref href={`/recipes/${item.id}`}>
								<chakra.a>See Detail</chakra.a>
							</Link>
						</Flex>
					</Flex>
				))}
			</VStack>
			{items?.length === 0 && <Text color='gray.500'>No Recipes Found!</Text>}
		</>
	)
}

export default Home

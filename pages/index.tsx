import {
	Box,
	Button,
	chakra,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Text,
	VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FiClock, FiUser } from 'react-icons/fi'
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
			<VStack alignItems='stretch' my='4'>
				{items?.map((item) => (
					<Flex rounded='md' borderWidth='1px' p='4' key={item.id}>
						<Flex
							w='125px'
							h='125px'
							flexShrink='0'
							mr='4'
							bg='gray.200'
						></Flex>
						<Flex flexDir='column' flex='1'>
							<Box>
								<Text noOfLines={1} fontSize='xl' fontWeight='bold'>
									{item.title}
								</Text>
							</Box>
							<Box flex='1'>
								<Text color='gray.500' noOfLines={2} fontSize='sm'>
									{item.description}
								</Text>
							</Box>
							<Flex alignItems='center' justifyContent='space-between'>
								<HStack>
									<HStack fontSize='sm' color='gray.500'>
										<Icon as={FiUser} />
										<Text>{item.authorName}</Text>
									</HStack>
									<HStack fontSize='sm' color='gray.500'>
										<Icon as={FiClock} />
										<Text>{item.time}</Text>
									</HStack>
								</HStack>
								<Link passHref href={`/recipes/${item.id}`}>
									<Button ml='auto' variant='ghost' size='sm'>
										See Detail
									</Button>
								</Link>
							</Flex>
						</Flex>
					</Flex>
				))}
			</VStack>
			{items?.length === 0 && <Text color='gray.500'>No Recipes Found!</Text>}
		</>
	)
}

export default Home

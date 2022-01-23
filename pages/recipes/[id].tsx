import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	List,
	list,
	ListItem,
	OrderedList,
	Spinner,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react'
import {
	doc,
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
	WithFieldValue,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { FiClock } from 'react-icons/fi'
import { Layout } from '../../components/Layout'
import { Recipe } from '../../models/recipe'
import { db } from '../../services/firebase'

export default function RecipePage() {
	return (
		<Layout>
			<Container mb='4'>
				<Link href='/'>Go Back</Link>
			</Container>
			<Container p='4' bg='white' shadow='md' borderWidth='1px' rounded='xl'>
				<RecipeDetail />
			</Container>
		</Layout>
	)
}

const RecipeDetail = () => {
	const router = useRouter()
	const converter = useMemo(
		() => ({
			toFirestore(recipe: WithFieldValue<Omit<Recipe, 'id'>>): DocumentData {
				return recipe
			},
			fromFirestore(
				snapshot: QueryDocumentSnapshot,
				options: SnapshotOptions
			): Recipe {
				const data = snapshot.data(options)!
				return {
					id: snapshot.id,
					...(data as Omit<Recipe, 'id'>),
				}
			},
		}),
		[]
	)
	const [data, isLoading] = useDocumentData<Recipe>(
		doc(db, 'recipes', router.query.id as string).withConverter(converter)
	)

	if (isLoading || !data) return <Spinner />
	return (
		<>
			<Flex flexDir='column'>
				<Heading mb='4'>{data.title}</Heading>
				<HStack divider={<Divider orientation='vertical' h='5' />}>
					<Text>By {data.authorName}</Text>
					<HStack>
						<Icon as={FiClock} />
						<Text>{data.time}</Text>
					</HStack>
				</HStack>
				<Divider my='4' />
				<VStack spacing='4' alignItems='stretch'>
					<Flex>
						<Flex
							flexShrink='0'
							w='125px'
							h='125px'
							bg='gray.300'
							rounded='md'
							mr='4'
						></Flex>
						<Text fontSize='sm' color='gray.600'>
							{data.description}
							{!data.description && 'No Description'}
						</Text>
					</Flex>
					<Flex>
						<Box flexShrink='0' w='35%'>
							<Text mb='2' fontWeight='bold'>
								Ingredients
							</Text>
							<UnorderedList alignItems='stretch'>
								{data.ingredients.map((ing, index) => (
									<ListItem key={index}>
										<Text>{ing.text}</Text>
									</ListItem>
								))}
							</UnorderedList>
						</Box>
						<Box flex='1'>
							<Text mb='2' fontWeight='bold'>
								Steps
							</Text>
							<OrderedList alignItems='stretch'>
								{data.ingredients.map((ing, index) => (
									<ListItem key={index}>
										<Text>{ing.text}</Text>
									</ListItem>
								))}
							</OrderedList>
						</Box>
					</Flex>
				</VStack>
			</Flex>
		</>
	)
}

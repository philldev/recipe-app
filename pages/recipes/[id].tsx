import { Box, Container, Heading, Spinner } from '@chakra-ui/react'
import {
	doc,
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
	WithFieldValue,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Layout } from '../../components/Layout'
import { Recipe } from '../../models/recipe'
import { db } from '../../services/firebase'

export default function RecipePage() {
	return (
		<Layout>
			<Container p='4'>
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
		<Box>
			<Heading>{data.title}</Heading>
		</Box>
	)
}

import { Container, Divider, Spinner, Text } from '@chakra-ui/react'
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
import { Layout } from '../../../components/Layout'
import { RecipeForm } from '../../../components/RecipeForm'
import { Recipe } from '../../../models/recipe'
import { db } from '../../../services/firebase'

const EditRecipePage = () => {
	const router = useRouter()

	const id = router.query.id

	if (typeof id !== 'string') return null

	return (
		<Layout>
			<Container mb='4'>
				<Link href='/'>Go back</Link>
			</Container>
			<EditRecipe id={id} />
		</Layout>
	)
}

const EditRecipe = (props: { id: string }) => {
	const id = props.id
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
	const [recipe, isLoading] = useDocumentData<Recipe>(
		doc(db, 'recipes', id).withConverter(converter)
	)
	if (isLoading || !recipe) return <Spinner />
	return (
		<Container
			borderWidth='1px'
			bg='white'
			rounded='md'
			shadow='md'
			pos='relative'
			py='4'
		>
			<Text fontSize='2xl' fontWeight='bold'>
				Edit Recipe
			</Text>
			<Divider my='4' />
			<RecipeForm
				recipe={recipe}
				onSuccess={() => {
					router.replace('/')
				}}
			/>
		</Container>
	)
}

export default EditRecipePage

import { Container, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { RecipeForm } from '../../components/RecipeForm'

const NewRecipe = () => {
	const router = useRouter()
	return (
		<Layout title='New Recipe'>
			<Container pos='relative' maxW='container.md' py='4'>
				<Flex justifyContent='space-between' alignItems='center' mb='4'>
					<Heading>Create Recipe</Heading>
					<Link href='/'>Go back</Link>
				</Flex>
				<RecipeForm
					onSuccess={() => {
						router.replace('/')
					}}
				/>
			</Container>
		</Layout>
	)
}

export default NewRecipe

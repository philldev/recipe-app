import { Container, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { RecipeForm } from '../../components/RecipeForm'

const NewRecipe = () => {
	const router = useRouter()
	return (
		<Layout>
			<Container mb='4'>
				<Link href='/'>Go back</Link>
			</Container>
			<Container
				borderWidth='1px'
				bg='white'
				rounded='md'
				shadow='md'
				pos='relative'
				py='4'
			>
				<Text fontSize='2xl' fontWeight='bold'>
					Create Recipe
				</Text>
				<Divider my='4' />
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

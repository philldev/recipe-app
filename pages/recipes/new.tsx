import {
	Box,
	Container,
	Flex,
	HStack,
	Icon,
	IconButton,
	Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FiChevronLeft } from 'react-icons/fi'
import { Layout } from '../../components/Layout'
import { RecipeForm } from '../../components/RecipeForm'
import NextLink from '../../helpers/next-link'

const NewRecipe = () => {
	const router = useRouter()
	return (
		<Layout hideHeader title='New Recipe'>
			<Box borderBottomWidth='1px'>
				<Container maxW='container.xl'>
					<Flex
						py='2'
						justifyContent='space-between'
						alignItems='center'
						w='100%'
					>
						<HStack spacing='4'>
							<NextLink href='/' passHref>
								<IconButton
									aria-label='User'
									title='User'
									icon={<Icon as={FiChevronLeft} />}
									variant='ghost'
								/>
							</NextLink>
							<Text>New Recipe</Text>
						</HStack>
					</Flex>
				</Container>
			</Box>
			<Container pos='relative' maxW='container.xl' py='4'>
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

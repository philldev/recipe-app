import {
	Box,
	Container,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Text,
} from '@chakra-ui/react'
import { FiChevronLeft, FiUser } from 'react-icons/fi'
import { GoBook } from 'react-icons/go'
import { Layout } from '../../components/Layout'
import NextLink from '../../helpers/next-link'

const NewRecipe = () => {
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
			<Container maxW='container.xl' py='4'></Container>
		</Layout>
	)
}

export default NewRecipe

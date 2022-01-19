import { Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
	return (
		<Layout title='NEXT TEMPLATE'>
			<Heading textAlign='center'>PHILLDEV NEXT TEMPLATE</Heading>
		</Layout>
	)
}

export default Home

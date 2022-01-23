import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Input,
	Text,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import * as y from 'yup'
import { useRecipes } from '../context/recipes'
import { Recipe } from '../models/recipe'

type RecipeFormData = Omit<
	Recipe,
	'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'author'
>

const schema = y
	.object({
		title: y.string().required(),
		description: y.string(),
		time: y.string().required(),
		ingredients: y
			.array(
				y.object({
					text: y.string().required('This field cannot be empty'),
				})
			)
			.min(1)
			.required(),
		steps: y
			.array(
				y.object({
					text: y.string().required(),
				})
			)
			.min(1)
			.required(),
		imageUrl: y.string().url(),
	})
	.required()

export const RecipeForm = (props: {
	onSuccess: () => void
	recipe?: Recipe
}) => {
	const isEditing = props.recipe !== undefined
	const form = useForm<RecipeFormData>({
		defaultValues: {
			ingredients: [],
		},
		resolver: yupResolver(schema),
	})
	const ingredientsFieldArray = useFieldArray<RecipeFormData>({
		control: form.control,
		name: 'ingredients',
	})
	const stepsFieldArray = useFieldArray<RecipeFormData>({
		control: form.control,
		name: 'steps',
	})

	const { createRecipe, updateRecipe } = useRecipes()

	return (
		<VStack
			alignItems='stretch'
			spacing={['6', '10']}
			as='form'
			onSubmit={form.handleSubmit(async (data) => {
				if (!isEditing) {
					const author = {
						id: '1',
						name: 'John',
					}
					await createRecipe({
						...data,
						authorId: author.id,
						authorName: author.name,
					})
					props.onSuccess()
				} else {
					const updatedRecipe = {
						...props.recipe!,
						...data,
					}
					await updateRecipe(updatedRecipe)
					props.onSuccess()
				}
			})}
		>
			<Flex flexDir={['column', 'row']}>
				<Text w={['full', '200px']} fontSize='lg' mb='4' fontWeight='bold'>
					Recipe Info
				</Text>
				<VStack flex={['auto', '1']} alignItems='stretch'>
					<FormControl isInvalid={Boolean(form.formState.errors.title)}>
						<FormLabel>Name</FormLabel>
						<Input {...form.register('title')} />
						<FormErrorMessage>
							{form.formState.errors.title?.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(form.formState.errors.description)}>
						<FormLabel>Description</FormLabel>
						<Textarea {...form.register('description')} />
						<FormErrorMessage>
							{form.formState.errors.description?.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(form.formState.errors.time)}>
						<FormLabel>Time Required</FormLabel>
						<Input placeholder='60 Mnt' {...form.register('time')} />
						<FormErrorMessage>
							{form.formState.errors.time?.message}
						</FormErrorMessage>
					</FormControl>
				</VStack>
			</Flex>
			<Flex flexDir={['column', 'row']}>
				<HStack h='max-content' w={['full', '200px']} mb='4'>
					<Text fontSize='lg' fontWeight='bold'>
						Ingredients
					</Text>
					<Button
						size='xs'
						onClick={async () => {
							const valid = await form.trigger(
								`ingredients.${
									ingredientsFieldArray.fields.length - 1 ?? 0
								}.text`
							)

							if (valid) {
								ingredientsFieldArray.append({})
							}
						}}
					>
						Add
					</Button>
				</HStack>
				<FormControl
					flex={['auto', '1']}
					isInvalid={Boolean(form.formState.errors.ingredients)}
				>
					<VStack alignItems='stretch'>
						{ingredientsFieldArray.fields.map((field, index) => (
							<FormControl
								key={field.id}
								isInvalid={Boolean(
									form.formState.errors.ingredients?.[index]?.text?.message
								)}
							>
								<Flex alignItems='center'>
									<Input
										mr='2'
										placeholder='Ingredient Name & qty'
										{...form.register(`ingredients.${index}.text` as const, {
											required: true,
										})}
									/>
									<IconButton
										aria-label='Delete'
										icon={<Icon as={FiX} />}
										variant='ghost'
										onClick={() => {
											ingredientsFieldArray.remove(index)
										}}
									/>
								</Flex>
								<FormErrorMessage>
									{form.formState.errors.ingredients?.[index]?.text?.message}
								</FormErrorMessage>
							</FormControl>
						))}
					</VStack>
					<FormErrorMessage>
						{(form.formState.errors.ingredients as any)?.message}
					</FormErrorMessage>
				</FormControl>
			</Flex>
			<Flex flexDir={['column', 'row']}>
				<HStack w={['full', '200px']} h='max-content' mb='4'>
					<Text fontSize='lg' fontWeight='bold'>
						Steps
					</Text>
					<Button
						size='xs'
						onClick={async () => {
							const valid = await form.trigger(
								`steps.${ingredientsFieldArray.fields.length - 1 ?? 0}.text`
							)
							if (valid) {
								stepsFieldArray.append({})
							}
						}}
					>
						Add
					</Button>
				</HStack>
				<FormControl
					flex={['auto', '1']}
					isInvalid={Boolean(form.formState.errors.steps)}
				>
					<VStack alignItems='stretch'>
						{stepsFieldArray.fields.map((field, index) => (
							<FormControl
								key={field.id}
								isInvalid={Boolean(
									form.formState.errors.steps?.[index]?.text?.message
								)}
							>
								<FormLabel>Step {index + 1}</FormLabel>
								<Flex alignItems='center'>
									<Textarea
										mr='2'
										resize='none'
										placeholder=''
										{...form.register(`steps.${index}.text` as const, {
											required: true,
										})}
									/>
									<IconButton
										aria-label='Delete'
										icon={<Icon as={FiX} />}
										variant='ghost'
										onClick={() => {
											stepsFieldArray.remove(index)
										}}
									/>
								</Flex>
								<FormErrorMessage>
									{form.formState.errors.steps?.[index]?.text?.message}
								</FormErrorMessage>
							</FormControl>
						))}
					</VStack>
					<FormErrorMessage>
						{(form.formState.errors.steps as any)?.message}
					</FormErrorMessage>
				</FormControl>
			</Flex>
			<HStack justifyContent='flex-end'>
				<Button type='submit'>Create Recipe 🎉</Button>
			</HStack>
		</VStack>
	)
}

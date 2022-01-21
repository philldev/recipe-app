import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import * as y from 'yup'
import { Recipe } from '../models/recipe'

type RecipeFormData = Omit<
	Recipe,
	'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'author'
>

const schema = y
	.object({
		difficulty: y.string().required(),
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

export const RecipeForm = () => {
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

	console.log(form.formState.errors)

	return (
		<VStack
			bg='white'
			p='4'
			rounded='md'
			shadow='sm'
			maxW='container.md'
			mx='auto'
			alignItems='stretch'
			spacing={['6', '10']}
			as='form'
			onSubmit={form.handleSubmit((data) => {
				console.log(data)
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

					<FormControl isInvalid={Boolean(form.formState.errors.difficulty)}>
						<FormLabel>Difficulty</FormLabel>
						<RadioGroup
							value={form.watch('difficulty')}
							onChange={(val) => form.setValue('difficulty', val)}
						>
							<Stack>
								<Radio value='easy'>Easy</Radio>
								<Radio value='medium'>Medium</Radio>
								<Radio value='hard'>Hard</Radio>
							</Stack>
						</RadioGroup>
						<FormErrorMessage>
							{form.formState.errors.difficulty?.message}
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

						{ingredientsFieldArray.fields.length === 0 && (
							<FormHelperText>
								Please add atleast one ingredients
							</FormHelperText>
						)}
					</VStack>
					<FormErrorMessage>
						{form.formState.errors.ingredients &&
							'Please add atleast one ingredients'}
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
						{stepsFieldArray.fields.length === 0 && (
							<FormHelperText>Please add atleast one step</FormHelperText>
						)}
					</VStack>
					<FormErrorMessage>
						{form.formState.errors.steps &&
							'Please add atleast one ingredients'}
					</FormErrorMessage>
				</FormControl>
			</Flex>
			<HStack justifyContent='flex-end'>
				<Button type='submit'>Create Recipe 🎉</Button>
			</HStack>
		</VStack>
	)
}

export interface Recipe {
	id: string
	authorId: string
	authorName: string
	title: string
	time: string
	ingredients: Array<{ text: string }>
	steps: Array<{ text: string }>
	createdAt: string
	updatedAt: string

	description?: string
	difficulty?: string
	imageURL?: string
}

export interface Recipe {
	id: string
	authorId: string
	authorName: string
	title: string
	description?: string
	time: string
	difficulty: string
	ingredients: Array<{ text: string }>
	steps: Array<{ text: string }>
	createdAt: string
	updatedAt: string
	imageURL: string
}

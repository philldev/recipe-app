export interface Recipe {
	id: string
	authorId: string
	authorName: string
	title: string
	description: string
	time: string
	ingredients: string
	steps: Array<string>
	createdAt: string
	updatedAt: string
}

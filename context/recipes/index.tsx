import { nanoid } from 'nanoid'
import { createContext, FC, useContext } from 'react'
import useLocalStorage from '../../hooks/use-local-storage'
import { Recipe } from '../../models/recipe'

interface RecipesContextValue {
	items: Recipe[]
	createRecipe: (Recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void
	updateRecipe: (Recipe: Recipe) => void
	deleteRecipe: (Recipe: Recipe) => void
}

const RecipesContext = createContext<RecipesContextValue | null>(null)

export const RecipesProvider: FC = (props) => {
	const [items, setItems] = useLocalStorage<Recipe[]>(
		'sample-apps__recipes',
		[]
	)

	console.log(items)

	const createRecipe: RecipesContextValue['createRecipe'] = (item) => {
		const newItem = {
			...item,
			id: nanoid(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}
		setItems((p) => {
			return [...p, newItem]
		})
	}

	const updateRecipe: RecipesContextValue['updateRecipe'] = (item) => {
		const itemId = item.id
		const updatedItem = {
			...item,
			updatedAt: new Date().toISOString(),
		}
		setItems((p) => {
			return p.map((prevItem) =>
				prevItem.id === itemId ? updatedItem : prevItem
			)
		})
	}

	const deleteRecipe: RecipesContextValue['deleteRecipe'] = (item) => {
		const itemId = item.id
		setItems((p) => {
			return p.filter((prevItem) => prevItem.id !== itemId)
		})
	}

	return (
		<RecipesContext.Provider
			value={{
				items,
				createRecipe,
				updateRecipe,
				deleteRecipe,
			}}
		>
			{props.children}
		</RecipesContext.Provider>
	)
}

export const useRecipes = () => {
	let ctx = useContext(RecipesContext)
	if (!ctx) throw new Error('Context missing')
	return ctx
}

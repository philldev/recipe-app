import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	query,
	QueryDocumentSnapshot,
	setDoc,
	SnapshotOptions,
	WithFieldValue,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { createContext, FC, useContext, useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Recipe } from '../../models/recipe'
import { db } from '../../services/firebase'

interface RecipesContextValue {
	items?: Recipe[]
	createRecipe: (
		Recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
	) => Promise<void>
	updateRecipe: (Recipe: Recipe) => Promise<void>
	deleteRecipe: (Recipe: Recipe) => Promise<void>
}

const RecipesContext = createContext<RecipesContextValue | null>(null)

export const RecipesProvider: FC = (props) => {
	const converter = useMemo(
		() => ({
			toFirestore(recipe: WithFieldValue<Omit<Recipe, 'id'>>): DocumentData {
				return recipe
			},
			fromFirestore(
				snapshot: QueryDocumentSnapshot,
				options: SnapshotOptions
			): Recipe {
				const data = snapshot.data(options)!
				return {
					id: snapshot.id,
					...(data as Omit<Recipe, 'id'>),
				}
			},
		}),
		[]
	)
	const [items, isLoading] = useCollectionData<Recipe>(
		query<Recipe>(collection(db, 'recipes').withConverter<Recipe>(converter))
	)

	const createRecipe: RecipesContextValue['createRecipe'] = async (item) => {
		const newItem = {
			...item,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}

		await addDoc(collection(db, 'recipes'), newItem)
	}

	const updateRecipe: RecipesContextValue['updateRecipe'] = async (item) => {
		const itemId = item.id
		const updatedItem = {
			...item,
			updatedAt: new Date().toISOString(),
		}
		await setDoc(doc(db, 'recipes', itemId), updatedItem, { merge: true })
	}

	const deleteRecipe: RecipesContextValue['deleteRecipe'] = async (item) => {
		const itemId = item.id
		await deleteDoc(doc(db, 'recipes', itemId))
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

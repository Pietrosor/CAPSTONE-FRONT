export interface Exercise {
  id: string
  name: string
  force: string
  level: string
  mechanic: string
  equipment: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  category: string
  images: string[]
}

const URL =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"

export async function fetchAllExercises(): Promise<Exercise[]> {
  const res = await fetch(URL)
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export async function fetchExerciseById(id: string): Promise<Exercise> {
  const all = await fetchAllExercises()
  const found = all.find((e) => e.id === id)
  if (!found) throw new Error("Exercise not found")
  return found
}

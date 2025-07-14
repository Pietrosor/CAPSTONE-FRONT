import { useState, useEffect } from "react"
import { fetchAllExercises } from "../services/exerciseDB"
import type { Exercise } from "../services/exerciseDB"

export function useExerciseSearch(query: string) {
  const [all, setAll] = useState<Exercise[]>([])
  const [results, setResults] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchAllExercises()
      .then((data) => setAll(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!query.trim()) return setResults([])
    const id = setTimeout(() => {
      const filtered = all.filter((e) =>
        e.name.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 20))
    }, 300)
    return () => clearTimeout(id)
  }, [query, all])

  return { results, loading }
}

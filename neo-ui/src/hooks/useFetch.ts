import { useState, useEffect, useCallback, useRef } from 'react'

type UseFetchResult<T> = {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<T | void>
}

export default function useFetch<T = any>(url?: string | null, options?: RequestInit, deps: any[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (overrideUrl?: string) => {
    const finalUrl = overrideUrl ?? url
    if (!finalUrl) return

    // Abort any previous
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(finalUrl, { signal: controller.signal, ...(options || {}) })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      const json = await res.json()
      setData(json)
      return json
    } catch (err: any) {
      if (err?.name === 'AbortError') return
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [url, JSON.stringify(options), ...deps])

  useEffect(() => {
    if (!url) return
    fetchData()
    return () => {
      controllerRef.current?.abort()
    }
  }, [url, fetchData])

  const refetch = useCallback(() => fetchData(), [fetchData])

  return { data, loading, error, refetch }
}

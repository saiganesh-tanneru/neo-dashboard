import React, { useEffect } from 'react';
import './App.css';
import { NeoCard } from './components/neo-card/neo-card';
import { SearchBar } from './components/search-bar/search-bar';
import { CustomDatePicker } from './components/custom-datepicker/custom-datepicker';
import SortDropdown from './components/sort-dropdown/sort-dropdown';
import useFetch from './hooks/useFetch';

function App() {
  const { data: status, loading, error } = useFetch<Record<string, any>>('http://localhost:3000/')

  useEffect(() => {
    if (loading) return
    if (error) console.error('Error fetching status:', error)
    if (status) console.log('Server status:', status)
  }, [status, loading, error])

  const data = {
    name: '2023 AB',
    size: 123,
    closenessToEarth: 456,
    relativeVelocity: 789
  }

  return (
    <div className="App">
      <SearchBar />
      <NeoCard data={data} />
    </div>
  )
}

export default App

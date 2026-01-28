import React, { useEffect } from 'react';
import './App.css';
import { NeoCard } from './components/neo-card/neo-card';
import { SearchBar } from './components/search-bar/search-bar';
import useFetch from './hooks/useFetch';

function App() {
  const { data: neoData, loading, error } = useFetch('http://localhost:3000/')

  useEffect(() => {
    if (loading) return
    if (error) console.error('Error fetching status:', error)
    if (neoData) {
      
    }
  }, [neoData, loading, error])

  return (
    <div className="App">
      <SearchBar />
      {neoData != null && neoData.items?.length > 0 && 
        neoData?.items?.map((neo: any) => (
          <NeoCard 
            key={neo.name}
            data={neo}
          />
        ))
      }
      
    </div>
  )
}

export default App

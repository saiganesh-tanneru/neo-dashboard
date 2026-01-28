import React, { useEffect } from 'react';
import './App.css';
import { NeoCard } from './components/neo-card/neo-card';
import { SearchBar } from './components/search-bar/search-bar';
import useFetch from './hooks/useFetch';
import { CustomDatePicker } from './components/custom-datepicker/custom-datepicker';
import SortDropdown from './components/sort-dropdown/sort-dropdown';
import { NeoItem, SortBy } from './models/neoModel';

function App() {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [sortOption, setSortOption] = React.useState<SortBy >(SortBy.Name);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [neoObjects, setNeoObjects] = React.useState<NeoItem[]>([]);
  
  const apiUrl = selectedDate
    ? `http://localhost:3000/?start_date=${encodeURIComponent(selectedDate)}&end_date=${encodeURIComponent(selectedDate)}`
    : null

  const { data: neoData, loading, error } = useFetch(apiUrl)

  useEffect(() => {
    if (loading || selectedDate === null) return
    if (error) console.error('Error fetching status:', error)
    if (neoData) {
      setNeoObjects([...neoData.items]);
    }
  }, [neoData, loading, error, selectedDate])

  const onDateSelect = (date: Date | null): void => {
    setSelectedDate(date ? date.toISOString().split('T')[0] : null);
    setSearchQuery('');
    setNeoObjects([]);
    setSortOption(SortBy.Name); // Reset sort option to default
  }

  const onSearch = (query: string): void => {
    setSearchQuery(query);
    const filteredNeoObjects = neoData?.items?.filter((neo: any) => 
      neo.name.toLowerCase().includes(query.toLowerCase())
    );
    setNeoObjects([...filteredNeoObjects]);
  }

  const onSelectSort = (value: string): void => {
    const sortValue = (Object.values(SortBy) as string[]).includes(value) ? (value as SortBy): SortBy.Name
    setSortOption(sortValue)

    const sortedNeoObjects = [...neoObjects]
    switch (sortValue) {
      case SortBy.Name:
        sortedNeoObjects.sort((a, b) => a.name.localeCompare(b.name))
        break
      case SortBy.Size:
        sortedNeoObjects.sort((a, b) => (a.estimatedDiameterKm.max ?? 0) - (b.estimatedDiameterKm.max ?? 0))
        break
      case SortBy.ClosenessToEarth:
        sortedNeoObjects.sort((a, b) => {
          const aCloseApproach = a.closeApproach?.missDistanceKm ?? Number.POSITIVE_INFINITY
          const bCloseApproach = b.closeApproach?.missDistanceKm ?? Number.POSITIVE_INFINITY
          return aCloseApproach - bCloseApproach
        })
        break
      case SortBy.RelativeVelocity:
        sortedNeoObjects.sort((a, b) => {
          const aVelocity = a.closeApproach?.relativeVelocityKph ?? Number.POSITIVE_INFINITY
          const bVelocity = b.closeApproach?.relativeVelocityKph ?? Number.POSITIVE_INFINITY
          return aVelocity - bVelocity
        })
        break
      default:
        break
    }

    setNeoObjects([...sortedNeoObjects])
  }


  return (
    <div className="App">
      <CustomDatePicker onSubmit={onDateSelect} />
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        }}>
        <SearchBar value={searchQuery} onSearch={onSearch} />
        <SortDropdown value={sortOption}  onSelect={onSelectSort} />
      </div>
      {neoObjects?.length > 0 && 
        neoObjects.map((neo: any) => (
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

'use client'

import { useState } from 'react'

export type GenreType = {
  id: number
  name: string
}

type GenreProps = { 
  genres: GenreType[]
  selectedId?: number
}

export default function Genre({ genres, selectedId}: GenreProps) {
  const [genreId, setGenreId] = useState(selectedId)

  return (
    <>
      <label className='sm:text-end'>Genre:</label>
      <select name='genre_id' value={genreId} required onChange={e => setGenreId(Number(e.target.value))}>
        <option>----- select -----</option>
        {genres && genres.map((genre: GenreType) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </>
  )
}
const baseUrl = process.env.BASE_URL

export async function authorsCount() {
  const resp = await fetch(`${baseUrl}/api/authors`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch authors count')
  }
  return resp.headers.get('x-result-count')
}

export async function booksCount() {
  const resp = await fetch(`${baseUrl}/api/books`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch books count')
  }
  return resp.headers.get('x-result-count')
}

export async function copiesCount() {
  const resp = await fetch(`${baseUrl}/api/copies`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch book copies count')
  }
  return resp.headers.get('x-result-count')
}

export async function availableCopiesCount() {
  const resp = await fetch(`${baseUrl}/api/copies/available`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch available book copies count')
  }
  return resp.headers.get('x-result-count')
}

export async function genresCount() {
  const resp = await fetch(`${baseUrl}/api/genres`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch genres count')
  }
  return resp.headers.get('x-result-count')
}

export async function getAuthors() {
  const resp = await fetch(`${baseUrl}/api/authors`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch authors')
  }

  const authors = await resp.json()
  return authors
}

export async function getGenres() {
  const resp = await fetch(`${baseUrl}/api/genres`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch genres')
  }

  const genres = await resp.json()
  return genres
}

export async function getBooks() {
  const resp = await fetch(`${baseUrl}/api/books`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch books')
  }

  const books = await resp.json()
  return books
}

export async function getBookCopies() {
  const resp = await fetch(`${baseUrl}/api/copies`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch books')
  }

  const copies = await resp.json()
  return copies
}

export async function getAuthor(id: number) {
  const resp = await fetch(`${baseUrl}/api/authors/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Author')
  }

  const author = await resp.json()
  return author
}

export async function getBook(id: number) {
  const resp = await fetch(`${baseUrl}/api/books/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Book')
  }

  const book = await resp.json()
  return book
}

export async function getGenre(id: number) {
  const resp = await fetch(`${baseUrl}/api/genres/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Genre')
  }

  const genre = await resp.json()
  return genre
}

export async function getBookCopy(id: number) {
  const resp = await fetch(`${baseUrl}/api/copies/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch BookCopy')
  }

  const bookCopy = await resp.json()
  return bookCopy
}

export function getBookCopyStatuses() {
  return [
    "NotAvailable", // 0
    "OnOrder",      // 1
    "InTransit",    // 2
    "OnHold",       // 3
    "OnLoan",       // 4
    "InLibrary"     // 5
  ]
}
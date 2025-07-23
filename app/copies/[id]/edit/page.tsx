import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getBooks, getBookCopy } from "@/app/lib/api"
import Book from '@/app/components/book'
import BookCopyStatus from '@/app/components/status'

export default async function UpdateBookCopyForm({params}: {params: {id: number;}}) {
  const id = params.id
  const bookCopy = await getBookCopy(id)
  console.log('bookCopy:', bookCopy)

  const dueDate = bookCopy.due_date?.split('T')[0]

  const books = await getBooks()

  async function updateBookCopy(formData: FormData) {
    'use server'

    const baseUrl = process.env.BASE_URL

    const str = formData.get('due_date') as string // can be ''
    const dueDate = str ? new Date(str) : null

    const payload = {
      book_id: parseInt(formData.get('book_id') as string),
      imprint: formData.get('imprint'),
      due_date: dueDate,
      status: parseInt(formData.get('status') as string)
    }
    console.log('payload:', payload)

    const resp = await fetch(`${baseUrl}/api/copies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!resp.ok) {
      console.log('status:', resp.status, 'statusText:', resp.statusText)
      throw new Error('Failed to update BookCopy')
    }
    const bookCopy = await resp.json()
    console.log('updated bookCopy:', bookCopy)

    revalidatePath('/copies')
    redirect('/copies')
  }

  return (
    <div>
      <h1 className='text-center m-2'>Update Book Copy</h1>
      <form action={updateBookCopy}>
        <div className="grid grid-cols-2 gap-3">
          <Book books={books} selectedId={bookCopy.book.id} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required defaultValue={bookCopy.imprint} />

          <BookCopyStatus selectedId={bookCopy.status} />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" defaultValue={dueDate} />
        </div>
        <div className='text-center'>
          <button type="submit" 
          className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Update</button>
        </div>
      </form>
    </div>
  )
}
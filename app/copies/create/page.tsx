import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getBooks, createBookCopy } from "@/app/lib/api"
import Book from '@/app/components/book'
import BookCopyStatus from '@/app/components/status'

export default async function BookCopyForm() {
  const books = await getBooks()

  async function createBookCopyA(formData: FormData) {
    'use server'

    const str = formData.get('due_date') as string
    const dueDate = str ? new Date(str) : null

    const payload = {
      bookId: parseInt(formData.get('book_id') as string),
      imprint: formData.get('imprint'),
      dueBack: dueDate,
      status: parseInt(formData.get('status') as string),
      isbn: formData.get('isbn')
    }
    console.log('pyload:', payload)

    const resp = await createBookCopy(payload)

    if (!resp.ok) {
      console.log('status:', resp.status, 'statusText:', resp.statusText)
      throw new Error('Failed to create BookCopy')
    }
    const bookCopy = await resp.json()
    console.log('bookCopy:', bookCopy)

    revalidatePath('/copies')
    redirect('/copies')
  }

  return (
    <div>
      <h1 className='text-center m-2'>New Book Copy</h1>
      <form action={createBookCopyA}>
        <div className="grid grid-cols-2 gap-3">
          <Book books={books} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required />

          <BookCopyStatus />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" required />
        </div>
        <div className='text-center'>
          <button type="submit" 
          className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Create</button>
        </div>
      </form>
    </div>
  )
}
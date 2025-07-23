import Link from "next/link"
import { getBooks } from "@/app/lib/api"
import type { BookType } from "@/app/components/book"

export default async function Books() {

  const books = await getBooks()

  return (
    <>
      <div className="flex justify-between pt-2">
        <h1 className="ml-2">Book List</h1>
        <Link href="/books/create" className="rounded-md bg-cyan-500 text-white hover:bg-blue-500 mr-2 p-2">New Book</Link>
      </div>
      <div className="grid justify-items-center">
        <ul>
          {books && books.map((book: BookType) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`} className="hover:text-blue-500">{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
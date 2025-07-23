import Link from "next/link"
import { getAuthors } from "@/app/lib/api"
import type { AuthorType } from "@/app/components/author"

export default async function Authors() {
  const authors = await getAuthors()

  return (
    <>
      <div className="flex justify-between pt-2">
        <h1 className="ml-2">Author List</h1>
        <Link href="/authors/create" className="rounded-md bg-cyan-500 text-white hover:bg-blue-500 mr-2 p-2">New Author</Link>
      </div>
      <div className="grid justify-items-center">
        <ul>
          {authors && authors.map((author: AuthorType) => (
            <li key={author.id}>
              <Link href={`/authors/${author.id}`} className="hover:text-blue-500">
                <span>{author.first_name}{' '}{author.family_name}</span>
              </Link>
            </li>
          ))}
        </ul>
    </div>
    </>
  )
}
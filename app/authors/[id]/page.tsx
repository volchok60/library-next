import Link from "next/link"
import { getAuthor } from "@/app/lib/api"
import FormattedDate from '@/app/components/date'

type Params = Promise<{ id: number }>

export default async function AuthorDetails(props: { params: Params }) { 
  const params = await props.params 
  const id = params.id
  const author = await getAuthor(id)
  console.log('author:', author)
  
  const birthDate = author.birth_date ? author.birth_date.split('T')[0] : undefined
  const deathDate = author.death_date?.split("T")[0]

  return (
    <>
      <h1 className='text-center m-2'>Author Details</h1>
      <div>
        <p className="mb-2">
          <span className="underline">
            {author.first_name}{' '}{author.family_name}
          </span>
          <span> ( </span>
          {birthDate && <FormattedDate dateString={birthDate} />}
          <span> - </span>
          {deathDate ? (<FormattedDate dateString={deathDate} />) : ('Alive')}
          <span> ) </span>
        </p>
        <p>
          {author.life_span}
        </p>
      </div>
      <div className='text-center'>
        <Link href={`/authors/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
      </div>
    </>
  )
}
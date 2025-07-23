import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAuthor, updateAuthor } from "@/app/lib/api"

type Params = Promise<{ id: number }>

export default async function UpdateAuthorForm(props: { params: Params }) {
  const params = await props.params
  const id = Number(params.id)
  const author = await getAuthor(id)
  console.log('author:', author)

  const birthDate = author.birth_date ? author.birth_date.split('T')[0] : ''
  const deathDate = author.death_date?.split('T')[0]

  async function updateAuthorA(formData: FormData) {
    'use server'

    const birthDate = new Date(formData.get('birth_date') as string)
    const str = formData.get('death_date') as string // can be ''
    const deathDate = str ? new Date(str) : null

    const payload = {
      firstName: formData.get('first_name'),
      familyName: formData.get('family_name'),
      birthDate: birthDate,
      deathDate: deathDate,
      lifeSpan: formData.get('life_span')
    }
    console.log('payload:', payload)

    const resp = await updateAuthor(id, payload)

    if (!resp.ok) {
      console.log('status:', resp.status, 'statusText:', resp.statusText)
      throw new Error('Failed to update Author')
    }
    const author = await resp.json()
    console.log('updated author:', author)

    revalidatePath('/authors')
    redirect('/authors')
  }
  
  return (
    <div>
      <h1 className='text-center m-2'>Update Author</h1>
      <form action={updateAuthorA}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>First Name:</label>
          <input type="text" name="first_name" required defaultValue={author.first_name} />
          
          <label className='sm:text-end'>Family Name:</label>
          <input type="text" name="family_name" required defaultValue={author.family_name} />
          
          <label className='sm:text-end'>Birth Date:</label>
          <input type="date" name="birth_date" required defaultValue={birthDate} />
          
          <label className='sm:text-end'>Death Date:</label>
          <input type="date" name="death_date" defaultValue={deathDate} />
          
          <label className='sm:text-end'>Life Span:</label>
          <textarea name='life_span' rows={20} cols={50} required defaultValue={author.life_span ?? ''} />
        </div>
        <div className='text-center'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
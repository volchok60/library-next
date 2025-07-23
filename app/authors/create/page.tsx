import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAuthor } from "@/app/lib/api"

export default async function AuthorForm() {

  async function createAuthorA(formData: FormData) {
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

    const resp = await createAuthor(payload)

    if (!resp.ok) {
      console.log('status:', resp.status, 'statusText:', resp.statusText)
      throw new Error('Failed to create Author')
    }
    const author = await resp.json()
    console.log('created author:', author)

    revalidatePath('/authors')
    redirect('/authors')
  }
  return (
    <div>
      <h1 className='text-center m-2'>New Author</h1>
      <form action={createAuthorA}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>First Name:</label>
          <input type="text" name="first_name" required />

          <label className='sm:text-end'>Family Name:</label>
          <input type="text" name="family_name" required />

          <label className='sm:text-end'>Birth Date:</label>
          <input type="date" name="birth_date" required />

          <label className='sm:text-end'>Death Date:</label>
          <input type="date" name="death_date" />

          <label className='sm:text-end'>Life Span:</label>
          <textarea name='life_span' rows={20} cols={50} required />
        </div>
        <div className='text-center'>
          <button type="submit" 
          className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Create</button>
        </div>
      </form>
    </div>
  )
}
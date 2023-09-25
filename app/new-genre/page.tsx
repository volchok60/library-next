import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function GenreForm() {

  async function createGenre(formData: FormData) {
    'use server'

    const baseUrl = process.env.BASE_URL

    const payload = {
      name: formData.get('name')
    }

    const resp = await fetch(`${baseUrl}/api/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!resp.ok) {
      console.log('status:', resp.status, 'statusText:', resp.statusText)
      throw new Error('Failed to create Genre')
    }
    const genre = await resp.json()

    revalidatePath('/genres')
    redirect('/genres')
  }

  return (
    <div>
      <h1 className='text-center m-2'>New Genre</h1>
      <form action={createGenre}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Name:</label>
          <input type='text' name='name' required />
        </div>
        <div className='text-center'>
          <button type="submit" 
          className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Create</button>
        </div>
      </form>
    </div>
  )
}
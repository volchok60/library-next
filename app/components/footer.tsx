import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="flex justify-center bg-teal-500 mt-2">
      <Image src="/c-circle.svg" alt="Copyright symbol" />
      <span className="ml-2">Ruthenia IT Consulting</span>
    </footer>
  )
}
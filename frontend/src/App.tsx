import { useEffect } from "react"

function App() {
  useEffect(() => {
    fetch("/api/clients").then((v) => console.log(v))
  })

  return (
    <p className='bg-red-400 text-red-500'>
      Hi!
    </p>
  )
}

export default App

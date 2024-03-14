import { useEffect } from "react"

function App() {
  useEffect(() => {
    fetch("/api/clients").then((v) => console.log(v))
  })

  return (
    <p className='text-red-500 bg-red-400'>
      Hi!
    </p>
  )
}

export default App

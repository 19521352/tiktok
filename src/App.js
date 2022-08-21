import { useState, useCallback } from 'react'
import Content from './Content'

// 1. memo() -> Higher Order Component (HOC)
// 2. useCallback()

function App() {
  const [count, setCount] = useState(0)

  const handleIncrease = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [])

  return (

    <div style={{ padding: 20 }}>
      <Content onIncrease={handleIncrease} />
      <h1>{count}</h1>

    </div >
  )

}

export default App

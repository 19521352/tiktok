import { useState } from 'react'
import Content from './Content'

// 1. memo() -> Higher Order Component (HOC)
// 2. useCallback()

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  const increase2 = () => {
    setCount2(count2 + 1)
  }

  return (

    <div style={{ padding: 20 }}>
      <Content count={count} />
      <h1>{count}</h1>
      <button onClick={increase}>Click me!</button>
      <h1>{count2}</h1>
      <button onClick={increase2}>Click me 2!</button>
    </div >
  )

}

export default App

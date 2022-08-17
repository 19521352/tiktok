import { useState } from 'react'

function App() {


  let [job, setJob] = useState('')
  const [todoList, setTodoList] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    return storageJobs ?? []
  })

  const handleTodoList = () => {
    setTodoList(prev => {
      const newJobs = [...prev, job]

      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem('jobs', jsonJobs)

      return newJobs
    })
    setJob('')
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <input
        value={job}
        onChange={e => setJob(e.target.value)}
        placeholder={job}
      />
      <button onClick={handleTodoList}>Add</button>
      <ul>
        {todoList.map((work, index) => (
          <li key={index}>{work}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

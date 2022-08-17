import { useEffect, useState } from "react";

// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback, [])
// - Chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi

// ------------
// 1. Callback luôn được gọi sau khi component mounted
// 2, Cleanup function luôn được gọi sau khi component unmounted

const tabs = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

function Content() {
  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([])
  const [type, setType] = useState('posts')
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(res => res.json())
      .then(posts => {
        setPosts(posts)
      })
  }, [type])

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200)
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (

    <div>
      <h1>width: {size.width}px, height: {size.height}px</h1>
      {tabs.map(tab => (
        <button
          key={tab}
          style={type === tab ? {
            color: '#fff',
            background: '#333'
          } : {}}
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title || post.name}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {showGoToTop && (
        <button
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20
          }}
        >
          Go to Top
        </button>
      )}
    </div>
  )
}

export default Content;
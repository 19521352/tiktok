import { useEffect, useState } from "react";

// Side effects

// Events: Add/remove event listener
// Observer pattern: Subscribe/Unsubcribe
// Closure
// Timer: setInterval, setTimeout, clearInterval, clearTimeout
// useState
// Mouted/unmounted
// ===
// Call API

/**
 * 1. Update DOM
 *  - F8 blog title
 * 2. Call API
 * 3. Listen DOM events
 *  - Scroll
 *  - Resize
 * 4. Cleanup
 *  - Remove listener/Unsubscribe
 *  - Clear timers
 */

// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback, [])
// - Chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi

// ------------
// 1. Callback luôn được gọi SAU khi component mounted
// 2. Cleanup function luôn được gọi TRƯỚC khi component unmounted
// 3. Cleanup function luôn được gọi TRƯỚC khi callback được gọi (trừ lần mounted)

const tabs = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']
const lessons = [
  {
    id: 1,
    name: 'ReactJS là gì? Tại sao nên học ReactJS'
  },
  {
    id: 2,
    name: 'SPA/MPA là gì?'
  },
  {
    id: 3,
    name: 'Arrow function'
  }

]

function Content() {

  /* Tab content */
  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([])
  const [type, setType] = useState('users')

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(res => res.json())
      .then(posts => {
        setPosts(posts)
      })
  }, [type])
  /* End Tab content */

  /* Go to top button */
  const [showGoToTop, setShowGoToTop] = useState(false)

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
  /* End Go to top button */

  /* Screen resize */
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

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
  /* End Screen resize */

  /* Timer */
  const [countdown, setCountdown] = useState(180)
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setCountdown(prevState => prevState - 1)
  //     // console.log('Countdown....')
  //   }, 1000)

  //   // Cleanup function
  //   return () => clearInterval(timerId)
  // }, [])
  /* End Timer */

  /* Preview avatar */
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    // Cleanup
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)

  }
  /* End Preview avatar */

  /* Fake Chat App */
  const [lessonId, setLessonId] = useState(1)
  useEffect(() => {
    const handleComment = ({ detail }) => {
      console.log(detail)
    }
    window.addEventListener(`lesson-${lessonId}`, handleComment)

    // Cleanup function
    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment)
    }
  }, [lessonId])
  /* End fake Chat App */


  return (

    <div>
      <div>
        <h1>Fake Chat App</h1>
        <ul>
          {lessons.map(lesson => (
            <li
              key={lesson.id}
              style={{
                color: lessonId === lesson.id ? 'red' : '#333'
              }}
              onClick={() => setLessonId(lesson.id)}
            >
              {lesson.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Preview avatar</h1>
        <input
          type='file'
          onChange={handlePreviewAvatar}
        />
        {avatar && (
          <img src={avatar.preview} alt='' width='80%' />
        )}
      </div>
      <div>
        <h1>Timer</h1>
        <h2>{countdown}</h2>
      </div>
      <div>
        <h1>Screen size</h1>
        <h2>width: {size.width}px, height: {size.height}px</h2>
      </div>
      <div>
        <h1>Content</h1>
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
      </div>

      {
        showGoToTop && (
          <button
            style={{
              position: 'fixed',
              right: 20,
              bottom: 20
            }}
          >
            Go to Top
          </button>
        )
      }
    </div >
  )
}

export default Content;
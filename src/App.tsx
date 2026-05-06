import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from './components/common/ToastContainer'
import { AppHeader } from './components/layout/AppHeader'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { UserListPage } from './pages/UserListPage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <>
      <AppHeader darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage/Homepage"
import Authpage from "./pages/Authpage/Authpage"
import PageLayout from "./Layouts/PageLayout/PageLayout"

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth' element={<Authpage />} />
    </Routes>
    </PageLayout>
  )
}

export default App

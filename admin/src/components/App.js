import Login from './Login'
import Home from './Home'
import Logout from './Logout'
import Users from './Users'
import Service from './Services'
import '../style/App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Complaints from './Complaints'
import CreatePassoword from './CreatePassword'
import Rangers from './Rangers'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<Users />} />
        <Route path="/services" element={<Service />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/rangers" element={<Rangers />} />
        <Route path="/createPassword" element={<CreatePassoword />} />
      </Routes>
    </Router>
  )
}

export default App

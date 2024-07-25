
import { Route, Router, Routes } from "react-router"
import Container from "./components/Container"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import OTP from "./pages/OTP"
import DragDrop from "./pages/DragDrop"
import DataTable from "./pages/DataTable"


function App() {
  return (
      <Routes>
        <Route path="*" element={<Container><NotFound/></Container>} />
        <Route path="/" element={<Container><Home/></Container>} />
        <Route path="/otp-form" element={<Container bg='#3F72AF' color='white'><OTP/></Container>} />
        <Route path="/course-list" element={<Container bg='#D2E3C8' color='#4F6F52'><DragDrop/></Container>} />
        <Route path="/batches" element={<Container bg='#E2BBE9' color='#444B79'><DataTable/></Container>} />
      </Routes>
  )
}

export default App

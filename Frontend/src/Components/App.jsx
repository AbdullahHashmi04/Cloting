import Footer from "./Footer"
import Navbar from "./Navbar"
import { Outlet} from "react-router-dom"

function App() {

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar/>
      <main className="flex-1 w-full pt-20">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App

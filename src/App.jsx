import './App.css'
import Todos from './compontents/Todos'
import AddTodo  from './compontents/AddTodo'


function App() {

  return (
    <>
            <h1 className="text-center text-4xl mb-8 font-bold text-yellow-100">
            Make a List of What to Do            </h1>

      <AddTodo/>
      <Todos/>
    </>
  )
}

export default App

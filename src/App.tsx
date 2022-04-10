import './App.scss';
import 'bulma/css/bulma.min.css';
import { Nav } from './Components/MainNav/Nav';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { TodoPage } from './Components/Todo/TodoPage';
import { PhotosPage } from './Components/PhotosPage/PhotoPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />}>
          <Route path=":todoId" element={<TodoPage />} />
        </Route>
        <Route path="/photos" element={<PhotosPage />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;

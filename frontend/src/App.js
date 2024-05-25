
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import DashBoard from './Pages/DashBoard';
import ManageBooks from './Pages/ManageBooks';
import UploadBooks from './Pages/UploadBooks';
import EditBook from './Pages/EditBook';
import Register from './Components/Register';
import Login from './Components/Login';
import { SnackbarProvider } from 'notistack';
import Cart from './Pages/Cart';
import Thanks from './Components/Thanks';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' Component={Home} exact />
          <Route path='/about' Component={About} />
          <Route path='/shop' Component={Shop} />
          <Route path='/admin/dashboard' Component={DashBoard} />
          <Route path='/admin/dashboard/uploadBooks' Component={UploadBooks} />
          <Route path='/admin/dashboard/manageBooks' Component={ManageBooks} />
          <Route path='/admin/dashboard/edit-books/:id' Component={EditBook} />
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
          <Route path='/cart' Component={Cart} />
          <Route path='/thanks' Component={Thanks} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

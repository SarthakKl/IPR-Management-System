import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import AdminRoutes from './routes/AdminRoutes';
import ClientRoutes from './routes/ClientRoutes';
import ReviewerRoutes from './routes/ReviewerRoutes';
import './App.scss'
import VeificationRoutes from './routes/VeificationRoutes';

function App() {
  
  return (
    //Below here /client/* means whichever route has /client in it's route, we are going
    //to render <ClientRoute/> for that. It is just another way of nested routing where
    // are not defining child routes here and rather defining it in parent component
    //that is ClientRoutes. 
    //One way is defining all the child by nesting under parent(client]reviewer/admin)
    //and using <Outlet/> for rendering child.
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<HomePage  />}/>
        <Route path = '/client/*' element = {<ClientRoutes/>}/>
        <Route path = '/reviewer/*' element = {<ReviewerRoutes/>}/>
        <Route path = '/admin/*' element = {<AdminRoutes/>}/>
        <Route path = '/verify/*' element = {<VeificationRoutes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

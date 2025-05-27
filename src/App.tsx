import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import PeoplByReactQuery from './pages/PeoplByReactQuery';
import GetPeople from './pages/GetPeople';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index:true, element: <GetPeople /> },
      { path:'people-react-query', element: <PeoplByReactQuery /> },  
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
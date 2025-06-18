import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import GetPeopleByAxios from "./pages/GetPeopleByAxios";
import GetPeoplByReactQuery from "./pages/GetPeoplByReactQuery";
import GetPeopleByReduxThunk from "./pages/GetPeopleByReduxThunk";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <GetPeopleByAxios /> },
        { path: "people-react-query", element: <GetPeoplByReactQuery /> },
        { path: "/people-redux-thunk", element: <GetPeopleByReduxThunk /> },
      ],
    },
  ],
  {
    basename: "/API-People-Task",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

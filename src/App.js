import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Homepage from './pages/homepage/Homepage'
import RiderDetails from './pages/riderDetails/RiderDetails'

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover />
      <Route path='/riders/:id' component={RiderDetails} exact />
      <Route path='/' component={Homepage} exact />
    </Router>
  );
}

export default App;

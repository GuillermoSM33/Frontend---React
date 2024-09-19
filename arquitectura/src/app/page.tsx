import View from './users/view'; 
import Add from './users/add';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Page: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path='/view' element={<View/>} />
      <Route path='/Add' element={<Add />}/>
      </Routes>
    </Router>
  );
};

export default Page;

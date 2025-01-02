import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';

import AdminAddUsers from './pages/adminPages/AdminAddUsers';
import AdminComDet from './pages/adminPages/AdminComDet';
import AdminEditEmp from './pages/adminPages/AdminEditEmp';
import AdminFileUpload from './pages/adminPages/AdminFileUpload';
import AdminEmpDets from './pages/adminPages/AdminEmpDets';

import MakerComDet from './pages/makerPages/MakerComDet';
import MakerEditEmp from './pages/makerPages/MakerEditEmp';
import MakerFileUpload from './pages/makerPages/MakerFileUpload';

import AuthComDets from './pages/authPages/AuthComDets';
import AuthEditEmp from './pages/authPages/AuthEditEmp';
import AuthFileUpload from './pages/authPages/AuthFileUpload';


function App() {

  return (
	<Router>
		<Routes>
			<Route path="/" element={<Login/>} />
            <Route path="/AdminAdd" element={<AdminAddUsers />} />
            <Route path="/AdminComDet" element={<AdminComDet />} />
            <Route path="/AdminEditEmp" element={<AdminEditEmp />} />
            <Route path="/AdminFileUpload" element={<AdminFileUpload />} />
            <Route path="/AdminEmp" element={<AdminEmpDets />} />

            <Route path="/MakerComDet" element={<MakerComDet />} />
            <Route path="/MakerEditEmp" element={<MakerEditEmp />} />
            <Route path="/MakerFileUpload" element={<MakerFileUpload />} />

            <Route path="/AuthComDet" element={<AuthComDets />} />
            <Route path="/AuthEditEmp" element={<AuthEditEmp />} />
            <Route path="/AuthFileUpload" element={<AuthFileUpload />} />
		</Routes>
	</Router>
  )
}

export default App

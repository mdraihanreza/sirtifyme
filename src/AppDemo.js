import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.green.css';
import "./assets/css/style.css";
import './assets/css/responsive.css';
import './assets/js/custom.js'


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from "./store";
import BasePage from './pages/BasePage';
import AdminBasePage from './admin/AdminBasePage';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import AdminLogin from './admin/Components/Login';
import Signup from './pages/SignupPage';
import TokenHelper from "./pages/TokenHelper";
import { RequireAuth, RequireAuthLogout } from "./admin/middleware/RequireAuth"
import { LoginAuth } from '../src/pages/LoginAuth';
import { LogoutAuth } from '../src/pages/LogoutAuth';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PersonalDetails from './pages/Profile/PersonalDetails';
import Provider from './pages/Provider';
import ProviderDetails from './pages/ProviderDetails/PersonalDetails'
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Testimonal from './pages/Testimonal';
import TestimonalDetails from './pages/TestimonalDetails';
import NotificationPage from './pages/NotificationPage';
import MyConnection from './pages/MyConnection';
import ProviderList from './admin/Components/ProviderList';
// import { LoginAuth } from './compoments/pages/LoginAuth';
// import Demo  from '../src/pages/Demo';

export const AuthContext = createContext();
var initialValue = {}

function App() {
  // console.log(" token ", TokenHelper.getToken());
  // const [tokendata, setToken] = useState(TokenHelper.getToken() ? TokenHelper.getToken() : "");
  // const [userInfo, setUserInfo] = useState(TokenHelper.getToken() ? TokenHelper.getUserInfo() : {})
  // initialValue.tokendata = tokendata;
  // initialValue.setToken = setToken;
  // initialValue.userInfo = userInfo;
  // initialValue.setUserInfo = setUserInfo;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <div className="App">
        {/* <AuthContext.Provider value={{ user: initialValue }} > */}
        <Store>
          <BrowserRouter>
            <Routes>
              <Route path='' element={<BasePage />}>
                <Route index element={<Home />} />
                <Route path='/login' element={<LogoutAuth><Login /></LogoutAuth>} />
                <Route path='/signup' element={<LogoutAuth><Signup /></LogoutAuth>} />
                <Route path='/about' element={<About />} />
                {/* <Route path='/demo' element={<Demo />} /> */}
                <Route path='/privacypolicy' element={<PrivacyPolicy />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/testimonial' element={<Testimonal />} />
                <Route path='/notification' element={<LoginAuth><NotificationPage /></LoginAuth>} />
                <Route path='/myconnection' element={<LoginAuth><MyConnection /></LoginAuth>} />
                <Route path='/testimonialDetails' element={<TestimonalDetails />} />
                <Route path='/provider' element={<Provider />} />
                <Route path="/profile" element={<LoginAuth><PersonalDetails /></LoginAuth>} />
                <Route path="/profileview" element={<LoginAuth><ProviderDetails /></LoginAuth>} />
              </Route>
              <Route path='' element={<BasePage />}></Route>
            </Routes>

            <Routes>
              <Route path='/admin'  >

                <Route index element={<RequireAuth>< AdminBasePage /></RequireAuth>} />

                <Route path='/providerlist' element={<RequireAuth>< ProviderList /></RequireAuth>}></Route>

              </Route>

              {/* <Route path='/admin/providerlist' element={<RequireAuth>< ProviderList /></RequireAuth>}></Route> */}

              <Route path='/admin/login' element={<RequireAuthLogout>< AdminLogin /></RequireAuthLogout>}></Route>
            </Routes>

          </BrowserRouter>
        </Store>
        {/* </AuthContext.Provider> */}
        {/* <Login></Login> */}
      </div>
    </>
  );
}

export default App;

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
import { SubscriptionAuth } from '../src/pages/SubscriptionAuth.jsx';
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
import Dashboard from './admin/Components/Dashboard';
// import { LoginAuth } from './compoments/pages/LoginAuth';

import PersonalDetailsPage from './admin/Components/ProviderDetails/PersonalDetails';

import AboutusPage from './admin/Components/CMS/AboutusPage';
import TestimonialPage from './admin/Components/CMS/TestimonialPage';
import TestimonialSinglePage from './admin/Components/CMS/TestimonialSingle';
import TestimonialSave from './admin/Components/CMS/TestimonialSave';
import FaqPage from './admin/Components/CMS/FaqPage';
import FaqSinglePage from './admin/Components/CMS/FaqSingle';
import FaqSave from './admin/Components/CMS/FaqSave';
import ChangePassword from './admin/Components/ChangePassword';
import NonProviderList from './admin/Components/NonProviderList';
import ContactusPage from './admin/Components/CMS/ContactusPage';
import LegalQuestion from './admin/Components/CMS/LegalQuestion';
import PrivacyPage from './admin/Components/CMS/PrivacyPage';
import NotificationListPage from './pages/NotificationListPage';
import DreamJobSave from './admin/Components/CMS/DreamJobSave';
import DreamJobSinglePage from './admin/Components/CMS/DreamJobSingle';
import DreamjobPage from './admin/Components/CMS/DreamJobPage';
import ProviderConnectionist from './admin/Components/CMS/ProviderConnectionList';
import TermsCondition from './pages/TermsCondition';
import ForgetPassword from './pages/ForgetPassword';
import OtpPage from './pages/OtpPage';
import PasswordChange from './pages/PasswordChange';
import AllConnection from './pages/AllConnection';
import Payment from './pages/Payment.jsx';
import PaymentHistory from './admin/Components/CMS/Payment History.jsx';
import Payment2 from './pages/Payment2.jsx';
import SubscriptionPackage from './pages/SubscriptionPackage.jsx';

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
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path='/otpmatch' element={<OtpPage />} />
                <Route path='/passwordreset' element={<PasswordChange />} />
                <Route path='/about' element={<About />} />
                {/* <Route path='/demo' element={<Demo />} /> */}
                <Route path='/privacypolicy' element={<PrivacyPolicy />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/testimonial' element={<Testimonal />} />
                <Route path='/payment' element={<LoginAuth><Payment /></LoginAuth>} />
                <Route path='/payment-plan' element={<LoginAuth><SubscriptionPackage /></LoginAuth>} />
                
                {/* <Route path='/payment2' element={<LoginAuth><Payment2 /></LoginAuth>} /> */}
                <Route path='/notification' element={<LoginAuth><NotificationPage /></LoginAuth>} />
                <Route path='/myconnection' element={<LoginAuth><SubscriptionAuth><MyConnection /></SubscriptionAuth></LoginAuth>} />
                <Route path='/requestlist' element={<LoginAuth><NotificationListPage /></LoginAuth>} />
                <Route path='/connectionlist' element={<LoginAuth><AllConnection /></LoginAuth>} />
                <Route path='/testimonialDetails' element={<TestimonalDetails />} />
                <Route path='/provider' element={<Provider />} />
                <Route path="/profile" element={<LoginAuth><PersonalDetails /></LoginAuth>} />
                <Route path="/profileview" element={<LoginAuth><ProviderDetails /></LoginAuth>} />
              </Route>
              <Route path='' element={<BasePage />}></Route>
            </Routes>

            <Routes>
              <Route path='/admin' element={<RequireAuth>< AdminBasePage /></RequireAuth>}  >

                <Route index element={<Dashboard />} />

                <Route path='providerlist' element={<RequireAuth>< ProviderList /></RequireAuth>}></Route>
                <Route path='providerconnlist' element={<RequireAuth>< ProviderConnectionist /></RequireAuth>}></Route>
                <Route path='paymenthistory' element={<RequireAuth>< PaymentHistory /></RequireAuth>}></Route>
                <Route path='nonproviderlist' element={<RequireAuth>< NonProviderList /></RequireAuth>}></Route>
                <Route path='providerdetails' element={<RequireAuth>< PersonalDetailsPage/></RequireAuth>}></Route>
                <Route path='about' element={<RequireAuth>< AboutusPage /></RequireAuth>}></Route>
                <Route path='addquestion' element={<RequireAuth>< LegalQuestion /></RequireAuth>}></Route>
                <Route path='privacy' element={<RequireAuth>< PrivacyPage /></RequireAuth>}></Route>
                <Route path='termscondition' element={<RequireAuth>< TermsCondition /></RequireAuth>}></Route>
                <Route path='testimonial' element={<RequireAuth>< TestimonialPage /></RequireAuth>}></Route>
                <Route path='testimonialsingle' element={<RequireAuth>< TestimonialSinglePage /></RequireAuth>}></Route>
                <Route path='testimonialsave' element={<RequireAuth>< TestimonialSave /></RequireAuth>}></Route>
                <Route path='dreamjob' element={<RequireAuth>< DreamjobPage /></RequireAuth>}></Route>
                <Route path='dreamjobsingle' element={<RequireAuth>< DreamJobSinglePage /></RequireAuth>}></Route>
                <Route path='dreamjobsave' element={<RequireAuth>< DreamJobSave /></RequireAuth>}></Route>
                <Route path='faq' element={<RequireAuth>< FaqPage /></RequireAuth>}></Route>
                <Route path='contactus' element={<RequireAuth>< ContactusPage /></RequireAuth>}></Route>
                <Route path='faqsingle' element={<RequireAuth>< FaqSinglePage /></RequireAuth>}></Route>
                <Route path='faqsave' element={<RequireAuth>< FaqSave /></RequireAuth>}></Route>
                <Route path='changepassword' element={<RequireAuth>< ChangePassword /></RequireAuth>}></Route>
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

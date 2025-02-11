import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home  from './pages/Home'
import Profile from './pages/profile'
import { createMuiTheme,ThemeProvider } from '@mui/material'
import Admin from './pages/admin';
import SignIn from './pages/SignIn';
import SignIn2 from './pages/SignInDriver';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import SignUp2 from './pages/SignUpStaff';
import SignUpM from './pages/SignUpStX';
import Location from './pages/Location';
import Notification from './pages/Notification';
import Payment from './pages/Payment';
import ShuttleService from './pages/DNotification';
import TransportBookingForm from './pages/Booking';
import Interaction from './pages/Interaction';
import SignUpM2 from './pages/SignUpSfX';
import AlarmForm from './pages/SetAlarm';
import ShuttleService2 from './pages/mapnotification';
import Schedule from './pages/Schedule';
import St from './pages/Student';
import Sta from './pages/Staff';
import Shu from './pages/Shuttles';
import Inco from './pages/Income';
import Dri from './pages/Driver';
import AdminLogin from './pages/AdminLogin';



const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#D4790E',
      light: '#FFFFFF'
    },
    secondary:{
      main: '#002147',
      light: '#5197E4',
      light2: '#88C1FF'
    }
    
    
  }
})


function App() {
  return (
  <><div>
    <ThemeProvider theme={theme}>

    {/*routings are sown on below un-comment the routing you want and proceed*/}
    
    {/* Users side routing */}

      <BrowserRouter>
        <Routes>
        <Route index element={<TransportBookingForm/>} ></Route>
        
        <Route path='/interaction' element={<Interaction/>} ></Route>
        <Route path='/signup' element={<SignUp/>} ></Route>
        <Route path='/signupM' element={<SignUpM/>} ></Route>
        <Route path='/signup2' element={<SignUp2/>} ></Route>
        <Route path='/signupM2' element={<SignUpM2/>} ></Route>
        <Route path='/signin' element={<SignIn/>} ></Route>
        <Route path='/signin2' element={<SignIn2/>} ></Route>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/profile' element={<Profile/>} ></Route>
        <Route path='/location' element={<Location/>} ></Route>
        <Route path='/notification' element={<Notification/>} ></Route>
        <Route path='/payment' element={<Payment/>} ></Route>
        <Route path='/booking' element={<TransportBookingForm/>} ></Route>
        <Route path='/setAlarm' element={<AlarmForm/>} ></Route>
        <Route path='/schedule' element={<Schedule/>} ></Route>    
        <Route path='/signin2' element={<SignIn2/>} ></Route>
        <Route path="/shuttleService/:driverID" element={<ShuttleService />} />
        <Route path='/shuttleService2/:driverID' element={<ShuttleService2/>} ></Route>  
        <Route path='/admindashboard' element={<Admin/>} ></Route>
        <Route path='/students' element={<St/>} ></Route>
        <Route path='/staff' element={<Sta/>} ></Route>
        <Route path='/shuttles' element={<Shu/>} ></Route>
        <Route path='/income' element={<Inco/>} ></Route>
        <Route path='/driver' element={<Dri/>} ></Route>     
        </Routes>
      </BrowserRouter>
     </ThemeProvider>
     </div>
     </>
     
  )
}

export default App

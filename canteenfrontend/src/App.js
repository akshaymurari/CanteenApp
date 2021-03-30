import './App.css';
import Welcome from './welcomepage/welcome';
import {Switch,Route} from 'react-router-dom';
import Register from './register/register';
import AdminLogin from './AdminLogin/AdminLogin';
import UserLogin from './UserLogin/UserLogin';
import AdminCart from './AdminCart/AdminCart';
import Canteen from './Canteen/Canteen';
import RecievedOrders from './RecievedOrders/RecievedOrders';

export const Baseurl = "http://localhost:8000";


function App() {
  return (
    <Switch>
      <Route exact path="/register" component={Register}
       />

      <Route exact path="/AdminLogin" component={AdminLogin}
       />
      
      <Route exact path="/UserLogin" component={UserLogin}
       />

      <Route exact path="/AdminCart" component={AdminCart}
      />

      <Route exact path = "/Canteen" component={Canteen} 
      />

      <Route exact path="/recievedOrders" component={RecievedOrders}
      />

      <Route exact path="/" component={Welcome}
      />

      <Route path="*" component={()=><h1>in error page</h1>} />
      

    </Switch>
  );
}

export default App;
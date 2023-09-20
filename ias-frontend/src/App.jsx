import './assets/fonts.css';
import 'tailwindcss/tailwind.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFetch } from './utils/apiRequest';
import icon from './assets/upou.png'
import uri from './uri';


/* Pages */
import Layout from './Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Inventory from './pages/inventory/Inventory';
import UserControlPage from './pages/user-control/UserControlPage';
import CreateItemPage from './pages/inventory/CreateItemPage';



/* Main function */
export default function App() {
    const [userToken,setUserToken] = useState("");
    const [userPrivileges,setUserPrivileges] = useState("");

    async function handleCallbackResponse(response) {
        
        localStorage.setItem("userToken", response.credential);
        var res = await getFetch(uri.backend + '/validate');
        console.log(res);

        if (!res) {
            localStorage.setItem('userToken',"");
            localStorage.setItem('userPrivileges','');            
        }

        if (res.success) {
            localStorage.setItem('userPrivileges',res.privilege);
        } else {
            localStorage.setItem('userToken',"");
            localStorage.setItem('userPrivileges','');
        }

        setUserToken(localStorage.getItem('userToken'));
        setUserPrivileges(localStorage.getItem('userPrivileges'));

        // Reload app
        window.location.reload(false);   
    }

    async function checkToken(){
        var res = await getFetch(uri.backend + '/validate');
        
        // ID token no longer valid
        if (!res) {
            localStorage.setItem('userToken',"");
            localStorage.setItem('userPrivileges','');            
            // Reload app
            window.location.reload(false); 
        }
    };

    useEffect(() => {
         
        /* global google */
        google.accounts.id.initialize({
            client_id: "741498866330-f8ofg25jmj7ah37c9ug2kqqe8fd0s47n.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        if (localStorage.getItem('userToken')&&localStorage.getItem('userPrivileges')) {
            checkToken();
            setUserToken(localStorage.getItem('userToken'));
            setUserPrivileges(localStorage.getItem('userPrivileges'));
        } else {
        }

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { type: "standard", theme: "outline", size: "large", shape: "rectangular", width: "350", logo_alignment: "left" }
        )

     }, []);

     return (
        userToken===""?

            // Login Page
            <div className="overflow-hidden flex w-screen h-screen bg-gray-50 items-center justify-center ">
                {/* Box container */}
                <div className="px-20 pb-14 justify-center items-center rounded-xl bg-primary-red opacity-95 shadow-xl">
                    
                    {/* UPOU Seal */}
                    <div className="flex items-center justify-center">
                        <img
                            className="w-[50%]"
                            src={icon}
                            alt="UPOU Seal"
                        />
                    </div>

                    <div className="w-full -mt-[3vh] flex items-center justify-center">
                        <div className="block">
                            {/* Description */}
                            <div className="text-center font-poppins font-medium text-highlight text-sm sm:text-lg lg:text-2xl">
                                Welcome to the<br/> UPOU Inventory Auditing System
                            </div>
                            
                            {/* Google Login Button */}
                            <div className="flex">
                                <button id="signInDiv" className="m-auto mt-[2.5vh]"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<Dashboard />} />
                        <Route exact path="/inventory" element={<Inventory />} />
                        <Route exact path="/inventory/new" element={<CreateItemPage />} />
                        <Route exact path="/user-control" element={<UserControlPage />} />
                    </Route>
                </Routes>
            </Router>
    );
    
};
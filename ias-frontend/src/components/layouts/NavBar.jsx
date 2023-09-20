import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';
import icon from '../../assets/upou.png'


/**
 * This component is used to aid user navigation and is implemented as a sidebar.
 */
const NavBar = () => {
    let navigate = useNavigate();

    const [highlight, setHighlight] = useState('Dashboard');

    // function handleLogout(){
        //navigate('/');
    // }
    
    // Function that will set the highlighting of current page in the navigation bar
    function handleRedirect(highlightStr){
        localStorage.setItem("Highlight", highlightStr);
        setHighlight(highlightStr);
    }

    // Function that toggles the menu for mobile view
    function displayMenu() {
        var menuContainer = document.getElementById("menuDiv");
        if (menuContainer.classList.contains("hidden")) {
            menuContainer.classList.remove("hidden");
        } else {
            menuContainer.classList.add("hidden");             
        }
    }

    // Styling
    const navPagesStyle = `justify-center items-center lg:justify-start flex cursor-pointer py-[1.75vw] sm:py-2 lg:py-[1.25vh] rounded-lg hover:bg-secondary-red`


    return (
        <nav className="lg:block lg:w-[13vw] lg:px-[0.5vw] lg:h-screen lg:top-0 lg:fixed overflow-hidden bg-primary-red text-sidebar-text">

            {/* Header for mobile view */}
            <div className="lg:hidden shadow pl-3 pr-2 flex w-full justify-between h-12 sm:h-14">

                {/* Hamburger Menu */}
                <button type="button" className="lg:hidden" onClick={displayMenu}>
                    <MenuIcon className="w-7" />
                </button>

                {/* App Name */}
                <span className="text-[3.85vw] sm:text-2xl pl-[4vw] self-center font-poppins font-medium lg:hidden">
                    Inventory Auditing System
                </span>

                {/* App Icon */}
                <img className="lg:hidden" src={icon} alt="UPOU Seal" />
            </div>

            {/* Sidebar Menu for desktop view */}
            <div id="menuDiv" className="hidden py-[3vw] px-[3vw] lg:block lg:p-0 lg:bg-transparent w-full">

                {/* UPOU Seal */}
                <img className="hidden mx-auto lg:block lg:p-[0.5vw]" src={icon} alt="UPOU Seal" />

                {/* Navigation Pages */}
                <div className="block space-y-[1.75vw] sm:space-y-2 lg:space-y-[1.25vh] text-[3.8vw] sm:text-xl lg:text-[1.15vw] font-poppins font-medium">

                    {/* Dashboard */}
                    <div onClick={() => { handleRedirect("Dashboard");  navigate('/') }} className={`lg:pl-[0.9vw] ${navPagesStyle}`}>
                        <svg className="w-[5.5vw] sm:w-7 lg:w-[1.5vw] mr-[3vw] sm:mr-3 lg:mr-[0.75vw]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`${highlight==="Dashboard"?"#FDF384":"#E5E5E5"}`} d="M27.5 15.8333C27.3904 15.8339 27.2816 15.8129 27.1801 15.7715C27.0786 15.73 26.9862 15.6689 26.9084 15.5916L15 3.67498L3.09169 15.5916C2.93227 15.7282 2.72721 15.7995 2.51748 15.7914C2.30775 15.7833 2.1088 15.6964 1.96039 15.5479C1.81197 15.3995 1.72503 15.2006 1.71693 14.9909C1.70883 14.7811 1.78017 14.5761 1.91669 14.4166L14.4167 1.91664C14.5728 1.76143 14.784 1.67432 15.0042 1.67432C15.2243 1.67432 15.4356 1.76143 15.5917 1.91664L28.0917 14.4166C28.2064 14.5336 28.284 14.6818 28.3149 14.8427C28.3459 15.0036 28.3287 15.17 28.2655 15.3211C28.2024 15.4723 28.0961 15.6015 27.96 15.6926C27.8238 15.7837 27.6638 15.8326 27.5 15.8333V15.8333Z"/>
                            <path fill={`${highlight==="Dashboard"?"#FDF384":"#E5E5E5"}`} d="M15 6.49164L5 16.525V26.6666C5 27.1087 5.17559 27.5326 5.48816 27.8451C5.80072 28.1577 6.22464 28.3333 6.66667 28.3333H12.5V20H17.5V28.3333H23.3333C23.7754 28.3333 24.1993 28.1577 24.5118 27.8451C24.8244 27.5326 25 27.1087 25 26.6666V16.4666L15 6.49164Z" />
                        </svg>
                        <div className={`${highlight==="Dashboard"?"text-highlight":""}`}>Dashboard</div>
                    </div>
                    
                    {/* Inventory */}
                    <div onClick={() => {handleRedirect("Inventory");  navigate('/inventory') }} className={`lg:pl-[1.1vw] ${navPagesStyle}`}>
                        <svg className="w-[5vw] sm:w-6 lg:w-[1.25vw] mr-[4vw] sm:mr-4 lg:mr-[0.9vw]" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`${highlight==="Inventory"?"#FDF384":"#E5E5E5"}`} fillRule="evenodd" clipRule="evenodd" d="M13.8889 0H25V11.1111H13.8889V0ZM16.6667 2.77778H22.2222V8.33333H16.6667V2.77778Z" />
                            <path fill={`${highlight==="Inventory"?"#FDF384":"#E5E5E5"}`} fillRule="evenodd" clipRule="evenodd" d="M19.4444 25V13.8889H11.1111V5.55556H0V25H19.4444ZM8.33333 8.33333H2.77778V13.8889H8.33333V8.33333ZM2.77778 22.2222L2.77778 16.6667H8.33333V22.2222H2.77778ZM11.1111 22.2222V16.6667H16.6667V22.2222H11.1111Z" />
                        </svg>
                        <div className={`${highlight==="Inventory"?"text-highlight":""}`}>Inventory</div>
                    </div> 

                    {/* User Control */}
                    {
                        localStorage.getItem('userPrivileges') === "Admin" ?
                            <>
                                <div onClick={() => {handleRedirect("User Control");  navigate('/user-control') }} className={`lg:pl-[0.85vw] ${navPagesStyle}`}>
                                    <svg className="w-[5.5vw] sm:w-7 lg:w-[1.5vw] mr-[3vw] sm:mr-3 lg:mr-[0.85vw]" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill={`${highlight==="User Control"?"#FDF384":"#E5E5E5"}`}
                                            d="M28.125 23C28.125 23 30 23 30 21.0833C30 19.1667 28.125 13.4167 20.625 13.4167C13.125 13.4167 11.25 19.1667 11.25 21.0833C11.25 23 13.125 23 13.125 23H28.125ZM13.1662 21.0833C13.1524 21.0814 13.1386 21.0788 13.125 21.0757C13.1269 20.5697 13.4381 19.1015 14.55 17.779C15.585 16.5389 17.4037 15.3333 20.625 15.3333C23.8444 15.3333 25.6631 16.5408 26.7 17.779C27.8119 19.1015 28.1213 20.5716 28.125 21.0757L28.11 21.0795C28.1013 21.081 28.0925 21.0823 28.0837 21.0833H13.1662ZM20.625 9.58333C21.6196 9.58333 22.5734 9.17947 23.2766 8.46058C23.9799 7.74169 24.375 6.76666 24.375 5.75C24.375 4.73334 23.9799 3.75831 23.2766 3.03942C22.5734 2.32053 21.6196 1.91667 20.625 1.91667C19.6304 1.91667 18.6766 2.32053 17.9734 3.03942C17.2701 3.75831 16.875 4.73334 16.875 5.75C16.875 6.76666 17.2701 7.74169 17.9734 8.46058C18.6766 9.17947 19.6304 9.58333 20.625 9.58333ZM26.25 5.75C26.25 6.5051 26.1045 7.25281 25.8218 7.95043C25.5391 8.64805 25.1248 9.28193 24.6025 9.81586C24.0801 10.3498 23.4601 10.7733 22.7776 11.0623C22.0951 11.3513 21.3637 11.5 20.625 11.5C19.8863 11.5 19.1549 11.3513 18.4724 11.0623C17.7899 10.7733 17.1699 10.3498 16.6475 9.81586C16.1252 9.28193 15.7109 8.64805 15.4282 7.95043C15.1455 7.25281 15 
                                            6.5051 15 5.75C15 4.22501 15.5926 2.76247 16.6475 1.68414C17.7024 0.605802 19.1332 0 20.625 0C22.1168 0 23.5476 0.605802 24.6025 1.68414C25.6574 2.76247 26.25 4.22501 26.25 5.75ZM13.005 13.9533C12.255 13.7119 11.4818 13.5532 10.6987 13.4799C10.2587 13.4371 9.81699 13.416 9.375 13.4167C1.875 13.4167 0 19.1667 0 21.0833C0 22.3617 0.624375 23 1.875 23H9.78C9.50204 22.4016 9.36342 21.7456 9.375 21.0833C9.375 19.1475 10.0819 17.1695 11.4188 15.5173C11.8744 14.9538 12.405 14.4267 13.005 13.9533ZM9.225 15.3333C8.11529 17.0378 7.51583 19.036 7.5 21.0833H1.875C1.875 20.585 2.1825 19.1092 3.3 17.779C4.32188 16.56 6.0975 15.3717 9.225 15.3353V15.3333ZM2.8125 6.70833C2.8125 5.18334 3.40513 3.7208 4.46002 2.64247C5.51492 1.56414 6.94566 0.958333 8.4375 0.958333C9.92934 0.958333 11.3601 1.56414 12.415 2.64247C13.4699 3.7208 14.0625 5.18334 14.0625 6.70833C14.0625 8.23333 13.4699 9.69586 12.415 10.7742C11.3601 11.8525 9.92934 12.4583 8.4375 12.4583C6.94566 12.4583 5.51492 11.8525 4.46002 10.7742C3.40513 9.69586 2.8125 8.23333 2.8125 6.70833ZM8.4375 2.875C7.44294 2.875 6.48911 3.27887 5.78585 3.99776C5.08259 4.71665 4.6875 5.69167 4.6875 6.70833C4.6875 7.725 5.08259 8.70002 5.78585 9.41891C6.48911 10.1378 7.44294 
                                            10.5417 8.4375 10.5417C9.43206 10.5417 10.3859 10.1378 11.0892 9.41891C11.7924 8.70002 12.1875 7.725 12.1875 6.70833C12.1875 5.69167 11.7924 4.71665 11.0892 3.99776C10.3859 3.27887 9.43206 2.875 8.4375 2.875Z"/>
                                    </svg>
                                    <div className={`${highlight==="User Control"?"text-highlight":"text-sidebar-text"}`}>User Control</div>
                                </div>
                            </>
                        :  <></>
                    } 
                </div>

                {/* Logout */}
                <div className={`mt-[1.75vw] sm:mt-2 lg:mt-0 lg:pl-[1vw] text-[3.75vw] sm:text-xl lg:text-[1.15vw] lg:bottom-12 lg:inset-x-[0.75vw] lg:absolute ${navPagesStyle}`}>
                    <svg className="w-[4.5vw] sm:w-6 lg:w-[1.25vw] mr-[4vw] sm:mr-4 lg:mr-[1.5vw]" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E5E5E5" d="M3.94737 20H6.57895V22.5H22.3684V2.5H6.57895V5H3.94737V1.25C3.94737 0.918479 4.086 0.600537 4.33275 0.366116C4.57951 0.131696 4.91419 0 5.26316 0H23.6842C24.0332 0 24.3679 0.131696 24.6146 0.366116C24.8614 0.600537 25 0.918479 25 1.25V23.75C25 24.0815 24.8614 24.3995 24.6146 24.6339C24.3679 24.8683 24.0332 25 23.6842 25H5.26316C4.91419 25 4.57951 24.8683 4.33275 24.6339C4.086 24.3995 3.94737 24.0815 3.94737 23.75V20ZM6.57895 11.25H15.7895V13.75H6.57895V17.5L0 12.5L6.57895 7.5V11.25Z"/>
                    </svg>
                    <div onClick={()=>{
                        localStorage.setItem("userToken","");
                        localStorage.setItem("userPrivileges","");
                        window.location.reload(false);                        
                    }} className="font-poppins font-medium text-sidebar-text">Logout</div>
                </div>
            </div>
        </nav>
    );
}


export default NavBar;
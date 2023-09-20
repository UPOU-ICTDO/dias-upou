import Statistics from './statistics/Statistics';
import Notifications from './notifications/Notifications';


/**
 * This component is the page for the user's dashboard.
 */
const Dashboard = () => {
    return (
        <div className="bg-gray-50 lg:w-[85.75vw] lg:absolute lg:top-0 lg:right-0 pb-20 lg:pb-0">
            <div className="px-[4vw] py-[5vw] sm:py-8 lg:py-[2vw] text-[5.1vw] sm:text-3xl lg:text-[1.85vw] font-montserrat font-bold">
                DASHBOARD
            </div>
            <div className="px-[6vw]">
                <Statistics />
            </div>
            <div className="mx-[4.5vw] mr-[6vw] mt-[10vw] sm:mt-14 lg:my-0 p-[3.35vw] lg:p-[1.5vw] border shadow-lg border-gray-300 rounded-xl">
                <Notifications />
            </div>

            {/* Nice-to-have: Footer for mobile view; not a priority to be implemented */}
        </div>
    );
};


export default Dashboard;
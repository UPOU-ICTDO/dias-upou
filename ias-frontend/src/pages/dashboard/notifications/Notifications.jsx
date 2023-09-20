import { BellIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import NotifDetails from './NotifDetails';
import Swal from 'sweetalert2';

import { getFetch } from '../../../utils/apiRequest';
import uri from './../../../uri';

/* This component displays general statistics regarding the items in the inventory. */
const Notifications = () => {
    const [notifs, setNotifs] = useState([]);

    async function fetchNotifs() {
        var data = await getFetch(uri.backend + "/inventory/report/notifications")
        if (data){
            setDisplay(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not fetch notifications',
            });
        }
    }


    // Function to update UI
    function setDisplay(data) {
        // TODO: Limit entries sa una tas gagawing infinite scroll na pwede magpindot ng load more entries
        let list = [];
            // Map out the entries returned by fetch
        if (data.length > 0) {

               data.forEach((item, index) => {
                    // console.log(item)
                    list.unshift({
                        _id: item._id,
                        deviceName: item.deviceName,
                        status: item.status,
                        category: item.category,
                        MACAddress: item.MACAddress,
                        purchaseDate: item.purchaseDate,
                        repletionDate: item.repletionDate,
                        serialNumber: item.serialNumber,
                        vendor: item.vendor,
                        currentUser: item.currentUser,
                        location: item.location,
                        office: item.office,
                        notes: item.notes,
                    });
                });

                setNotifs([...list]);
            };
        
        // console.log(currentData)
    }


    useEffect(() => {
        fetchNotifs();
    }, [])
    

    return (
        <>
            {/* Heading */}
            <div className="inline-flex items-center space-x-2 sm:space-x-3 text-[4.75vw] sm:text-2.5xl fhd:text-[1.5vw] font-montserrat font-semibold text-dark-blue">
                <BellIcon className="w-[6vw] sm:w-8 lg:w-[4vh]" />
                <span>Notifications</span>
            </div>
            
            <hr className="mt-[1vh] border-1 border-gray-300"/>
            
            {/* Contents */}
            <div className="lg:flex mx-[4vw] lg:mx-[2vw] mt-[3vh] lg:mt-[2vh] text-[2.5vh] max-h-[21vh] overflow-scroll font-montserrat font-semibold">
                <span className='w-full'>
                    {/* Mapping the list of details */}
                    {notifs.map((data, idx) => {
                        return (
                            <NotifDetails
                                key={idx}
                                icon={true}
                                data={data}
                            />
                        );
                    })}
                </span>
            </div>
        </>
    );
};


export default Notifications;
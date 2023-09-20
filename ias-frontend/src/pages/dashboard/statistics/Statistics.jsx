import { useState, useEffect } from 'react';
import { ChartSquareBarIcon } from '@heroicons/react/outline';
import uri from './../../../uri';

/* Components */
import PieChart from './PieChart';

/* Utility Functions */
import {getFetch} from '../../../utils/apiRequest';



/* This component displays general statistics regarding the items in the inventory. */
const Statistics = () => {

    const [statusLabel, setStatusLabel] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [categoryLabel, setCategoryLabel] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [total,setTotal] = useState(0);

    async function fetchStatus() {
        var body = await getFetch(uri.backend + '/inventory/report/status')
        // console.log(body)
        if (body !== undefined) {
            // body.forEach((data, dataIdx) => {
            //     // setStatusData(previousState => ({
            //     //     statusData: [...previousState, parseInt(data.count)]
            //     // }));
            //     setStatusData({
            //         arr: statusData.concat('new value')
            //     })
            //     console.log(statusData)
            //     let tempData = [...statusData]
            //     let tempLabel = [...statusLabel]
            //     let tempTotal = total
            //     console.log(tempData)
            //     tempData.push(data.count)
            //     tempLabel.push(data.name)
            //     tempTotal += parseInt(data.count)
            //     setStatusData(tempData)
            //     setStatusLabel(tempLabel)
            //     setTotal(tempTotal)
            // })
            setStatusData([parseInt(body[0].count),parseInt(body[1].count),parseInt(body[2].count),parseInt(body[3].count)]);
            setTotal([parseInt(body[0].count)+parseInt(body[1].count)+parseInt(body[2].count)+parseInt(body[3].count)]);
        }
        // console.log(statusData)
        // console.log(statusLabel)
    }

    async function fetchCategories() {
        var body = await getFetch('http://localhost:3001/inventory/report/categories')
        // console.log(body)
        if (body !== undefined) {
            setCategoryData([parseInt(body[0].count),parseInt(body[1].count),parseInt(body[2].count),parseInt(body[3].count),parseInt(body[4].count)]); 
        }
    }

    // Fetching data for the pie chart
    useEffect(() => {
        fetchCategories();
        fetchStatus();
    }, [])


    // labels for the pie charts
    const labels = [];
    const values = [];
    //console.log(statusData)

    var pieCategory = ['Computers', 'Printers', 'Scanners', 'Storage Devices', 'Networking Devices']
    var pieStatus = ['Active', 'For Replacement', 'Under Repair', 'Archived']
    return (
        <>
            {/* Heading and description */}
            <div className="w-full justify-between inline-flex text-[4.75vw] sm:text-2.5xl fhd:text-[1.5vw] font-montserrat font-semibold text-dark-blue">
                <div className="flex space-x-1 sm:space-x-3 items-center">
                    <ChartSquareBarIcon className="w-[6vw] sm:w-8 lg:w-[4.5vh]" />
                    <span>General Statistics</span>
                </div>

            </div>
            <p className="ml-[3vw] sm:ml-12 fhd:ml-[3.25vw] mt-[2vw] sm:my-3 lg:mt-[2vh] text-[3.75vw] sm:text-xl fhd:text-[1.1vw] font-inter">
                There are <u><b>{total}</b></u> items currently stored in the inventory system.
            </p>

            {/* Statistics */}
            <div className="block lg:flex mx-[5vw] my-[5.5vw] sm:my-8 lg:my-[4vh] text-[4vw] sm:text-2xl fhd:text-[1.25vw] font-montserrat font-semibold">
                
                {/* Inventory Status */}
                <div className="basis-1/2 space-y-4">
                    <span>Status Summary</span>
                    {total > 0 ? 
                        <div className="flex">
                            <div className="w-2/5 pl-[4vw] lg:pl-[1.5vw]">
                                <PieChart
                                    labels={pieStatus}
                                    chartData={statusData}
                                />
                            </div>

                            {/* Summary */}
                            <div className="pl-[7vw] lg:pl-[1.5vw] my-auto font-inter font-normal text-[3.75vw] sm:text-lg fhd:text-[1.15vw] fhd:space-y-[0.65vw]">
                                <p><b>{statusData[0]}</b> active items</p>
                                <p><b>{statusData[1]}</b> items due for replacement</p>
                                <p><b>{statusData[2]}</b> items under repair</p>
                                <p><b>{statusData[3]}</b> archived items</p>
                            </div>
                        </div>
                        :
                        <div className="h-40 flex items-center justify-center text-base font-inter font-normal">
                            Empty inventory
                        </div>
                    }
                </div>

                {/* Item Category Summary */}
                <div className="mt-[7vw] sm:mt-8 lg:mt-0 basis-1/2 space-y-4">
                    <span>Item Category Summary</span>
                    {total > 0 ?
                        <div className="flex">
                            <div className="w-2/5 pl-[4vw] lg:pl-[1.5vw]">
                                <PieChart
                                    labels={pieCategory}
                                    chartData={categoryData}
                                />
                            </div>

                            {/* Summary */}
                            <div className="pl-[7vw] lg:pl-[1.5vw] my-auto font-inter font-normal text-[3.75vw] sm:text-lg fhd:text-[1.15vw] fhd:space-y-[0.65vw]">
                                <p><b>{categoryData[0]}</b> Computers</p>
                                <p><b>{categoryData[1]}</b> Printers</p>
                                <p><b>{categoryData[2]}</b> Scanners</p>
                                <p><b>{categoryData[3]}</b> Storage Devices</p>
                                <p><b>{categoryData[4]}</b> Networking Devices</p>
                            </div>
                        </div>
                        :
                        <div className="h-40 flex items-center justify-center text-base font-inter font-normal">
                            Empty inventory
                        </div>
                    }
                </div>
            </div>
        </>
    );
};


export default Statistics;
/**
 * This file contains values to be used for the inventory and user control pages. 
 */

// --------------------------------- I N V E N T O R Y ------------------------------------

// options for status dropdown select on --edit-- item modal and --create-- item page
export const statusOptions = [
    { label:'Active',value:'Active' },
    { label:'For Replacement',value:'For Replacement' },
    { label:'Under Repair',value:'Under Repair' },
    { label:'Archived',value:'Archived' }
];


// options for main dropdown select on filters and --create-- item page
export const mainCategoryOptions = [
    { label: "Computers", value: "Computers" },
    { label: "Printers", value: "Printers" },
    { label: "Scanners", value: "Scanners" },
    { label: "Storage Devices", value: "Storage Devices" },
    { label: "Networking Devices", value: "Networking Devices" }
]


// options for subcategory dropdown select on filters and  --create-- item page
export const subcategoryOptions = [
    // Computers
    { label: "Workstations", value: "Computers_Workstations", link: "Computers" },
    { label: "Laptop", value: "Computers_MobileDevices_Laptops", link: "Computers" },
    { label: "Tablet", value: "Computers_MobileDevices_Tablets", link: "Computers" },
    { label: "Phone", value: "Computers_MobileDevices_Phones", link: "Computers" },
    { label: "Server", value: "Computers_Servers", link: "Computers" },

    // Printers
    { label: "Network Printer", value: "Printers_NetworkPrinters", link:"Printers" },
    { label: "Standalone Printer", value: "1Printers_Standalone", link:"Printers" },
    
    // Scanners
    { label: "Scanner", value: "Scanners", link: "Scanners" },

    // Storage Devices
    { label: "Network Attached Storage", value: "StorageDevices_NAS", link: "Storage Devices" },
    { label: "External Hard Drive", value: "StorageDevices_ExternalHardDrives", link: "Storage Devices" },

    // Networking Devices
    { label: "Router", value: "NetworkingDevices_Routers", link: "Networking Devices" },
    { label: "Switch", value: "NetworkingDevices_Switches", link: "Networking Devices" },
    { label: "WiFi Router", value: "NetworkingDevices_WifiRouters", link: "Networking Devices" },
    { label: "Firewall", value: "NetworkingDevices_Firewalls", link: "Networking Devices" },
]


// options for building in --edit-- item modal window and --create-- item page
export const buildingOptions = [
    { label: "HQ Building", value: "HQ Building" },
    { label: "Academic Residences", value: "Academic Residences" },
    { label: "UP Diliman DICT", value: "UP Diliman DICT" },
    { label: "TLH Left Wing", value: "TLH Left Wing" },
    { label: "TLH Right Wing", value: "TLH Right Wing" },
    { label: "CommHub", value: "CommHub" },
    { label: "CCDL", value: "CCDL" },
    { label: "Ongoing Buildings", value: "Ongoing Buildings" },
    { label: "CommHub", value: "CommHub" }
]


// options for exact location in filters, --edit-- item modal window and --create-- item page
export const locationOptions = [
    // HQ Building Locations
    { label: "OUR Office", value: "OUR Office", link: "HQ Building" },
    { label: "OUR Server Room", value: "OUR Server Room", link: "HQ Building" },
    { label: "Library Office", value: "Library Office", link: "HQ Building" },
    { label: "SPMO", value: "SPMO", link: "HQ Building" },
    { label: "Old SPMO/Stockroom", value: "Old SPMO/Stockroom", link: "HQ Building" },
    { label: "OVCFA", value: "OVCFA", link: "HQ Building" },
    { label: "Cabling Room", value: "Cabling Room", link: "HQ Building" },
    { label: "VC Office", value: "VC Office", link: "HQ Building" },
    { label: "AVR", value: "AVR", link: "HQ Building" },
    { label: "ICTDO", value: "ICTDO", link: "HQ Building" },
    { label: "Server Room", value: "Server Room", link: "HQ Building" },
    { label: "OC", value: "OC", link: "HQ Building" },
    { label: "Budget", value: "Budget", link: "HQ Building" },
    { label: "OVCAA", value: "OVCAA", link: "HQ Building" },
    { label: "Foundation Room", value: "Foundation Room", link: "HQ Building" },

    // Academic Residences Bldg. Locations
    { label: "1F Rooms", value: "1F Rooms", link:"Academic Residences" },
    { label: "1F Hallway", value: "1F Hallway", link:"Academic Residences" },
    { label: "CCTV Room", value: "CCTV Room", link:"Academic Residences" },
    { label: "Conference Room", value: "Conference Room", link:"Academic Residences" },
    { label: "2F Rooms", value: "2F Rooms", link:"Academic Residences" },
    { label: "2F Hallway", value: "2F Hallway", link:"Academic Residences" },
    { label: "3F Rooms", value: "3F Rooms", link:"Academic Residences" },
    { label: "3F Hallway", value: "3F Hallway", link: "Academic Residences" },
    
    // UP Diliman DICT Locations
    { label: "OC Office", value: "OC Office", link: "UP Diliman DICT" },
    { label: "OVCAA Office", value: "OVCAA Office", link: "UP Diliman DICT" },
    { label: "Learning Center", value: "Learning Center", link: "UP Diliman DICT" },
    { label: "MC Office", value: "MC Office", link: "UP Diliman DICT" },

    // TLH Left Wing Locations
    { label: "Inside Faculty's Room", value: "Inside Faculty's Room", link: "TLH Left Wing" },
    { label: "Common Area", value: "Common Area", link: "TLH Left Wing" },

    // TLH Right Wing Locations
    { label: "FED Office", value: "FED Office", link: "TLH Right Wing" },
    { label: "FICS Office", value: "FICS Office", link: "TLH Right Wing" },
    { label: "FMDS Office", value: "FMDS Office", link: "TLH Right Wing" },
    { label: "Conference Room", value: "Conference Room", link: "TLH Right Wing" },
    { label: "Cabling Room", value: "Cabling Room", link: "TLH Right Wing" },

    // CommHub Locations
    { label: "OSA OFfice", value: "OSA OFfice", link: "CommHub" },
    { label: "MC Office", value: "MC Office", link: "CommHub" },
    { label: "MPA Office", value: "MPA Office", link: "CommHub" },
    { label: "Cabling Room", value: "Cabling Room", link: "CommHub" },
    { label: "Sinag", value: "Sinag", link: "CommHub" },
    { label: "Training Room", value: "Training Room", link: "CommHub" },
    { label: "Hallway", value: "Hallway", link: "CommHub" },

    // CCDL
    { label: "CDMO Offices", value: "CDMO Offices", link: "CCDL" },
    { label: "Sandbox", value: "Sandbox", link: "CCDL" },
    { label: "LAMP Room", value: "LAMP Room", link: "CCDL" },
    { label: "Auditorium", value: "Auditorium", link: "CCDL" },
    { label: "1st Floor", value: "1st Floor", link: "CCDL" },
    { label: "2nd Floor", value: "2nd Floor", link: "CCDL" },
    { label: "Rooms", value: "Rooms", link: "CCDL" },

    // Ongoing Buildings
    { label: "ICC", value: "ICC" },
    { label: "World CLass Multimedia Center", value: "World CLass Multimedia Center", link: "Ongoing Buildings" },
    { label: "Near TLH Bldg.", value: "Near TLH Bldg.", link: "Ongoing Buildings" },
    { label: "IMDPO", value: "IMDPO", link: "Ongoing Buildings" },
    { label: "Oblation Hall", value: "Oblation Hall", link: "Ongoing Buildings" }
]


// options for current office in filters, --edit-- item modal window and --create-- item page
export const officeOptions = [
    {
        label: "Office of the Chancellor",
        options: [
            {
                label: "Budget Office",
                value: "Budget Office"
            },
            {
                label: "Office of Public Affairs",
                value: "Office of Public Affairs"
            },
            {
                label: "Information and Communication Technology Development Office",
                value: "Information and Communication Technology Development Office"
            },
            {
                label: "Multimedia Center",
                value: "Multimedia Center"
            },
            {
                label: "Office of Gender Concerns",
                value: "Office of Gender Concerns"
            },
            {
                label: "Office of the Legal Counsel",
                value: "Office of the Legal Counsel"
            },
            {
                label: "Office of Ugnayan ng Pahinungod",
                value: "Office of Ugnayan ng Pahinungod"
            }
        ]
    },
    {
        label: "Office of the Vice Chancellor for Academic Affairs",
        options: [
            {
                label: "Office of the University Registrar",
                value: "Office of the University Registrar"
            },
            {
                label: "Office of Academic Support and Instructional Services",
                value: "Office of Academic Support and Instructional Services"
            },
            {
                label: "Office of Student Affairs",
                value: "Office of Student Affairs"
            },
            {
                label: "University Library",
                value: "University Library"
            }
        ]
    },
    {
        label: "Office of the Vice Chancellor for Finance and Administration",
        options: [
            {
                label: "Accounting Office",
                value: "Accounting Office"
            },
            {
                label: "Campus Development and Maintenance Office",
                value: "Campus Development and Maintenance Office"
            },
            {
                label: "Cash Office",
                value: "Cash Office"
            },
            {
                label: "Human Resource and Development Office",
                value: "Human Resource and Development Office"
            },
            {
                label: "Supply and Property Management Office",
                value: "Supply and Property Management Office"
            }
        ]
    }
      {
        label: "Faculty of Study",
        options: [
            {
                label: "Faculty of Education",
                value: "Faculty of Education"
            },
            {
                label: "Faculty of Information and Communication Studies",
                value: "Faculty of Information and Communication Studies"
            },
            {
                label: "Faculty of Management and Development Studies",
                value: "Faculty of Management and Development Studies"
            }
        ]
    }
];


// item fields for --view-- item modal
export const itemFieldsView = {
    deviceName: "Device Name",
    status: "Status",
    category: "Category",
    MACAddress: "MAC Address",
    purchaseDate: "Purchase Date",
    repletionDate: "Repletion Date",
    serialNumber: "Serial Number",
    vendor: "Vendor",
    building: "Building",
    exactLocation: "Exact Location",
    office: "Current Office",
    currentUser: "Current User",
    notes: "Notes"
}


// Expected format of response from DB for inventory collection
// [
//     {
//         deviceName: "II",
//         status: "Archived",
//         category: "Computers_Workstations",
//         MACAddress: "",
//         purchaseDate: 29072021,
//         repletionDate: 29072023,
//         serialNumber: "220A4S1002886",
//         vendor: "BB",
//         currentUser: "Jenny Wilson",
//         location: "Office 9",
//         office: "Office A",
//         notes: "Sample note here"
//     },
//     {
//         deviceName: "II",
//         status: "Archived",
//         category: "Computers_Workstations",
//         MACAddress: "",
//         purchaseDate: 29072021,
//         repletionDate: 29072023,
//         serialNumber: "220A4S1002886",
//         vendor: "BB",
//         currentUser: "Jenny Wilson",
//         location: "Office 9",
//         office: "Office A",
//         notes: "Sample note here"
//     }
// ]


// --------------------------------- U S E R   C O N T R O L  ------------------------------------

// options for the access level dropdown select in add editor
export const accessLevelOptions = [
    {label:'Editor',value:'Editor'},
    {label:'Admin',value:'Admin'}
];


// Expected format of response for editors collection
// [
//     {
//         email: "jdcruz@upou.edu.ph",
//         office: "OfficeE",
//         privileges: "Editor"
//     },
//     {
//         email: "admin@upou.edu.ph",
//         office: "OfficeF",
//         privileges: "Admin"
//     }
// ]

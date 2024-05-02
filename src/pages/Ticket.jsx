import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";

const Ticket = () => {
  const columns = [
    {
      name: "Action",
      // /tickets/details/${row.id} use this to navigate to the individual detail page
      cell: (row) => (
        <Link to={`/tickets/details/${row.id}`}>{row.action}</Link>
      ),
      sortable: true,
    },
    {
      name: "Ticket Number",
      selector: (row) => row.ticketNumber,
      sortable: true,
    },
    { name: "Description", selector: (row) => row.title, sortable: true },
    { name: "Category", selector: (row) => row.title, sortable: true },
    { name: "Sub Category", selector: (row) => row.title, sortable: true },
    { name: "Created By", selector: (row) => row.title, sortable: true },
    { name: "Status", selector: (row) => row.title, sortable: true },
    { name: "Site", selector: (row) => row.title, sortable: true },
    { name: "Unit", selector: (row) => row.title, sortable: true },
    { name: "Department", selector: (row) => row.title, sortable: true },
    { name: "Admin Priority", selector: (row) => row.title, sortable: true },
    { name: "Created On", selector: (row) => row.title, sortable: true },
    { name: "Ticket Type", selector: (row) => row.title, sortable: true },
    { name: "Refrence Number", selector: (row) => row.title, sortable: true },
    { name: "Assigned To", selector: (row) => row.title, sortable: true },
    { name: "Complaint Mode", selector: (row) => row.title, sortable: true },
    { name: "Associated To", selector: (row) => row.title, sortable: true },
    {
      name: "Asset/Service Name",
      selector: (row) => row.title,
      sortable: true,
    },
    { name: "Task ID", selector: (row) => row.title, sortable: true },
    {
      name: "Proactive/Reactive",
      selector: (row) => row.title,
      sortable: true,
    },
    { name: "Review", selector: (row) => row.title, sortable: true },
    {
      name: "Response Escalation",
      selector: (row) => row.title,
      sortable: true,
    },
    { name: "Response TAT(Min)", selector: (row) => row.title, sortable: true },
    {
      name: "Response Time(D:H:M)",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Response Escalation Level",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Resolution Escalation",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Resolution TAT(Min)",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Resolution Time(D:H:M)",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Resolution Escalation Level",
      selector: (row) => row.title,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      title: "Test1",
      ticketNumber: "123",
      action: <ImEye />,
    },
    {
      id: 2,
      title: "Test2",
      ticketNumber: "1234",
      action: <ImEye />,
    },
    {
      id: 3,
      title: "Test3",
      ticketNumber: "5",
      action: <ImEye />,
    },
  ];
  useEffect(() => {
    setRecord(data);
    setSearchedRecord(data);
  }, []);

  //custom style
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
  };

  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedRecord, setSearchedRecord] = useState([]);

  const handleSearch = () => {
    const searchedValue = record.filter((row) => {
      console.log("Row ticket:", row.ticketNumber);
      return row.ticketNumber.includes(searchQuery);
    });
    setSearchedRecord(searchedValue);
    setRecord(searchedValue);
    console.log(record);
  };

  return (
    <section className="flex">
      <div className="fixed left-0 top-0 h-full">
        <Navbar />
      </div>
      <div className="sm:ml-64 ml-24 mx-10 overflow-x-auto w-[72rem] my-10 sm:my-0 h-screen flex flex-col">
        <div className="flex my-10 justify-start sm:gap-20 gap-5 sm:flex-row flex-col ">
          <div className="shadow-xl rounded-full border-4 border-green-400 w-52 px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Open Tickets</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400 w-52 px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Close Tickets</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>

          <div className="shadow-xl rounded-full border-4 border-orange-400 w-52 px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Request</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-blue-400 w-52 px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Complaint</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-yellow-400 w-52 px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Suggestion</p>
            <p className="text-center font-semibold text-lg">0</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className=" w-full flex sm:flex-row flex-col gap-10 justify-around">
            <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-2xl px-3 p-2 w-full">
              <div className="flex items-center gap-2">
                <input type="radio" id="all" name="status" />
                <label htmlFor="all" className="text-sm">
                  All
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="open" name="status" />
                <label htmlFor="open" className="text-sm">
                  Open
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="close" name="status" />
                <label htmlFor="close" className="text-sm">
                  Close
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="inprogress" name="status" />
                <label htmlFor="inprogress" className="text-sm">
                  In Progress
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="resolved" name="status" />
                <label htmlFor="resolved" className="text-sm">
                  Resolved
                </label>
              </div>
            </div>
            <Link
              to={"/tickets/create-ticket"}
              className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2 justify-center"
              onClick={() => setShowCountry(!showCountry)}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Ticket number "
                className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-24 gap-2 justify-center"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="w-[70rem] mx-auto">
            <DataTable
              responsive
              selectableRows
              columns={columns}
              data={searchedRecord}
              customStyles={customStyle}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="500px"
              selectableRowsHighlight
              highlightOnHover
              
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;

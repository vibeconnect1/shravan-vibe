import React from "react";
import BackButton from "../../../Buttons/BackButton";
import Detail from "../../../containers/Detail";

const TicketDetails = () => {
  const ticketDetails = [
    { title: "Title", description: "Description 1" },
    { title: "Created On", description: "Description " },
    { title: "Status", description: "Description " },
    { title: "Admin Priority", description: "Description " },
    { title: "Ticket No:", description: "Description " },
    { title: "Category", description: "Description " },
    { title: "Subcategory", description: "Description " },
    { title: "Reference No:", description: "Description " },
  ];
  const Creators = [
    { title: "Created By:", description: "Description 1" },
    { title: "Site:", description: "Description " },
    { title: "Department:", description: "Description " },
    { title: "Unit", description: "Description " },
  ];
  const Location = [
    { title: "Room:", description: "Description " },
    { title: "Floor:", description: "Description " },
    { title: "Building", description: "Description " },
    { title: "Region", description: "Description 1" },
    { title: "Destrict", description: "Description " },
    { title: "Zone", description: "Description " },
    { title: "City", description: "Description " },
    { title: "State", description: "Description " },
  ];
  const AdditionalInfo = [
    { title: "Assigned To:", description: "Description " },
    { title: "Proactive/Reactive:", description: "Description " },
    { title: "Service Type:", description: "Description " },
    { title: "Complaint Mode:", description: "Description 1" },
    { title: "Responsible Person:", description: "Description " },
    { title: "Correction:", description: "Description " },
    { title: "Asset/Service:", description: "Description " },
    { title: "Asset/Service Location", description: "Description " },
  ]
  const Attachments = [
    { title: "Attachment 1", description: "Description " },
    
  ]
  return (
    <div className="">
      <div className="sticky top-2">
        <BackButton to={"/tickets"} />
      </div>
      <div className="flex flex-col justify-around my-10 ">
        <div className="">
          <Detail details={ticketDetails} heading={"Ticket Details"} />
        </div>
        <div className="border m-10" />
        <div>
          <Detail details={Creators} heading={"Creator's Info"} />
        </div>
        <div className="border m-10" />
        <div className="">
          <Detail details={Location} heading={"Location Info"} />
        </div>
        <div className="border m-10" />
        <div className="">
          <Detail details={AdditionalInfo} heading={"Additional Info"} />
        </div>
        <div className="border m-10" />
        <Detail details={Attachments} heading={"Attachments"}/>
        <div className="border m-10" />
      </div>
    </div>
  );
};

export default TicketDetails;

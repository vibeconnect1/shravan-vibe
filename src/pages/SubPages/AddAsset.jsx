import React, { useEffect, useState } from "react";
import Switch from "../../Buttons/Switch";
import { checkbox } from "@material-tailwind/react";
import axios from "axios";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getSiteAsset, getSiteAssetDetails, postSiteAsset , getFloorAsset, getUnitAsset, getCategoryAsset , getGroupAsset, getVendorsAsset} from "../../api";

const AddAsset = () => {
  const buildings = getItemInLocalStorage("BUILDINGS")

  console.log("Buildings from local" ,buildings)
  const [formData, setFormData] = useState({
    site_id: buildings[0].site_id,
    building_id: "",
    floor_id: "",
    unit_id:"",
    name: "",
    serial_number: "",
    model_number: "",
    serial_number: "",
    purchase_cost: "",
    capacity: "",
    unit_name: "",
    group: "",
    subgroup: "",
    assettype: "",
    purchased_on: "",
    breakdown: false,
    critical: "",
    meterApplicable:false,
    meterType:"",
    warranty: false,
    metercategory:"",
    parentcategory:"",
    consumptionassetmeasure:"",
    unittype:"",
    min: "",
    max: "",
    belowvalue:"",
    abovevalue:"",
    multiplierfactor:"",
    checkpreviousreading:"",
    nonConsumptionAssetMeasure:"",
    nonunittype:"",
    nonmin:"",
    nonmax:"",
    nonbelowvalue:"",
    nonabovevalue:"",
    nonmultiplierfactor:"",
    noncheckprevreading:"",
    subname:"",
    subunittype:"",
    submin:"",
    submax:"",
    subbelowvalue:"",
    subabovevalue:"",
    subcheckprevreading:"",
    warranty:false,
    calenderexpiry:"",
    calendercommissioning:"",
    selectsupplier:"",
    selectmetercategory:"",
    file1:"",
    file2:"",
    file3:"",
    file4:"",
  });

  console.log(formData);

  

  const handleChange = async (e) => {




    async function fetchFloor (buildingID) {
      try{
      const res = await getFloorAsset(buildingID);
      setFloors(res.data.floors.map((item)=>{return{name : item.name , id:item.id}}));
      console.log("This is the fetch value" , res.data.floors)

      }
      catch(e){
       console.log(e)
      }
     }


     async function fetchUnit(FloorId) {
      try{
      const ans = await getUnitAsset(FloorId);
      setUnits(ans.data.units.map((item)=>{return{name : item.name , id:item.id}}));
      console.log(ans)

      }
      catch(e){
       console.log(e)
      }
     }


    if(e.target.type==="checkbox"){
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });

    }else{
      console.log("inside else" )
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    if(e.target.type==="select-one" && e.target.name==="building_id") {
      console.log("This is the handlechangr" ,e.target.type);
    console.log("This is the handlechangr" ,e.target.name);
    console.log("This is the value" , e.target.value);

      //     setFormData({
      //   ...formData,
      //   [e.target.name]: e.target.value,
      // });
      await fetchFloor(Number(e.target.value));
    }

    if(e.target.type==="select-one" && e.target.name==="floor_id") {
      await fetchUnit(Number(e.target.value));
    }

  };

   console.log("checking for form", formData)
     
    const handleSubmit = async () => {
      try {
        const response = await postSiteAsset({site_asset:formData });
        console.log('Form data submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    };

   
    const [floors , setFloors] = useState([]);
    const [units , setUnits] = useState([]);
    const [groups , setGroups] = useState([]);
    const [categorys , setCategorys] = useState([]);
    const [suppliers, setSuppliers] = useState([]);



    // async function fetchSites () {
    //   try{
    //   const {data} = await getSiteAsset();
    //   setSites(data.site_assets);
    //   console.log(data)

    //   }
    //   catch(e){
    //    console.log(e)
    //   }
    //  }









    useEffect( ()  => {

      async function fetchCategory () {
        try{
        const res = await getCategoryAsset();
        console.log("This is the fetch value" , res)
        setCategorys(res.data.categories)
        console.log("This is the fetch value" , res.data.categories)
  
        }
        catch(e){
         console.log(e)
        }
       }
       

       async function fetchGroup () {
        try{
        const res2 = await getGroupAsset();
        console.log("This is the fetch value" , res2)
        setGroups(res2.data)
        console.log("This is the fetch value" , res2.data)
  
        }
        catch(e){
         console.log(e)
        }
       }



       async function fetchSupplier () {
        try{
        const res3 = await getVendorsAsset();
        console.log("This is the fetch value" , res3)
        setSuppliers(res3.data)
        console.log("This is the fetch value" , res3.data)
  
        }
        catch(e){
         console.log(e)
        }
       }



       

       fetchCategory();
       fetchGroup();
       fetchSupplier();
    
    },[])



    
    
 

  // const [meterApplicable, setMeterApplicable] = useState(false);
  // const [meterType, setMeterType] = useState("");
  // const [warranty, setWarranty] = useState(false);

  console.log(formData);
  
  return (
    <section>
      <div className="m-2">
        <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
          Add Asset
        </h2>
        <div className="mx-20 my-5 mb-10 border border-gray-400 p-5 px-10 rounded-lg shadow-xl">
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Location Details
          </h2>
          <div className="flex sm:flex-row flex-col justify-around items-center">
            <div className="grid grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
            
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Building:
                </label>
                <select
                  id="two"
                  value={formData.building_id}
                  name="building_id"
                  onChange={handleChange}
                  className="border  p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Building</option>
                  {/* <option value="unit1">Building 1</option>
                  <option value="unit2">Building 2</option>
                  <option value="unit2">Building 3</option> */}
                  {buildings?.map(
                    building => (
                      <option onClick={()=>console.log("checking")} value={building.id}>{building.name}</option>
                    )
                  )}
                </select>
              </div>
              
              
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Floor:
                </label>
                <select
                  id="five"
                  value={formData.floor_id}
                  name="floor_id"
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Floor</option>
                  {floors?.map(
                    floor => (
                      <option value={floor.id}>{floor.name}</option>
                    )
                  )}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Unit:
                </label>
                <select
                  id="four"
                  value={formData.unit_id}
                  name="unit_id"
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Unit</option>
                  
  {units?.map(unit => (
    <option key={unit.id} value={unit.id}>{unit.name}</option>
  ))}
</select>
                  
                
              </div>
              
            </div>
          </div>
          <div className="my-5">
            <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
              Asset Info
            </h2>
            <div className="flex sm:flex-row flex-col justify-around items-center">
              <div className="grid grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="text"
                    name="name"
                    id="seven"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Asset Name "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
               
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="number"
                    name="model_number"
                    value={formData.model_number}
                    onChange={handleChange}
                    id="nine"
                    placeholder="Model Number "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="text"
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    id="ten"
                    placeholder="Serial Number "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="text"
                    name="purchase_cost"
                    value={formData.purchase_cost}
                    onChange={handleChange}
                    id="eleven"
                    placeholder="Purchase Cost "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    id="twelve"
                    placeholder="Capacity"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="" className="font-semibold">
                    Select Site:
                  </label> */}
                  <input
                    type="text"
                    name="unit_name"
                    value={formData.unit_name}
                    onChange={handleChange}
                    id="thirteen"
                    placeholder="Unit"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <select
                    id="fourteen"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Group</option>
                    {groups?.map(
                    group => (
                      <option value={group.id}>{group.name}</option>
                    )
                  )}
                  </select>
                </div>
                <div className="flex flex-col">
                  <select
                    id="fifteen"
                    name="subgroup"
                    value={formData.subgroup}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Sub Group</option>
                    <option value="unit1">Sub Group 1</option>
                    <option value="unit2">Sub Group 2</option>
                    <option value="unit2">Sub Group 3</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <select
                    id="sixteen"
                    name="assettype"
                    value={formData.assettype}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Asset Type</option>
                    <option value="unit1">Comprehensive</option>
                    <option value="unit2">Non-Comprehensive</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="" className="font-semibold">
                    Purchased Date:
                  </label>
                  <input
                    type="date"
                    name="purchased_on"
                    value={formData.purchased_on}
                    onChange={handleChange}
                    id="seventeen"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p>Breakdown</p>
                  <Switch
                   onChange={handleChange}
                   checked={formData.checked}
                   name="breakdown"
                  />
                  <p>In Use</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">Critical:</p>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="critical"
                      id="yes"
                      value="yes"
                      onClick={handleChange}
                      className="checked:accent-black"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="critical"
                      id="no"
                      value="no"
                      onClick={handleChange}
                      className="checked:accent-black"
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.meterApplicable}
                    name="meterApplicable"
                    id="meterApplicable"
                  />
                  <label htmlFor="meterApplicable">Meter Applicable</label>
                </div>
                {formData.meterApplicable && (
                  <>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">Meter Type:</p>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          name="meterType"
                          id="parent"
                          value="parent"
                          className="checked:accent-black"
                          onClick={handleChange}
                        />
                        <label htmlFor="parent">Parent</label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          name="meterType"
                          id="sub"
                          value="sub"
                          onClick={handleChange}
                          className="checked:accent-black"
                        />
                        <label
                          htmlFor="sub"
                        >
                          Sub
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {formData.meterType === "parent" && (
                  <div className="flex flex-col">
                    <select name="metercategory" value={formData.metercategory} onChange={handleChange} id="eighteen" className="border p-1 px-4 border-gray-500 rounded-md">
                      <option value="">Select Meter Category </option>
                      <option value="unit1">Meter 1</option>
                      <option value="unit2">Meter 2</option>
                      <option value="unit2">meter 3</option>
                    </select>
                  </div>
                )}
                {formData.meterType === "sub" && (
                  <select name="parentcategory" value={formData.parentcategory} onChange={handleChange}  id="nineteen"  className="border p-1 px-4 border-gray-500 rounded-md">
                    <option value="">Select Parent Category </option>
                    <option value="unit1">Parent 1</option>
                    <option value="unit2">Parent 2</option>
                    <option value="unit2">Parent 3</option>
                  </select>
                )}
              </div>
            </div>
            {formData.meterType === "parent" && (
              <>
                <div className="my-5">
                  <p className="border-b border-black font-semibold">
                    Consumption Asset Measure
                  </p>
                  <div className="grid grid-cols-4 my-5 gap-4">
                    <input
                      type="text"
                      name="consumptionassetmeasure"
                      value={formData.consumptionassetmeasure}
                      onChange={handleChange}
                      id="twenty"
                      placeholder="Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <div className="flex flex-col">
                      <select name="unittype" value={formData.unittype} onChange={handleChange} id="twentyone" className="border p-1 px-4 border-gray-500 rounded-md">
                        <option value="" className="text-gray-300">
                          Select Unit Type{" "}
                        </option>
                        <option value="unit1">Type 1</option>
                        <option value="unit2">Type 2</option>
                        <option value="unit2">Type 3</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="min"
                      value={formData.min}
                      onChange={handleChange}
                      id="twentytwo"
                      placeholder="Min"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="max"
                      value={formData.max}
                      onChange={handleChange}
                      id="twentythree"
                      placeholder="Max"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="belowvalue"
                      value={formData.belowvalue}
                      onChange={handleChange}
                      id="twentyfour"
                      placeholder="Alert Below Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="abovevalue"
                      value={formData.abovevalue}
                      onChange={handleChange}
                      id="twentyfive"
                      placeholder="Alert Above Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="multiplierfactor"
                      value={formData.multiplierfactor}
                      onChange={handleChange}
                      id="twentysix"
                      placeholder=" Multiplier Factor"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="checkpreviousreading" id="check" value="check" onChange={handleChange}  />
                      <label htmlFor=""> Check Previous Reading</label>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <p className="border-b border-black font-semibold">
                    Non Consumption Asset Measure
                  </p>
                  <div className="grid grid-cols-4 my-5 gap-4">
                    <input
                      type="text"
                      name="nonConsumptionAssetMeasure"
                      value={formData.nonConsumptionAssetMeasure}
                      onChange={handleChange}
                      id="twentyeight"
                      placeholder="Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <div className="flex flex-col">
                      <select name="nonunittype" value={formData.nonunittype} onChange={handleChange} id="twentynine" className="border p-1 px-4 border-gray-500 rounded-md">
                        <option value="" className="text-gray-300">
                          Select Unit Type{" "}
                        </option>
                        <option value="unit1">Type 1</option>
                        <option value="unit2">Type 2</option>
                        <option value="unit2">Type 3</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="nonmin"
                      value={formData.nonmin}
                      onChange={handleChange}
                      id="thirty"
                      placeholder="Min"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="nonmax"
                      value={formData.nonmax}
                      onChange={handleChange}
                      id="thirtyone"
                      placeholder="Max"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="nonbelowvalue"
                      value={formData.nonbelowvalue}
                      onChange={handleChange}
                      id="thirtytwo"
                      placeholder="Alert Below Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="nonabovevalue"
                      value={formData.nonabovevalue}
                      onChange={handleChange}
                      id="thirtythree"
                      placeholder="Alert Above Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <input
                      type="text"
                      name="nonmultiplierfactor"
                      value={formData.nonmultiplierfactor}
                      onChange={handleChange}
                      id="thirtyeight"
                      placeholder=" Multiplier Factor"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="noncheckprevreading" id="noncheck" value="noncheck"/>
                      <label htmlFor=""> Check Previous Reading</label>
                    </div>
                  </div>
                </div>
              </>
            )}
            {formData.meterType === "sub" && (
              <div className="my-5">
                <p className="border-b border-black font-semibold">
                  Consumption Asset Measure
                </p>
                <div className="grid grid-cols-4 my-5 gap-4">
                  <input
                    type="text"
                    name="subname"
                    value={formData.subname}
                    onChange={handleChange}
                    id="thirtynine"
                    placeholder="Name"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <div className="flex flex-col">
                    <select name="subunittype" value={formData.subunittype} onChange={handleChange} id="fourty" className="border p-1 px-4 border-gray-500 rounded-md">
                      <option value="" className="text-gray-300">
                        Select Unit Type{" "}
                      </option>
                      <option value="unit1">Type 1</option>
                      <option value="unit2">Type 2</option>
                      <option value="unit2">Type 3</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="submin"
                    value={formData.submin}
                    onChange={handleChange}
                    id="fourtyone"
                    placeholder="Min"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <input
                    type="text"
                    name="submax"
                    value={formData.submax}
                    onChange={handleChange}
                    id="fourtytwo"
                    placeholder="Max"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <input
                    type="text"
                    name="subbelowvalue"
                    value={formData.subbelowvalue}
                    onChange={handleChange}
                    id="fourtythree"
                    placeholder="Alert Below Value"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <input
                    type="text"
                    name="subabovevalue"
                    value={formData.subabovevalue}
                    onChange={handleChange}
                    id="fourtyfour"
                    placeholder="Alert Above Value"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="subcheckprevreading" id="subcheck" value="subcheck" />
                    <label htmlFor=""> Check Previous Reading</label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="my-5">
            <p className="border-b border-black font-semibold">
              Warranty Details
            </p>
            <div className="flex gap-4 my-2 items-center justify-between">
              <div className="flex gap-4 my-2">
                <p className="font-semibold">Under Warranty: </p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="warranty"
                    value={true}
                    id="inWarranty"
                    onClick={handleChange}
                    className="checked:accent-black"
                  />
                  <label htmlFor="inWarranty">Yes</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="warranty"
                    value={false}
                    id="notInWarranty"
                    onClick={handleChange}
                    className="checked:accent-black"
                  />
                  <label htmlFor="notInWarranty">No</label>
                </div>
              </div>

              {formData.warranty && (
                <div className="flex items-center my-2 gap-5">
                  <div className="flex items-center gap-2 ">
                    <label htmlFor="" className="font-semibold">
                      Expiry Date :
                    </label>
                    <input
                      type="date"
                      name="calenderexpiry"
                      value={formData.calender}
                      onChange={handleChange}
                      id="fourtyfive"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="" className="font-semibold">
                      Commissioning Date:
                    </label>
                    <input
                      type="date"
                      name="calendercommissioning"
                      value={formData.calendercommissioning}
                      onChange={handleChange}
                      id="fourtysix"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="my-5">
              <p className="border-b border-black font-semibold">
                Supplier Contact Details
              </p>
              <div className="flex flex-col my-2">
                <label htmlFor="" className="font-semibold">
                  Select Supplier:
                </label>
                <select name="selectsupplier" value={formData.selectsupplier} onChange={handleChange} id="fourtyseven" className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Supplier</option>
                  {suppliers?.map(
                    supplier => (
                      <option value={supplier.id}>{supplier.vendor_name}</option>
                    )
                  )}
                </select>
              </div>
              <button className="p-1 border-2 border-black px-4 rounded-md hover:bg-black hover:text-white">
                Add
              </button>
            </div>
            <div className="my-5">
              <p className="border-b border-black font-semibold">
                Meter Category Type
              </p>
              <div className="flex flex-col my-2">
                <label htmlFor="" className="font-semibold">
                  Select Meter Category:
                </label>
                <select name="selectmetercategory" value={formData.selectmetercategory} onChange={handleChange} id="fourtyeight" className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Meter Category</option>
                  {categorys?.map(
                    category => (
                      <option value={category.id}>{category.name}</option>
                    )
                  )}
                  
                </select>
              </div>
            </div>
          </div>
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Attachments
          </h2>
          <div className="flex flex-col gap-2">
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Purchase Invoice
              </p>
              <input  type="file" name="file1" id="file1" onChange={handleChange} value={formData.file1} />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Insurance Details
              </p>
              <input  type="file" name="file2" id="file2" onChange={handleChange} value={formData.file2} />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Manuals
              </p>
              <input  type="file" name="file3" id="file3" onChange={handleChange} value={formData.file3} />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Other Files
              </p>
              <input  type="file" name="file4" id="file4" onChange={handleChange} value={formData.file4} />
            </div>
          </div>
          <div className="flex gap-2 my-5 justify-end">
            <button onClick={handleSubmit} className="bg-black text-white p-2 px-4 rounded-md font-medium">
              Save & Show Details
            </button>
            <button  className=" border-black border-2  p-2 px-4 rounded-md font-medium">
              Save & Add PPM
            </button>
            <button className=" border-black border-2  p-2 px-4 rounded-md font-medium">
              Save & Create New Asset
            </button>
            <button className="border-black border-2 p-2 px-4 rounded-md font-medium">
              Save & Add AMC
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;

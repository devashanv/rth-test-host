// import React, { useState } from "react";

// const AdminAddPackage = () => {
//   const [form, setForm] = useState({
//     destination_name: "",
//     category: "Pilgrim Tour",
//     description: "",
//     includes: "",
//     excludes: "",
//     activities: "",
//     itinerary: [],
//     faq_departures: "",
//     faq_target_group: "",
//     faq_price_range: "",
//     contact_info: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const addItineraryDay = () => {
//     setForm((prev) => ({
//       ...prev,
//       itinerary: [...prev.itinerary, { day: "", activities: "" }]
//     }));
//   };

//   const handleItineraryChange = (index, field, value) => {
//     const updated = [...form.itinerary];
//     updated[index][field] = value;
//     setForm((prev) => ({ ...prev, itinerary: updated }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting package data:", form);
//     // TODO: Send form data to backend
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add New Tour Package</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="destination_name" value={form.destination_name} onChange={handleChange} placeholder="Destination Name" className="w-full border p-2 rounded" />
        
//         <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded">
//           <option>Pilgrim Tour</option>
//           <option>Adventure Tour</option>
//           <option>Leisure Tour</option>
//         </select>

//         <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description / Highlights" className="w-full border p-2 rounded" />

//         <textarea name="includes" value={form.includes} onChange={handleChange} placeholder="Includes" className="w-full border p-2 rounded" />
//         <textarea name="excludes" value={form.excludes} onChange={handleChange} placeholder="Excludes" className="w-full border p-2 rounded" />

//         <input name="activities" value={form.activities} onChange={handleChange} placeholder="Activities" className="w-full border p-2 rounded" />

//         <div>
//           <h4 className="font-semibold">Itinerary</h4>
//           {form.itinerary.map((day, index) => (
//             <div key={index} className="mb-2 space-y-1">
//               <input
//                 placeholder={`Day ${index + 1}`}
//                 value={day.day}
//                 onChange={(e) =>
//                   handleItineraryChange(index, "day", e.target.value)
//                 }
//                 className="w-full border p-1 rounded"
//               />
//               <textarea
//                 placeholder="Activities"
//                 value={day.activities}
//                 onChange={(e) =>
//                   handleItineraryChange(index, "activities", e.target.value)
//                 }
//                 className="w-full border p-1 rounded"
//               />
//             </div>
//           ))}
//           <button type="button" onClick={addItineraryDay} className="text-sm text-blue-600 underline">
//             + Add Day
//           </button>
//         </div>

//         <input name="faq_departures" value={form.faq_departures} onChange={handleChange} placeholder="Departures (e.g. Feb, Mar)" className="w-full border p-2 rounded" />
//         <input name="faq_target_group" value={form.faq_target_group} onChange={handleChange} placeholder="Groups and Family" className="w-full border p-2 rounded" />
//         <input name="faq_price_range" value={form.faq_price_range} onChange={handleChange} placeholder="Price Range" className="w-full border p-2 rounded" />

//         <input name="contact_info" value={form.contact_info} onChange={handleChange} placeholder="Contact Details" className="w-full border p-2 rounded" />

//         <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//           Save Package
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminAddPackage;








import React, { useState } from "react";

const AdminAddPackage = () => {
  const [form, setForm] = useState({
    destination_name: "",
    category: "Pilgrim Tour",
    description: "",
    includes: "",
    excludes: "",
    activities: "",
    itinerary: [],
    faq_departures: "",
    faq_target_group: "",
    faq_price_range: "",
    contact_info: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addItineraryDay = () => {
    setForm((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: "", activities: "" }]
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...form.itinerary];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, itinerary: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting package data:", form);
    // TODO: Send form data to backend
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Add New Tour Package</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="destination_name"
          value={form.destination_name}
          onChange={handleChange}
          placeholder="Destination Name"
          className="col-span-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="col-span-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          <option>Pilgrim Tour</option>
          <option>Adventure Tour</option>
          <option>Leisure Tour</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description / Highlights"
          className="col-span-full border border-gray-300 p-3 rounded-md h-24 resize-none"
        />

        <textarea
          name="includes"
          value={form.includes}
          onChange={handleChange}
          placeholder="Includes"
          className="col-span-1 border border-gray-300 p-3 rounded-md h-24 resize-none"
        />

        <textarea
          name="excludes"
          value={form.excludes}
          onChange={handleChange}
          placeholder="Excludes"
          className="col-span-1 border border-gray-300 p-3 rounded-md h-24 resize-none"
        />

        <input
          name="activities"
          value={form.activities}
          onChange={handleChange}
          placeholder="Activities"
          className="col-span-full border border-gray-300 p-3 rounded-md"
        />

        <div className="col-span-full">
          <h4 className="font-semibold text-lg text-gray-700 mb-2">Itinerary</h4>
          {form.itinerary.map((day, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder={`Day ${index + 1}`}
                value={day.day}
                onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              />
              <textarea
                placeholder="Activities"
                value={day.activities}
                onChange={(e) => handleItineraryChange(index, "activities", e.target.value)}
                className="border border-gray-300 p-2 rounded-md resize-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            + Add Day
          </button>
        </div>

        <input
          name="faq_departures"
          value={form.faq_departures}
          onChange={handleChange}
          placeholder="Departures (e.g. Feb, Mar)"
          className="col-span-full border border-gray-300 p-3 rounded-md"
        />

        <input
          name="faq_target_group"
          value={form.faq_target_group}
          onChange={handleChange}
          placeholder="Groups and Family"
          className="col-span-full border border-gray-300 p-3 rounded-md"
        />

        <input
          name="faq_price_range"
          value={form.faq_price_range}
          onChange={handleChange}
          placeholder="Price Range"
          className="col-span-full border border-gray-300 p-3 rounded-md"
        />

        <input
          name="contact_info"
          value={form.contact_info}
          onChange={handleChange}
          placeholder="Contact Details"
          className="col-span-full border border-gray-300 p-3 rounded-md"
        />

        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Save Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddPackage;

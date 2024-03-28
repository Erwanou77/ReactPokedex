import { document } from 'postcss';
import React, { useEffect, useRef, useState } from 'react';

const SelectMultiple = ({ options, onChange }) => {
    const [style, setStyle] = useState("hidden");
    const [selectedItems, setSelectedItems] = useState([]);
    const target = useRef(null);

    // Function to handle selecting an item
    const handleSelect = (itemId) => {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(id => id !== itemId)); // Deselect if already selected
      } else {
        setSelectedItems([...selectedItems, itemId]); // Select if not already selected
      }
    };
      
    return (
      <div>
        
<button id="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button" onClick={()=>setStyle(style === "hidden" ? "block" : "hidden")}>Filtre type
<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="listCheckbox" className={"z-10 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 "+style}>
    <ul ref={target} className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" >
        {options.map((value,index)=>{ return (<li key={"list"+index}>
        <div className="flex items-center" key={index}>
          <input id="checkbox-item-1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
        </div>
      </li>)})}
    </ul>
</div>

      </div>
    );
  }

export default SelectMultiple;

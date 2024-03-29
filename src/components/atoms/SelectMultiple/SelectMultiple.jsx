import { document } from 'postcss';
import React, { useEffect, useRef, useState } from 'react';

const SelectMultiple = ({ options, selected , selectedTypes}) => {
    const [style, setStyle] = useState("hidden");
    
      
    return (
      <div>
        
<button id="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2" type="button" onClick={()=>setStyle(style === "hidden" ? "block" : "hidden")}>Filtre type
<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="listCheckbox" className={"z-10 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 "+style}>
    <ul  className="p-3  text-sm text-gray-700 dark:text-gray-200" >
        {options.map((value,index)=>{ return (
        <li key={"list"+index}>
        <label className="flex items-center w-full pl-2 text-sm font-medium text-gray-900 dark:text-gray-300 gap-2 hover:bg-blue-400 py-2" key={index} htmlFor={"checkbox-item-" + index} >
          <input id={"checkbox-item-" + index} type="checkbox" checked={selectedTypes.includes(value)} 
          onChange={()=>{
            selectedTypes.includes(value) ? selected(selectedTypes.filter((e)=> e != value)): selected([...selectedTypes, value])
          }} 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          {value}
        </label>
      </li>)})}
    </ul>
</div>

      </div>
    );
  }

export default SelectMultiple;
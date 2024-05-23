'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';

export default function Home() {
  const [locationValue, setLocationValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');


  const handleLocationChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setLocationValue(e.target.value);

  };

  const handleDestinationChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDestinationValue(e.target.value);
  };


  const pageStyle = {
    
    backgroundImage: `url('/bg.png')`,   
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // Add other styles as needed
    // Add other styles as needed
  };

  const componentStyle = {
     // Set a specific background color for Component 1
    // Add other styles as needed
  };
1
  return (
    <main style={pageStyle} className="flex min-h-screen flex-col items-center justify-between p-24">
     
     <div style={ { width: 160 } } className="logo">
<Image
      src="/logoo.png"
      alt="back"
      width={180}
      height={180}  
    />  
</div>

<div className="Input1">
<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">

<input
            type="text"
            value={locationValue}
            onChange={handleLocationChange}
        
            placeholder="From..."
            className="Input1-text"
          />

  </div>
</div>


<div className="Input2">
<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">

    
<input
            type="text"
            value={destinationValue}
            onChange={handleDestinationChange}
        
            placeholder="To..."
            className="Input2-text"
          />


  </div>
</div>

<div style={ { width: 30 } } className="Button">
<div style={{ width: 350,  }} className="Button-text">

<Link href={{
    pathname: "/pages",
    query: {
      From: locationValue || undefined, // Use undefined if the value is empty
      To: destinationValue || undefined,
    },
}}>
            
<Image
      src="/direction-gauche.png"
      alt="back"
      width={40}
      height={40}
    />Search 
    </Link></div>
</div>       
    </main>
  )
}


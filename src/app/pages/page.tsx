// pages/page3.tsx (Page3)
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RootLayout, { metadata } from '@/app/layout';
import { useRouter, useSearchParams } from 'next/navigation';
import path from 'path';

const Page: React.FC = () => {
  const router = useRouter();
  const [fromValue, setFromValue] = useState<string | null>(null);
  const [toValue, setToValue] = useState<string | null>(null);
  const [busInfo, setBusInfo] = useState<any>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    // Get the values
    const from = queryParams.get('From');
    const to = queryParams.get('To');

    // Update state with the values
    setFromValue(from);
    setToValue(to);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fromValue && toValue) {
          const path = `http://192.168.43.201:8000/${fromValue}/${toValue}`;
          const response = await fetch(path);
          const responseData = await response.json();
          console.log('API Response Data:', responseData);
          setBusInfo(responseData);
        }
      } catch (error) {
        console.error('Error fetching API response:', error);
        if (error instanceof SyntaxError) {
          console.error('Invalid JSON format in the API response.');
        }
        setBusInfo('Error fetching API response');
      }
    };

    fetchData();
  }, [fromValue, toValue]);

  const pageStyle = {
    backgroundImage: `url('/bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const componentStyle = {};

  const handleButtonClick = () => {
    console.log('Button clicked');
    // Navigate to the second page
    router.push('/pages');
  }

  return (
    <main style={pageStyle} className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ width: 60 }} className="logo">
        <Image
          src="/logoo.png"
          alt="back"
          width={80}
          height={80}
        />
      </div>

      <div className="space"></div>

      <div style={componentStyle} className="BusesForYou">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-dark:border-neutral-300 hover:bg-dark:border-neutral-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <div style={{ width: 250 }} className="BusesForU-text">
            Buses for you
          </div>
        </div>
      </div>

      <div className="space"></div>

      <div className="Bus1">
        <Link href="/Pages2">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Image
              src="/autobus.png"
              alt="Bus Image"
              width={40}
              height={40}
            />
            <div style={{ width: 350 }} className="Bus1-text" >
              {busInfo ? ` Bus number : ${busInfo.nbr}, Available seats: ${busInfo.places_vacantes} ` : 'Loading...'}
            </div>
          </div>
        </Link>
      </div>

      <div className="space"></div>

      <div className="Bus2">
        <Link href="/Pages2">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <div style={{ width: 350 }} className="Bus2-text" >
              <Image
                src="/autobus.png"
                alt="Bus Image"
                width={40}
                height={40}
              />
              Bus 32   Available seats: 5
            </div>
          </div>
        </Link>
      </div>

      <div className="space"></div>

      <div className="Bus3">
        <Link href="/Pages2">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <div style={{ width: 350 }} className="Bus3-text">
              <Image
                src="/autobus.png"
                alt="Bus Image"
                width={40}
                height={40}
              />
              Bus 15  Available seats: 10
            </div>
          </div>
        </Link>
      </div>
      <div className="space"></div>
    </main>
  );
};

export default Page;

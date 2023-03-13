import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react'
import ListAddress from './ListAddress';

function LocationBox({ confirmedAddress, currentAddress } : { confirmedAddress: boolean, currentAddress: string }) {
  
  const [isLogin , setIsLogin] = React.useState<boolean>(false)
  const token = Cookies.get("token");
  //check if user has login 
  React.useEffect(() => {
    if (token) {
      setIsLogin(true)
    }
  }, [token])



  
  return (
    <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
      <div className="flex justify-between ">
        <h1 className="header1 text-lg">Delivery Location</h1>
        {isLogin ? (
          <ListAddress type="type1">Change</ListAddress>
        ) : (
          <Link href="/location-addresses">
            <span className="ml-2 text-primary-green">Change</span>
          </Link>
        )}
      </div>
      <div className="mt-2">
        {confirmedAddress ? <p>{currentAddress}</p> : "loading"}
      </div>
    </div>
  );
}

export default LocationBox
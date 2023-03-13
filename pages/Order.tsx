import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'

type OrderStatus = "diproses" | "selesai" | "menunggu_pembayaran";

type Order = {
  id: number;
  name: string;
  status: OrderStatus;
};

const orders: Order[] = [
  { id: 1, name: "Order 1", status: "diproses" },
  { id: 2, name: "Order 2", status: "selesai" },
  { id: 3, name: "Order 3", status: "menunggu_pembayaran" },
  { id: 4, name: "Order 4", status: "diproses" },
];

function Order() {
     const [activeTab, setActiveTab] = useState<OrderStatus>("diproses");
    const [paymentList, setPaymentList] = useState<any>([]);
     const filteredOrders = orders.filter(
         (order) => order.status === activeTab
         
    );

    
    // if not login redirect to /auth
    const token = Cookies.get("token");
  

    // useEffect fetch my payment list
  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/get-my-payment`)
        .then((response) => {
          setPaymentList(response.data.data)
      });
  };
   


  useEffect(() => {
    if (!token) {
      Router.push("/auth");
      }
      
      fetchData();

  }, [token]);







    
  return (
    <div className="py-16">
      <Navbar type={"type1"} />
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4   h-screen ">
        <div className="grid grid-cols-3 gap-4 w-full items-center justify-start">
          <button
            onClick={() => setActiveTab("diproses")}
            className={`${
              activeTab === "diproses"
                ? "border-primary-green text-primary-green"
                : ""
            }`}
          >
            Order Diproses
          </button>
          <button
            onClick={() => setActiveTab("selesai")}
            className={`${
              activeTab === "selesai"
                ? "border-primary-green text-primary-green"
                : ""
            }`}
          >
            Order Selesai
          </button>
          <button
            onClick={() => setActiveTab("menunggu_pembayaran")}
            className={`${
              activeTab === "menunggu_pembayaran"
                ? "border-primary-green text-primary-green"
                : ""
            }`}
          >
            Menunggu Pembayaran
          </button>
        </div>
        <div className="px-4 sm:px-4 lg:px-4 lg:py-4   ">
          {/* <ul>
            {filteredOrders.map((order) => (
              <li key={order.id}>{order.name}</li>
            ))}
          </ul> */}
                  
                  <div className='border-2 w-full rounded-md border-gray-200 py-4 px-4 '>
                      {/* // payment list */}
                      <div className='grid grid-cols-3 gap-4'>
                          {
                              paymentList.map((payment: any) => {
                                    return (
                                        <div key={payment.id} className='flex flex-col justify-center items-center'>
                                            <p className='text-sm text-gray-500'>Order ID: {payment.id}</p>
                                            <p className='text-sm text-gray-500'>Order ID: {payment.id}
                                            </p>
                                            <p className='text-sm text-gray-500'>Order ID: {payment.id}
                                            </p>
                                      </div>
                                  )
                                })
                                
                                        
                          }
                        {/* //   <div className='flex flex-col justify-center items-center'>
                        //       <p className='text-sm text-gray-500'>Order ID: 123456</p>
                        //   </div> */}
                      </div>
                      
                              
                      

        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Order
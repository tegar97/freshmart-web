import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Document() {
    

    
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Poppins:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <div className=" max-w-xl mx-auto   h-full overflow-y-auto ">
          <Main />
        </div>
        <Script
          id="googlemaps"
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&libraries=places`}
        />
        <NextScript />
      </body>
    </Html>
  );
}

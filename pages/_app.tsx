import { AppWrapper } from '@/context/AppContext';
import { CartProvider } from '@/context/CartContext';
import { UserProvider } from '@/context/UserContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <UserProvider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </UserProvider>
    </CartProvider>
  );
}

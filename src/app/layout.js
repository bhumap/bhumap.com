'use client'
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { Toaster } from "react-hot-toast";
// In app directory
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Context from "@/src/context/AuthContext";
// import {DM_Sans} from 'next/font/google'





import {QueryClientProvider,QueryClient} from 'react-query'
// import { useRouter } from "next/navigation";
const queryClient = new QueryClient();

// const DM_SansFonts = DM_Sans({ subsets: ['latin'] })



export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        
      </head>
      <body>

      <ProgressBar
        height="3px"
        color="rgb(210,103,72)"
        options={{ showSpinner: false }}
        shallowRouting
      />
      
        
          <QueryClientProvider client={queryClient}>
            <Context>
              <Navbar />
              <ToastContainer />
              <Toaster />
              <main className="min-h-[92vh]">{children}</main>
              <Footer />
            </Context>
          </QueryClientProvider>
      </body>
  </html>
  );
}

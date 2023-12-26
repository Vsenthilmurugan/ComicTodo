"use client";
import "./globals.css";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pagesWithoutHeader = ["/signIn", "/signUp"];
  const showHeader = !pagesWithoutHeader.includes(usePathname());
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Comic Todo</title>
        </head>
        <body>
        <Toaster />
          {showHeader && <Header />}
          {children}
        </body>
      </html>
    </Provider>
  );
}

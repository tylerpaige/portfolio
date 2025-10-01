import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from 'clsx'
import localFont from 'next/font/local';
import './globals.css'
 
// Font files can be colocated inside of `app`
const junicode = localFont({
  src: [
    {
      path: './media/junicode-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './media/junicode-italic-webfont.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './media/junicode-boldcondensed-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './media/junicode-bolditaliccondensed-webfont.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-serif'
})

export const metadata = {
  title: 'Tyler Paige',
  description: 'Tyler is a artist, web designer, and professor.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(
        'bg-black',
        'text-white',
        'font-serif',
        junicode.variable
      )}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-621RQ8Z30P" />
    </html>
  )
}

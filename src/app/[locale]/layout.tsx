'use client';

import '@/styles/global.css';

import { IBM_Plex_Sans_Thai } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';

import store from '@/store';
import { AppConfig } from '@/utils/AppConfig';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['200', '300', '400'],
  style: 'normal',
  subsets: ['thai'],
});

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  return (
    <html lang={props.params.locale} className={ibmPlexSansThai.className}>
      <head>
        <title>Pantip</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        />
      </head>
      <body>
        <NextIntlClientProvider locale={props.params.locale}>
          <Provider store={store}>{props.children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

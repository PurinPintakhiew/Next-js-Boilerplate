'use client';

import '@/styles/global.css';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';

import store from '@/store';
import { AppConfig } from '@/utils/AppConfig';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  return (
    <html lang={props.params.locale}>
      <head>
        <title>Pantip</title>
      </head>
      <body>
        <NextIntlClientProvider locale={props.params.locale}>
          <Provider store={store}>{props.children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

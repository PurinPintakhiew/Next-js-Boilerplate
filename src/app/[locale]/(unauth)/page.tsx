'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { CardBlog } from '@/components/CardBlog';
import Preloading from '@/components/Preloading';

export default function Index() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pantip-api-test.vercel.app/pantip',
        );
        setData(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Preloading isLoading={isLoading} />
      <div className="mb-10">
        {data?.realtime?.data?.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            {data?.realtime?.data?.map(
              (item: any) =>
                item?.title && <CardBlog key={item?.id} item={item} />,
            )}
          </div>
        )}
      </div>
      <div className="mb-10">
        {data?.pick?.data?.length > 0 && (
          <>
            <h2 className="mb-5 text-3xl font-bold">Pantip Pick</h2>
            <div className="grid grid-cols-12 gap-6">
              {data?.pick?.data?.map(
                (item: any) =>
                  item?.title && <CardBlog key={item?.id} item={item} />,
              )}
            </div>
          </>
        )}
      </div>
      <div className="mb-10">
        {data?.hitz?.data?.length > 0 && (
          <>
            <h2 className="mb-5 text-3xl font-bold">Pantip Hitz</h2>
            <div className="grid grid-cols-12 gap-6">
              {data?.hitz?.data?.map(
                (item: any) =>
                  item?.title && <CardBlog key={item?.id} item={item} />,
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

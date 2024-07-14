'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Index() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pantip-api-test.vercel.app/pantip',
        );
        setData(response?.data?.data);
      } catch (error) {
        //
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      {data?.realtime?.data?.length > 0 &&
        data?.realtime?.data?.map(
          (item: any) =>
            item?.title && (
              <div
                key={item.id}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={item?.thumbnail_url || '/assets/images/no-image.jpg'}
                    className="h-[288px] w-full rounded-md"
                    alt="blog"
                    width={300}
                    height={288}
                    loading="lazy"
                  />
                  <div className="font-semibold">{item?.title}</div>
                  <div>
                    {item?.tags?.length > 0 &&
                      item?.tags
                        ?.map((val: any) => val?.name || '')
                        ?.join(', ')}
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
}

'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
    <div className="grid grid-cols-12 gap-6">
      <Preloading isLoading={isLoading} />
      {data?.realtime?.data?.length > 0 &&
        data?.realtime?.data?.map(
          (item: any) =>
            item?.title && (
              <div
                key={item.id}
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2"
              >
                <div className="flex flex-col justify-center gap-4">
                  <Image
                    src={item?.thumbnail_url || '/assets/images/no-image.jpg'}
                    className="h-[25vh]  w-full rounded-md object-cover object-center"
                    alt="blog"
                    width={300}
                    height={288}
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="cut-text-multi break-all font-semibold">
                      {item?.title}
                    </div>
                    <div className=" text-gray-500">
                      {item?.author?.name || ''}
                    </div>
                    <div className="truncate text-sm font-semibold">
                      {item?.tags?.length > 0 &&
                        item?.tags
                          ?.map((val: any) => val?.name || '')
                          ?.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
}

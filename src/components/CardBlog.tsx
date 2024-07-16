import Image from 'next/image';
import Link from 'next/link';

const CardBlog = ({ item }: any) => {
  return (
    <Link
      href={item?.topic_id ? `https://pantip.com/topic/${item?.topic_id}` : '/'}
      className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2"
      target="_blank"
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
          <div className=" text-gray-500">{item?.author?.name || ''}</div>
          <div className="truncate text-sm font-semibold">
            {item?.tags?.length > 0 &&
              item?.tags?.map((val: any) => val?.name || '')?.join(', ')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export { CardBlog };

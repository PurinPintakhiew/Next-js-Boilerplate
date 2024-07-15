'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { AppConfig } from '@/utils/AppConfig';

interface Category {
  title: string;
  icon: string;
}

const BaseTemplate = (props: { children: React.ReactNode }) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollButtons = () => {
    if (scrollRef?.current) {
      const {
        scrollLeft: currentScrollLeft,
        scrollWidth,
        clientWidth,
      }: any = scrollRef?.current || {};
      setCanScrollLeft(currentScrollLeft > 0);
      setCanScrollRight(currentScrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const currentScrollRef = scrollRef.current;
    currentScrollRef?.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      currentScrollRef?.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef?.current) {
      scrollRef?.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const handleTouchStart = (e: any) => {
    setStartX(
      Number(e?.touches[0]?.pageX) - Number(scrollRef.current?.offsetLeft),
    );
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: any) => {
    const x =
      Number(e?.touches[0]?.pageX) - Number(scrollRef.current?.offsetLeft);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <header
        ref={headerRef}
        className="sticky inset-x-0 top-0 w-full bg-white"
      >
        <div className="flex flex-col items-center border-b px-[40px] py-4 md:px-[80px]">
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <h1 className="hidden text-2xl font-bold text-red-500 sm:block">
              <Link href="/">{AppConfig.name}</Link>
            </h1>
            <div className="hidden items-center justify-center gap-2 rounded-full border p-2 shadow hover:shadow-md lg:flex">
              <Link
                href="/"
                className="flex border-r px-4 font-semibold text-gray-500 hover:text-black"
              >
                หน้าแรก
              </Link>
              <Link
                href="/"
                className="flex border-r px-4 font-semibold text-gray-500 hover:text-black"
              >
                My Feed
              </Link>
              <Link
                href="/"
                className="flex border-r px-4 font-semibold text-gray-500 hover:text-black"
              >
                Pantip Hitz
              </Link>
              <Link
                href="/"
                className="flex border-r px-4 font-semibold text-gray-500 hover:text-black"
              >
                Explore
              </Link>
              <button
                type="button"
                className="rounded-full bg-[#FF385C] p-2"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="white"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden items-center lg:flex">
              <Link
                href="/"
                className="flex px-4 py-2 font-semibold hover:rounded-full hover:bg-neutral-100"
              >
                ตั้งกระทู้
              </Link>
              <Link
                href="/"
                className="flex px-4 py-2 font-semibold hover:rounded-full hover:bg-neutral-100"
              >
                คอมมูนิตี้
              </Link>
              <button
                type="button"
                className="flex items-center gap-4 rounded-full border p-2 hover:shadow-md"
              >
                <Image
                  height={16}
                  width={16}
                  src="/assets/images/homes/menu.svg"
                  alt="menu"
                  loading="lazy"
                  className="ms-2"
                />
                <Image
                  height={32}
                  width={32}
                  src="/assets/images/homes/user.svg"
                  alt="menu"
                  loading="lazy"
                />
              </button>
            </div>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-full border px-4 py-2 sm:w-auto lg:hidden"
              aria-label="Search on Pantip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="black"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              ค้นหาบน Pantip
            </button>
          </div>
        </div>

        <div className="relative w-full px-[40px] pt-2 shadow lg:px-[80px]">
          {canScrollLeft && (
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border p-2 hover:shadow-lg lg:left-[40px]"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <Image
                height={12}
                width={12}
                src="/assets/images/homes/previous.svg"
                alt="previous"
                loading="lazy"
              />
            </button>
          )}
          <div
            ref={scrollRef}
            className="w-full touch-auto overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div className="flex gap-10 transition-transform duration-300">
              {categories?.map((category: Category) => (
                <div key={category.title} className="shrink-0">
                  <Link
                    href="/"
                    className="my-2 flex flex-col items-center justify-center border-b-2 border-transparent p-1 text-black hover:border-neutral-200"
                  >
                    <Image
                      height={24}
                      width={24}
                      src={category?.icon}
                      alt={category?.title}
                      loading="lazy"
                    />
                    <div>{category?.title}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {canScrollRight && (
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border p-2 hover:shadow-lg lg:right-[40px]"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <Image
                height={12}
                width={12}
                src="/assets/images/homes/next.svg"
                alt="next"
                loading="lazy"
              />
            </button>
          )}
        </div>
      </header>

      <main className="mb-10 mt-4 px-[40px] md:px-[80px]">
        {props.children}
      </main>

      <footer className="bg-[#F7F7F7] text-center text-sm">
        <div className="mt-10 flex items-center justify-between border-t border-gray-300 px-[40px] py-8 lg:px-[80px]">
          <div>
            © Copyright {new Date().getFullYear()} {AppConfig.name}.
          </div>
        </div>
      </footer>
    </div>
  );
};

export { BaseTemplate };

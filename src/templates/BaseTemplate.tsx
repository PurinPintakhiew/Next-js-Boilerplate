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
            <h1 className="hidden text-2xl font-bold text-[#FF385C] sm:block">
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
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-gray-300 px-[40px] py-8 sm:flex-row lg:px-[80px]">
          <div>
            © Copyright {new Date().getFullYear()} {AppConfig.name}.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">ติดตาม</span>
            <Link href="https://www.facebook.com/pantipdotcom/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
                role="img"
                focusable="false"
              >
                <path d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                <path
                  fill="#fff"
                  d="M22.94 16H18.5v-3c0-1.27.62-2.5 2.6-2.5h2.02V6.56s-1.83-.31-3.58-.31c-3.65 0-6.04 2.21-6.04 6.22V16H9.44v4.62h4.06V32h5V20.62h3.73z"
                />
              </svg>
            </Link>
            <Link href="https://x.com/Pantip1996" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
                role="img"
                focusable="false"
              >
                <path d="M32 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4z" />
                <path
                  fill="#fff"
                  d="M18.66 7.99a4.5 4.5 0 0 0-2.28 4.88A12.31 12.31 0 0 1 7.3 8.25a4.25 4.25 0 0 0 1.38 5.88c-.69 0-1.38-.13-2-.44a4.54 4.54 0 0 0 3.5 4.31 4.3 4.3 0 0 1-2 .06 4.64 4.64 0 0 0 4.19 3.13A8.33 8.33 0 0 1 5.8 23a12.44 12.44 0 0 0 19.32-11.19A7.72 7.72 0 0 0 27.3 9.5a8.3 8.3 0 0 1-2.5.75 4.7 4.7 0 0 0 2-2.5c-.87.5-1.81.87-2.81 1.06a4.5 4.5 0 0 0-5.34-.83z"
                />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/pantipdotcom/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
                role="img"
                focusable="false"
              >
                <path d="M30 0H2a2 2 0 0 0-2 2v28c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path
                  fill="#fff"
                  d="M15.71 4h1.25c2.4 0 2.85.02 3.99.07 1.28.06 2.15.26 2.91.56.79.3 1.46.72 2.13 1.38.6.6 1.08 1.33 1.38 2.13l.02.06c.28.74.48 1.58.54 2.8l.01.4c.05 1.02.06 1.63.06 4.4v.92c0 2.6-.02 3.05-.07 4.23a8.78 8.78 0 0 1-.56 2.91c-.3.8-.77 1.53-1.38 2.13a5.88 5.88 0 0 1-2.13 1.38l-.06.02c-.74.28-1.59.48-2.8.53l-.4.02c-1.02.05-1.63.06-4.4.06h-.92a73.1 73.1 0 0 1-4.23-.07 8.78 8.78 0 0 1-2.91-.56c-.8-.3-1.53-.77-2.13-1.38a5.88 5.88 0 0 1-1.38-2.13l-.02-.06a8.84 8.84 0 0 1-.54-2.8l-.01-.37A84.75 84.75 0 0 1 4 16.29v-1c0-2.62.02-3.06.07-4.24.06-1.26.26-2.13.55-2.88l.01-.03c.3-.8.77-1.53 1.38-2.13a5.88 5.88 0 0 1 2.13-1.38l.06-.02a8.84 8.84 0 0 1 2.8-.54l.37-.01C12.39 4 12.99 4 15.71 4zm.91 2.16h-1.24c-2.3 0-2.91.01-3.81.05l-.42.02c-1.17.05-1.8.25-2.23.41-.56.22-.96.48-1.38.9-.4.41-.67.8-.88 1.35l-.03.06a6.7 6.7 0 0 0-.4 2.2l-.02.45c-.04.9-.05 1.53-.05 3.94v1.08c0 2.64.02 3.05.07 4.23v.07c.06 1.13.25 1.74.42 2.16.21.56.47.96.9 1.38.4.4.8.67 1.34.88l.06.03a6.7 6.7 0 0 0 2.2.4l.45.02c.9.04 1.53.05 3.94.05h1.08c2.64 0 3.05-.02 4.23-.07h.07a6.51 6.51 0 0 0 2.16-.42c.52-.19.99-.5 1.38-.9.4-.4.67-.8.88-1.34l.03-.06a6.7 6.7 0 0 0 .4-2.2l.02-.45c.04-.9.05-1.53.05-3.94v-1.09c0-2.63-.02-3.04-.07-4.22v-.07a6.51 6.51 0 0 0-.42-2.16c-.19-.52-.5-.99-.9-1.38a3.7 3.7 0 0 0-1.34-.88l-.06-.03a6.63 6.63 0 0 0-2.16-.4l-.46-.02c-.9-.04-1.5-.05-3.8-.05zM16 9.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zM16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.4-3.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { BaseTemplate };

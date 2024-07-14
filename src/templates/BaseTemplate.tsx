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
    scrollRef?.current?.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      scrollRef?.current?.removeEventListener('scroll', updateScrollButtons);
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
        <div className="hidden flex-col items-center border-b px-[40px] py-[20px] sm:flex md:px-[80px]">
          <div className="flex w-full flex-wrap justify-between">
            <h1 className="text-2xl font-bold text-red-500">
              <Link href="/">{AppConfig.name}</Link>
            </h1>
            <div className="flex items-center">
              <Link
                href="/"
                className="flex px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
              >
                ตั้งกระทู้
              </Link>
              <Link
                href="/"
                className="flex px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
              >
                คอมมูนิตี้
              </Link>
              <button
                type="button"
                className="b flex items-center gap-4 rounded-full border px-4 py-2 hover:bg-slate-100"
              >
                <Image
                  height={16}
                  width={16}
                  src="/assets/images/homes/menu.svg"
                  alt="menu"
                  loading="lazy"
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
          </div>
          <div className="flex justify-center gap-2 rounded-full border p-2">
            <Link
              href="/"
              className="flex border-r px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
            >
              หน้าแรก
            </Link>
            <Link
              href="/"
              className="flex border-r px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
            >
              My Feed
            </Link>
            <Link
              href="/"
              className="flex border-r px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
            >
              Pantip Hitz
            </Link>
            <Link
              href="/"
              className="flex border-r px-4 py-2 font-semibold hover:rounded-full hover:bg-slate-100"
            >
              Explore
            </Link>
            <input type="search" className="rounded-full border" />
          </div>
        </div>

        <div className="flex flex-col items-center border-b px-[40px] py-[20px] sm:hidden md:px-[80px]">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border px-4 py-2"
          >
            <Image
              height={16}
              width={16}
              src="/assets/images/homes/search.svg"
              alt="menu"
              loading="lazy"
            />
            <div className="flex flex-col">ค้นหาบน Pantip</div>
          </button>
        </div>

        <div className="relative w-full px-[40px] pt-2 shadow lg:px-[80px]">
          {canScrollLeft && (
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-2 shadow-md lg:left-[40px]"
              onClick={() => scroll('left')}
            >
              <Image
                height={12}
                width={12}
                src="/assets/images/homes/previous.svg"
                alt="menu"
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
                    className="my-2 flex flex-col items-center justify-center border-b-2 border-transparent p-1 text-black hover:border-slate-200"
                  >
                    <Image
                      height={24}
                      width={24}
                      src={category?.icon}
                      alt="room"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-2 shadow-md lg:right-[40px]"
              onClick={() => scroll('right')}
            >
              <Image
                height={12}
                width={12}
                src="/assets/images/homes/next.svg"
                alt="menu"
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

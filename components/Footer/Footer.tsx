import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Image src="/images/logo.png" alt="Logo" width={150} height={50} className="mb-4" />
        </div>
        <div>
          <h3 className="font-bold mb-3">Hỗ trợ</h3>
          <ul>
            <li key={1}>
              <Link href="/category/new-arrivals">
                <span className="cursor-pointer hover:underline">Viết CV</span>
              </Link>
            </li>
            <li key={2}>
              <Link href="/category/sale">
                <span className="cursor-pointer hover:underline">Hướng dẫn sử dụng</span>
              </Link>
            </li>
            <li key={3}>
              <Link href="/category/top-rated">
                <span className="cursor-pointer hover:underline">Báo cáo sự cố</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Về chúng tôi</h3>
          <ul>
            <li key={1}>
              <Link href="/about">
                <span className="cursor-pointer hover:underline">Giới thiệu</span>
              </Link>
            </li>
            <li key={2}>
              <Link href="/contact">
                <span className="cursor-pointer hover:underline">Cơ cấu</span>
              </Link>
            </li>
            <li key={3}>
              <Link href="/policy">
                <span className="cursor-pointer hover:underline">Thống kê</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Liên hệ</h3>
          <ul>
            <li key={1}>
              <Link href="/account/orders">
                <span className="cursor-pointer hover:underline">Địa chỉ</span>
              </Link>
            </li>
            <li key={2}>
              <Link href="/account/settings">
                <span className="cursor-pointer hover:underline">Email</span>
              </Link>
            </li>
            <li key={3}>
              <Link href="/account/help">
                <span className="cursor-pointer hover:underline">Hotline</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-gray-700 mt-8">
        <p>&copy; {new Date().getFullYear()} JobCenter full right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
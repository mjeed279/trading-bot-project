import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>لوحة تحكم روبوت التداول</title>
        <meta name="description" content="لوحة تحكم لمتابعة وإدارة روبوت التداول الآلي" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100">
        <nav className="bg-white shadow-md mb-8">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              روبوت التداول
            </Link>
            <div className="space-x-4 space-x-reverse">
              <Link href="/" className="text-gray-600 hover:text-blue-600">لوحة التحكم</Link>
              <Link href="/settings" className="text-gray-600 hover:text-blue-600">الإعدادات</Link>
              <Link href="/reports" className="text-gray-600 hover:text-blue-600">التقارير</Link>
              <Link href="/history" className="text-gray-600 hover:text-blue-600">السجل</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-12 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} روبوت التداول الآلي. جميع الحقوق محفوظة.
        </footer>
      </body>
    </html>
  );
}

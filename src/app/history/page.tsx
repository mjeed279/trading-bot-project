import React from 'react';
import Link from 'next/link';

export default function History() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">سجل الصفقات</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">فلترة الصفقات</h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">المنصة</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="all">الكل</option>
              <option value="binance">Binance</option>
              <option value="mexc">MEXC</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">الاستراتيجية</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="all">الكل</option>
              <option value="breakout">اختراق مستويات الدعم والمقاومة</option>
              <option value="bounce">الارتداد من الدعوم والمقاومات</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">النتيجة</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="all">الكل</option>
              <option value="profit">ربح</option>
              <option value="loss">خسارة</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">الفترة</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="all">الكل</option>
              <option value="today">اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
            </select>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">سجل الصفقات</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b text-right">التاريخ</th>
                <th className="py-2 px-4 border-b text-right">الزوج</th>
                <th className="py-2 px-4 border-b text-right">المنصة</th>
                <th className="py-2 px-4 border-b text-right">الاستراتيجية</th>
                <th className="py-2 px-4 border-b text-right">نوع الصفقة</th>
                <th className="py-2 px-4 border-b text-right">سعر الدخول</th>
                <th className="py-2 px-4 border-b text-right">سعر الخروج</th>
                <th className="py-2 px-4 border-b text-right">الربح/الخسارة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan={8}>
                  لا توجد صفقات مسجلة
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; العودة إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}

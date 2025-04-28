import React from 'react';
import Link from 'next/link';

export default function Reports() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">التقارير الأسبوعية</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">تقرير الأسبوع الحالي</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b text-right">المؤشر</th>
                <th className="py-2 px-4 border-b text-right">القيمة</th>
                <th className="py-2 px-4 border-b text-right">التغيير</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">إجمالي الصفقات</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">الصفقات الناجحة</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">الصفقات الخاسرة</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">نسبة النجاح</td>
                <td className="py-2 px-4 border-b">0%</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">إجمالي الربح</td>
                <td className="py-2 px-4 border-b">0 USDT</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">أفضل صفقة</td>
                <td className="py-2 px-4 border-b">-</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">أداء الاستراتيجيات</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">اختراق مستويات الدعم والمقاومة</h3>
            <div className="space-y-2">
              <p>عدد الصفقات: <span className="font-bold">0</span></p>
              <p>نسبة النجاح: <span className="font-bold">0%</span></p>
              <p>متوسط الربح: <span className="font-bold">0 USDT</span></p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">الارتداد من الدعوم والمقاومات</h3>
            <div className="space-y-2">
              <p>عدد الصفقات: <span className="font-bold">0</span></p>
              <p>نسبة النجاح: <span className="font-bold">0%</span></p>
              <p>متوسط الربح: <span className="font-bold">0 USDT</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">التقارير السابقة</h2>
        
        <div className="space-y-2">
          <p className="text-gray-500">لا توجد تقارير سابقة متاحة</p>
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

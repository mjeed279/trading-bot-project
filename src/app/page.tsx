import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">روبوت التداول الآلي</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">ملخص الأداء</h2>
          <div className="space-y-2">
            <p>إجمالي الصفقات: <span className="font-bold">0</span></p>
            <p>الصفقات الناجحة: <span className="font-bold text-green-600">0</span></p>
            <p>الصفقات الخاسرة: <span className="font-bold text-red-600">0</span></p>
            <p>نسبة النجاح: <span className="font-bold">0%</span></p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">الصفقات النشطة</h2>
          <p className="text-gray-500">لا توجد صفقات نشطة حالياً</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">روابط سريعة</h2>
          <div className="space-y-2">
            <Link href="/settings" className="text-blue-600 hover:underline block">إعدادات الروبوت</Link>
            <Link href="/reports" className="text-blue-600 hover:underline block">التقارير الأسبوعية</Link>
            <Link href="/history" className="text-blue-600 hover:underline block">سجل الصفقات</Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">حالة الروبوت</h2>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <p>الروبوت يعمل بشكل طبيعي</p>
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">آخر تحديث:</h3>
          <p className="text-gray-600">{new Date().toLocaleString('ar-SA')}</p>
        </div>
      </div>
    </div>
  );
}

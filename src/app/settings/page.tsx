import React from 'react';
import Link from 'next/link';

export default function Settings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">إعدادات روبوت التداول</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">إعدادات عامة</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">وضع التداول</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="live">تداول حقيقي</option>
              <option value="test">وضع الاختبار</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">المنصة المفضلة</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="binance">Binance</option>
              <option value="mexc">MEXC</option>
              <option value="both">كلاهما</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">الإشعارات عبر تليجرام</label>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>تفعيل الإشعارات</span>
            </div>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">إعدادات إدارة المخاطر</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">الحد الأقصى للمخاطرة لكل صفقة (%)</label>
            <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="1" />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">الحد الأقصى للمخاطرة اليومية (%)</label>
            <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="5" />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">نسبة الربح المستهدفة (%)</label>
            <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="2" />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">نسبة وقف الخسارة (%)</label>
            <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="1" />
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">إعدادات الاستراتيجية</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">الاستراتيجية النشطة</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="breakout">اختراق مستويات الدعم والمقاومة</option>
              <option value="bounce">الارتداد من الدعوم والمقاومات القوية</option>
              <option value="both">كلاهما</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">الإطار الزمني</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="1h">ساعة</option>
              <option value="4h">4 ساعات</option>
              <option value="1d">يومي</option>
            </select>
          </div>
          
          <div className="flex justify-end mt-6">
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              حفظ الإعدادات
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; العودة إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}

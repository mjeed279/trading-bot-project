import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming shadcn/ui structure
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui structure
import { ArrowRight, Settings, History, FileText, Activity, CheckCircle, XCircle, Percent, TrendingUp } from 'lucide-react'; // Using lucide-react icons

// Define props type for StatCard
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  colorClass?: string;
}

// Helper component for Stats Card with explicit props typing
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => (
  <div className={`flex items-center p-4 bg-background rounded-lg border`}>
    {React.createElement(icon, { className: `h-6 w-6 mr-3 ${colorClass || 'text-primary'}` })}
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

export default function Home() {
  const lastUpdate = new Date().toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-foreground tracking-tight">لوحة تحكم روبوت التداول</h1>
        <p className="text-center text-muted-foreground mt-2">نظرة شاملة على أداء ونشاط الروبوت الخاص بك</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Summary Card */}
        <Card className="lg:col-span-2 bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5" /> ملخص الأداء</CardTitle>
            <CardDescription>نظرة سريعة على نتائج التداول الأخيرة.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="إجمالي الصفقات" value="0" icon={TrendingUp} />
            <StatCard title="الصفقات الناجحة" value="0" icon={CheckCircle} colorClass="text-green-500" />
            <StatCard title="الصفقات الخاسرة" value="0" icon={XCircle} colorClass="text-red-500" />
            <StatCard title="نسبة النجاح" value="0%" icon={Percent} />
          </CardContent>
        </Card>

        {/* Bot Status Card */}
        <Card className="bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5" /> حالة الروبوت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Badge variant="outline" className="border-green-500 text-green-500">
                <CheckCircle className="mr-1 h-4 w-4" /> يعمل بشكل طبيعي
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">آخر تحديث:</p>
              <p className="font-medium">{lastUpdate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Active Trades Card */}
        <Card className="bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5" /> الصفقات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-4">لا توجد صفقات نشطة حالياً</p>
            {/* Future: Add list of active trades here */}
          </CardContent>
        </Card>

        {/* Quick Links Card */}
        <Card className="lg:col-span-2 bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center"><ArrowRight className="mr-2 h-5 w-5" /> روابط سريعة</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/settings" className="flex items-center justify-center p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <Settings className="mr-2 h-5 w-5" />
              <span>إعدادات الروبوت</span>
            </Link>
            <Link href="/reports" className="flex items-center justify-center p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <FileText className="mr-2 h-5 w-5" />
              <span>التقارير</span>
            </Link>
            <Link href="/history" className="flex items-center justify-center p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <History className="mr-2 h-5 w-5" />
              <span>سجل الصفقات</span>
            </Link>
          </CardContent>
        </Card>
      </div>

      <footer className="text-center text-muted-foreground mt-12">
        مدعوم بواسطة Vercel & Next.js
      </footer>
    </div>
  );
}


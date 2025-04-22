
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CastleButton from "../castle/CastleButton";
import { FileText, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const evaluationFormSchema = z.object({
  studentName: z.string().min(2, { message: "اسم الطالب مطلوب" }),
  unit: z.string().min(2, { message: "الوحدة مطلوبة" }),
  taskTitle: z.string().min(2, { message: "عنوان المهمة مطلوب" }),
});

type EvaluationFormValues = z.infer<typeof evaluationFormSchema>;

export default function EvaluationForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { toast } = useToast();

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: {
      studentName: "",
      unit: "الوحدة التاسعة عشر: تقنيات الترويج والعرض المرئية لأعمال البيع بالتجزئة",
      taskTitle: "",
    },
  });

  function onSubmit(data: EvaluationFormValues) {
    if (!file) {
      toast({
        title: "خطأ",
        description: "يرجى رفع ملف الواجب",
        variant: "destructive",
      });
      return;
    }

    setIsEvaluating(true);

    // في الإصدار النهائي، هنا سيتم إرسال الملف والبيانات إلى الخادم للتقييم
    // نحاكي عملية التقييم بتأخير بسيط
    setTimeout(() => {
      setIsEvaluating(false);
      toast({
        title: "تم التقييم بنجاح",
        description: `تم تقييم واجب الطالب ${data.studentName} بنجاح`,
      });

      // في التطبيق الفعلي، سيتم توجيه المستخدم إلى صفحة النتائج
      window.location.href = "/btec-evaluator/results";
    }, 3000);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يرجى رفع ملف Word (.docx) فقط",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 mb-4">
        <h2 className="text-2xl font-bold">تقييم واجب BTEC</h2>
        <p className="text-gray-500">
          قم برفع ملف الواجب وأدخل المعلومات المطلوبة للبدء في عملية التقييم
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الطالب</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل اسم الطالب الكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوحدة الدراسية</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="taskTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان المهمة</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: من العرض إلى الشراء: كيف يصنع التجار المرئيون الفارق؟" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>ملف الواجب</FormLabel>
            <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-md p-8 text-center">
              <p className="mb-2">اسحب ملف Word (.docx) هنا أو</p>
              <div className="mt-2">
                <label className="cursor-pointer">
                  <Input 
                    type="file"
                    className="hidden"
                    accept=".docx"
                    onChange={handleFileChange}
                  />
                  <CastleButton type="button" variant="outline" size="sm">اختر ملف</CastleButton>
                </label>
              </div>
              {file && (
                <div className="mt-2 text-sm text-green-600 flex items-center justify-center gap-2">
                  <FileText size={16} />
                  <span>{file.name}</span>
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500">Word (.docx) فقط، بحد أقصى 10MB</p>
            </div>
          </div>

          <CastleButton
            type="submit"
            variant="magic"
            icon={isEvaluating ? <Loader2 className="animate-spin" /> : <Upload />}
            disabled={isEvaluating}
          >
            {isEvaluating ? "جاري التقييم..." : "تقييم الواجب"}
          </CastleButton>
        </form>
      </Form>
    </div>
  );
}

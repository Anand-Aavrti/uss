"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
}

export default function TicketModal({
  isOpen,
  onClose,
  currentLanguage,
}: TicketModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const content = {
    en: {
      title: "Submit Support Ticket",
      subjectLabel: "Subject",
      subjectPlaceholder: "Brief description of your issue",
      categoryLabel: "Category",
      categoryPlaceholder: "Select a category",
      categories: [
        "Technical Support",
        "Billing & Payments",
        "Account Management",
        "Feature Request",
        "Bug Report",
        "General Inquiry",
      ],
      priorityLabel: "Priority",
      priorityPlaceholder: "Select priority level",
      priorities: ["Low", "Medium", "High", "Critical"],
      descriptionLabel: "Description",
      descriptionPlaceholder:
        "Please provide detailed information about your issue...",
      submitButton: "Submit Ticket",
      cancelButton: "Cancel",
      successMessage:
        "Your ticket has been submitted successfully. We'll respond within 2 hours.",
    },
    hi: {
      title: "सहायता टिकट सबमिट करें",
      subjectLabel: "विषय",
      subjectPlaceholder: "आपकी समस्या का संक्षिप्त विवरण",
      categoryLabel: "श्रेणी",
      categoryPlaceholder: "एक श्रेणी चुनें",
      categories: [
        "तकनीकी सहायता",
        "बिलिंग और भुगतान",
        "खाता प्रबंधन",
        "फीचर अनुरोध",
        "बग रिपोर्ट",
        "सामान्य पूछताछ",
      ],
      priorityLabel: "प्राथमिकता",
      priorityPlaceholder: "प्राथमिकता स्तर चुनें",
      priorities: ["कम", "मध्यम", "उच्च", "गंभीर"],
      descriptionLabel: "विवरण",
      descriptionPlaceholder:
        "कृपया अपनी समस्या के बारे में विस्तृत जानकारी प्रदान करें...",
      submitButton: "टिकट सबमिट करें",
      cancelButton: "रद्द करें",
      successMessage:
        "आपका टिकट सफलतापूर्वक सबमिट कर दिया गया है। हम 2 घंटे के भीतर जवाब देंगे।",
    },
    ar: {
      title: "إرسال تذكرة الدعم",
      subjectLabel: "الموضوع",
      subjectPlaceholder: "وصف موجز لمشكلتك",
      categoryLabel: "الفئة",
      categoryPlaceholder: "اختر فئة",
      categories: [
        "الدعم الفني",
        "الفواتير والمدفوعات",
        "إدارة الحساب",
        "طلب ميزة",
        "تقرير خطأ",
        "استفسار عام",
      ],
      priorityLabel: "الأولوية",
      priorityPlaceholder: "حدد مستوى الأولوية",
      priorities: ["منخفض", "متوسط", "عالي", "حرج"],
      descriptionLabel: "الوصف",
      descriptionPlaceholder: "يرجى تقديم معلومات مفصلة حول مشكلتك...",
      submitButton: "إرسال التذكرة",
      cancelButton: "إلغاء",
      successMessage: "تم إرسال تذكرتك بنجاح. سنرد في غضون ساعتين.",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(currentContent.successMessage);
    onClose();
    setFormData({ subject: "", category: "", priority: "", description: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`bg-card rounded-lg shadow-xl w-full max-w-2xl ${isRTL ? "rtl" : "ltr"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-2xl font-bold text-foreground">
            {currentContent.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-300"
          >
            <Icon
              name="XMarkIcon"
              size={24}
              className="text-muted-foreground"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentContent.subjectLabel}
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder={currentContent.subjectPlaceholder}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {currentContent.categoryLabel}
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
              >
                <option value="">{currentContent.categoryPlaceholder}</option>
                {currentContent.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {currentContent.priorityLabel}
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
              >
                <option value="">{currentContent.priorityPlaceholder}</option>
                {currentContent.priorities.map((priority, index) => (
                  <option key={index} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentContent.descriptionLabel}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder={currentContent.descriptionPlaceholder}
              required
              rows={6}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground resize-none"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-300 text-foreground font-medium"
            >
              {currentContent.cancelButton}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cta text-cta-foreground rounded-lg hover:bg-cta/90 transition-colors duration-300 font-medium shadow-md"
            >
              {currentContent.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

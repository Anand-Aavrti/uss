"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
}

export default function TicketModal({ isOpen, onClose, currentLanguage }: TicketModalProps) {
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
      categories: ["Technical Support", "Billing & Payments", "Account Management", "Feature Request", "Bug Report", "General Inquiry"],
      priorityLabel: "Priority",
      priorityPlaceholder: "Select priority level",
      priorities: ["Low", "Medium", "High", "Critical"],
      descriptionLabel: "Description",
      descriptionPlaceholder: "Please provide detailed information about your issue...",
      submitButton: "Submit Ticket",
      cancelButton: "Cancel",
      successMessage: "Your ticket has been submitted successfully. We'll respond within 2 hours.",
    },
    hi: {
      title: "सहायता टिकट सबमिट करें",
      subjectLabel: "विषय",
      subjectPlaceholder: "आपकी समस्या का संक्षिप्त विवरण",
      categoryLabel: "श्रेणी",
      categoryPlaceholder: "एक श्रेणी चुनें",
      categories: ["तकनीकी सहायता", "बिलिंग और भुगतान", "खाता प्रबंधन", "फीचर अनुरोध", "बग रिपोर्ट", "सामान्य पूछताछ"],
      priorityLabel: "प्राथमिकता",
      priorityPlaceholder: "प्राथमिकता स्तर चुनें",
      priorities: ["कम", "मध्यम", "उच्च", "गंभीर"],
      descriptionLabel: "विवरण",
      descriptionPlaceholder: "कृपया अपनी समस्या के बारे में विस्तृत जानकारी प्रदान करें...",
      submitButton: "टिकट सबमिट करें",
      cancelButton: "रद्द करें",
      successMessage: "आपका टिकट सफलतापूर्वक सबमिट कर दिया गया है। हम 2 घंटे के भीतर जवाब देंगे।",
    },
    ar: {
      title: "إرسال تذكرة الدعم",
      subjectLabel: "الموضوع",
      subjectPlaceholder: "وصف موجز لمشكلتك",
      categoryLabel: "الفئة",
      categoryPlaceholder: "اختر فئة",
      categories: ["الدعم الفني", "الفواتير والمدفوعات", "إدارة الحساب", "طلب ميزة", "تقرير خطأ", "استفسار عام"],
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

  const inputClass = "w-full px-4 py-3 bg-[#1B365D]/20 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300";
  const selectClass = `${inputClass} cursor-pointer`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className={`backdrop-blur-xl bg-[#0B1220] border border-white/10 rounded-2xl shadow-2xl shadow-[#0EA5E9]/10 w-full max-w-xl max-h-[90vh] overflow-y-auto ${isRTL ? "rtl" : "ltr"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 sticky top-0 bg-[#0B1220]/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20">
              <Icon name="TicketIcon" size={18} className="text-[#0EA5E9]" />
            </div>
            <h3 className="text-lg font-bold text-white">{currentContent.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-200 text-white/50 hover:text-white"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              {currentContent.subjectLabel}
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={currentContent.subjectPlaceholder}
              required
              className={inputClass}
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {currentContent.categoryLabel}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className={selectClass}
              >
                <option value="" className="bg-[#0B1220] text-white">{currentContent.categoryPlaceholder}</option>
                {currentContent.categories.map((category, index) => (
                  <option key={index} value={category} className="bg-[#0B1220] text-white">{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {currentContent.priorityLabel}
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
                className={selectClass}
              >
                <option value="" className="bg-[#0B1220] text-white">{currentContent.priorityPlaceholder}</option>
                {currentContent.priorities.map((priority, index) => (
                  <option key={index} value={priority} className="bg-[#0B1220] text-white">{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              {currentContent.descriptionLabel}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={currentContent.descriptionPlaceholder}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-200 text-white/60 hover:text-white text-sm font-medium"
            >
              {currentContent.cancelButton}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.01] transition-all duration-300"
            >
              {currentContent.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

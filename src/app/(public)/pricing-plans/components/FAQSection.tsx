'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: 'Can I change my plan at any time?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated based on your usage. If you upgrade, you will be charged the difference for the remainder of the billing period. If you downgrade, credits will be applied to your next invoice.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers. For annual plans, we also offer invoice-based payment options with NET 30 terms for qualified businesses.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 14-day free trial for the Professional plan with no credit card required. This gives you full access to all Professional features so you can evaluate the platform thoroughly before committing. Enterprise customers can request an extended trial period.',
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer:
        'If you approach your plan limits, we will notify you via email. You can either upgrade to a higher tier or purchase additional resources as add-ons. We provide a grace period to prevent service interruption, and overage charges are clearly communicated in advance.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer:
        'Yes, annual billing provides a 20% discount compared to monthly billing across all plans. Enterprise customers may qualify for additional volume discounts based on their specific requirements and commitment terms.',
    },
    {
      question: 'What is included in enterprise support?',
      answer:
        'Enterprise support includes 24/7 priority assistance with 1-hour response time, a dedicated account manager, quarterly business reviews, custom onboarding and training, direct access to our engineering team, and proactive monitoring of your infrastructure.',
    },
    {
      question: 'Can I get a custom plan for my organization?',
      answer:
        'Absolutely. For organizations with unique requirements, we offer fully customized plans with tailored features, pricing, and support levels. Contact our sales team to discuss your specific needs and receive a personalized proposal.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a 30-day money-back guarantee for all new subscriptions. If you are not satisfied with our service within the first 30 days, contact our support team for a full refund. This policy applies to both monthly and annual plans.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`backdrop-blur-xl rounded-2xl border overflow-hidden transition-all duration-300 ${
            expandedIndex === index
              ? 'bg-[#1B365D]/30 border-[#0EA5E9]/30 shadow-lg shadow-[#0EA5E9]/10'
              : 'bg-[#1B365D]/20 border-white/10 hover:border-[#0EA5E9]/25'
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
            aria-expanded={expandedIndex === index}
          >
            <span className="text-base font-semibold text-white pr-4">{faq.question}</span>
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                expandedIndex === index
                  ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]'
                  : 'bg-white/5 text-white/40'
              }`}
            >
              <Icon
                name="ChevronDownIcon"
                size={16}
                className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
          {expandedIndex === index && (
            <div className="px-6 pb-5 pt-1 border-t border-white/10">
              <p className="text-sm text-white/65 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

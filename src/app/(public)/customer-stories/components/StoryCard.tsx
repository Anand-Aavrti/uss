"use client";

import { useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface Metric {
  label: string;
  value: string;
  icon: string;
}

interface Story {
  id: string;
  company: string;
  logo: string;
  logoAlt: string;
  industry: string;
  region: string;
  useCase: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  metrics: Metric[];
  videoUrl?: string;
  pdfUrl?: string;
  featured: boolean;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const handleVideoClick = () => {
    if (!isHydrated) return;
    setShowVideo(true);
  };

  const handleDownloadPDF = () => {
    if (!isHydrated) return;
    // PDF download logic would go here
    console.log("Downloading PDF:", story.pdfUrl);
  };

  if (!isHydrated) {
    return (
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#1B365D]/20">
        <div className="h-52 bg-[#1B365D]/30 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-[#1B365D]/30 rounded animate-pulse"></div>
          <div className="h-4 bg-[#1B365D]/30 rounded animate-pulse"></div>
          <div className="h-4 bg-[#1B365D]/30 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl bg-[#1B365D]/20 hover:border-[#0EA5E9]/30 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <AppImage
          src={story.image}
          alt={story.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-[#0B1220]/20 to-transparent" />
        {story.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
        {story.videoUrl && (
          <button
            onClick={handleVideoClick}
            className="absolute inset-0 flex items-center justify-center bg-[#0B1220]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Play video testimonial"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] rounded-full flex items-center justify-center shadow-xl shadow-[#0EA5E9]/40">
              <Icon name="PlayIcon" size={26} className="text-white ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#1B365D]/50 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
              <AppImage
                src={story.logo}
                alt={story.logoAlt}
                className="w-full h-full object-contain p-1.5"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">{story.company}</h3>
              <p className="text-xs text-white/50">{story.industry}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20 rounded-full">
            {story.region}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-white/5 text-white/60 border border-white/10 rounded-full">
            {story.useCase}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-snug">
          {story.title}
        </h4>
        <p className="text-xs text-white/55 mb-4 line-clamp-3 leading-relaxed">
          {story.excerpt}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/10">
          {story.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-1">
                <Icon name={metric.icon as any} size={16} className="text-[#0EA5E9]" />
              </div>
              <p className="text-sm font-bold text-[#0EA5E9]">{metric.value}</p>
              <p className="text-xs text-white/50">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/customer-stories/${story.id}`}
            className="text-sm font-medium text-[#0EA5E9] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            <span>Read Full Story</span>
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
          {story.pdfUrl && (
            <button
              onClick={handleDownloadPDF}
              className="p-1.5 text-white/40 hover:text-[#0EA5E9] transition-colors duration-300"
              aria-label="Download case study PDF"
            >
              <Icon name="ArrowDownTrayIcon" size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && story.videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/95 backdrop-blur-xl p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-[#1B365D]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#0B1220]/80 rounded-full hover:bg-[#1B365D]/50 transition-colors duration-300"
              aria-label="Close video"
            >
              <Icon name="XMarkIcon" size={22} className="text-white" />
            </button>
            <div className="aspect-video">
              <iframe
                src={story.videoUrl}
                title={`${story.company} testimonial video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;

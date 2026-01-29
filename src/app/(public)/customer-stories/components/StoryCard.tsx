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
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="h-64 bg-muted animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={story.image}
          alt={story.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {story.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
        {story.videoUrl && (
          <button
            onClick={handleVideoClick}
            className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Play video testimonial"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Icon name="PlayIcon" size={32} className="text-primary ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Company Logo & Tags */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <AppImage
                src={story.logo}
                alt={story.logoAlt}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {story.company}
              </h3>
              <p className="text-xs text-muted-foreground">{story.industry}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-muted text-foreground rounded">
            {story.region}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-muted text-foreground rounded">
            {story.useCase}
          </span>
        </div>

        {/* Title & Excerpt */}
        <h4 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
          {story.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {story.excerpt}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
          {story.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-1">
                <Icon
                  name={metric.icon as any}
                  size={20}
                  className="text-accent"
                />
              </div>
              <p className="text-lg font-bold text-foreground">
                {metric.value}
              </p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/customer-stories/${story.id}`}
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 flex items-center space-x-1"
          >
            <span>Read Full Story</span>
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
          {story.pdfUrl && (
            <button
              onClick={handleDownloadPDF}
              className="p-2 text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="Download case study PDF"
            >
              <Icon name="ArrowDownTrayIcon" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && story.videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-card rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-card rounded-full hover:bg-muted transition-colors duration-300"
              aria-label="Close video"
            >
              <Icon name="XMarkIcon" size={24} className="text-foreground" />
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

import React from "react";

/**
 * Universal Section Wrapper Component - FULL WIDTH FIX
 * Sections take 100% width, content is centered with max-width
 * This prevents scroll issues when cursor is outside content area
 */
const SectionWrapper = ({
  children,
  className = "",
  id = "",
  background = "transparent",
  hasTitle = false,
  titleContent = null,
  fullHeight = true,
  paddingTop = "normal",
  paddingBottom = "normal",
  centered = false,
  snapAlign = "start",
  snapStop = "normal",
  maxWidth = "1400px", // NEW: Customizable content max-width
  fullWidthContent = false, // NEW: Option to disable content centering
}) => {
  const getPaddingClass = (position, size) => {
    const prefix = position === "top" ? "pt" : "pb";
    const sizeMap = {
      none: "0",
      small: "small",
      normal: "normal",
      large: "large",
    };
    return `section-${prefix}-${sizeMap[size]}`;
  };

  const sectionClasses = [
    "section-wrapper",
    fullHeight ? "section-full-height" : "section-auto-height",
    centered ? "section-centered" : "",
    getPaddingClass("top", paddingTop),
    getPaddingClass("bottom", paddingBottom),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={sectionClasses}
      style={{
        background,
        scrollSnapAlign: snapAlign,
        scrollSnapStop: snapStop,
        width: "100%", // CRITICAL: Always 100% width
        position: "relative",
      }}
    >
      {/* Content wrapper with max-width constraint */}
      <div
        className="section-container"
        style={{
          maxWidth: fullWidthContent ? "none" : maxWidth,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Optional Title Area */}
        {hasTitle && titleContent && (
          <div className="section-title-wrapper">{titleContent}</div>
        )}

        {/* Main Content Area */}
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
};

export default SectionWrapper;

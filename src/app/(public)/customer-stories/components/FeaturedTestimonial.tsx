import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
  companyLogo: string;
  companyLogoAlt: string;
  rating: number;
}

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

const FeaturedTestimonial = ({ testimonial }: FeaturedTestimonialProps) => {
  return (
    <div className="relative backdrop-blur-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/60 rounded-2xl border border-white/10 p-8 lg:p-12 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1B365D]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Quote Section */}
        <div>
          {/* Stars */}
          <div className="flex items-center gap-1 mb-5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={20}
                className="text-[#0EA5E9]"
                variant="solid"
              />
            ))}
          </div>

          {/* Quote icon */}
          <div className="text-[#0EA5E9]/25 mb-4">
            <Icon name="ChatBubbleBottomCenterTextIcon" size={40} />
          </div>

          <blockquote className="text-xl lg:text-2xl font-semibold text-white mb-8 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0EA5E9]/40 flex-shrink-0">
              <AppImage
                src={testimonial.image}
                alt={testimonial.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-sm text-white/60">{testimonial.role}</p>
              <p className="text-sm text-[#0EA5E9]/80">{testimonial.company}</p>
            </div>
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-sm p-8 backdrop-blur-xl bg-[#1B365D]/30 rounded-2xl border border-white/10 hover:border-[#0EA5E9]/30 transition-all duration-300">
            <AppImage
              src={testimonial.companyLogo}
              alt={testimonial.companyLogoAlt}
              className="w-full h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTestimonial;

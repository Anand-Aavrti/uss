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
    <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 lg:p-12 border border-accent/20">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Quote Section */}
        <div>
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={20}
                className="text-accent"
                variant="solid"
              />
            ))}
          </div>
          <blockquote className="text-2xl lg:text-3xl font-semibold text-foreground mb-6 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
              <AppImage
                src={testimonial.image}
                alt={testimonial.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md p-8 bg-card rounded-lg border border-border">
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

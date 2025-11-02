import SectionWrapper from "../ui/SectionWrapper";
import Card from "../ui/Card";
import { testimonials } from "../../utils/constants";

export default function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      title="💬 Traveler Testimonials"
      subtitle="Real stories from real travelers who experienced Uganda’s unmatched beauty."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, idx) => (
          <Card key={idx} data={t} variant="testimonial" />
        ))}
      </div>
    </SectionWrapper>
  );
}

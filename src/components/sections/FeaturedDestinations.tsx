import SectionWrapper from "../ui/SectionWrapper";
import Card from "../ui/Card";
import { destinations } from "../../utils/constants";

export default function FeaturedDestinations() {
  return (
    <SectionWrapper
      id="featured-destinations"
      title="🌋 Featured Destinations"
      subtitle="Discover Uganda’s hidden gems — from mountain peaks to wildlife sanctuaries."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {destinations.map((item, idx) => (
          <Card key={idx} data={item} variant="destination" />
        ))}
      </div>
    </SectionWrapper>
  );
}

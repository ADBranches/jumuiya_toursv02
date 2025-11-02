import SectionWrapper from "../ui/SectionWrapper";
import Card from "../ui/Card";
import { tours } from "../../utils/constants";

export default function PopularTours() {
  return (
    <SectionWrapper
      id="popular-tours"
      title="🚐 Popular Tours"
      subtitle="Join our certified guides on unforgettable adventures across the Pearl of Africa."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {tours.map((tour, idx) => (
          <Card key={idx} data={tour} variant="tour" />
        ))}
      </div>
    </SectionWrapper>
  );
}

import DestinationCard from "./DestinationCard";
import type { Destination } from "../../types/destination";

interface Props {
  destinations: Destination[];
  loading: boolean;
}

export default function DestinationsGrid({ destinations, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl animate-pulse bg-gray-800/30"
          />
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No destinations match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {destinations.map((d) => (
        <DestinationCard key={d.id} destination={d} />
      ))}
    </div>
  );
}

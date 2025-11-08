import { useState, useEffect } from "react";

interface FiltersProps {
  onFilter: (filters: {
    search?: string;
    region?: string;
    difficulty?: string;
  }) => void;
}

export default function DestinationFilters({ onFilter }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  // Debounce filter updates for smoother UX
  useEffect(() => {
    const t = setTimeout(() => {
      onFilter({
        search: search.trim() || undefined,
        region: region !== "All" ? region : undefined,
        difficulty: difficulty !== "All" ? difficulty : undefined,
      });
    }, 250);
    return () => clearTimeout(t);
  }, [search, region, difficulty]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
      {/* Search box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search destination..."
        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition"
      />

      {/* Region dropdown */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
      >
        <option value="All">All Regions</option>
        <option value="Central Uganda">Central Uganda</option>
        <option value="Western Uganda">Western Uganda</option>
        <option value="Eastern Uganda">Eastern Uganda</option>
        <option value="Northern Uganda">Northern Uganda</option>
        <option value="West Nile">West Nile</option>
        <option value="Kigezi Region">Kigezi Region</option>
        <option value="Busoga Region">Busoga Region</option>
        <option value="Rwenzori Region">Rwenzori Region</option>
        <option value="Karamoja">Karamoja</option>
        <option value="Buganda Region">Buganda Region</option>
      </select>

      {/* Difficulty dropdown */}
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
      >
        <option value="All">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Moderate">Moderate</option>
        <option value="Challenging">Challenging</option>
        <option value="Hard">Hard</option>
        <option value="Extreme">Extreme</option>
      </select>

      {/* Reset button for UX */}
      <button
        onClick={() => {
          setSearch("");
          setRegion("All");
          setDifficulty("All");
          onFilter({});
        }}
        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition"
      >
        Reset Filters
      </button>
    </div>
  );
}

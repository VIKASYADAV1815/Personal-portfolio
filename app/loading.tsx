import { Loader } from "@/components/loader/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#121315]">
      <div className="flex items-center gap-3 text-white">
        <Loader size={24} />
        <span className="text-sm sm:text-base">Loading…</span>
      </div>
    </div>
  );
}
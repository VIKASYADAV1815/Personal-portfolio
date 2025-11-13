import { Loader } from "@/components/loader/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center" style={{ backgroundColor: "#121315" }}>
      <Loader size={28} className="text-white" />
    </div>
  );
}
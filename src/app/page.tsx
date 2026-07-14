import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-b from-[#e8d9b5] to-[#8b5e34] px-4 py-16 dark:from-[#2b1b0d] dark:to-[#120a03]">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-[#3b2712] dark:text-[#e8d9b5] sm:text-4xl">
          오늘의 운세 💩
        </h1>
        <p className="text-[#6b4423] dark:text-[#c9a66b]">
          낮과 밤, 두 장의 카드 중 하나를 골라 오늘의 운세를 확인해보세요
        </p>
      </div>
      <FortuneCard />
    </main>
  );
}

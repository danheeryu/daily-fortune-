import FortuneCard from "@/components/FortuneCard";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-b from-neutral-50 to-neutral-200 px-4 py-16 dark:from-neutral-950 dark:to-neutral-900">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
          오늘의 운세
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          낮과 밤, 두 장의 카드 중 하나를 골라 오늘의 운세를 확인해보세요
        </p>
      </div>
      <FortuneCard />
    </main>
  );
}

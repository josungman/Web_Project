import { useCounterStore } from "@/store/counter";
import { Button } from "@/components/ui/button";

export function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">카운트: {count}</p>
      <div className="flex gap-2">
        <Button onClick={increment}>+ 증가</Button>
        <Button variant="outline" onClick={decrement}>
          - 감소
        </Button>
      </div>
    </div>
  );
}

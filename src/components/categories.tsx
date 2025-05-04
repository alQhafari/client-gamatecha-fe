import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { request } from "../lib/request";
import { cn } from "../lib/utils";
import { generateUrl } from "../services/url";
import { BasePaginatedApiResponse } from "../types/api";
import { Button } from "./ui/button";

export function Categories({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (selected: number) => void;
}) {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<
      BasePaginatedApiResponse<{ id: number; name: string }>
    > => {
      return request(generateUrl("categories"));
    },
  });

  const categories = useMemo(() => {
    const categories = [{ id: 0, name: "Semua" }];

    if (data) {
      return categories.concat(data.data);
    }

    return [];
  }, [data]);

  return (
    <div className="flex flex-row justify-between gap-4 mb-8 overflow-scroll">
      {categories.map((category, key) => (
        <Button
          key={key}
          variant={"ghost"}
          className={cn(
            "rounded-full capitalize",
            selected !== category.id
              ? "border border-neutral-200"
              : "bg-white text-black"
          )}
          onClick={() => setSelected(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

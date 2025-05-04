import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export function PaginationComponent({
  currentPage,
  totalPage,
  setPage,
}: {
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage > 1}
            onClick={() => {
              if (currentPage > 1) {
                setPage(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            isActive={currentPage < totalPage}
            onClick={() => {
              if (currentPage < totalPage) {
                setPage(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

import React from "react";

import { Dropdown } from "../dropdown";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

import { cn } from "@/lib/utils";
import { IPagination } from "@/types/globalType";

interface paginateProps {
  configPagination: IPagination;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  className?: string;
}

const SizeOptions: string[] = ["10", "20", "30"];

const ControlledPaginate = ({
  configPagination: { page = 1, pageSize = 10, totalPages = 1 },
  setPage,
  setPageSize,
  className,
}: paginateProps) => {
  // Page Number
  const getVisiblePages = (current: number, total: number, maxVisible = 5) => {
    const pages: (number | string)[] = [];
    if (total <= maxVisible + 6) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      const startPage = Math.max(current - 1, 2);
      const endPage = Math.min(current + 1, total - 1);

      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < total - 1) pages.push("...");

      pages.push(total);
    }

    return pages;
  };

  // Next and previous handlers
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Page size change handler
  const handlePageSizeChange = (data: number) => {
    setPageSize(data);
  };

  return (
    <div className={cn("flex gap-8 items-center", className)}>
      <div className="flex items-center gap-2">
        <p className="title5 text-secondary-gray-900">Items per page</p>
        <Dropdown
          options={SizeOptions}
          placeholder="Search..."
          selected={pageSize.toString()}
          className="w-20 border border-primary-soft-red text-sm font-semibold rounded-md"
          onChange={(value) => handlePageSizeChange(Number(value))}
          border={false}
        />
      </div>

      <Pagination>
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={handleBack}
              className={cn(
                "cursor-pointer border border-secondary-gray-100 h-fit py-2 rounded-full text-secondary-gray-900",
                {
                  "text-secondary-gray-300 cursor-default": page === 1,
                }
              )}
            />
          </PaginationItem>

          <div className="flex items-center justify-center gap-2">
            {getVisiblePages(page, totalPages).map((pageLink, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(+pageLink)}
                  isActive={pageLink === page}
                  className={cn(
                    "cursor-pointer body3 text-secondary-gray-900",
                    {
                      "text-white bg-primary-soft-red h-fit py-1 rounded-full":
                        pageLink === page,
                    }
                  )}
                >
                  <p>{pageLink}</p>
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={cn(
                "cursor-pointer border border-secondary-gray-100 h-fit py-2 rounded-full text-secondary-gray-900",
                {
                  "text-secondary-gray-300 cursor-default": page === totalPages,
                }
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { ControlledPaginate };

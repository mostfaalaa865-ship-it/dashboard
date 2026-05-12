import ReactPaginate from "react-paginate";

export default function PaginatedItems({
  pageCount,
  onPageChange,
  currentPage,
}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      previousLabel="Prev"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageCount={pageCount}
      forcePage={currentPage}
      containerClassName="flex gap-2 mt-4"
      pageClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
      activeClassName="bg-[#6696F5] text-white"
      previousClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
      nextClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
    />
  );
}

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
      pageLinkClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
      activeLinkClassName="bg-[#6696F5] text-white"
      previousLinkClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
      nextLinkClassName="border border-[#6696F5] px-3 py-1 rounded cursor-pointer"
    />
  );
}

function TableSkeleton({ rows, cols }) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={rowIndex} className="animate-pulse">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <td key={colIndex} className="px-4 py-3">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </td>
      ))}
    </tr>
  ));
}

export default TableSkeleton;

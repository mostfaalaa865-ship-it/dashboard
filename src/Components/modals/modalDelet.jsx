function ModalDelete({
  open,
  setOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-white rounded-lg p-6 w-[450px]">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-2 text-gray-500">{message}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;

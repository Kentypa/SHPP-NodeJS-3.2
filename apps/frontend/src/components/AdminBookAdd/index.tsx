import { FC } from "react";

export const AdminBookAdd: FC = () => {
  return (
    <div className="border border-gray-600 p-6 rounded-xl max-w-2xl w-full mx-auto max-h-100">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Add new book</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <input placeholder="Book name" className="border rounded-lg p-2" />
          <input
            placeholder="Year"
            type="number"
            className="border rounded-lg p-2"
          />
          <label className="flex flex-col gap-2">
            <input type="file" className="hidden" id="image-upload" />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-100 border rounded-lg p-2 text-center"
            >
              Load image
            </label>
          </label>
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          <input placeholder="author1" className="border rounded-lg p-2" />
          <input placeholder="author2" className="border rounded-lg p-2" />
          <input placeholder="author3" className="border rounded-lg p-2" />
        </div>

        <div className="col-span-1">
          <textarea
            placeholder="Book description"
            rows={6}
            className="w-full border rounded-lg p-2 resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button className="bg-green-300 hover:bg-green-400 text-black px-5 py-2 rounded-xl text-sm font-semibold">
          ADD &gt;
        </button>
      </div>
    </div>
  );
};

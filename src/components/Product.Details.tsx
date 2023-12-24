import React from "react";

interface IProps {
  data: IProducts | null | undefined;
  onClose: () => void;
}

const Details = ({ data, onClose }: IProps) => {
  if (!data) {
    return null;
  }

  return (
    <div className="bg-gray-500 fixed inset-0 z-10 overflow-y-auto bg-opacity-50">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-gray-900 text-lg font-medium leading-6">
                  {data?.product_name}
                </h3>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">
                    Giá: {data?.price} VND
                  </p>
                  <p className="text-gray-500 text-sm">
                    Danh mục: {data?.category_id.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 mt-3 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

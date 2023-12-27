"use client";

interface IProps {
  onClose: () => void;
}

const Payment = ({ onClose }: IProps) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray bg-opacity-50">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <form
          onSubmit={handleSubmit}
          className="my-8 inline-block w-full max-w-7xl transform overflow-hidden rounded-lg border-4 bg-white text-left align-middle shadow-xl transition-all"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2">
                  <div>
                    <p>Giá dịch vụ</p>
                  </div>
                  <div>b</div>

                  <div>
                    <p>Số giờ sử dụng</p>
                  </div>
                  <div>b</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t-2 px-4 py-3 sm:px-6">
            <button className="btn btn-accent" type="submit">
              Xác nhận
            </button>
            <button className="btn btn-error" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;

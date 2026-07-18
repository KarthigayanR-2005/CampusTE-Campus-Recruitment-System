import {
    LogOut,
    X,
    AlertCircle,
  } from "lucide-react";
  
  function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
  }) {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <AlertCircle size={40} />
          </div>
  
          <h2
            id="logout-modal-title"
            className="mt-6 text-center text-3xl font-bold text-neutral-900"
          >
            Log Out?
          </h2>
  
          <p className="mt-4 text-center leading-7 text-neutral-600">
            Are you sure you want to log out of your CampusTE account?
            You will need to sign in again to access your dashboard.
          </p>
  
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              <X size={18} />
              Cancel
            </button>
  
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LogoutModal;
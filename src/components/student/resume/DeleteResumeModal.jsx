import {
    AlertTriangle,
    Trash2,
    X,
  } from "lucide-react";
  
  function DeleteResumeModal({
    isOpen,
    onClose,
    onConfirm,
  }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
  
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
  
          {/* Icon */}
  
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
  
            <AlertTriangle
              size={40}
              className="text-red-600"
            />
  
          </div>
  
          {/* Title */}
  
          <h2 className="mt-6 text-center text-3xl font-bold text-neutral-800">
            Delete Resume?
          </h2>
  
          {/* Description */}
  
          <p className="mt-4 text-center leading-7 text-neutral-500">
  
            Are you sure you want to delete your current resume?
  
            <br />
            <br />
  
            This action cannot be undone.
            You will need to upload a new resume before applying
            for jobs again.
  
          </p>
  
          {/* Buttons */}
  
          <div className="mt-8 flex gap-4">
  
            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
  
              <X size={18} />
  
              Cancel
  
            </button>
  
            <button
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
  
              <Trash2 size={18} />
  
              Delete
  
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default DeleteResumeModal;
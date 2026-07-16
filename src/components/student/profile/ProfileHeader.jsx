import { Camera, Pencil } from "lucide-react";

function ProfileHeader() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-6">

          {/* Avatar */}

          <div className="relative">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-4xl font-bold text-white">
              RK
            </div>

            <button className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg transition hover:bg-neutral-100">
              <Camera size={18} />
            </button>

          </div>

          {/* Details */}

          <div>

            <h1 className="text-3xl font-bold text-neutral-900">
              Student Name
            </h1>

            <p className="mt-2 text-neutral-600">
              B.Tech Computer Science Engineering
            </p>

            <p className="mt-1 text-neutral-500">
              Amrita Vishwa Vidyapeetham
            </p>

          </div>

        </div>

        {/* Edit */}

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02]">

          <Pencil size={18} />

          Edit Profile

        </button>

      </div>

    </section>
  );
}

export default ProfileHeader;
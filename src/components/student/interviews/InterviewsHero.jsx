import { CalendarCheck, Plus } from "lucide-react";

function InterviewsHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">

      {/* Background Decorations */}

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

            <CalendarCheck size={34} />

          </div>

          <h1 className="text-4xl font-bold">
            My Interviews
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-blue-100">

            Keep track of your interview schedule, upcoming rounds,
            interview details, recruiters, meeting links, and
            preparation progress—all in one place.

          </p>

        </div>

        {/* Right */}

        <button className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:scale-105">

          <Plus size={20} />

          Add Interview

        </button>

      </div>

    </section>
  );
}

export default InterviewsHero;
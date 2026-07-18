import { BriefcaseBusiness, PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <BriefcaseBusiness size={29} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
            Recruiter Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Welcome back, Recruiter
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-blue-100">
            Manage job postings, review candidates, schedule interviews, and
            track your complete hiring process from one place.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <button
            type="button"
            onClick={() => navigate("/recruiter/post-job")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:scale-[1.02] hover:shadow-lg"
          >
            <PlusCircle size={19} />
            Post New Job
          </button>

          <button
            type="button"
            onClick={() => navigate("/recruiter/candidates")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <Search size={19} />
            Search Candidates
          </button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
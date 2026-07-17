import {
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
  } from "lucide-react";
  
  function ResumeScore({ resume }) {
    const score = resume.atsScore;
  
    return (
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        {/* Header */}
  
        <div className="flex items-center gap-3">
  
          <ShieldCheck
            className="text-blue-600"
            size={28}
          />
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-800">
              AI Resume Score
            </h2>
  
            <p className="text-neutral-500">
              ATS compatibility analysis powered by CampusTE AI.
            </p>
  
          </div>
  
        </div>
  
        {/* Score */}
  
        <div className="mt-10 flex flex-col items-center">
  
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-blue-500 bg-blue-50">
  
            <div className="text-center">
  
              <p className="text-5xl font-bold text-blue-600">
                {score}
              </p>
  
              <p className="mt-1 text-sm text-neutral-500">
                /100
              </p>
  
            </div>
  
          </div>
  
          <div className="mt-6 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
  
            <TrendingUp
              size={18}
              className="text-green-600"
            />
  
            <span className="font-semibold text-green-700">
              Excellent Resume
            </span>
  
          </div>
  
        </div>
  
        {/* Progress */}
  
        <div className="mt-10">
  
          <div className="mb-2 flex items-center justify-between">
  
            <span className="font-medium text-neutral-700">
              ATS Compatibility
            </span>
  
            <span className="font-bold text-blue-600">
              {score}%
            </span>
  
          </div>
  
          <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
  
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              style={{
                width: `${score}%`,
              }}
            />
  
          </div>
  
        </div>
  
        {/* Summary */}
  
        <div className="mt-8 rounded-2xl bg-green-50 p-6">
  
          <div className="flex items-start gap-3">
  
            <CheckCircle2
              className="mt-1 text-green-600"
              size={22}
            />
  
            <div>
  
              <h3 className="font-semibold text-green-800">
                AI Summary
              </h3>
  
              <p className="mt-2 text-sm leading-7 text-green-700">
  
                Your resume is highly ATS-friendly and is likely to
                perform well during automated screening. Minor
                improvements such as adding measurable achievements
                and role-specific keywords can further improve your
                chances of getting shortlisted.
  
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeScore;
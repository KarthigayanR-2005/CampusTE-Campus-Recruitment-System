import {
    Sparkles,
    CheckCircle2,
    ArrowRight,
  } from "lucide-react";
  
  function ResumeSuggestions({ resume }) {
    return (
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        {/* Header */}
  
        <div className="flex items-center gap-3">
  
          <Sparkles
            className="text-purple-600"
            size={28}
          />
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-800">
              AI Resume Suggestions
            </h2>
  
            <p className="text-neutral-500">
              Personalized recommendations to improve your resume and
              increase your chances of getting shortlisted.
            </p>
  
          </div>
  
        </div>
  
        {/* Suggestions */}
  
        <div className="mt-8 space-y-5">
  
          {resume.suggestions.map((suggestion, index) => (
  
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
  
              <div className="rounded-full bg-green-100 p-2">
  
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
  
              </div>
  
              <div className="flex-1">
  
                <h3 className="font-semibold text-neutral-800">
                  Suggestion {index + 1}
                </h3>
  
                <p className="mt-2 leading-7 text-neutral-600">
                  {suggestion}
                </p>
  
              </div>
  
              <ArrowRight
                className="text-neutral-400"
                size={20}
              />
  
            </div>
  
          ))}
  
        </div>
  
        {/* Footer */}
  
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
  
          <h3 className="text-lg font-semibold">
            💡 AI Career Tip
          </h3>
  
          <p className="mt-3 leading-7 text-blue-100">
  
            Recruiters typically spend less than 10 seconds reviewing
            a resume. Highlight your strongest achievements, quantify
            your impact, and tailor your resume for each job
            application to maximize your chances of selection.
  
          </p>
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeSuggestions;
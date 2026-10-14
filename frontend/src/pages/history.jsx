import {
  History as HistoryIcon,
  Brain,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function History() {
  const history = JSON.parse(
    localStorage.getItem("assessmentHistory") || "[]",
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <HistoryIcon size={25} />
          </div>

          <p className="text-sm font-medium text-emerald-600">
            Your Records
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Assessment History
          </h1>

          <p className="mt-2 text-slate-500">
            Review your previous wellness assessments and
            predicted scores.
          </p>
        </section>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Brain
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No assessments yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Complete your first assessment and your result will
              appear here.
            </p>

            <a
              href="/assessment"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Start Assessment
              <ArrowRight size={17} />
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Brain size={22} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Wellness Assessment
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays size={14} />

                        {new Date(item.date).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-slate-400">
                        Score
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        {Number(item.score).toFixed(2)}
                        <span className="ml-1 text-sm font-medium text-slate-400">
                          /10
                        </span>
                      </p>
                    </div>

                    <a
                      href="/analysis"
                      className="rounded-xl p-3 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-600"
                    >
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default History;
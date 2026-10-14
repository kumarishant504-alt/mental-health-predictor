import {
  Brain,
  Moon,
  Smartphone,
  BookOpen,
  Activity,
  ArrowRight,
  RefreshCw,
  Info,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function getScoreStatus(score) {
  if (score >= 7.5) {
    return {
      label: "Higher wellness range",
      description:
        "Your current responses indicate a relatively positive wellness pattern.",
      className: "text-emerald-700 bg-emerald-50",
    };
  }

  if (score >= 5.5) {
    return {
      label: "Moderate wellness range",
      description:
        "Your responses show a mixed wellness pattern with areas that may benefit from attention.",
      className: "text-amber-700 bg-amber-50",
    };
  }

  return {
    label: "Lower wellness range",
    description:
      "Your responses indicate several lifestyle areas that may benefit from improvement.",
    className: "text-orange-700 bg-orange-50",
  };
}

function Analysis() {
  const savedData = localStorage.getItem("latestPrediction");

  if (!savedData) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl py-20 text-center">
          <Brain className="mx-auto text-slate-300" size={55} />

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            No assessment available
          </h1>

          <p className="mt-2 text-slate-500">
            Complete an assessment first to see your analysis.
          </p>

          <a
            href="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Start Assessment
            <ArrowRight size={17} />
          </a>
        </div>
      </DashboardLayout>
    );
  }

  const data = JSON.parse(savedData);
  const form = data.form || data;

  const score = Number(data.score);
  const status = getScoreStatus(score);

  const factors = [
    {
      name: "Sleep",
      value: `${form.sleep_hours_per_night} hrs`,
      icon: Moon,
      percentage: Math.min(
        (form.sleep_hours_per_night / 9.9) * 100,
        100,
      ),
    },
    {
      name: "Screen Usage",
      value: `${form.avg_daily_usage_hours} hrs`,
      icon: Smartphone,
      percentage: Math.min(
        (form.avg_daily_usage_hours / 8.8) * 100,
        100,
      ),
    },
    {
      name: "Study",
      value: `${form.study_hours} hrs`,
      icon: BookOpen,
      percentage: Math.min(
        (form.study_hours / 8.3) * 100,
        100,
      ),
    },
    {
      name: "Physical Activity",
      value: `${form.physical_activity_hours} hrs`,
      icon: Activity,
      percentage: Math.min(
        (form.physical_activity_hours / 4.1) * 100,
        100,
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Header */}
        <section>
          <p className="text-sm font-medium text-emerald-600">
            Assessment Analysis
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Your wellness snapshot
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what our machine-learning model estimated from
            your submitted lifestyle information.
          </p>
        </section>

        {/* Score */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-emerald-600 p-8 text-white shadow-sm lg:col-span-2">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Brain size={25} />
                </div>

                <p className="mt-6 text-sm text-emerald-100">
                  Predicted Mental Health Score
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-6xl font-bold">
                    {score.toFixed(2)}
                  </span>

                  <span className="text-lg text-emerald-100">
                    / 10
                  </span>
                </div>
                <div className="mt-5 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{
                      width: `${Math.min((score / 10) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="max-w-sm">
                <div className="rounded-xl bg-white/10 p-5">
                  <p className="font-semibold">
                    {status.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-emerald-50">
                    {status.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Info size={20} />
              </div>

              <h3 className="font-semibold text-slate-900">
                About this score
              </h3>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              This score is generated from patterns learned from
              the project dataset. It is a wellness indicator for
              this application and is not a clinical diagnosis.
            </p>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Model: Extra Trees Regressor
            </p>
          </div>
        </section>

        {/* Factors */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-900">
              Lifestyle snapshot
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your submitted daily lifestyle patterns
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {factors.map((factor) => {
              const Icon = factor.icon;

              return (
                <div key={factor.name}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                        <Icon size={18} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {factor.name}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-900">
                      {factor.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${factor.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key observations */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Your responses
            </h2>

            <div className="mt-5 space-y-3">
              <div className="mt-5 space-y-3">
                <Row label="Age" value={`${form.age} years`} />

                <Row
                  label="Gender"
                  value={form.gender}
                />

                <Row
                  label="Country"
                  value={form.country}
                />

                <Row
                  label="Academic Level"
                  value={form.academic_level}
                />

                <Row
                  label="Main Platform"
                  value={form.most_used_platform}
                />

                <Row
                  label="Primary Usage"
                  value={form.purpose_of_use}
                />

                <Row
                  label="Daily Unlocks"
                  value={form.daily_unlocks}
                />
              </div>
              <Row
                label="Academic Level"
                value={data.academic_level}
              />
              <Row
                label="Main Platform"
                value={data.most_used_platform}
              />
              <Row
                label="Primary Usage"
                value={data.purpose_of_use}
              />
              <Row
                label="Daily Unlocks"
                value={data.daily_unlocks}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              What you can focus on
            </h2>

            <div className="mt-5 space-y-4">
              {form.sleep_hours_per_night < 7 && (
                <Recommendation
                  title="Prioritize consistent sleep"
                  text="Your reported sleep duration is below 7 hours. A more consistent sleep routine may be a useful area to work on."
                />
              )}

              {form.avg_daily_usage_hours > 6 && (
                <Recommendation
                  title="Review your screen routine"
                  text="Your reported daily screen usage is relatively high. Consider introducing screen-free periods during the day."
                />
              )}

              {form.physical_activity_hours < 1 && (
                <Recommendation
                  title="Add more movement"
                  text="Your reported physical activity is low. Short walks or regular movement breaks can be practical starting points."
                />
              )}

              {form.study_hours < 2 && (
                <Recommendation
                  title="Create a study routine"
                  text="A consistent study schedule can help create more structure in your daily routine."
                />
              )}

              {form.sleep_hours_per_night >= 7 &&
                form.avg_daily_usage_hours <= 6 &&
                form.physical_activity_hours >= 1 && (
                  <Recommendation
                    title="Keep your current balance"
                    text="Your reported lifestyle inputs show several balanced areas. Continue maintaining habits that work well for you."
                  />
                )}
            </div>
          </div>
        </section>

        {/* Bottom actions */}
        <section className="flex flex-wrap gap-3 pb-8">
          <a
            href="/assessment"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <RefreshCw size={17} />
            Take Again
          </a>

          <a
            href="/recommendations"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Recommendations
            <ArrowRight size={17} />
          </a>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}

function Recommendation({ title, text }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

export default Analysis;
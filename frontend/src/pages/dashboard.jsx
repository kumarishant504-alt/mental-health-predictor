import { useEffect, useState } from "react";
import {
  Moon,
  Smartphone,
  BookOpen,
  Activity,
  ArrowRight,
  Brain,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";



function Dashboard() {
  const [latestAssessment, setLatestAssessment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("latestPrediction");

    if (saved) {
      setLatestAssessment(JSON.parse(saved));
    }

    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const score = latestAssessment?.score;

  const sleep = latestAssessment?.form?.sleep_hours_per_night;

  const screenUsage =
    latestAssessment?.form?.avg_daily_usage_hours;

  const studyHours =
    latestAssessment?.form?.study_hours;

  const physicalActivity =
    latestAssessment?.form?.physical_activity_hours;

  const physicalActivityPercent =
    physicalActivity != null
      ? Math.min((physicalActivity / 4) * 100, 100)
      : 0;

  const sleepPercent =
    sleep != null
      ? Math.min((sleep / 10) * 100, 100)
      : 0;

  const studyPercent =
    studyHours != null
      ? Math.min((studyHours / 8) * 100, 100)
      : 0;

  const stats = [
    {
      title: "Wellness Score",
      value: score != null ? score.toFixed(1) : "--",
      suffix: "/ 10",
      icon: Brain,
    },
    {
      title: "Sleep",
      value: sleep != null ? sleep : "--",
      suffix: " hrs",
      icon: Moon,
    },
    {
      title: "Screen Usage",
      value: screenUsage != null ? screenUsage : "--",
      suffix: " hrs",
      icon: Smartphone,
    },
    {
      title: "Study Time",
      value: studyHours != null ? studyHours : "--",
      suffix: " hrs",
      icon: BookOpen,
    },
    {
      title: "Physical Activity",
      value: physicalActivity != null ? physicalActivity : "--",
      suffix: " hrs",
      icon: Activity,
    }
  ];

  const wellnessStatus =
    score == null
      ? "No assessment yet"
      : score >= 7.5
        ? "Higher wellness range"
        : score >= 5.5
          ? "Moderate wellness range"
          : "Lower wellness range";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <p className="text-sm font-medium text-emerald-600">
            Your wellness overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Welcome, {currentUser?.name || "there"}!
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your current wellness patterns.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <Icon size={21} />
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    {stat.suffix}
                  </span>
                </p>
                {stat.title === "Wellness Score" && (
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {wellnessStatus}
                  </p>
                )}
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-emerald-600 p-7 text-white lg:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-white/15 p-3">
                  <Brain size={24} />
                </div>

                <h2 className="text-2xl font-bold">
                  Check in with yourself
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50">
                  Complete a short assessment based on your daily
                  habits, sleep, study routine, physical activity,
                  and digital usage.
                </p>
              </div>

              <a
                href="/assessment"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                {latestAssessment ? "Retake assessment" : "Start assessment"}
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Activity size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Daily balance
                </h3>
                <p className="text-xs text-slate-500">
                  Your activity snapshot
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Physical activity
                  </span>
                  <span className="font-medium">
                    {physicalActivity != null
                      ? `${physicalActivity} hrs`
                      : "--"}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${physicalActivityPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Sleep
                  </span>
                  <span className="font-medium">
                    {sleep != null ? `${sleep} hrs` : "--"}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${sleepPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-600">
                    Study
                  </span>
                  <span className="font-medium">
                    {studyHours != null ? `${studyHours} hrs` : "--"}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-violet-500"
                    style={{ width: `${studyPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
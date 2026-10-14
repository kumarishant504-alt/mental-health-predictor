import {
  ArrowRight,
  Brain,
  ShieldCheck,
  Activity,
  Moon,
  Smartphone,
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <Brain size={22} />
          </div>

          <div>
            <p className="font-bold">MindWell</p>
            <p className="text-xs text-slate-400">
              Mental Health Predictor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <ShieldCheck size={16} />
              Data-driven wellness insights
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Understand your
              <span className="text-emerald-400">
                {" "}daily wellness patterns.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Mental Health Predictor analyzes everyday lifestyle
              patterns such as sleep, screen usage, study time and
              physical activity to provide a personalized
              dataset-derived wellness indicator.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white hover:bg-emerald-400"
              >
                Take an assessment
                <ArrowRight size={18} />
              </a>

              <a
                href="/login"
                className="rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-slate-200 hover:bg-slate-900"
              >
                Sign in
              </a>
            </div>
          </div>

          {/* Preview Card */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Wellness Overview
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Your daily snapshot
                  </h2>
                </div>

                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <Activity size={22} />
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-500 p-6">
                <p className="text-sm text-emerald-100">
                  Wellness Score
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">7.4</span>
                  <span className="text-emerald-100">/ 10</span>
                </div>

                <div className="mt-5 h-2 rounded-full bg-white/20">
                  <div className="h-2 w-3/4 rounded-full bg-white" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniStat
                  icon={Moon}
                  label="Sleep"
                  value="7.2h"
                />

                <MiniStat
                  icon={Smartphone}
                  label="Screen"
                  value="4.8h"
                />

                <MiniStat
                  icon={Activity}
                  label="Activity"
                  value="1.8h"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-900 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-emerald-400">
                HOW IT WORKS
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                A simple way to understand your routine
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <Feature
                icon={Brain}
                title="AI-powered prediction"
                text="A trained Extra Trees regression model analyzes your submitted lifestyle patterns."
              />

              <Feature
                icon={Activity}
                title="Lifestyle insights"
                text="Review the daily factors included in your assessment and understand your current patterns."
              />

              <Feature
                icon={ShieldCheck}
                title="Privacy focused"
                text="The current demo stores assessment history locally in your browser."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 px-6 py-8 text-center text-sm text-slate-500">
        Mental Health Predictor · Educational ML Project
      </footer>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <Icon size={17} className="text-slate-400" />

      <p className="mt-3 text-xs text-slate-500">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
        <Icon size={21} />
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {text}
      </p>
    </div>
  );
}

export default Landing;
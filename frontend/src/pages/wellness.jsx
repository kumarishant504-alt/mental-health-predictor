import {
  HeartPulse,
  Moon,
  Smartphone,
  Activity,
  Brain,
  BookOpen,
  Sun,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

const guides = [
  {
    title: "Build a healthy sleep routine",
    description:
      "Keep a consistent sleep schedule and create a calm environment before going to bed.",
    icon: Moon,
  },
  {
    title: "Take regular screen breaks",
    description:
      "Step away from your phone or computer periodically, especially during long study sessions.",
    icon: Smartphone,
  },
  {
    title: "Stay physically active",
    description:
      "Walking, stretching, sports, or other enjoyable movement can help you maintain an active routine.",
    icon: Activity,
  },
  {
    title: "Create focused study sessions",
    description:
      "Break large tasks into smaller sessions and take short breaks between periods of focused work.",
    icon: BookOpen,
  },
  {
    title: "Make time to reset",
    description:
      "Give yourself time away from academic and digital demands to relax and recharge.",
    icon: Sun,
  },
  {
    title: "Pay attention to how you feel",
    description:
      "Regularly checking in with yourself can help you notice changes in your habits and overall wellbeing.",
    icon: Brain,
  },
];

function Wellness() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <HeartPulse size={25} />
          </div>

          <p className="text-sm font-medium text-emerald-600">
            Everyday Wellness
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Wellness Guide
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Simple habits and practical ideas that can help you
            maintain a balanced daily routine.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;

            return (
              <div
                key={guide.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon size={21} />
                </div>

                <h2 className="mt-5 font-semibold text-slate-900">
                  {guide.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {guide.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl bg-slate-900 p-7 text-white">
          <div className="flex gap-4">
            <div className="rounded-xl bg-white/10 p-3">
              <HeartPulse size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Small changes can add up
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Wellness is not about maintaining a perfect routine.
                Focus on realistic habits that fit your schedule and
                make sense for your everyday life.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Wellness;
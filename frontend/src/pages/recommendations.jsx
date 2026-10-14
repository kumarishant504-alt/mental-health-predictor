import {
  Moon,
  Smartphone,
  Activity,
  BookOpen,
  Brain,
  CheckCircle2,
  Utensils,
  Droplets,
  Music,
  Heart,
  Users,
  Sun,
  Wind,
  CalendarDays,
  Clock,
  Coffee,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function Recommendations() {
  const savedData = localStorage.getItem("latestPrediction");
  const data = savedData ? JSON.parse(savedData) : null;

  // Supports both current flat assessment structure
  // and the older nested { form: {...} } structure.
  const form = data?.form || data || {};

  const score = Number(data?.score ?? 0);

  const sleep = Number(form.sleep_hours_per_night ?? 0);
  const screenUsage = Number(form.avg_daily_usage_hours ?? 0);
  const studyHours = Number(form.study_hours ?? 0);
  const physicalActivity = Number(
    form.physical_activity_hours ?? 0
  );
  const dailyUnlocks = Number(form.daily_unlocks ?? 0);

  const recommendations = [];

  /*
   * SLEEP
   */
  if (sleep < 7) {
    recommendations.push({
      category: "Sleep",
      title: "Build a consistent sleep routine",
      text:
        "Your reported sleep duration is below 7 hours. Try keeping a consistent bedtime and wake-up time and give yourself a calm wind-down period before sleeping.",
      icon: Moon,
      priority: "High",
    });
  } else {
    recommendations.push({
      category: "Sleep",
      title: "Protect your sleep routine",
      text:
        "Your reported sleep duration is 7 hours or more. Try keeping your sleep and wake times consistent and maintain a relaxing routine before bed.",
      icon: Moon,
      priority: "Maintain",
    });
  }

  /*
   * FOOD
   */
  recommendations.push({
    category: "Nutrition",
    title: "Choose balanced everyday meals",
    text:
      "Build meals around vegetables, fruits, whole grains, pulses, dairy or other protein sources, and healthy fats. For study sessions, simple options such as fruit, yogurt, nuts, roasted chana, or a light homemade snack can be practical choices.",
    icon: Utensils,
    priority: "Lifestyle",
  });

  /*
   * HYDRATION
   */
  recommendations.push({
    category: "Hydration",
    title: "Keep water within reach",
    text:
      "Keep a water bottle nearby during study and screen sessions. Regular hydration throughout the day is a simple habit that can support normal energy and concentration.",
    icon: Droplets,
    priority: "Lifestyle",
  });

  /*
   * SCREEN USAGE
   */
  if (screenUsage > 6 || dailyUnlocks > 200) {
    recommendations.push({
      category: "Digital Wellness",
      title: "Create screen-free periods",
      text:
        "Your reported digital usage is relatively high. Try creating focused blocks where notifications are silenced and your phone is kept away from your immediate workspace.",
      icon: Smartphone,
      priority: "High",
    });
  } else {
    recommendations.push({
      category: "Digital Wellness",
      title: "Keep your digital habits intentional",
      text:
        "Your current screen usage does not trigger the application's high-usage threshold. Continue separating entertainment time from study, meals, and sleep.",
      icon: Smartphone,
      priority: "Maintain",
    });
  }

  /*
   * PHYSICAL ACTIVITY
   */
  if (physicalActivity < 1) {
    recommendations.push({
      category: "Movement",
      title: "Add short movement sessions",
      text:
        "Your reported physical activity is below 1 hour. Start with manageable activities such as walking, stretching, badminton, cycling, or a short beginner workout.",
      icon: Activity,
      priority: "High",
    });
  } else {
    recommendations.push({
      category: "Movement",
      title: "Keep your movement habit",
      text:
        "Your reported physical activity is at least 1 hour. Continue choosing activities you enjoy and break up long periods of sitting with short movement breaks.",
      icon: Activity,
      priority: "Maintain",
    });
  }

  /*
   * YOGA
   */
  recommendations.push({
    category: "Yoga",
    title: "Try a short yoga session",
    text:
      "A simple 5–10 minute session can include gentle neck and shoulder stretches, cat-cow, child's pose, seated forward stretching, and relaxed breathing. Stop if a movement causes pain or discomfort.",
    icon: Heart,
    priority: "Optional",
  });

  /*
   * MEDITATION
   */
  recommendations.push({
    category: "Mindfulness",
    title: "Try a 5-minute breathing exercise",
    text:
      "Sit comfortably, relax your shoulders, and focus your attention on your breathing for five minutes. When your attention wanders, gently bring it back to your breath.",
    icon: Wind,
    priority: "Optional",
  });

  /*
   * MUSIC
   */
  recommendations.push({
    category: "Music & Audio",
    title: "Match your audio to the activity",
    text:
      "For studying, try instrumental, ambient, classical, or low-distraction music. For relaxation, you can experiment with calm acoustic music, nature sounds, or slow instrumental tracks. Choose whatever helps you feel comfortable and focused.",
    icon: Music,
    priority: "Optional",
  });

  /*
   * STUDY
   */
  if (studyHours < 2) {
    recommendations.push({
      category: "Study",
      title: "Create focused study blocks",
      text:
        "Your reported study time is below 2 hours. Try one or two focused 25–45 minute sessions with short breaks instead of trying to study for long uninterrupted periods.",
      icon: BookOpen,
      priority: "High",
    });
  } else {
    recommendations.push({
      category: "Study",
      title: "Protect your study focus",
      text:
        "You are already reporting at least 2 hours of study time. Try separating focused study blocks from entertainment and unnecessary phone checking.",
      icon: BookOpen,
      priority: "Maintain",
    });
  }

  /*
   * COMMUNICATION
   */
  recommendations.push({
    category: "Communication",
    title: "Stay connected with people you trust",
    text:
      "Make time for genuine conversations with friends, classmates, family members, or other people you trust. If something has been bothering you, talking about it can be a useful way to avoid handling everything alone.",
    icon: Users,
    priority: "Lifestyle",
  });

  /*
   * MORNING
   */
  recommendations.push({
    category: "Daily Routine",
    title: "Start your morning intentionally",
    text:
      "Try beginning the day with water, basic hygiene, a few minutes of movement, breakfast, and a quick plan for your main priorities before spending extended time on social media.",
    icon: Sun,
    priority: "Lifestyle",
  });

  /*
   * EVENING
   */
  recommendations.push({
    category: "Daily Routine",
    title: "Create a calmer evening",
    text:
      "Use the last part of your evening for lighter activities such as stretching, reading, music, conversation, or preparation for the next day rather than continuous scrolling.",
    icon: Coffee,
    priority: "Lifestyle",
  });

  /*
   * 7-DAY PLAN
   */
  const weeklyPlan = [
    {
      day: "Day 1",
      title: "Reset your routine",
      text: "Set a consistent target bedtime and wake-up time.",
    },
    {
      day: "Day 2",
      title: "Move more",
      text: "Add a short walk, stretching session, or enjoyable physical activity.",
    },
    {
      day: "Day 3",
      title: "Digital break",
      text: "Create at least one phone-free study or relaxation block.",
    },
    {
      day: "Day 4",
      title: "Mindful pause",
      text: "Try five minutes of focused breathing or quiet meditation.",
    },
    {
      day: "Day 5",
      title: "Connect",
      text: "Spend some intentional time talking with someone you trust.",
    },
    {
      day: "Day 6",
      title: "Healthy routine",
      text: "Choose balanced meals and keep water available throughout the day.",
    },
    {
      day: "Day 7",
      title: "Reflect",
      text: "Review which habits felt useful and decide what you want to continue.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Brain size={25} />
          </div>

          <p className="text-sm font-medium text-emerald-600">
            Personalized Wellness Center
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Recommendations
          </h1>

          <p className="mt-2 max-w-3xl text-slate-500">
            Explore practical ideas for improving your daily routine,
            nutrition, sleep, movement, digital habits, mindfulness,
            study routine, and social connection.
          </p>
        </section>

        {/* Assessment summary */}
        {data && (
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Based on your latest assessment
                </p>

                <p className="mt-1 text-sm text-emerald-800">
                  Your recommendations are being personalized from
                  your submitted lifestyle patterns.
                </p>
              </div>

              <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
                <p className="text-xs text-slate-400">
                  Wellness Score
                </p>

                <p className="text-2xl font-bold text-emerald-700">
                  {score.toFixed(2)}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    / 10
                  </span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Quick snapshot */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Your current routine
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <Snapshot
              icon={Moon}
              label="Sleep"
              value={sleep ? `${sleep} hrs` : "--"}
            />

            <Snapshot
              icon={Smartphone}
              label="Screen Usage"
              value={
                screenUsage
                  ? `${screenUsage} hrs`
                  : "--"
              }
            />

            <Snapshot
              icon={Activity}
              label="Activity"
              value={
                physicalActivity
                  ? `${physicalActivity} hrs`
                  : "--"
              }
            />

            <Snapshot
              icon={BookOpen}
              label="Study"
              value={
                studyHours
                  ? `${studyHours} hrs`
                  : "--"
              }
            />

            <Snapshot
              icon={Smartphone}
              label="Unlocks"
              value={
                dailyUnlocks
                  ? dailyUnlocks
                  : "--"
              }
            />

          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Personalized suggestions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Areas you can explore based on your current routine.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {recommendations.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-emerald-600">
                          {item.category}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                          {item.priority}
                        </span>
                      </div>

                      <h3 className="mt-1 font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Daily routine */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Suggested daily routine
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A simple structure you can adapt to your own schedule.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <RoutineCard
              icon={Sun}
              time="Morning"
              title="Start calmly"
              text="Hydrate, have breakfast, move for a few minutes, and decide your main priorities."
            />

            <RoutineCard
              icon={BookOpen}
              time="Afternoon"
              title="Focus & reset"
              text="Use focused study blocks and take short movement breaks between sessions."
            />

            <RoutineCard
              icon={Moon}
              time="Evening"
              title="Slow down"
              text="Reduce unnecessary screen use, relax, connect with people, and prepare for sleep."
            />

          </div>
        </section>

        {/* 7 day plan */}
        <section>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your 7-day wellness plan
              </h2>

              <p className="text-sm text-slate-500">
                Small actions are easier to maintain than major changes.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {weeklyPlan.map((item) => (
              <div
                key={item.day}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600">
                    {item.day}
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-slate-300"
                  />
                </div>

                <h3 className="mt-3 font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick mindfulness */}
        <section className="grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl bg-slate-900 p-7 text-white">
            <Wind size={25} className="text-emerald-400" />

            <h2 className="mt-5 text-xl font-bold">
              5-minute reset
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Sit comfortably. Relax your shoulders. Take slow,
              comfortable breaths and bring your attention back to
              your breathing whenever your mind wanders.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400">
              <Clock size={16} />
              5 minutes
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-600 p-7 text-white">
            <Users size={25} />

            <h2 className="mt-5 text-xl font-bold">
              Don't isolate yourself
            </h2>

            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Make room for meaningful conversations and activities
              with people you trust. A simple conversation can be a
              valuable part of maintaining social wellbeing.
            </p>
          </div>

        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="font-semibold text-emerald-900">
            Important
          </h2>

          <p className="mt-2 text-sm leading-6 text-emerald-800">
            These suggestions are general wellness guidance based on
            the information submitted in your assessment. They are
            not medical advice, diagnosis, or a clinical treatment
            plan. Choose activities and foods that are appropriate
            for your individual circumstances.
          </p>
        </section>

      </div>
    </DashboardLayout>
  );
}

function Snapshot({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function RoutineCard({ icon: Icon, time, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-xs font-medium text-emerald-600">
            {time}
          </p>

          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

export default Recommendations;
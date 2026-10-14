import {
  LifeBuoy,
  Phone,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  ExternalLink,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function Support() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <LifeBuoy size={25} />
          </div>

          <p className="text-sm font-medium text-emerald-600">
            Help & Resources
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Support
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Find general guidance and resources when you need
            additional support.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <SupportCard
            icon={MessageCircle}
            title="Talk to someone"
            text="Consider reaching out to a trusted friend, family member, teacher, or counselor if you need someone to talk to."
          />

          <SupportCard
            icon={Phone}
            title="Call a helpline"
            text="If you need immediate support, consider calling a mental health helpline for guidance and resources."
          />
          <SupportCard
            icon={BookOpen}
            title="Learn more"
            text="Use reliable health and wellbeing resources to learn more about maintaining healthy routines."
          />

          <SupportCard
            icon={HeartHandshake}
            title="Professional support"
            text="If you're experiencing persistent or serious difficulties, consider speaking with a qualified mental-health professional."
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex gap-4">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Important
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Mental Health Predictor is an educational
                machine-learning project. Its predictions and
                recommendations are not a substitute for professional
                medical or psychological assessment.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-emerald-600 p-7 text-white">
          <h2 className="text-xl font-bold">
            Need immediate help?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
            If you or someone else is in immediate danger or needs
            urgent assistance, contact your local emergency service
            or go to the nearest emergency department.
          </p>

          <a
            href="tel:112"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm transition hover:bg-white/20"
          >
            <Phone size={16} />
            Call Emergency Support — 112
          </a>
        </section>
      </div>
    </DashboardLayout>
  );
}

function SupportCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <h2 className="mt-5 font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

export default Support;
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Shield,
  Trash2,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const clearHistory = () => {
    localStorage.removeItem("assessmentHistory");
    localStorage.removeItem("latestPrediction");

    alert("Assessment history cleared.");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <section>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <SettingsIcon size={24} />
          </div>

          <p className="text-sm font-medium text-emerald-600">
            Preferences
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Customize your Mental Health Predictor experience.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SettingRow
            icon={Bell}
            title="Assessment reminders"
            description="Receive reminders to check in with your wellness assessment."
            enabled={notifications}
            onChange={setNotifications}
          />

          <SettingRow
            icon={Moon}
            title="Compact interface"
            description="Use a more condensed layout throughout the application."
            enabled={compactMode}
            onChange={setCompactMode}
          />

          <div className="flex items-center justify-between gap-5 border-t border-slate-100 p-6">
            <div className="flex gap-4">
              <div className="rounded-xl bg-red-50 p-3 text-red-500">
                <Trash2 size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Clear assessment history
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Permanently remove locally stored assessment
                  results from this browser.
                </p>
              </div>
            </div>

            <button
              onClick={clearHistory}
              className="shrink-0 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Clear
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Shield size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Privacy
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This demo stores assessment history locally in your
                browser. No permanent user database is connected in
                this version.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-6">
      <div className="flex gap-4">
        <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
          <Icon size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-emerald-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Globe,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const userName = currentUser?.name || "User";
  const userEmail = currentUser?.email || "Not available";
  const initials = userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <section>
          <p className="text-sm font-medium text-emerald-600">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your personal information and account details.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-emerald-600 px-7 py-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-emerald-700">
                {initials}
              </div>

              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {userName}
                </h2>

                <p className="mt-1 text-sm text-emerald-100">
                  Mental Health Predictor user
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-7 md:grid-cols-2">
            <ProfileItem
              icon={User}
              label="Full Name"
              value={userName}
            />

            <ProfileItem
              icon={Mail}
              label="Email"
              value={userEmail}
            />

            <ProfileItem
              icon={GraduationCap}
              label="Academic Level"
              value="Not provided"
            />

            <ProfileItem
              icon={Globe}
              label="Country"
              value="Not provided"
            />

            <ProfileItem
              icon={CalendarDays}
              label="Member Since"
              value="September 2026"
            />

            <ProfileItem
              icon={ShieldCheck}
              label="Account Status"
              value="Active"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
      <div className="rounded-lg bg-white p-3 text-emerald-600 shadow-sm">
        <Icon size={19} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default Profile;
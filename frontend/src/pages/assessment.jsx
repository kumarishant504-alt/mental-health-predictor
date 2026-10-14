import { useState } from "react";
import {
  Brain,
  Moon,
  Smartphone,
  BookOpen,
  Activity,
  User,
  Globe2,
  Target,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";
import { predictMentalHealth } from "../services/api";

function Assessment() {
  const [form, setForm] = useState({
    age: 21,
    gender: "Male",
    country: "India",
    academic_level: "Undergraduate",
    most_used_platform: "Instagram",
    purpose_of_use: "Entertainment",
    avg_daily_usage_hours: 5,
    daily_unlocks: 170,
    study_hours: 3,
    physical_activity_hours: 1.5,
    sleep_hours_per_night: 7,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await predictMentalHealth(form);

      const assessment = {
        id: Date.now(),
        ...form,
        score: result.mental_health_score,
        date: new Date().toISOString(),
      };

      localStorage.setItem(
        "latestPrediction",
        JSON.stringify(assessment),
      );

      const history = JSON.parse(
        localStorage.getItem("assessmentHistory") || "[]",
      );

      history.unshift(assessment);

      localStorage.setItem(
        "assessmentHistory",
        JSON.stringify(history.slice(0, 20)),
      );

      window.location.href = "/analysis";
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the prediction service. Make sure the FastAPI server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Brain size={25} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Mental Health Assessment
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Tell us about your daily habits and lifestyle. Your
            responses will be analyzed by our machine-learning model
            to generate a dataset-derived wellness score.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Personal Information
                </h2>
                <p className="text-sm text-slate-500">
                  Basic information about you
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Age">
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="24"
                  value={form.age}
                  onChange={handleChange}
                  className="input"
                />
              </Field>

              <Field label="Gender">
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </Field>

              <Field label="Country">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Spain">Spain</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="Russia">Russia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field label="Academic Level">
                <select
                  name="academic_level"
                  value={form.academic_level}
                  onChange={handleChange}
                  className="input has-icon"
                >
                  <option>High School</option>
                  <option>Undergraduate</option>
                  <option>Graduate</option>
                </select>
              </Field>
            </div>
          </section>

          {/* Digital Habits */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <Smartphone size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Digital Habits
                </h2>
                <p className="text-sm text-slate-500">
                  Your typical digital usage
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Most Used Platform">
                <select
                  name="most_used_platform"
                  value={form.most_used_platform}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>YouTube</option>
                  <option>Twitter</option>
                  <option>Snapchat</option>
                  <option>WhatsApp</option>
                  <option>LINE</option>
                  <option>VKontakte</option>
                  <option>KakaoTalk</option>
                  <option>WeChat</option>
                </select>
              </Field>

              <Field label="Primary Purpose">
                <select
                  name="purpose_of_use"
                  value={form.purpose_of_use}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Networking</option>
                  <option>News</option>
                </select>
              </Field>

              <Field label="Daily Screen Usage (hours)">
                <div className="relative">
                  <Smartphone className="input-icon" />

                  <input
                    type="number"
                    name="avg_daily_usage_hours"
                    value={form.avg_daily_usage_hours}
                    onChange={handleChange}
                    className="input has-icon"
                    step="0.1"
                  />
                </div>
              </Field>

              <Field label="Daily Phone Unlocks">
                <input
                  type="number"
                  name="daily_unlocks"
                  min="62"
                  max="273"
                  value={form.daily_unlocks}
                  onChange={handleChange}
                  className="input"
                />
              </Field>
            </div>
          </section>

          {/* Lifestyle */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Activity size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Lifestyle
                </h2>
                <p className="text-sm text-slate-500">
                  Your daily routine
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Study Hours / Day">
                <div className="relative">
                  <BookOpen className="input-icon" size={18} />

                  <input
                    type="number"
                    name="study_hours"
                    min="0.3"
                    max="8.3"
                    step="0.1"
                    value={form.study_hours}
                    onChange={handleChange}
                    className="input has-icon"
                  />
                </div>
              </Field>

              <Field label="Physical Activity / Day">
                <div className="relative">
                  <Activity className="input-icon" size={18} />

                  <input
                    type="number"
                    name="physical_activity_hours"
                    min="0"
                    max="4.1"
                    step="0.1"
                    value={form.physical_activity_hours}
                    onChange={handleChange}
                    className="input has-icon"
                  />
                </div>
              </Field>

              <Field label="Sleep / Night">
                <div className="relative">
                  <Moon className="input-icon" size={18} />

                  <input
                    type="number"
                    name="sleep_hours_per_night"
                    min="3.6"
                    max="9.9"
                    step="0.1"
                    value={form.sleep_hours_per_night}
                    onChange={handleChange}
                    className="input has-icon"
                  />
                </div>
              </Field>
            </div>
          </section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Target size={18} />

              {loading
                ? "Analyzing..."
                : "Analyze My Wellness"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      {children}
    </label>
  );
}

export default Assessment;
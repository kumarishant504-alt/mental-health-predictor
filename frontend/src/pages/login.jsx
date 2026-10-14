import { useState } from "react";
import { Brain, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedUser = localStorage.getItem("registeredUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (
        user.email === form.email &&
        user.password === form.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        navigate("/dashboard");
        return;
      }

      alert("Invalid email or password.");
      return;
    }

    alert("No registered account found. Please create an account first.");
  };
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left section */}
          <div className="hidden bg-emerald-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/15 p-3">
                  <Brain size={26} />
                </div>

                <span className="text-xl font-bold">
                  Mental Health Predictor
                </span>
              </div>

              <div className="mt-20">
                <h1 className="text-4xl font-bold leading-tight">
                  Understand your daily wellness patterns.
                </h1>

                <p className="mt-5 max-w-md text-emerald-50 leading-7">
                  Track your lifestyle patterns, explore your predicted
                  wellness score, and get personalized insights.
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-100">
              Wellness insights powered by machine learning.
            </p>
          </div>

          {/* Right section */}
          <div className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">

              <div className="mb-8">
                <p className="text-sm font-medium text-emerald-600">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Continue to your wellness dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="input-icon"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="input has-icon"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="input-icon"
                    />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="input has-icon"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Login
                  <ArrowRight size={17} />
                </button>

              </form>

              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Create one
                </Link>
              </p>

              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="text-sm text-slate-400 hover:text-slate-600"
                >
                  ← Back to home
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
"use client";

import { useEffect, useState } from "react";
import { Building2, Palette, UserRound } from "lucide-react";

type U = {
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  businessName: string | null;
  businessEmail: string | null;
  businessPhone: string | null;
  businessAddress: string | null;
  businessWebsite: string | null;
  businessLogo: string | null;
};

export function SettingsForm({ user }: { user: U }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [tab, setTab] = useState("profile");
  const [msg, setMsg] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function setTheme(next: boolean) {
    setDark(next);
    localStorage.setItem("cf-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  async function save(fd: FormData) {
    setMsg("Saving...");

    const data = Object.fromEntries(fd);

    const r = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const j = await r.json();

    if (r.ok) {
      setCurrentUser((prev) => ({
        ...prev,
        ...data,
      } as U));

      setMsg("Changes saved successfully.");
    } else {
      setMsg(j.error || "Could not save");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
      <div className="card h-fit p-2">
        {[
          ["profile", "Profile", UserRound],
          ["business", "Business", Building2],
          ["appearance", "Appearance", Palette],
        ].map(([id, label, Icon]: any) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
              tab === id
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      <div className="card p-6 md:p-8">
        {tab === "profile" && (
          <form action={save} className="max-w-2xl space-y-5">
            <Head
              t="Profile information"
              d="Update the identity shown across your workspace."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <F n="name" l="Full name" v={currentUser.name} />
              <F
                n="email"
                l="Email"
                v={currentUser.email}
                type="email"
              />
              <F n="phone" l="Phone" v={currentUser.phone || ""} />
              <F
                n="image"
                l="Profile image URL"
                v={currentUser.image || ""}
              />
            </div>

            <Save msg={msg} />
          </form>
        )}

        {tab === "business" && (
          <form action={save} className="max-w-2xl space-y-5">
            <Head
              t="Business details"
              d="These details are used on your professional invoices."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <F
                n="businessName"
                l="Business name"
                v={currentUser.businessName || ""}
              />
              <F
                n="businessEmail"
                l="Business email"
                v={currentUser.businessEmail || ""}
                type="email"
              />
              <F
                n="businessPhone"
                l="Phone"
                v={currentUser.businessPhone || ""}
              />
              <F
                n="businessWebsite"
                l="Website"
                v={currentUser.businessWebsite || ""}
              />

              <label className="sm:col-span-2">
                <span className="label">Address</span>
                <textarea
                  defaultValue={currentUser.businessAddress || ""}
                  name="businessAddress"
                  className="input min-h-24"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="label">Logo URL</span>
                <input
                  defaultValue={currentUser.businessLogo || ""}
                  name="businessLogo"
                  className="input"
                />
              </label>
            </div>

            <Save msg={msg} />
          </form>
        )}

        {tab === "appearance" && (
          <div className="max-w-2xl">
            <Head
              t="Appearance"
              d="Use the moon/sun control in the top navigation to switch themes. Your preference is saved locally in the browser."
            />

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setTheme(false)}
                className={`rounded-2xl border-2 bg-white p-5 text-left transition hover:-translate-y-0.5 ${
                  !dark
                    ? "border-indigo-500 ring-4 ring-indigo-500/10"
                    : "border-slate-200"
                }`}
              >
                <div className="mb-4 h-20 rounded-xl bg-slate-100" />
                <p className="font-black text-slate-900">Light Mode</p>
                <p className="mt-1 text-xs text-slate-500">
                  Bright workspace for daytime use
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTheme(true)}
                className={`rounded-2xl border-2 bg-slate-950 p-5 text-left transition hover:-translate-y-0.5 ${
                  dark
                    ? "border-indigo-500 ring-4 ring-indigo-500/20"
                    : "border-slate-700"
                }`}
              >
                <div className="mb-4 h-20 rounded-xl bg-slate-800" />
                <p className="font-black text-white">Dark Mode</p>
                <p className="mt-1 text-xs text-slate-400">
                  Lower-glare workspace for evenings
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Head({ t, d }: { t: string; d: string }) {
  return (
    <div className="border-b border-slate-100 pb-5 dark:border-slate-800">
      <h2 className="text-xl font-black">{t}</h2>
      <p className="mt-1 text-sm text-slate-500">{d}</p>
    </div>
  );
}

function F({
  n,
  l,
  v,
  type = "text",
}: {
  n: string;
  l: string;
  v: string;
  type?: string;
}) {
  return (
    <label>
      <span className="label">{l}</span>
      <input defaultValue={v} name={n} type={type} className="input" />
    </label>
  );
}

function Save({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-4">
      <button className="btn-primary">Save Changes</button>
      {msg && (
        <span className="text-sm font-semibold text-slate-500">{msg}</span>
      )}
    </div>
  );
}

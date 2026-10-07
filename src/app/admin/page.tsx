"use client";
import { useState, useEffect } from "react";
import { Check, X, Trash2, LogIn, Settings, MessageSquare, Save } from "lucide-react";
import { WishItem } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"wishes" | "settings">("wishes");
  const [configStr, setConfigStr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchWishes();
        fetchConfig();
      } else {
        setError("Invalid PIN");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes?all=true");
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes || []);
      }
    } catch (err) {
      console.error("Failed to fetch wishes", err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        setConfigStr(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.error("Failed to fetch config", err);
    }
  };

  const saveConfig = async () => {
    try {
      const parsedConfig = JSON.parse(configStr);
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedConfig),
      });
      if (res.ok) {
        alert("Configuration saved! You may need to refresh the main page to see some changes.");
      } else {
        alert("Failed to save configuration.");
      }
    } catch (err) {
      alert("Invalid JSON format. Please check for missing quotes or commas.");
    }
  };

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", approved }),
      });
      if (res.ok) fetchWishes();
    } catch (err) {
      console.error("Failed to update approval", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchWishes();
    } catch (err) {
      console.error("Failed to delete wish", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-950 p-6">
        <form onSubmit={handleLogin} className="glass-card p-8 rounded-2xl w-full max-w-sm text-center">
          <h2 className="text-2xl font-serif text-white mb-6 flex items-center justify-center gap-2">
            <LogIn className="w-6 h-6" /> Admin Login
          </h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-glow mb-4 text-center tracking-widest text-lg"
            placeholder="Enter PIN"
            maxLength={6}
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-glow/20 hover:bg-rose-glow/40 text-white rounded-xl py-3 transition-colors border border-rose-glow/50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-950 p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif">Universe Admin</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("wishes")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'wishes' ? 'bg-rose-glow/30 border border-rose-glow/50' : 'glass hover:bg-white/10 border border-white/5'}`}
          >
            <MessageSquare className="w-5 h-5" />
            Manage Wishes
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-rose-glow/30 border border-rose-glow/50' : 'glass hover:bg-white/10 border border-white/5'}`}
          >
            <Settings className="w-5 h-5" />
            Dynamic Content
          </button>
        </div>

        {activeTab === "wishes" ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium text-white/50 text-sm">Status</th>
                    <th className="px-6 py-4 font-medium text-white/50 text-sm">Name / Date</th>
                    <th className="px-6 py-4 font-medium text-white/50 text-sm">Message</th>
                    <th className="px-6 py-4 font-medium text-white/50 text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {wishes.map((wish) => (
                    <tr key={wish.id} className={`hover:bg-white/5 transition-colors ${!wish.approved ? 'bg-red-500/5' : ''}`}>
                      <td className="px-6 py-4 align-top">
                        {wish.approved ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="font-medium">{wish.name}</div>
                        <div className="text-sm text-white/50">{wish.relationship}</div>
                        <div className="text-xs text-white/30 mt-1">
                          {new Date(wish.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <p className="text-sm text-white/80 max-w-xl">{wish.message}</p>
                        {wish.photo_url && (
                          <a href={wish.photo_url} target="_blank" rel="noreferrer" className="text-xs text-rose-300 hover:underline mt-2 inline-block">
                            View Photo Attached
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproval(wish.id, !wish.approved)}
                            className={`p-2 rounded-lg transition-colors ${wish.approved ? 'bg-orange-500/20 hover:bg-orange-500/40 text-orange-400' : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'}`}
                            title={wish.approved ? "Hide from public" : "Approve and show"}
                          >
                            {wish.approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(wish.id)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                            title="Delete wish permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {wishes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                        No wishes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-serif text-white mb-2">Global Settings & Content (JSON)</h2>
                <p className="text-white/50 text-sm">Modify images, timeline story, love letter, and 100 reasons here.</p>
              </div>
              <button
                onClick={saveConfig}
                className="flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-xl transition-colors border border-green-500/50"
              >
                <Save className="w-4 h-4" /> Save Content
              </button>
            </div>
            <textarea
              value={configStr}
              onChange={(e) => setConfigStr(e.target.value)}
              className="w-full h-[600px] bg-black/50 border border-white/10 rounded-xl p-6 text-green-400 font-mono text-sm focus:outline-none focus:border-rose-glow/50"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

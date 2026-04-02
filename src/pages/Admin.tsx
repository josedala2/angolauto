import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Car, FileText, CalendarCheck, Users, Plus, Pencil, Trash2, Check, X,
  LayoutDashboard, TrendingUp, AlertTriangle, BarChart3
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";

type Tab = "dashboard" | "vehicles" | "proposals" | "testdrives" | "news" | "workshop";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">A carregar...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">ACESSO RESTRITO</h1>
        <p className="text-muted-foreground text-sm">Não tem permissões de administrador.</p>
      </div>
    </div>
  );

  const tabs = [
    { id: "dashboard" as Tab, label: "Painel", icon: LayoutDashboard },
    { id: "vehicles" as Tab, label: "Veículos", icon: Car },
    { id: "proposals" as Tab, label: "Propostas", icon: FileText },
    { id: "testdrives" as Tab, label: "Test Drives", icon: CalendarCheck },
    { id: "news" as Tab, label: "Notícias", icon: FileText },
    { id: "workshop" as Tab, label: "Oficina", icon: AlertTriangle },
  ];

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ADMINISTRAÇÃO</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            PAINEL <span className="text-gradient-gold">EXECUTIVO</span>
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-display tracking-wider transition-all border ${
                tab === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <DashboardTab />}
        {tab === "vehicles" && <VehiclesTab />}
        {tab === "proposals" && <ProposalsTab />}
        {tab === "testdrives" && <TestDrivesTab />}
        {tab === "news" && <NewsTab />}
        {tab === "workshop" && <WorkshopTab />}
      </div>
    </main>
  );
}

// ─── ENHANCED DASHBOARD ───────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState({ vehicles: 0, proposals: 0, testdrives: 0, pendingProposals: 0, pendingDrives: 0 });
  const [brandData, setBrandData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [recentProposals, setRecentProposals] = useState<any[]>([]);
  const [proposalsByStatus, setProposalsByStatus] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [v, p, t, pp, pt] = await Promise.all([
        supabase.from("vehicles").select("id", { count: "exact", head: true }).eq("active", true),
        supabase.from("proposals").select("id", { count: "exact", head: true }),
        supabase.from("test_drives").select("id", { count: "exact", head: true }),
        supabase.from("proposals").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("test_drives").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setStats({
        vehicles: v.count || 0,
        proposals: p.count || 0,
        testdrives: t.count || 0,
        pendingProposals: pp.count || 0,
        pendingDrives: pt.count || 0,
      });

      // Vehicles by brand
      const { data: vehicles } = await supabase.from("vehicles").select("brand, category").eq("active", true);
      if (vehicles) {
        const brands: Record<string, number> = {};
        const cats: Record<string, number> = {};
        vehicles.forEach((v) => {
          brands[v.brand] = (brands[v.brand] || 0) + 1;
          cats[v.category] = (cats[v.category] || 0) + 1;
        });
        setBrandData(Object.entries(brands).map(([name, value]) => ({ name, value })));
        setCategoryData(Object.entries(cats).map(([name, value]) => ({ name, value })));
      }

      // Recent proposals
      const { data: recent } = await supabase.from("proposals").select("*, vehicles(name, brand)").order("created_at", { ascending: false }).limit(5);
      setRecentProposals(recent || []);

      // Proposals by status
      const { data: allProposals } = await supabase.from("proposals").select("status");
      if (allProposals) {
        const statuses: Record<string, number> = {};
        allProposals.forEach((p) => { statuses[p.status] = (statuses[p.status] || 0) + 1; });
        setProposalsByStatus(Object.entries(statuses).map(([name, value]) => ({ name, value })));
      }
    };
    fetchAll();
  }, []);

  const COLORS = ["hsl(225, 55%, 35%)", "hsl(0, 65%, 48%)", "hsl(142, 70%, 45%)", "hsl(45, 85%, 55%)", "hsl(200, 60%, 50%)"];
  const statusLabels: Record<string, string> = { pending: "Pendente", contacted: "Contactado", closed: "Fechado", rejected: "Rejeitado" };

  const kpis = [
    { label: "Veículos Activos", value: stats.vehicles, icon: Car, color: "text-primary" },
    { label: "Total Propostas", value: stats.proposals, icon: FileText, color: "text-primary" },
    { label: "Total Test Drives", value: stats.testdrives, icon: CalendarCheck, color: "text-primary" },
    { label: "Propostas Pendentes", value: stats.pendingProposals, icon: AlertTriangle, color: "text-accent" },
    { label: "Test Drives Pendentes", value: stats.pendingDrives, icon: AlertTriangle, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-lg p-5">
            <k.icon className={`w-5 h-5 ${k.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground font-display tracking-wider mt-1">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicles by Brand */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-lg p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> VEÍCULOS POR MARCA
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={brandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 4, fontSize: 12 }} />
              <Bar dataKey="value" fill="hsl(225, 55%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Proposals by Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-lg p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> PROPOSTAS POR ESTADO
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={proposalsByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${statusLabels[name] || name}: ${value}`}>
                {proposalsByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 4, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vehicles by Category */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-lg p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> VEÍCULOS POR CATEGORIA
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 4, fontSize: 12 }} />
              <Bar dataKey="value" fill="hsl(0, 65%, 48%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-lg p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> ACTIVIDADE RECENTE
          </h3>
          <div className="space-y-3">
            {recentProposals.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div>
                  <p className="text-sm text-foreground font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.vehicles ? `${p.vehicles.brand} ${p.vehicles.name}` : "Geral"} · {new Date(p.created_at).toLocaleDateString("pt-AO")}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  p.status === "pending" ? "bg-accent/20 text-accent" : p.status === "contacted" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {statusLabels[p.status] || p.status}
                </span>
              </div>
            ))}
            {recentProposals.length === 0 && <p className="text-sm text-muted-foreground">Sem actividade recente.</p>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── VEHICLES TAB ───────────────────────────
function VehiclesTab() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVehicles = async () => {
    const { data } = await supabase.from("vehicles").select("*").order("brand").order("name");
    setVehicles(data || []);
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleSave = async (vehicle: any) => {
    const { id, created_at, updated_at, ...rest } = vehicle;
    if (id) {
      const { error } = await supabase.from("vehicles").update(rest).eq("id", id);
      if (error) { toast.error(error.message); return; }
      toast.success("Veículo actualizado!");
    } else {
      const { error } = await supabase.from("vehicles").insert(rest);
      if (error) { toast.error(error.message); return; }
      toast.success("Veículo adicionado!");
    }
    setShowForm(false); setEditing(null); fetchVehicles();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Veículo removido!"); fetchVehicles();
  };

  if (showForm) {
    const v = editing || { name: "", brand: "Suzuki", category: "SUV", year: 2025, price: "Sob consulta", engine: "", power: "", transmission: "", fuel_type: "Gasolina", description: "", featured: false, active: true };
    return <VehicleForm vehicle={v} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{vehicles.length} veículo(s)</p>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="gap-2"><Plus className="w-4 h-4" /> Adicionar</Button>
      </div>
      <div className="space-y-2">
        {vehicles.map((v) => (
          <div key={v.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary font-display tracking-wider">{v.brand}</span>
                <span className="font-display text-foreground font-semibold">{v.name}</span>
                {v.featured && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Destaque</span>}
                {!v.active && <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Inactivo</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{v.category} · {v.power} · {v.fuel_type}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setEditing(v); setShowForm(true); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(v.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VehicleForm({ vehicle, onSave, onCancel }: { vehicle: any; onSave: (v: any) => void; onCancel: () => void }) {
  const [v, setV] = useState(vehicle);
  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary";
  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold mb-4">{v.id ? "EDITAR" : "NOVO"} VEÍCULO</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div><label className="text-xs text-muted-foreground mb-1 block">Nome</label><input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Marca</label><select value={v.brand} onChange={(e) => setV({ ...v, brand: e.target.value })} className={inputClass}>{["Suzuki", "DFSK", "Ineos", "Scania"].map((b) => <option key={b}>{b}</option>)}</select></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Categoria</label><select value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })} className={inputClass}>{["SUV", "Sedan", "Pickup", "Comercial", "Off-Road", "Camião"].map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Ano</label><input type="number" value={v.year} onChange={(e) => setV({ ...v, year: parseInt(e.target.value) })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Preço</label><input value={v.price} onChange={(e) => setV({ ...v, price: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Motor</label><input value={v.engine || ""} onChange={(e) => setV({ ...v, engine: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Potência</label><input value={v.power || ""} onChange={(e) => setV({ ...v, power: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Transmissão</label><input value={v.transmission || ""} onChange={(e) => setV({ ...v, transmission: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Combustível</label><input value={v.fuel_type || ""} onChange={(e) => setV({ ...v, fuel_type: e.target.value })} className={inputClass} /></div>
      </div>
      <div className="mb-4"><label className="text-xs text-muted-foreground mb-1 block">Descrição</label><textarea value={v.description || ""} onChange={(e) => setV({ ...v, description: e.target.value })} className={inputClass + " resize-none"} rows={3} /></div>
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer"><input type="checkbox" checked={v.featured} onChange={(e) => setV({ ...v, featured: e.target.checked })} className="accent-primary" /> Destaque</label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer"><input type="checkbox" checked={v.active} onChange={(e) => setV({ ...v, active: e.target.checked })} className="accent-primary" /> Activo</label>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => onSave(v)} className="gap-2"><Check className="w-4 h-4" /> Guardar</Button>
        <Button variant="outline" onClick={onCancel} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
      </div>
    </div>
  );
}

// ─── PROPOSALS TAB ───────────────────────────
function ProposalsTab() {
  const [proposals, setProposals] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("proposals").select("*, vehicles(name, brand)").order("created_at", { ascending: false }).then(({ data }) => setProposals(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("proposals").update({ status }).eq("id", id);
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    toast.success(`Proposta marcada como ${status}`);
  };

  const statusColors: Record<string, string> = { pending: "bg-accent/20 text-accent", contacted: "bg-primary/20 text-primary", closed: "bg-green-500/20 text-green-400", rejected: "bg-destructive/20 text-destructive" };

  return (
    <div className="space-y-3">
      {proposals.length === 0 && <p className="text-muted-foreground text-sm">Sem propostas.</p>}
      {proposals.map((p) => (
        <div key={p.id} className="glass-card rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-foreground font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.email} · {p.phone || "—"}</p>
              {p.vehicles && <p className="text-xs text-primary mt-1">{p.vehicles.brand} {p.vehicles.name}</p>}
              {p.message && <p className="text-xs text-muted-foreground mt-2 italic">"{p.message}"</p>}
              <p className="text-xs text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString("pt-AO")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[p.status] || ""}`}>{p.status}</span>
              <select value={p.status} onChange={(e) => updateStatus(p.id, e.target.value)} className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground">
                <option value="pending">Pendente</option>
                <option value="contacted">Contactado</option>
                <option value="closed">Fechado</option>
                <option value="rejected">Rejeitado</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TEST DRIVES TAB ───────────────────────────
function TestDrivesTab() {
  const [drives, setDrives] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("test_drives").select("*, vehicles(name, brand)").order("created_at", { ascending: false }).then(({ data }) => setDrives(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("test_drives").update({ status }).eq("id", id);
    setDrives((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    toast.success(`Test drive marcado como ${status}`);
  };

  const statusColors: Record<string, string> = { pending: "bg-accent/20 text-accent", confirmed: "bg-green-500/20 text-green-400", completed: "bg-primary/20 text-primary", cancelled: "bg-destructive/20 text-destructive" };

  return (
    <div className="space-y-3">
      {drives.length === 0 && <p className="text-muted-foreground text-sm">Sem test drives.</p>}
      {drives.map((d) => (
        <div key={d.id} className="glass-card rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-foreground font-semibold">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.email} · {d.phone || "—"}</p>
              {d.vehicles && <p className="text-xs text-primary mt-1">{d.vehicles.brand} {d.vehicles.name}</p>}
              {d.preferred_date && <p className="text-xs text-muted-foreground mt-1">Data preferida: {new Date(d.preferred_date).toLocaleDateString("pt-AO")} {d.preferred_time || ""}</p>}
              <p className="text-xs text-muted-foreground mt-2">{new Date(d.created_at).toLocaleDateString("pt-AO")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[d.status] || ""}`}>{d.status}</span>
              <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value)} className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground">
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── NEWS TAB ───────────────────────────
function NewsTab() {
  const [articles, setArticles] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const fetchNews = async () => {
    const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    setArticles(data || []);
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSave = async (article: any) => {
    const { id, created_at, updated_at, ...rest } = article;
    if (id) {
      const { error } = await supabase.from("news").update(rest).eq("id", id);
      if (error) { toast.error(error.message); return; }
      toast.success("Notícia actualizada!");
    } else {
      const { error } = await supabase.from("news").insert(rest);
      if (error) { toast.error(error.message); return; }
      toast.success("Notícia criada!");
    }
    setShowForm(false); setEditing(null); fetchNews();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Notícia removida!"); fetchNews();
  };

  if (showForm) {
    const a = editing || { title: "", slug: "", summary: "", content: "", image_url: "", category: "sector", published: false, published_at: null };
    return <NewsForm article={a} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{articles.length} notícia(s)</p>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="gap-2"><Plus className="w-4 h-4" /> Nova Notícia</Button>
      </div>
      <div className="space-y-2">
        {articles.map((a) => (
          <div key={a.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-foreground font-semibold">{a.title}</span>
                {a.published ? <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Publicada</span> : <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Rascunho</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{a.category} · /{a.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setEditing(a); setShowForm(true); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsForm({ article, onSave, onCancel }: { article: any; onSave: (a: any) => void; onCancel: () => void }) {
  const [a, setA] = useState(article);
  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold mb-4">{a.id ? "EDITAR" : "NOVA"} NOTÍCIA</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div><label className="text-xs text-muted-foreground mb-1 block">Título</label><input value={a.title} onChange={(e) => setA({ ...a, title: e.target.value, slug: a.id ? a.slug : generateSlug(e.target.value) })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Slug</label><input value={a.slug} onChange={(e) => setA({ ...a, slug: e.target.value })} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Categoria</label><select value={a.category} onChange={(e) => setA({ ...a, category: e.target.value })} className={inputClass}><option value="lancamento">Lançamento</option><option value="evento">Evento</option><option value="sector">Sector</option></select></div>
        <div><label className="text-xs text-muted-foreground mb-1 block">URL da Imagem</label><input value={a.image_url || ""} onChange={(e) => setA({ ...a, image_url: e.target.value })} className={inputClass} placeholder="https://..." /></div>
      </div>
      <div className="mb-4"><label className="text-xs text-muted-foreground mb-1 block">Resumo</label><textarea value={a.summary || ""} onChange={(e) => setA({ ...a, summary: e.target.value })} className={inputClass + " resize-none"} rows={2} /></div>
      <div className="mb-4"><label className="text-xs text-muted-foreground mb-1 block">Conteúdo</label><textarea value={a.content || ""} onChange={(e) => setA({ ...a, content: e.target.value })} className={inputClass + " resize-none"} rows={6} /></div>
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer"><input type="checkbox" checked={a.published} onChange={(e) => setA({ ...a, published: e.target.checked, published_at: e.target.checked ? new Date().toISOString() : a.published_at })} className="accent-primary" /> Publicar</label>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => onSave(a)} className="gap-2"><Check className="w-4 h-4" /> Guardar</Button>
        <Button variant="outline" onClick={onCancel} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
      </div>
    </div>
  );
}

// ─── WORKSHOP TAB ───────────────────────────
function WorkshopTab() {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("workshop_bookings").select("*").order("created_at", { ascending: false }).then(({ data }) => setBookings(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("workshop_bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    toast.success(`Agendamento marcado como ${status}`);
  };

  const serviceLabels: Record<string, string> = { manutencao: "Manutenção", reparacao: "Reparação", revisao: "Revisão", diagnostico: "Diagnóstico", outro: "Outro" };
  const statusColors: Record<string, string> = { pending: "bg-accent/20 text-accent", confirmed: "bg-green-500/20 text-green-400", completed: "bg-primary/20 text-primary", cancelled: "bg-destructive/20 text-destructive" };

  return (
    <div className="space-y-3">
      {bookings.length === 0 && <p className="text-muted-foreground text-sm">Sem agendamentos de oficina.</p>}
      {bookings.map((b) => (
        <div key={b.id} className="glass-card rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-foreground font-semibold">{b.name}</p>
              <p className="text-xs text-muted-foreground">{b.email} · {b.phone || "—"}</p>
              <p className="text-xs text-primary mt-1">{serviceLabels[b.service_type] || b.service_type}{b.vehicle_info ? ` · ${b.vehicle_info}` : ""}</p>
              {b.preferred_date && <p className="text-xs text-muted-foreground mt-1">Data: {new Date(b.preferred_date).toLocaleDateString("pt-AO")}</p>}
              {b.description && <p className="text-xs text-muted-foreground mt-1 italic">"{b.description}"</p>}
              <p className="text-xs text-muted-foreground mt-2">{new Date(b.created_at).toLocaleDateString("pt-AO")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[b.status] || ""}`}>{b.status}</span>
              <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground">
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

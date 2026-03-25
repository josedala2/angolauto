import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Car, FileText, CalendarCheck, Users, Plus, Pencil, Trash2, Check, X, Eye,
  LayoutDashboard, ChevronRight
} from "lucide-react";

type Tab = "dashboard" | "vehicles" | "proposals" | "testdrives";

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">A carregar...</div>;
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
  ];

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ADMINISTRAÇÃO</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            PAINEL <span className="text-gradient-gold">ADMIN</span>
          </h1>
        </motion.div>

        {/* Tabs */}
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
      </div>
    </main>
  );
}

function DashboardTab() {
  const [stats, setStats] = useState({ vehicles: 0, proposals: 0, testdrives: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [v, p, t, pp] = await Promise.all([
        supabase.from("vehicles").select("id", { count: "exact", head: true }),
        supabase.from("proposals").select("id", { count: "exact", head: true }),
        supabase.from("test_drives").select("id", { count: "exact", head: true }),
        supabase.from("proposals").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setStats({
        vehicles: v.count || 0,
        proposals: p.count || 0,
        testdrives: t.count || 0,
        pending: (pp.count || 0),
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Veículos", value: stats.vehicles, icon: Car },
    { label: "Propostas", value: stats.proposals, icon: FileText },
    { label: "Test Drives", value: stats.testdrives, icon: CalendarCheck },
    { label: "Pendentes", value: stats.pending, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <c.icon className="w-5 h-5 text-primary" />
          </div>
          <p className="font-display text-3xl font-bold text-foreground">{c.value}</p>
          <p className="text-xs text-muted-foreground font-display tracking-wider mt-1">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

function VehiclesTab() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyVehicle = { name: "", brand: "Suzuki", category: "SUV", year: 2025, price: "Sob consulta", engine: "", power: "", transmission: "", fuel_type: "Gasolina", description: "", featured: false, active: true };

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
    setShowForm(false);
    setEditing(null);
    fetchVehicles();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Veículo removido!");
    fetchVehicles();
  };

  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  if (showForm) {
    const v = editing || emptyVehicle;
    return (
      <VehicleForm vehicle={v} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{vehicles.length} veículo(s)</p>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {vehicles.map((v) => (
          <div key={v.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-primary font-display tracking-wider">{v.brand}</span>
                <span className="font-display text-foreground font-semibold">{v.name}</span>
                {v.featured && <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">Destaque</span>}
                {!v.active && <span className="text-[9px] bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Inactivo</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{v.category} · {v.power} · {v.fuel_type}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setEditing(v); setShowForm(true); }} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(v.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
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
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
          <input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Marca</label>
          <select value={v.brand} onChange={(e) => setV({ ...v, brand: e.target.value })} className={inputClass}>
            {["Suzuki", "DFSK", "Ineos", "Scania"].map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Categoria</label>
          <select value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })} className={inputClass}>
            {["SUV", "Sedan", "Pickup", "Comercial", "Off-Road", "Camião"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Ano</label>
          <input type="number" value={v.year} onChange={(e) => setV({ ...v, year: parseInt(e.target.value) })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Preço</label>
          <input value={v.price} onChange={(e) => setV({ ...v, price: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Motor</label>
          <input value={v.engine || ""} onChange={(e) => setV({ ...v, engine: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Potência</label>
          <input value={v.power || ""} onChange={(e) => setV({ ...v, power: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Transmissão</label>
          <input value={v.transmission || ""} onChange={(e) => setV({ ...v, transmission: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Combustível</label>
          <input value={v.fuel_type || ""} onChange={(e) => setV({ ...v, fuel_type: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">Descrição</label>
        <textarea value={v.description || ""} onChange={(e) => setV({ ...v, description: e.target.value })} className={inputClass + " resize-none"} rows={3} />
      </div>
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={v.featured} onChange={(e) => setV({ ...v, featured: e.target.checked })} className="accent-primary" />
          Destaque
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={v.active} onChange={(e) => setV({ ...v, active: e.target.checked })} className="accent-primary" />
          Activo
        </label>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => onSave(v)} className="gap-2"><Check className="w-4 h-4" /> Guardar</Button>
        <Button variant="outline" onClick={onCancel} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
      </div>
    </div>
  );
}

function ProposalsTab() {
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("proposals").select("*, vehicles(name, brand)").order("created_at", { ascending: false });
      setProposals(data || []);
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("proposals").update({ status }).eq("id", id);
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    toast.success(`Proposta marcada como ${status}`);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-primary/20 text-primary",
    contacted: "bg-blue-500/20 text-blue-400",
    closed: "bg-green-500/20 text-green-400",
    rejected: "bg-destructive/20 text-destructive",
  };

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
              <p className="text-[10px] text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString("pt-AO")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[p.status] || ""}`}>{p.status}</span>
              <select
                value={p.status}
                onChange={(e) => updateStatus(p.id, e.target.value)}
                className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground"
              >
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

function TestDrivesTab() {
  const [drives, setDrives] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("test_drives").select("*, vehicles(name, brand)").order("created_at", { ascending: false });
      setDrives(data || []);
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("test_drives").update({ status }).eq("id", id);
    setDrives((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    toast.success(`Test drive marcado como ${status}`);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-primary/20 text-primary",
    confirmed: "bg-green-500/20 text-green-400",
    completed: "bg-blue-500/20 text-blue-400",
    cancelled: "bg-destructive/20 text-destructive",
  };

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
              <p className="text-[10px] text-muted-foreground mt-2">{new Date(d.created_at).toLocaleDateString("pt-AO")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[d.status] || ""}`}>{d.status}</span>
              <select
                value={d.status}
                onChange={(e) => updateStatus(d.id, e.target.value)}
                className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground"
              >
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

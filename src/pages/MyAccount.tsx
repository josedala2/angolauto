import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FileText, CalendarCheck, User, ArrowRight, Clock, CheckCircle, XCircle, AlertCircle, Pencil, Save, X, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import jimnyHero from "@/assets/vehicles/jimny-hero.jpg";

export default function MyAccountPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<any[]>([]);
  const [testDrives, setTestDrives] = useState<any[]>([]);
  const [workshopBookings, setWorkshopBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) { navigate("/auth"); return; }
    if (!user) return;

    Promise.all([
      supabase.from("proposals").select("*, vehicles(name, brand)").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("test_drives").select("*, vehicles(name, brand)").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("workshop_bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]).then(([p, t, prof, wb]) => {
      setProposals(p.data || []);
      setTestDrives(t.data || []);
      setProfile(prof.data);
      setWorkshopBookings(wb.data || []);
      if (prof.data) {
        setEditName(prof.data.full_name || "");
        setEditPhone(prof.data.phone || "");
      }
    });
  }, [user, loading, navigate]);

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: editName.trim(), phone: editPhone.trim() })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível guardar o perfil.", variant: "destructive" });
    } else {
      setProfile({ ...profile, full_name: editName.trim(), phone: editPhone.trim() });
      setEditing(false);
      toast({ title: "Perfil actualizado", description: "Os seus dados foram guardados com sucesso." });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20 text-muted-foreground">A carregar...</div>;
  if (!user) return null;

  const statusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-3.5 h-3.5 text-accent" />;
      case "contacted": case "confirmed": return <AlertCircle className="w-3.5 h-3.5 text-primary" />;
      case "closed": case "completed": return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
      case "rejected": case "cancelled": return <XCircle className="w-3.5 h-3.5 text-destructive" />;
      default: return <Clock className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  const statusLabel: Record<string, string> = {
    pending: "Pendente", contacted: "Contactado", closed: "Fechado", rejected: "Rejeitado",
    confirmed: "Confirmado", completed: "Concluído", cancelled: "Cancelado", in_progress: "Em curso"
  };

  const serviceLabel: Record<string, string> = {
    manutencao: "Manutenção", reparacao: "Reparação", diagnostico: "Diagnóstico",
    pintura: "Pintura", pneus: "Pneus", outro: "Outro"
  };

  return (
    <main className="pb-16 min-h-screen">
      <PageHero image={jimnyHero} subtitle="ÁREA PESSOAL" title="MINHA" highlight="CONTA" />
      <div className="container mx-auto px-4 mt-8">

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-lg p-6 mb-8">
          {!editing ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg font-semibold text-foreground">{profile?.full_name || "Utilizador"}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {profile?.phone && <p className="text-xs text-muted-foreground mt-0.5">{profile.phone}</p>}
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditing(true)}>
                <Pencil className="w-3.5 h-3.5" /> Editar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Editar Perfil</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome completo</Label>
                  <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="O seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input id="edit-phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="+244 9XX XXX XXX" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Email: {user.email} (não editável)</p>
              <div className="flex gap-2">
                <Button size="sm" className="gap-2" onClick={handleSaveProfile} disabled={saving}>
                  <Save className="w-3.5 h-3.5" /> {saving ? "A guardar..." : "Guardar"}
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => { setEditing(false); setEditName(profile?.full_name || ""); setEditPhone(profile?.phone || ""); }}>
                  <X className="w-3.5 h-3.5" /> Cancelar
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Proposals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">MINHAS PROPOSTAS</h2>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">{proposals.length}</span>
            </div>
            <div className="space-y-3">
              {proposals.length === 0 ? (
                <div className="glass-card rounded-lg p-6 text-center">
                  <p className="text-muted-foreground text-sm mb-3">Ainda não submeteu propostas.</p>
                  <Link to="/veiculos"><Button variant="outline" size="sm" className="gap-2">Ver veículos <ArrowRight className="w-3 h-3" /></Button></Link>
                </div>
              ) : proposals.map((p) => (
                <div key={p.id} className="glass-card rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {p.vehicles && (
                        <Link to={`/veiculo/${p.vehicle_id}`} className="text-sm text-primary font-display font-medium hover:underline">
                          {p.vehicles.brand} {p.vehicles.name}
                        </Link>
                      )}
                      {p.message && <p className="text-xs text-muted-foreground mt-1 italic line-clamp-2">"{p.message}"</p>}
                      <p className="text-xs text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString("pt-AO", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {statusIcon(p.status)}
                      <span className="text-xs text-muted-foreground">{statusLabel[p.status]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Test Drives */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">MEUS TEST DRIVES</h2>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">{testDrives.length}</span>
            </div>
            <div className="space-y-3">
              {testDrives.length === 0 ? (
                <div className="glass-card rounded-lg p-6 text-center">
                  <p className="text-muted-foreground text-sm mb-3">Ainda não agendou test drives.</p>
                  <Link to="/veiculos"><Button variant="outline" size="sm" className="gap-2">Ver veículos <ArrowRight className="w-3 h-3" /></Button></Link>
                </div>
              ) : testDrives.map((d) => (
                <div key={d.id} className="glass-card rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {d.vehicles && (
                        <Link to={`/veiculo/${d.vehicle_id}`} className="text-sm text-primary font-display font-medium hover:underline">
                          {d.vehicles.brand} {d.vehicles.name}
                        </Link>
                      )}
                      {d.preferred_date && (
                        <p className="text-xs text-foreground mt-1">
                          📅 {new Date(d.preferred_date).toLocaleDateString("pt-AO", { weekday: "long", day: "numeric", month: "long" })}
                          {d.preferred_time && ` às ${d.preferred_time}`}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">Solicitado em {new Date(d.created_at).toLocaleDateString("pt-AO")}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {statusIcon(d.status)}
                      <span className="text-xs text-muted-foreground">{statusLabel[d.status]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

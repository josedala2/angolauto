import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUserIdRef = useRef<string | null>(null);

  const checkAdmin = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (currentUserIdRef.current !== userId) return;
    setIsAdmin(!error && !!data);
  };

  useEffect(() => {
    let isMounted = true;

    const applySession = (nextSession: Session | null) => {
      if (!isMounted) return;

      const nextUser = nextSession?.user ?? null;
      currentUserIdRef.current = nextUser?.id ?? null;

      setSession(nextSession);
      setUser(nextUser);
      setLoading(false);

      if (!nextUser) {
        setIsAdmin(false);
        return;
      }

      void checkAdmin(nextUser.id);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        applySession(nextSession);
      }
    );

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        applySession(session);
      })
      .catch(() => {
        if (!isMounted) return;
        currentUserIdRef.current = null;
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

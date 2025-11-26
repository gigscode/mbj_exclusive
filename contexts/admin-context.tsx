"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface AdminContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>
    signOut: () => Promise<void>
    isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                return { error }
            }

            setSession(data.session)
            setUser(data.user)
            return { error: null }
        } catch (error) {
            return { error: error as Error }
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
        router.push('/admin/login')
    }

    const value = {
        user,
        session,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!session,
    }

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider')
    }
    return context
}

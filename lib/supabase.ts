import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Supabase client for client-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        throw new Error('Not authenticated');
    }
    return user;
}

// Helper function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured with valid values
const isConfigured = !!(supabaseUrl && supabaseAnonKey);

// Validate URL format to prevent "Invalid URL" errors during build if placeholders are used
const isValidUrl = (url: string | undefined) => {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Create the Supabase client only if properly configured and URL is valid
// During build time without config or with invalid config, export a placeholder
let supabaseClient: SupabaseClient<Database>;

if (isConfigured && isValidUrl(supabaseUrl)) {
    supabaseClient = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    });
} else {
    // Create a minimal mock client for build time
    // This won't actually be used during build, just needs to exist
    if (typeof window === 'undefined') {
        // Only warn if we are not in a build environment where this is expected
        if (process.env.NODE_ENV !== 'production') {
            console.warn('⚠️  Supabase not configured or invalid URL - admin features will not work');
        }
    }
    supabaseClient = {} as SupabaseClient<Database>;
}

export const supabase = supabaseClient;

// Helper function to check if Supabase is properly configured
function checkSupabaseConfig() {
    if (!isConfigured) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
    }
}

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
    checkSupabaseConfig();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        throw new Error('Not authenticated');
    }
    return user;
}

// Helper function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
    checkSupabaseConfig();
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

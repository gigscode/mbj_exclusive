export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    name: string
                    description: string
                    price: number
                    category: 'dresses' | 'gowns' | 'separates' | 'bridal'
                    images: string[]
                    sizes: string[]
                    colors: string[]
                    in_stock: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description: string
                    price: number
                    category: 'dresses' | 'gowns' | 'separates' | 'bridal'
                    images: string[]
                    sizes: string[]
                    colors: string[]
                    in_stock?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string
                    price?: number
                    category?: 'dresses' | 'gowns' | 'separates' | 'bridal'
                    images?: string[]
                    sizes?: string[]
                    colors?: string[]
                    in_stock?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

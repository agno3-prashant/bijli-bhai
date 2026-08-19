import { supabase } from '@/lib/supabase'

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  display_order: number
  is_active: boolean
  launch_phase: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  category_id: string
  name: string
  customer_display_name: string
  slug: string
  short_description: string | null
  unit: string | null
  pricing_type: string
  fixed_price: number | null
  minimum_price: number | null
  maximum_price: number | null
  inspection_required: boolean
  material_included: boolean
  visit_fee_applicable: boolean
  skill_level: string
  warranty_days: number
  launch_phase: string
  featured: boolean
  active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

// Mock data for development when Supabase is not configured
const mockServiceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'General',
    slug: 'general',
    description: 'General electrical services',
    icon: 'Zap',
    display_order: 1,
    is_active: true,
    launch_phase: 'phase1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Light',
    slug: 'light',
    description: 'Lighting installation and repair',
    icon: 'Lightbulb',
    display_order: 2,
    is_active: true,
    launch_phase: 'phase1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Fan',
    slug: 'fan',
    description: 'Fan installation, repair and servicing',
    icon: 'Fan',
    display_order: 3,
    is_active: true,
    launch_phase: 'phase1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    // Check if Supabase is configured
    const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!isConfigured) {
      console.info('ℹ️ Using mock service categories data (Supabase not configured)')
      return mockServiceCategories
    }
    
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')

    if (error) {
      console.error('Error fetching service categories:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error in getServiceCategories:', error)
    // Fallback to mock data on error
    console.info('ℹ️ Falling back to mock service categories data')
    return mockServiceCategories
  }
}

export const getServicesByCategory = async (categoryId: string): Promise<Service[]> => {
  try {
    // Check if Supabase is configured
    const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!isConfigured) {
      console.info('ℹ️ Using mock services data (Supabase not configured)')
      // Return mock services for the given category
      return []
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category_id', categoryId)
      .eq('active', true)
      .order('display_order')

    if (error) {
      console.error('Error fetching services:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error in getServicesByCategory:', error)
    return []
  }
}

export const getAllServices = async (): Promise<Service[]> => {
  try {
    // Check if Supabase is configured
    const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!isConfigured) {
      console.info('ℹ️ Using mock services data (Supabase not configured)')
      return []
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('display_order')

    if (error) {
      console.error('Error fetching all services:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error in getAllServices:', error)
    return []
  }
}
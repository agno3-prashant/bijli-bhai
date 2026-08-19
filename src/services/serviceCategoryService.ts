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

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
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
}

export const getServicesByCategory = async (categoryId: string): Promise<Service[]> => {
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
}

export const getAllServices = async (): Promise<Service[]> => {
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
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjyojpmlizcvrrntuurx.supabase.co'
const supabaseKey = 'sb_publishable_eEP2hhK62SaqllGniPUF7w_lj6pkSmH'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
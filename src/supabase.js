import { createClient } from '@supabase/supabase-js';
const config = window.ESTUDO_CONFIG || {};
export const supabase = config.url && config.key ? createClient(config.url, config.key) : null;
export async function signIn(email,password){ if(!supabase) throw new Error('Configure o Supabase para entrar.'); return supabase.auth.signInWithPassword({email,password}); }
export async function signUp(email,password){ if(!supabase) throw new Error('Configure o Supabase para criar uma conta.'); return supabase.auth.signUp({email,password}); }
export async function saveAttempt(payload){ if(!supabase) return {offline:true}; const {data:{user}}=await supabase.auth.getUser(); if(!user) return {offline:true}; const {data,error}=await supabase.from('attempts').insert({...payload,user_id:user.id}).select().single(); if(error) throw error; return data; }
export async function askTutor(question){ if(!supabase) throw new Error('Conecte o Supabase para usar o tutor.'); const {data:{session}}=await supabase.auth.getSession(); if(!session) throw new Error('Entre na sua conta para usar o tutor.'); const {data,error}=await supabase.functions.invoke('study-tutor',{body:{question}}); if(error) throw error; if(data?.error) throw new Error(data.message||data.error); return data.answer; }

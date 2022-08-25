import { auth } from "../App";
import { supabase } from "../api/supabaseClient";



export const getCurrentUser = async (): Promise<any | null> => {
    let { data: user, error } = await supabase.from("Users").select("*").eq("fbase_user_id", auth?.currentUser?.uid);

    if (error) return null;
    return user![0]
}
import { supabase } from "./supabaseClient";

export const uploadDishImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("dishes")
        .upload(fileName, file);

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("dishes")
        .getPublicUrl(fileName);

    return data.publicUrl;
};
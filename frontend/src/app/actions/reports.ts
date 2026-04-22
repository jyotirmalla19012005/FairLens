"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function saveReport(fileName: string, metrics: any) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { data: null, error: "Authentication Required" };
    }

    const { data, error } = await supabase
      .from("bias_reports")
      .insert([
        {
          user_id: userId,
          file_name: fileName,
          metrics: metrics,
        },
      ])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error("Error saving report:", err);
    return { data: null, error: err.message || "An unexpected error occurred while saving the report." };
  }
}

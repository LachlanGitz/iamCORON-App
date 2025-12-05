import { supabase } from '@/integrations/supabase/client';

export const uploadFile = async (file: File, userId: string, folder: string = 'reports') => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(folder)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  // Get public URL (even if bucket is private, this URL is accessible if RLS allows)
  const { data: publicUrlData } = supabase.storage
    .from(folder)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};
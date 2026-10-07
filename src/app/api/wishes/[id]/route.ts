import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { likeLocalWish, updateWishApproval, deleteLocalWish } from '@/lib/store';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { action, approved } = body;

    if (action === 'like') {
      if (isSupabaseConfigured && supabase) {
        const { data: currentWish, error: fetchError } = await supabase
          .from('birthday_wishes')
          .select('likes')
          .eq('id', id)
          .single();

        if (!fetchError && currentWish) {
          const { data, error } = await supabase
            .from('birthday_wishes')
            .update({ likes: currentWish.likes + 1 })
            .eq('id', id)
            .select();
          if (!error && data) return NextResponse.json({ wish: data[0] });
        }
      }
      
      const updatedWish = likeLocalWish(id);
      if (updatedWish) {
        return NextResponse.json({ wish: updatedWish });
      }
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }

    if (action === 'approve') {
      // Basic check, real app would verify admin token here
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('birthday_wishes')
          .update({ approved: !!approved })
          .eq('id', id);
        if (!error) return NextResponse.json({ success: true });
      }

      const success = updateWishApproval(id, !!approved);
      if (success) return NextResponse.json({ success: true });
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update wish' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('birthday_wishes').delete().eq('id', id);
      if (!error) return NextResponse.json({ success: true });
    }

    const success = deleteLocalWish(id);
    if (success) return NextResponse.json({ success: true });
    
    return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete wish' }, { status: 500 });
  }
}

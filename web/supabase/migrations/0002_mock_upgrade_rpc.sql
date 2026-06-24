-- Draft only. Human review required before applying this migration.

create or replace function public.upgrade_current_user_to_companion()
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
  set plan = 'companion'
  where id = auth.uid();
$$;

grant execute on function public.upgrade_current_user_to_companion() to authenticated;

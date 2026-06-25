-- Draft only. Human review required before applying this migration.

create or replace function public.consume_current_user_ai_quota(p_daily_limit integer default 7)
returns table (
  allowed boolean,
  plan text,
  daily_count integer,
  daily_limit integer,
  resets_at text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  bangkok_today date := (now() at time zone 'Asia/Bangkok')::date;
  profile_row public.profiles%rowtype;
  next_count integer;
begin
  if current_user_id is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select *
  into profile_row
  from public.profiles
  where id = current_user_id
  for update;

  if not found then
    raise exception 'profile not found' using errcode = 'P0002';
  end if;

  if profile_row.plan = 'companion' then
    return query select true, profile_row.plan, profile_row.daily_ai_request_count, p_daily_limit, '00:00 Asia/Bangkok';
    return;
  end if;

  if profile_row.daily_ai_request_date is distinct from bangkok_today then
    update public.profiles
    set daily_ai_request_count = 0,
        daily_ai_request_date = bangkok_today
    where id = current_user_id
    returning * into profile_row;
  end if;

  if profile_row.daily_ai_request_count >= p_daily_limit then
    return query select false, profile_row.plan, profile_row.daily_ai_request_count, p_daily_limit, '00:00 Asia/Bangkok';
    return;
  end if;

  next_count := profile_row.daily_ai_request_count + 1;

  update public.profiles
  set daily_ai_request_count = next_count,
      daily_ai_request_date = bangkok_today
  where id = current_user_id;

  return query select true, profile_row.plan, next_count, p_daily_limit, '00:00 Asia/Bangkok';
end;
$$;

revoke all on function public.consume_current_user_ai_quota(integer) from public;
grant execute on function public.consume_current_user_ai_quota(integer) to authenticated;

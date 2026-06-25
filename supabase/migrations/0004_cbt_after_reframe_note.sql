-- Draft only. Human review required before applying this migration.

alter table public.cbt_records
add column if not exists after_reframe_note text;

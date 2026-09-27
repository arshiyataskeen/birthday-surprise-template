-- Run once in your OWN Supabase project's SQL Editor.
create table if not exists public.birthday_content (
 id text primary key check (id = 'birthday'),
 owner uuid not null,
 data jsonb not null
);
alter table public.birthday_content enable row level security;
revoke all on public.birthday_content from anon, authenticated;
grant all on public.birthday_content to service_role;
-- Private bucket. Images are served by the app's public photo endpoint.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('birthday-media','birthday-media',false,4194304,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

![image](https://user-images.githubusercontent.com/1373867/152600746-47ac344c-618c-4e56-8644-1154bacd2789.png)


# 2Watch chrome ext

Keep track of your Movies/shows.

Stack: [Sveltekit](https://kit.svelte.dev/), [TailwindCSS](https://tailwindcss.com/), and [Supabase](https://supabase.com/).


## Usage

1. Create a Supabase account, project, and mv `src/lib/config.example.ts` to `config.ts`.
2. Edit `src/lib/config.ts` with your project url and anon key (Go to api section in your project)
3. Create `ws` table in supabase

```
Name          Type    Default Value     Primary
id            int4                        x
name          text
IMDB          text
creadted_at   timestamp now()
last_modified ~         ~
data          json    [""s":1",""e":1"]
```

4. Edit and Move `deploy.example.sh` to `deploy.sh` (Follow the instructions to install it as an unpacked)

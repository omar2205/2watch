# 2Watch chrome ext

Using sveltekit, tailwind, and supabase.


## Usage

1. Create account, project, and mv `src/lib/config.example.ts` to `config.ts`
2. Create `ws` table in supabase

```
Name          Type    Default Value     Primary
id            int4                        x
name          text
IMDB          text
creadted_at   timestamp now()
last_modified ~         ~
data          json    [""s":1",""e":1"]
```

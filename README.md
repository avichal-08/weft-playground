# weft-playground

A small, dependency-free JavaScript utility library used as a test bed for
[weft](https://github.com/avichal-08/weft), a cloud coding agent.

`main` is correct and fully tested. Each task lives on its own branch with one commit that
introduces a bug or removes a feature, so the test suite fails there. An agent run points at a
branch and has to get the tests passing again.

```bash
node --test               # all tests pass on main
git switch bug/lru-recency && node --test   # one test file fails
```

## Tasks

| Branch                      | Kind     | Symptom                                                    |
| --------------------------- | -------- | ---------------------------------------------------------- |
| `bug/slugify-accents`       | bug      | `slugify('Crème Brûlée')` gives `cr-me-br-l-e`             |
| `bug/paginate-offset`       | bug      | page 1 returns the second page                             |
| `bug/duration-ms`           | bug      | `parseDuration('500ms')` throws                            |
| `bug/merge-mutates`         | bug      | `deepMerge` modifies its target                            |
| `bug/merge-proto-pollution` | security | `__proto__` in untrusted JSON changes the result's prototype |
| `bug/lru-recency`           | bug      | `get()` doesn't count as use, so hot entries get evicted   |
| `bug/money-rounding`        | bug      | `formatMoney(1.005)` gives `$1.00`                         |
| `feature/csv-quotes`        | feature  | `parseCsv` has no support for quoted fields                |

`tasks.json` has the same list in machine-readable form: branch, the task as written for the
agent (the symptom, never the fix), the test command, and the files the reference fix touches.

## Running a task with weft

```bash
curl -X POST localhost:3001/runs -H 'content-type: application/json' -d '{
  "repoUrl": "https://github.com/avichal-08/weft-playground",
  "baseRef": "bug/lru-recency",
  "task": "The LRU cache evicts entries that were just read with get(). Reading an entry should count as using it. Fix the cache so the tests pass.",
  "testCommand": "node --test"
}'
```

# Helpers

If you need to create utility function(s), that you can re-use all over the app, create a new file `[your-utility-group-name].helper.ts` or simply add it to an existing one.

Every function should be exported for `AOT` support :

```
export function yourFunction() {
  // ...
}
```

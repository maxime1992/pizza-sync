# States

**A state folder should contain :**
your-state-name.actions.ts
your-state-name.initial-state.ts
your-state-name.interfaces.ts
your-state-name.reducer.ts
your-state-name.reducer.spec.ts
your-state-name.selectors.ts
your-state-name.selectors.spec.ts

The `ui` state is a special one. It's a very simple one where we do not have normalized data for example.

In you application, you'll probably have more complex states and this file intends to help you design them.

A built-in model has been made into the "pizzas" folder.
You may want to copy the whole folder when creating a new state and update the names to have a scaffolding.

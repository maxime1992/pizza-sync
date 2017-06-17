Every `pizza-provider` should implement a method `getPizzasAndCategories`.

This method should return a `Promise` of type : 
```
{
  pizzas: [
    {
      id: 'pizzaId1',
      name: 'Pizza name',
      imgUrl: 'some/path/to/an/image.ext'
      ingredients: 'Ingredient 1, Ingredient 2, etc',
      prices: [5.5, 7.5, 10, 13.5]
    },
    // ...
  ],
  pizzasCategories: [
    {
      id: 'pizzaCategoryId1',
      name: 'Pizza Category 1',
      pizzasIds: ['pizzaId1']
    },
    // ...
  ]
}
```

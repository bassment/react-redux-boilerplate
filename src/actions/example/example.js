export const EXAMPLE_HELLO_WORLD = 'EXAMPLE/HELLO_WORLD';

export const exampleHelloWorld = world => ({
  type: EXAMPLE_HELLO_WORLD,
  world,
});

export const exampleActions = {
  exampleHelloWorld,
};

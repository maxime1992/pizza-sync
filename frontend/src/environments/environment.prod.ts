export const environment = {
  // PRODUCTION
  // angular can optimize some part of his code
  // (make more or less checks) according to an environment
  production: true,

  // URLBACKEND
  // your backend URL
  // you can then use it for example in a service
  // `${environment.urlBackend}/some/resource`
  urlBackend: '',

  // MOCK
  // should you keep mocks when building the app
  // or hit the real API
  mock: false,

  // HTTPDELAY
  // when using mocked data, you can use that
  // variable with `.delay` to simulate a network latency
  httpDelay: 0,

  // HASHLOCATIONSTRATEGY
  // should the URL be
  // http://some-domain#/your/app/routes (true)
  // or
  // http://some-domain/your/app/routes (false)
  hashLocationStrategy: false,

  // DEBUG
  // wether to display debug informations or not
  // TIP : Use console.debug, console.warn and console.error
  // console.log should be used only in dev and never commited
  // this way you can find every console.log very easily
  debug: true,
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  api: 'http://localhost:8080',
  dialogflow: {
    queryUrl: 'https://api.api.ai/v1/query',
    intentsUrl: 'https://api.api.ai/v1/intents',
    v: '20170712',
    devKey: '3ad65bf690c04e8f9ae5625d423db0fd',
  },
  production: false
};

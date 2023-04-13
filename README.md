# Bahati

Remix full stack app using Architect. App communicates with a dynamodb database and is deployed to API Gateway as a HTTP api.

## What's in the stack

- [AWS deployment](https://aws.com) with [Architect](https://arc.codes/)
- Production-ready [DynamoDB Database](https://aws.amazon.com/dynamodb/)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- DynamoDB access via [`arc.tables`](https://arc.codes/docs/en/reference/runtime-helpers/node.js#arc.tables)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- Validate the app has been set up properly (optional):

  ```sh
  npm run validate
  ```

- Start dev server:

  ```sh
  nvm use 14.18.2 && npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

### The App:

Share tracking app allowing you to view various shares. Functionality includes

- login/logout
- view shares

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- viewing share information [./app/models/shares.server.ts](./app/models/shares.server.ts)

The database that comes with `arc sandbox` is an in memory database, so if you restart the server, you'll lose your data. The Staging and Production environments won't behave this way, instead they'll persist the data in DynamoDB between deployments and Lambda executions.

## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments. Arc will deploy to the `eu-west-1` region.

Prior to your first deployment, you'll need to do a few things:

- Create a new [GitHub repo](https://repo.new)

- [Sign up](https://portal.aws.amazon.com/billing/signup#/start) and login to your AWS account

- Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to [your GitHub repo's secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Go to your AWS [security credentials](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials) and click on the "Access keys" tab, and then click "Create New Access Key", then you can copy those and add them to your repo's secrets.

- Along with your AWS credentials, you'll also need to give your CloudFormation a `SESSION_SECRET` variable of its own for both staging and production environments, as well as an `ARC_APP_SECRET` for Arc itself.

  ```sh
  npx arc env --add --env staging ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env staging SESSION_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production SESSION_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production SHARE_API_KEY <KEY HERE>
  npx arc env --add --env production STOCK_BUCKET <API GATEWAY URL>
  ```

  If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

## Custom Domain setup

### Step 1: setup SSL certificates with AWS Certificate Manager

In this step we will request a certificate from Amazon for our domain.

- Open up AWS Certificate Manager in the AWS Console in us-east-1 (region is required!)
- Click Request a certificate and then Request a public certificate
- Ensure example.com and \*.example.com for sub domains to work
- Choose DNS validation and click Next
- Add any tags and confirm the request
- Expand the domain and click Create record in Route53 button
- Verify CNAME record created in Route53 console Hosted zone

### Step 2: setup custom domain with AWS API Gateway

- Register or point existing domain/sub domain to AWS nameservers
- Create a hosted zone for the domain
- Go to API Gateway
- Navigate to Custom domain names and click Create
- Enter the domain name (e.g. staging.example.com for the staging app or example.com for the production app)
- Select the certificate created in Step 1
- Click Create domain name
- Make note of the generated API Gateway domain name in Endpoint configuration
- Click on the tab API mappings and Configure API mappings
- For API select the API and for Stage select $default and click Save

### Step 3: configure the domain Alias in AWS Route53

- Sign into AWS Route53 in the AWS Console
- Navigate to the Hosted zone for the domain
- Click Create record
- Enter the Record name
- Record type is A and toggle Alias checkbox on
- Select Alias to API Gateway
- Select the region
- Select the API (should be the same value as the domain generated in Step 2 and not the api gateway invoke url)
- Click Create records

## Where do I find my CloudFormation?

You can find the CloudFormation template that Architect generated for you in the sam.yaml file.

To find it on AWS, you can search for [CloudFormation](https://console.aws.amazon.com/cloudformation/home) (make sure you're looking at the correct region!) and find the name of your stack (the name is a PascalCased version of what you have in `app.arc`, so by default it's BahatiA9bdStaging and BahatiA9bdProduction) that matches what's in `app.arc`, you can find all of your app's resources under the "Resources" tab.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

### Husky

### Pre-commit hook

Runs typecheck
Run linter

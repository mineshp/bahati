const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const inquirer = require("inquirer");
const YAML = require("yaml");

const sort = require("sort-package-json");
const { toLogicalID } = require("@architect/utils");

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

async function main({ rootDirectory, isTypeScript }) {
  const APP_ARC_PATH = path.join(rootDirectory, "./app.arc");
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example");
  const ENV_PATH = path.join(rootDirectory, ".env");
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");
  const README_PATH = path.join(rootDirectory, "README.md");
  const DEPLOY_YAML_PATH = path.join(
    rootDirectory,
    ".github/workflows/deploy.yml"
  );

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);

  const APP_NAME = (DIR_NAME + "-" + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [appArc, env, packageJson, deployConfig, readme] = await Promise.all([
    fs.readFile(APP_ARC_PATH, "utf-8"),
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8").then((s) => JSON.parse(s)),
    fs.readFile(DEPLOY_YAML_PATH, "utf-8").then((s) => YAML.parse(s)),
    fs.readFile(README_PATH, "utf-8"),
  ]);

  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  );

  let saveDeploy = null;
  if (!isTypeScript) {
    delete packageJson.scripts.typecheck;
    packageJson.scripts.validate = packageJson.scripts.validate.replace(
      " typecheck",
      ""
    );

    delete deployConfig.jobs.typecheck;
    deployConfig.jobs.deploy.needs = deployConfig.jobs.deploy.needs.filter(
      (n) => n !== "typecheck"
    );
    // only write the deploy config if it's changed
    saveDeploy = fs.writeFile(DEPLOY_YAML_PATH, YAML.stringify(deployConfig));
  }

  const newPackageJson =
    JSON.stringify(sort({ ...packageJson, name: APP_NAME }), null, 2) + "\n";

  await Promise.all([
    fs.writeFile(
      APP_ARC_PATH,
      appArc.replace("grunge-stack-template", APP_NAME)
    ),
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    saveDeploy,
    fs.writeFile(
      README_PATH,
      readme.replace(new RegExp("RemixGrungeStack", "g"), toLogicalID(APP_NAME))
    ),
    fs.copyFile(
      path.join(rootDirectory, "remix.init", "gitignore"),
      path.join(rootDirectory, ".gitignore")
    ),
    fs.rm(path.join(rootDirectory, ".github/ISSUE_TEMPLATE"), {
      recursive: true,
    }),
    fs.rm(path.join(rootDirectory, ".github/PULL_REQUEST_TEMPLATE.md")),
  ]);

  await askSetupQuestions({ rootDirectory }).catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      throw error;
    }
  });
}

async function askSetupQuestions({ rootDirectory }) {
  const answers = await inquirer.prompt([
    {
      name: "validate",
      type: "confirm",
      default: false,
      message:
        "Do you want to run the build/tests/etc to verify things are setup properly?",
    },
  ]);

  if (answers.validate) {
    console.log(
      `Running the validate script to make sure everything was set up properly`
    );
    execSync(`npm run validate`, { stdio: "inherit", cwd: rootDirectory });
  }
  console.log(`✅  Project is ready! Start development with "npm run dev"`);
}

module.exports = main;

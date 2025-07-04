**!! All packages below version 1.0.0 are experimental and UNSTABLE and should not be used in production code !!**

![Prodeko logo](./docs/images/logo-text-blue.png)

# Prodeko design system

This repository provides multiple packages to aid in creating good and consistent brand visuals for Prodeko.

## Usage

This monorepository exports the following packages:

- [Tailwindcss plugin](./packages/tailwind-plugin/README.md)
- [Visual asset library](./packages/visual-assets/README.md)

The packages are distributed through github package registry. To use a package, you need to set up a github personal access token (classic). 

1. Go to [github > settings > developer settings > personal access tokens > tokens (classic)](https://github.com/settings/tokens)
2. Create a new personal classic token with the scope `read:packages`
3. Create the .npmrc -file in your home folder so that it works accross all repositories.

    The content of `~/.npmrc` should be:

    ```text
    @prodeko:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=yourpersonalaccesstokenkeepthissecure
    ```

4. Now you can install packages with `npm install @prodeko/packagename`
5. To install a package in github actions, you need to set the environment variable `NODE_AUTH_TOKEN` to `secrets.GITHUB_TOKEN`

    ```yml
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20.x'
            registry-url: 'https://npm.pkg.github.com'
            scope: '@prodeko'
        - name: Install dependencies
          run: npm ci
          env:
            NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN  }}
    ```

6. For more information on how to use specific packages, see the package READMEs

## Development workflow and CICD

### Commit format

This repository uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary). The main purpose of conventional commits is to (a) be machine-readable and (b) encourage developers to be more intentional with their commit message contents. The CI pipeline needs machine-readable commit messages. The basic format of conventional commits is:

```text
type(optional scope): message

optional body

optional footers
```

Commit types are e.g. `feat, fix, docs, chore, ci`. `fix`-type commits produce a patch version bump, `feat`-commits produce a minor version bump and an exclamation mark after the type `feat!` produce a major version bump. The message and optional body should be used to describe your change. Footers are not actively used in this repository. Easy place to find examples of valid commit messages is by running git log.

There is a git hook set up in this repository (husky), that automatically does commit linting. When you run `npm install`, the `prepare`-script sets up husky commit hooks. The idea is to enfore commit message format.

### Release process and CI

All changes should be developed in separate feature-branches. Direct pushing to main is disabled. Once a feature is ready, it can be merged to main *via a pull-request*. Merging the code to main triggers the release-workflow. It uses Google's [release-please](htps://github.com/googleapis/release-please-action) to:

- read commit messages
- generate separate changelogs for every package
- calculate version bumps for every package
- create a release pull request

Next, the pull request can be reviewed. Most importantly you should check that version bumps and changelogs are appropriate. You can optionally add commits to the pr with better changelogs.

Finally, the release PR is also merged to main. This triggers the release workflow again. Now the workflow sees that package versions have been updated and it creates new github releases for each changed package.

### Squashing commits

Motivation for squashing merges can be found in [release-please documentation](https://github.com/googleapis/release-please). Most importantly, if your feature branch includes commits like this:

```text
feat: add new feature
fix: fix an issue with the feature
```

...the fix-commit will not end up in the changelog. This is important since there never was a bug in an actual release, so the changelog should reflect that.
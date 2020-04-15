# Joi security

**This project provides a CLI for offensive and defensive security assesments on the Joi validator library. The goal is to ensure that a given Joi validation shema can resist against known security attacks such as SQL injections, path traversal and SSRF attempts.**

<p align="center">
  <img src="https://raw.githubusercontent.com/Saluki/joi-security/master/docs/joi-security-results-v1.png">
</p>

## Developer getting started

Clone this project and make sure to have a complete Node installation (including NPM) on your workstation. Please note that this project has currently been tested with Node LTS 12.

```bash
# Go inside the Joi security project folder
cd joi-security

# Install all project dependencies
npm install

# Run a first development scan against a Joi schema
npm run dev scan ./sandbox/blogpost-schema.js
```

## Copyright and license

"Joi security" is released under the GNU Affero General Public License. Feel free to suggest a feature, report a bug, or ask something: https://github.com/Saluki/joi-security/issues

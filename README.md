# Joi security

**This project provides offensive and defensive security assesments for the Joi validator library. The goal is to ensure that a given Joi validation shema can resist against known security attacks such as SQL injections and SSRF attempts.**

## Getting started

Clone this project and make sure to have a complete Node installation (including NPM) on your workstation. Please note that this project has currently been tested with Node LTS 12.

```bash
# Go inside the Joi security project folder
cd joi-security

# Install all project dependencies
npm install

# Run a first scan against a Joi schema
npm run dev scan ./sandbox/blogpost-schema.js
```

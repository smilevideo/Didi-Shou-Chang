# A Part of Miyako Island's Traditional Cradle Song

- public deployment: <http://tubalub.s3-website-us-east-1.amazonaws.com/>

- EC2 instance: <https://904405935261.signin.aws.amazon.com/console>

  - (The instance needs to be running for both the deployment and local testing)

## Local testing

shell 1 - start server first:

1. `cd server`
2. `npm install`
3. `npm start`

shell 2:

1. `export REACT_APP_EC2_ENDPOINT=<insert EC2 url>`
2. `cd client`
3. `npm install`
4. `npm start`

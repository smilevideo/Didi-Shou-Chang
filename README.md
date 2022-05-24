# A Part of Miyako Island's Traditional Cradle Song

## local testing
need to use hosted ec2 instance for song upload/storage (wss can still be hosted locally)

1. start ec2 instance https://904405935261.signin.aws.amazon.com/console
2. `cd client`
3. `export REACT_APP_EC2_ENDPOINT=<insert EC2 url>`
4. `npm start` (in the same shell)
5. `cd server`
6. `npm start`

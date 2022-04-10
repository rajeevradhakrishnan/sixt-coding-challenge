# CI/CD for Sixt coding challenge app to AWS

Deploy the Sixt coding challenge app to AWS Cloudfront. The app is hosted on a S3 bucket.
The [AWS Codebuild](https://aws.amazon.com/codebuild/) is used to build the app and deploy it to AWS Cloudfront.

## About the setup

    - Github webhhok notifies the [AWS Codebuild](https://aws.amazon.com/codebuild/) about changes in the source code.
    - The [AWS Codebuild](https://aws.amazon.com/codebuild/) creates a container and install the dependencies.
    - The container is then run the tests by command `npm run test`.
    - The container is then run the build by command `npm run build`.
    - The container is then move the build to the S3 bucket.
    - The container is then invalidate the Cloudfront cache.

## AWS Resources using

    - [AWS CDK](https://aws.amazon.com/cdk/)
    - [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
    - [AWS Codebuild](https://aws.amazon.com/codebuild/)
    - [AWS S3](https://aws.amazon.com/s3/)
    - [AWS Cloudfront](https://aws.amazon.com/cloudfront/)

## Useful commands

- `npm install` install the CDK Toolkit
- `cdk bootstrap` bootstrap the CDK toolkit with you AWS account credentials
- `cdk deploy --all` deploy all the stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

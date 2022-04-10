import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as dotenv from "dotenv";

// dotenv Must be the first expression
dotenv.config();

const githubOwner = <string>process.env.GITHUB_OWNER;
const githubRepo = <string>process.env.GITHUB_REPO;
const githubBranch = <string>process.env.GITHUB_BRANCH;

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const projectSource = codebuild.Source.gitHub({
      owner: githubOwner,
      repo: githubRepo,
      branchOrRef: githubBranch,
      fetchSubmodules: true,
      webhook: true,
      webhookTriggersBatchBuild: false,
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIs(
          githubBranch
        ),
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_MERGED
        ).andBranchIs(githubBranch),
      ],
    });

    new codebuild.Project(this, `sixt-coding-app-project`, {
      source: projectSource,
      concurrentBuildLimit: 1,
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          pre_build: {
            commands: [
              "node --version",
              "npm install",
              "npm run test --watchAll=false",
            ],
          },
          build: {
            commands: [
              "npm run build",
              "cd cdk",
              "npm install",
              "npm run deploy",
            ],
          },
        },
      }),
    });

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
    });

    const siteDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "SiteDistribution",
      {
        defaultRootObject: "index.html",
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
          {
            errorCode: 400,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    );

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: websiteBucket,
      prune: true,
      contentType: "text/html",
      distributionPaths: ["/*"],
      contentLanguage: "en",
      storageClass: s3deploy.StorageClass.STANDARD,
      serverSideEncryption: s3deploy.ServerSideEncryption.AES_256,
      cacheControl: [
        s3deploy.CacheControl.setPublic(),
        s3deploy.CacheControl.maxAge(Duration.days(1)),
      ],
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      distribution: siteDistribution,
    });
  }
}

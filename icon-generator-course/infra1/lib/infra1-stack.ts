import { Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { User } from 'aws-cdk-lib/aws-iam';
import * as aws from 'aws-sdk';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';


export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    const bucket = new s3.Bucket(this, 'icon-generator-course-2', {
      bucketName: 'icon-generator-course-2',
      publicReadAccess: false,
      versioned: false
    });

    // Define the IAM user
    const user = new User(this, 'icon-generator-user-2', {
      userName: 'icon-generator-course-2'
    });

    // Create a policy that allows the user to put objects in the bucket
    const policy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:PutObject'],
      resources: [bucket.arnForObjects('*')],
    });

    // Attach the policy to the user
    user.addToPolicy(policy);

    // Create an access key for the user
    const iamClient = new aws.IAM();
    iamClient.createAccessKey({ UserName: user.userName }, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }
}

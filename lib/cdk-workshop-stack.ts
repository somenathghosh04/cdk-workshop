import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function,Code, Runtime} from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from "./hitcounter";


export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

// defining lambda resource

const hello = new Function(this, 'HelloHandler',{
  runtime:Runtime.NODEJS_22_X,
  code:Code.fromAsset("lambda"),
  handler:"hello.handler", // "hello" is filename, "handler" is the exported function name
});

const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
  downstream: hello,
});
    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });


}
}
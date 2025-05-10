import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { CodeBuildStep, CodePipeline, CodePipelineSource, ManualApprovalStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { WorkshopPipelineStage } from "./pipeline-stage";

export class WorkshopPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // The basic CDK pipeline declaration. This sets the initial structure
    // of our pipeline
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipeline",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.connection(
        "somenathghosh04/cdk-workshop",
        "main",
        {
            connectionArn: "arn:aws:codeconnections:us-east-1:471303021863:connection/30510401-5307-466f-869f-5162f1dbe115"
        } 
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    // const approvalStep = new ManualApprovalStep('ApproveDeployment');

    // const deploy = new WorkshopPipelineStage(this, "Deploy");
    // const deployStage = pipeline.addStage(deploy);
    // deployStage.addPre(new ManualApprovalStep('ApproveDeployment'));

  }
}



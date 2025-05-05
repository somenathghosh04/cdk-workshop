import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class WorkshopPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // The basic pipeline declaration. This sets the initial structure
    // of our pipeline
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipeline",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.connection(
        "somenathghosh04/WorkshopRepo",
        "main",
        {
            connectionArn: "arn:aws:codeconnections:us-east-1:471303021863:connection/203a8dde-15dc-419d-94be-670e34aa3287"
        } 
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}



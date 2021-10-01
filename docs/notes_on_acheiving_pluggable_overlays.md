---
tags: infrastructure-graph
---

# Notes on acheiving pluggable overlays

The idea is to provide a CLI app which can generate config which will handle each api datasource integration and test the resulting dataset for how well it can be applied to the graph.

### Inputs
- an api endpoint (Ie. cloudwatch, billing)
  *This will show the first couple of objects of the api response.*

- The User will be asked to identify the attribute which matches a resource name in the graph
  *Files will be generated which the User can modify at this stage.*

### Outputs
- a directory to hold the configuration files

- a graphQl schema for the response data

- a Terraform file which would setup an AppSync GraphQl wrapper around an http api endpoint

- a json config file which has a jmespath expression capable of finding the objects in the data that would link to the resources in the graph/diagram

- when the main application runs a tab will be drawn on the dashboard for the integration


### Links

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appsync_function

New looks good: https://www.lightenna.com/tech/2019/graphql-appsync-terraform/

Old but may be useful: https://tech.ovoenergy.com/deploying-appsync-with-terraform/


Comments on how to find multiple files inside a base directory use Terraform:
https://stackoverflow.com/questions/58033043/iterate-through-map-for-file-function


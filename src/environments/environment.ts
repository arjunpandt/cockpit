// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api:{
    baseUrl:"https://cockpit.shahenvaz.tech/",
    baseUrlAppDeployment:"https://apps.shahenvaz.tech/",
    
    routes:{
      registerUser:{endpoint:'jsonRegister', method:'POST'},
      loginUser: {endpoint:'JsonLogin', method:'POST'},
      postAzureCluster: {endpoint:'json_submit_form_azure', method:'POST'},
      postAksCluster: {endpoint:'json_create_aks', method:'POST'},
      postRedirectAksCluster: {endpoint:'json_recentjob_azure', method:'POST'},
      postRedirectlogAksCluster: {endpoint:'json-recentjoblogs-azure', method:'POST'},
      postRedirectGcpCluster: {endpoint:'json_recentjob_gcp', method:'POST'},
      postRedirectlogGcpCluster: {endpoint:'json-recentjoblogs-gcp', method:'POST'},
      postAwsCluster: {endpoint:'json_submit_form_aws', method:'POST'},
      postEksCluster: {endpoint:'json_create_aws', method:'POST'},
      postRedirectEksCluster: {endpoint:'json_recentjob_aws', method:'POST'},
      postRedirectlogEksCluster: {endpoint:'json-recentjoblogs-aws', method:'POST'},
      postDeleteEksCluster: {endpoint:'json_delete_eks', method:'POST'},
      postGcpCluster: {endpoint:'json_submit_form_gcp', method:'POST'},
      postGkeCluster: {endpoint:'json_create_gke', method:'POST'},
      postDeleteAksCluster: {endpoint:'json_delete_aks', method:'POST'},
      postDeleteGkeCluster: {endpoint:'json_delete_gke', method:'POST'},
      getAwsCredentials: {endpoint:'json-show-details-aws', method:'POST'},
      getAzureCredentials: {endpoint:'json-show-details-azure', method:'POST'},
      getGcpCredentials: {endpoint:'json-show-details-gcp', method:'POST'},
      getAwsCluster: {endpoint:'json-my-cluster-details-aws', method:'POST'},
      getAzureCluster: {endpoint:'json-my-cluster-details-azure', method:'POST'},
      getGcpCluster: {endpoint:'json-my-cluster-details-gcp', method:'POST'},
      postAwsCreationStatus: {endpoint:'json-creation-status-aws', method:'POST'},
      postAzureCreationStatus: {endpoint:'json-creation-status-azure', method:'POST'},
      postGcpCreationStatus: {endpoint:'json-creation-status-gcp', method:'POST'},
      postAwsLogs: {endpoint:'json-logs-aws', method:'POST'},
      postAzureLogs: {endpoint:'json-logs-azure', method:'POST'},
      postAzureLogJob: {endpoint:'json-recentlogs-azure', method:'POST'},
      postGcpLogs: {endpoint:'json-logs-gcp', method:'POST'},
      postAwsJobs: {endpoint:'json_jobs_aws', method:'POST'},
      postAzureJobs: {endpoint:'json_jobs_azure', method:'POST'},
      postGcpJobs: {endpoint:'json_jobs_gcp', method:'POST'},
      postAwsDeleteJobs:  {endpoint:'json_jobs_aws_delete', method:'POST'},
      postAzureDeleteJobs:  {endpoint:'json_jobs_azure_delete', method:'POST'},
      postGcpDeleteJobs:  {endpoint:'json_jobs_gcp_delete', method:'POST'},
      updateAws: {endpoint:'json_update_aws_credential', method:'POST'},
      updateAzure: {endpoint:'json_update_azure_credential', method:'POST'},
      updateGcp: {endpoint:'json_update_credential_gcp', method:'POST'},
      deleteAws: {endpoint:'json_delete_aws_credential', method:'POST'},
      deleteAzure: {endpoint:'json_delete_azure_credential', method:'POST'},
      deleteGcp: {endpoint:'json_delete_credential_gcp', method:'POST'},
      getAzure: {endpoint:'json_get_credential', method:'POST'},
      getAws: {endpoint:'json_get_credential_aws', method:'POST'},
      getGcp: {endpoint:'json_get_credential_gcp', method:'POST'},
      clonePrivateRepo: {endpoint:'clone_private_repo', method:'POST'},
      createDeploy:{endpoint:'create_deployment', method:'POST'},
      clonePublicRepo:{endpoint:'clone_public_repo',method:'POST'},
      getEksClusters:{endpoint:'/json-get-eks', method:'GET'},
      appManagement:{endpoint:'/list_deployment',method:'POST'},
      deleteDeployment:{endpoint:'delete_deployment',method:'POST'}
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

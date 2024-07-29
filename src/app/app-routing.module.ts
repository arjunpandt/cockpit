import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AzureCredentialComponent } from './azure-credential/azure-credential.component';
import { GcpCredentialComponent } from './gcp-credential/gcp-credential.component';
import { AwsCredentialComponent } from './aws-credential/aws-credential.component';
import { HomeComponent } from './home/home.component';
import { CloudSelectionComponent } from './cloud-selection/cloud-selection.component';
import { EksClusterComponent } from './eks-cluster/eks-cluster.component';
import { AksClusterComponent } from './aks-cluster/aks-cluster.component';
import { GkeClusterComponent } from './gke-cluster/gke-cluster.component';
import { AuthGuard } from './services/auth.guard';
import { DeleteEksComponent } from './delete-eks/delete-eks.component';
import { DeleteAksComponent } from './delete-aks/delete-aks.component';
import { DeleteGkeComponent } from './delete-gke/delete-gke.component';
import { ClusterJobsComponent } from './cluster-jobs/cluster-jobs.component';
import { AksClusterredirectComponent } from './aksClusterredirect/aksClusterredirect.component';
import { EksClusterredirectComponent } from './eksClusterredirect/eksClusterredirect.component';
import { GkeClusterredirectComponent } from './gkeClusterredirect/gkeClusterredirect.component';
import { AppDeploymentComponent } from './app-deployment/app-deployment.component';
import { AppDeploymentAwsComponent } from './app-deployment-aws/app-deployment-aws.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { SelectClusterComponent } from './select-cluster/select-cluster.component';
import { AwsComponent } from './application-deployment/aws/aws.component';
import { DeployedComponent } from './deployed/deployed.component';
import { AppManagementComponent } from './app-management/app-management.component';
import { MonitoringAwsComponent } from './monitoring-aws/monitoring-aws.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SelectServiceComponent
      },
      {
        path:'cluster-management',
        component:HomeComponent
      },
      {
        path: 'cloud-selection',
        children: [
          {
            path: '',
            component: CloudSelectionComponent,
          },
          {
            path: 'azure',
            children: [
              {
                path: '',
                component: AzureCredentialComponent
              },
              {
                path: 'azure2',
                children:[{
                  path: '',
                  component: AksClusterComponent
                },
                {
                  path: 'redirect',
                  component: AksClusterredirectComponent 
                },
                {
                  path: 'azure-jobs',
                  component: ClusterJobsComponent
                }
              ]
              }
            ]
          },
          {
            path: 'gcp',
            children: [
              {
                path: '',
                component: GcpCredentialComponent
              },
              {
                path: 'gcp2',
                children: [{
                  path:'',
                  component: GkeClusterComponent
                },
                {
                  path: 'redirect',
                  component:  GkeClusterredirectComponent
                },
                {
                  path: 'gcp-jobs',
                  component: ClusterJobsComponent
                },
              ]
              }
            ]
          },
          {
            path: 'aws',
            children: [
              {
                path: '',
                component: AwsCredentialComponent
              },
              {
                path: 'aws2',
                children:[{
                  path:'',
                  component: EksClusterComponent
                },
                {
                path: 'redirect',
                component:  EksClusterredirectComponent
              },

                {
                  path: 'aws-jobs',
                  component: ClusterJobsComponent
                },
              ]
              }
            ]
          },
        ]
      },
      {
        path:"management/aws",
        component:AppManagementComponent
      },
      {
        path:"monitoring",
        children:[
          {
            path:'',
            component:SelectClusterComponent
          },
          {
            path:'select-cloud',
            component:SelectClusterComponent
          },
          {
            path:'aws',
            component:MonitoringAwsComponent
          }
        ]
      },
      {
        path:'app-management',  
        component:DeployedComponent
      },
      {
        path:"app-deployment",
        children:[
          {
            path:'',
            component:AppDeploymentAwsComponent
          },
          {
            path:'select-cloud',
            component: SelectClusterComponent
          },
          {
            path:'deploy',
            component:AppDeploymentComponent
          },
          {
            path:'aws',
            component:AwsComponent
          },
          {
            path:'azure',
            component:AppDeploymentAwsComponent
          },
          {
            path:'app-deployed',
            component:DeployedComponent
          },
          {
            path:'google',
            component:AppDeploymentAwsComponent
          }
        ]
      },
      {
        path: 'delete-cloud-selection',
        children: [
          {
            path: '',
            component: CloudSelectionComponent,
          },
          {
            path: 'delete-aks',
            children: [
              {
                path: '',
                component: DeleteAksComponent
              },
              {
                path: 'aks-jobs',
                component: ClusterJobsComponent
              },
            ]
          },
          {
            path: 'delete-gke',
            children:
              [
                {
                  path: '',
                  component: DeleteGkeComponent
                },
                {
                  path: 'gke-jobs',
                  component: ClusterJobsComponent
                },
              ]
          },
          {
            path: 'delete-eks',
            children:
              [
                {
                  path: '',
                  component: DeleteEksComponent
                },
                {
                  path: 'eks-jobs',
                  component: ClusterJobsComponent
                },
              ]
          },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

#include<stdio.h>
#include<math.h>

struct job{
    char jname[100];
    int deadline;
    int profit;
};

void main(){
    struct job jobs[1000];
    int n;
    int i=0;
    char jname[100];
    printf("enter number of jobs\n");
    scanf("%d",&n);
    while(i<n){
        printf("enter job name\n");
        scanf("%s",&jobs[i].jname);
        printf("enter profit and deadline\n");
        scanf("%d%d",&jobs[i].profit,&jobs[i].deadline);
        i++;
    }
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(jobs[i].profit<jobs[j].profit){
                struct job temp = jobs[i];
                jobs[i] = jobs[j];
                jobs[j] = temp;
            }
           if(jobs[i].profit==jobs[j].profit){
               if(jobs[i].deadline>jobs[j].deadline){
                    struct job temp = jobs[i];
                    jobs[i] = jobs[j];
                    jobs[j] = temp;
               }
            }
        }
    }
    int dmax=0;
    for(int i=0;i<n;i++){
        dmax=fmax(jobs[i].deadline,dmax);
    }
    int arr[dmax];
    for(int i=0;i<dmax;i++){
        arr[i]=0;
    }
    int profit=0;
    printf("jobsequence  :\n");
    for(int i=0;i<dmax;i++){
        for(int j=jobs[i].deadline-1;j>=0;j--){
            if(arr[j]==0){
                arr[j]=1;
                printf("%s->",jobs[i].jname);
                profit+=jobs[i].profit;
                break;
            }
        }
    }
    printf("\nprofit : %d",profit);
}
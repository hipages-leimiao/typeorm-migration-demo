# Demo for typeorm migration (k8s job)

## Docs

> https://github.com/typeorm/typeorm

> https://argo-cd.readthedocs.io/en/stable/getting_started/

## process

```sh
# build imgage
docker build -t newbmiao/typeorm-demo
# and push it to the registry, use dockerhub as example

kubectl create namespace argocd  
# deploy app
kubectl apply -n argocd -f argocd.deployment.yaml
# do migration
kubectl create -f argocd.hook.yaml -n argocd
```

## pgadmin

```sh
kubectl port-forward typeorm-demo-{suffix} -n argocd 5432:5432
```

use pgAdmin to check records of postgres db

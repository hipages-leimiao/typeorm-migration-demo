# Demo for typeorm migration (k8s job)

## Docs

> https://github.com/typeorm/typeorm
> https://argo-cd.readthedocs.io/en/stable/getting_started/

## process

```sh
# build imgage
docker build -t newbmiao/typeorm-demo
# and push it to the registry, use dockerhub as example

# deploy app
kubectl apply -n argocd -f .argocd-local.yml
# do migration
kubectl create -f .argocd-hook.yml -n argocd
```

## pgadmin

```
kubectl port-forward typeorm-demo-66b8f47b96-pnwrp -n argocd 5432:5432
```

use pgAdmin to check records of postgres db

# Demo for typeorm migration (k8s job)

## Docs

> https://github.com/typeorm/typeorm

> https://argo-cd.readthedocs.io/en/stable/getting_started/

## process

### prepare
```sh
# build imgage
docker build -t newbmiao/typeorm-demo
# and push it to the registry, use dockerhub as example

# swithch to local k8s context, like docker-desktop
```

### use argocd

```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

cd manifest
argocd app create typeorm-demo --repo https://github.com/hipages-leimiao/typeorm-migration-demo.git --path manifest --dest-server https://kubernetes.default.svc --dest-namespace default

# check ui (username: admin, password see below)
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
# visit http://localhost:8080
kubectl port-forward svc/argocd-server -n argocd 8080:443
# and enable autosync there
```
![image](https://user-images.githubusercontent.com/67885674/154195439-e0b1ccd7-846e-4c7d-8d87-c1cf6ec4cc95.png)



### or manuallly do it by kubectl

```sh
cd manifest
# deploy app
kubectl apply -n argocd -f argocd.deployment.yaml
# do migration
kubectl create -f argocd.hook.yaml -n argocd
```
![image](https://user-images.githubusercontent.com/67885674/154195502-0dd7895b-3210-4fdf-923e-b534781165e8.png)



## pgadmin

```sh
kubectl port-forward typeorm-demo-{suffix} -n argocd 5432:5432
```

use pgAdmin to check records of postgres db

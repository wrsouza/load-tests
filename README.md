# Load Test with K6 and Grafana

Run the command bellow to install packages

```
npm install
```

Execute the command to run the API server

```
npm run dev
```

Run the command bellow to build the containers

```
docker compose up -d
```

Run the command for load tests (k6)

```
docker compose run k6 run /scripts/load-test.js
```

Access the address bellow in browser for view the dashboard

```
http://localhost:3000/d/k6/k6-load-testing-results
```

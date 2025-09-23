import { sleep } from "k6";
import http from "k6/http";

//init
export const options = {
  //vus: 150,
  //duration: "60s",
  stages: [
    { duration: "10s", target: 50 },
    { duration: "60s", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

//init context: define custom function (Main function)
export default function () {
  http.get("http://host.docker.internal:3333/users");
  sleep(1);
}

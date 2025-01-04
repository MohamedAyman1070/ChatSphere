import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

let echo = null;

export function echoInit() {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    echo = new Echo({
      broadcaster: "pusher",
      key: process.env.REACT_APP_PUSHER_KEY,
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      forceTLS: true,
      encrypted: true,
      authEndpoint: process.env.REACT_APP_BACKEND_DOMAIN + "/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      },
    });
  }
}

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: process.env.REACT_APP_PUSHER_KEY,
//   cluster: process.env.REACT_APP_PUSHER_CLUSTER,
//   forceTLS: true,
//   encrypted: true,
//   authEndpoint: process.env.REACT_APP_BACKEND_DOMAIN + "/broadcasting/auth",
//   auth: {
//     headers: {
//       Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
//     },
//   },
//   // authorizer: (channel, options) => {
//   //   return {
//   //     authorize: (socketId, callback) => {
//   //       axios
//   //         .post(process.env.REACT_APP_BACKEND_DOMAIN + "/broadcasting/auth", {
//   //           socket_id: socketId,
//   //           channel_name: channel.name,
//   //           headers: {
//   //             Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
//   //           },
//   //         })
//   //         .then((response) => {
//   //           callback(false, response.data);
//   //           console.log("auth channel ", response.data);
//   //         })
//   //         .catch((error) => {
//   //           callback(true, error);
//   //         });
//   //     },
//   //   };
//   // },
// });

export function getEcho() {
  if (echo === null) {
    echoInit();
  }
  return echo;
}

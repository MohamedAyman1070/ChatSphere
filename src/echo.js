import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_KEY,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true,
  encrypted: true,
  // authEndpoint: process.env.REACT_APP_BACKEND_DOMAIN + "/api/broadcasting/auth",
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  //   },
  // },
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(process.env.REACT_APP_BACKEND_DOMAIN + "/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

export default echo;

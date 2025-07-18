import type { LoginPersonaProps } from "~/components/Form/Login/types";
import pamP from "/static/img/users/pam.webp";
import pamM from "/static/img/users/pam.webm";
import pennyP from "/static/img/users/penny.webp";
import pennyM from "/static/img/users/penny.webm";
import robinP from "/static/img/users/robin.webp";
import robinM from "/static/img/users/robin.webm";

export const rawPersona: LoginPersonaProps[] = [
  {
    username: "pam",
    password: "password",
    userinfo: {
      fullname: "Pam Pasteur",
      function: "form.login.persona.pam.function",
      avatar: {
        image: {
          url: pamP,
          alt: "form.login.persona.pam.alt",
        },
        video: {
          url: pamM,
        },
      },
      description: "form.login.persona.pam.description",
    },
  },
  {
    username: "penny",
    password: "password",
    userinfo: {
      fullname: "Penny Galileo",
      function: "form.login.persona.penny.function",
      avatar: {
        image: {
          url: pennyP,
          alt: "form.login.persona.penny.alt",
        },
        video: {
          url: pennyM,
        },
      },
      description: "form.login.persona.penny.description",
    },
  },
  {
    username: "robin",
    password: "password",
    userinfo: {
      fullname: "Robin Lovelace ",
      function: "form.login.persona.robin.function",
      avatar: {
        image: {
          url: robinP,
          alt: "form.login.persona.robin.alt",
        },
        video: {
          url: robinM,
        },
      },
      description: "form.login.persona.robin.description",
    },
  },
];

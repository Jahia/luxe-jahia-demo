import type { MsgPropsProps } from "./types.js";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
};

export const prefillWithUserContext = (sessionId, setFeedback) => {
  if (!sessionId) {
    return;
  }

  const contextServerPublicUrl = window.digitalData.contextServerPublicUrl;
  const body = {
    requiredProfileProperties: ["firstName", "lastName", "email"],
    sessionId,
    source: {
      itemId: window.digitalData.page?.pageInfo.pageID,
      itemType: "page",
      scope: window.digitalData.scope,
    },
  };
  fetch(`${contextServerPublicUrl}/context.json`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "allow-redirects": "false",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      setFeedback((feedback) => ({
        ...feedback,
        msgProps: data.profileProperties as MsgPropsProps,
      }));
    })
    .catch((error) => {
      console.log("Error in the call to retrieve user profiles data: ");
      console.error(error);
    });
};

export const submitContact = ({ form, target, body, setFeedback, setUnknownError }) => {
  // If user wants to use its own process to manage the data
  if (target) {
    fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "allow-redirects": "false",
      },
      body: JSON.stringify(body),
    })
      .then(({ ok, status }) => {
        if (status !== 200) {
          throw new Error(`HTTP error! status: ${status}`);
        }

        setFeedback({
          show: true,
          msgProps: body,
          // Note remove Hardcoded value
          ok, // : true,
          status, // : 200
        });
      })
      .catch((error) => {
        console.error("Contact form error : ", error);
        setUnknownError(true);
      });
  }

  // By default, form info are sync with jExp if exist
  if (window.wem) {
    const contactFormEvent = window.wem.buildFormEvent("contactForm");
    // @ts-expect-error need to have types exported from jExp wem
    contactFormEvent.flattenedProperties = {
      // @ts-expect-error need to have types exported from jExp wem
      fields: window.wem._extractFormData(form),
    };
    // @ts-expect-error need to have types exported from jExp wem
    window.wem.collectEvent(
      contactFormEvent,
      function ({ status }) {
        if (status !== 200) {
          throw new Error(`HTTP error! status: ${status}`);
        }

        if (!target) {
          setFeedback({
            show: true,
            msgProps: body,
            // Note remove Hardcoded value
            ok: true,
            status, // : 200
          });
        }
      },
      function (xhr) {
        console.error("oups something get wrong with jExp: ", xhr);
      },
    );
  }
};

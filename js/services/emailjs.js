export const sendEmail = (type, data) => {
  const params = {
    email: data["email"],
    name: data["name"],
    message: data["message"],
    code: data["code"],
  };

  const template = templateMap[type];

  emailjs.send("service_m9a7hyo", template, params);
};

const templateMap = {
  confirmation: "template_091m7xy",
  send: "template_5iuxnmr",
};

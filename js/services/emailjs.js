(function () {
  emailjs.init("user_YaQlPUmioMpmaXse1sNTK");
})();

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
  confirm: "template_091m7xy",
  send: "template_gpv2nyi",
};

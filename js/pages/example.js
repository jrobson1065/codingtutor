const languages = ["CSS", "HTML", "Java", "C#", "Python", "JavaScript"];
const concepts = ["OOP", "FP", "Concepts", "TDD"];

export const example = () => {
  populate(
    languages,
    build("ul", $(".languages")),
    concepts,
    build("ul", $(".concepts"))
  );
};

const populate = (list, parent, ...params) => {
  list.each((l) => {
    const i = l === "C#" ? "c-sharp" : l;
    build("li", parent)
      .text(l)
      .class("lang " + i)
      .on("click", function () {
        $$(".example-section li").each((li) => li.removeClass("active"));
        this.addClass("active");
      });
  });

  if (params.length > 1) populate(...params);
};

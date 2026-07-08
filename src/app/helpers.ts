export const scrollTo = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const WEB3FORMS_ACCESS_KEY = "f3823ee4-2f9d-4bee-bfdc-ab1559553726";


import { useEffect } from "react";
import { capitalize } from "../utils/capitalize";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (typeof title === "string")
      document.title = `Shinobi Connect | ${capitalize(title)}`;
  }, [title]);
};

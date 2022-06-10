export const componentDecorator = (href, text, key) => (
  <a
    className="text-primary underline"
    href={href}
    key={key}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
  >
    {text}
  </a>
);

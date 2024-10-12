export default function Card({ children, bg = "bg-gray-100" }) {
  // this will handle all the cards, you can pass in props of how the card should be looking like
  // like here we are passing on the css property for bg, if not present use the default value
  // the children are nested html elements that will be used to create the card
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
}

import { PropTypes } from "prop-types";

export default function BigCards({ title, description, image, isLandscape }) {
  return (
    <a
      className="relative z-10 shrink-0 snap-start snap-always border rounded-xl overflow-hidden bg-center bg-cover bg-no-repeat bg-[#0F101A] border-[#939DB8]/10 min-h-[478px] md:max-h-[478px] w-[85vw] sm:max-w-[725px] hover:scale-[1.01] transition" href="#"
      style={{ width: isLandscape ? '762px' : '362px', height: isLandscape ? '462px' : '478px', backgroundImage: `url(${image}` }}
    >
      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="mt-3 text-neutral-500">{description}</p>
      </div>
    </a >
  )
}

BigCards.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isLandscape: PropTypes.bool,
}

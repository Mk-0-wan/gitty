import { PiSpeedometerLight } from "react-icons/pi"
import { PropTypes } from "prop-types";

export default function Cards({ tag, header, description }) {
  return (
    <div className="flex-1 relative px-6 md:px-11 py-5 md:py-10 font-inter border border-[#939DB8]/20 rounded-[23px]">
      <div
        className="absolute top-3 right-3 px-3 py-2 text-13 text-blue-500 rounded-full border border-blue-500/20 bg-blue-100/10 text-center leading-[100%]">{tag}
      </div>
      <div className="w-11 h-11 rounded-lg border flex justify-center text-blue-800 text-xl items-center bg-[#181925] border-[#939DB8]/10">
        <PiSpeedometerLight />
      </div>
      <h3 className="mt-7 font-helveticaDisplay font-bold text-white text-[20px] md:text-[24px]">{header}</h3>
      <p className="mt-3 text-neutral-500 text-[14px] md:text-neutral-500">{description}</p>
    </div>
  )
}


Cards.propTypes = {
  tag: PropTypes.string,
  header: PropTypes.string,
  description: PropTypes.string,
}

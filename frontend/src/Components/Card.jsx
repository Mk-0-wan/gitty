import { PropTypes } from "prop-types";

export default function Card({ title, description, imageurl }) {
  return (
    <div className="rounded-xl border overflow-hidden bg-[#151621] border-[#727DA1]/20 max-w-[354px] min-w-[354px] shadow-lg">
      <div className="m-1 h-[221px]">
        <img src={imageurl} alt="examplecode" />
      </div>
      <div className="p-8">
        <h3 className="text-xl text-white font-medium sm:whitespace-nowrap max-w-[200px] font-space mb-4">{title}</h3>
        <p className="text-l mt-3 text-gray-500">{description}</p>
        <a href="#" className="text-blue-600 mt-4 inline-block">Explore here now</a>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageurl: PropTypes.string,
}

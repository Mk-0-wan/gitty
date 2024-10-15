import { PropTypes } from "prop-types";
import BigCards from "./BigCards";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc"

export default function Demos({ header, metadata }) {
  return (
    <section className="bg-[#0b0c14] mb-40 ">
      <div className="hidden md:block overflow-hidden">
        <div className="relative">
          <div className="px-5 flex flex-col gap-4 md:flex-row md:justify-between mx-auto max-w-[1126px]">
            <h2 className="text-white font-inter Display font-bold text-[28px] md:text-[40px] ml-1 md:ml-0">{header}</h2>
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <button
                  className="mr-2 shrink-0 flex justify-center items-center rounded-full border
                  transition w-[38px] h-[38px] border-[#939DB8]/20 bg-[#171926]
                  disabled:opacity-40 [&amp;:not(:disabled)]:hover:bg-[#222330] text-neutral-200"
                  data-action="click->carousel#scrollToPrevious" data-carousel-target="previousButton" disabled="">
                  <VscArrowLeft />
                </button>
                <button
                  className="shrink-0 flex justify-center items-center rounded-full border transition text-neutral-200
                  w-[38px] h-[38px] border-[#939DB8]/20 bg-[#171926] disabled:opacity-40 [&amp;:not(:disabled)]:hover:bg-[#222330]"
                  data-action="click->carousel#scrollToNext" data-carousel-target="nextButton">
                  <VscArrowRight />
                </button>
                <div className="mx-5 shrink-0 w-[1px] h-[18px] bg-[#939DB81F]"></div>
              </div>
              <a className="block px-3 md:px-4 py-1 md:py-2 shrink-0 text-13 rounded-full border transition
                text-[#C9D3EE] border-[#939DB8]/20 bg-[#171926] hover:bg-[#222330]"
              >
                Explore incident management
              </a>
            </div>
          </div>

          <div className="mt-9 relative w-screen">
            <div
              className="py-1 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar font-inter"
              style={{ ScrollPaddingLeft: "max(50vw - 563px, 20px)", paddingRight: "20px" }}>
              <div
                className="md:hidden shrink-0 snap-start snap-always"
                style={{ minWidth: "max(100vw - 20px - 20px - 350px, 100vw - 20px - 20px - 85vw)" }}></div>
              <div
                className="hidden md:block shrink-0 snap-start snap-always" style={{ minWidth: "calc(50vw - 563px)" }}></div>
              {Object.values(metadata).map((card, idx) => (
                idx % 2 === 0 ? (
                  <BigCards
                    key={idx + 1}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    isLandscape={false}
                  />
                ) : (
                  <BigCards
                    key={idx + 1}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    isLandscape={true}
                  />
                )
              ))}
              <div className="md:hidden shrink-0 snap-start snap-always"
                style={{ minWidth: "max(100vw - 20px - 20px - 350px, 100vw - 20px - 20px - 85vw)" }}></div>
              <div className="hidden md:block shrink-0 snap-start snap-always" style={{ minWidth: "calc(50vw - 563px)" }}></div>
            </div>
          </div>

          <div className="absolute z-20 inset-0 flex justify-center pointer-events-none">
            <div className="grow h-full bg-gradient-to-r from-[#0B0C14] from-20% via-[#0B0C14]/70 via-80%"></div>
            <div className="shrink-0 w-[1086px]"></div>
            <div className="grow h-full bg-gradient-to-l from-[#0B0C14] from-20% via-[#0B0C14]/70 via-80%"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 md:mt-11 px-10 flex md:justify-end items-center gap-4 max-w-[1095px]">
        <div className="text-neutral-300 text-13 md:text-base">Replaces</div>
        <div className="w-[1px] h-[18px] bg-neutral-200/[0.12]"></div>
        <div className="text-neutral-300 text-13 md:text-base">
          <p>More to come</p>
        </div>
      </div>
    </section >
  )
}


Demos.propTypes = {
  header: PropTypes.string,
  metadata: PropTypes.Object,
}

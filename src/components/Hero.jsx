import PropTypes from "prop-types";

export default function Hero({
  title = "Become a React Developer",
  subtitle = "You are using defaultProps to set up the subtitle value",
}) {
  // this sets up the hero section(tip learn how to use section in your new codebase)
  // again we are passing out the props for both title and subtitle
  // you can still make some default values when the props passed appear empty
  return (
    <>
      <section className="bg-indigo-700 font-geist py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="my-4 text-xl text-white">{subtitle}</p>
          </div>
        </div>
      </section>
    </>
  );
}

// helps you with typechecking also
//Hero.defaultProps = {
//  title: "Become a React Developer",
//  subtitle: "You are using defaultProps to set up the subtitle value",
//};

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

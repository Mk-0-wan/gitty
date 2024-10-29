import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import LoginButton from "../Components/GitHubLoginButton";

export default function LogginLayout({ login }) {
  return (
    <div className="min-h-screen text-base flex flex-col items-center justify-center bg-[#0B0C14]">
      <div className='absolute inset-0 overflow-hidden font-inconsolata'>
        <div className='absolute flex justify-center left-1/2 -translate-x-1/2 w-[1188px] top-[173px]'>
          <img width="1188" height="917" className="relative" alt="" src="https://betterstack.com/assets/auth/flare-v3-b1df91c6207d51591419bda1b1582549116182616361be4efcbc774b9ba2ee1b.jpg" />
        </div>
      </div>
      <div className='absolute top-0 left-0 p-7 sm:p-8 z-20'>
        <div className="flex justify-center">
          <NavLink className="p-1 flex items-center gap-2 text-[#C9D3EE] text-s hover:text-neutral-100 transition focus-visible" to="/">
            <FaArrowLeft className="text-xl text-[#C9D3EE] m-2" />
            Back to ඞitty.
          </NavLink>
        </div>
      </div>
      <div className='w-full grow flex justify-center items-center'>
        <main className="pt-24 z-10 pb-10 w-full font-inter">
          <div className="flex flex-col items-center whitespace-nowrap ">
            <h1 className="text-stone-100 text-6xl">ඞ.</h1>
            <h1 className="font-bold text-[32px] text-[#C9D3EE] leading-[120%] mt-2.5 mb-2.5">
              Sign up with Github
            </h1>
            <LoginButton login={login} />
          </div>
          <div className='mt-9'></div>
        </main>
      </div>

      <div className='my-12 text-sm text-[#C9D3EE] text-center relative z-10'>
        <p>Have fun while at it...</p>
      </div>
    </div>
  );
}


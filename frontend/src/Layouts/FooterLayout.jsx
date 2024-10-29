import { FaGithub, FaLinkedinIn, FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaDragon } from "react-icons/fa";

export default function FooterLayout() {
  return (
    <footer className="bg-[#F3F4F7] dark:bg-[#05060F] font-xl font-inter">
      <div className="mx-auto text-base lg:px-5 max-w-[1110px] text-[#363D4E] dark:text-neutral-200">
        <div
          className="px-5 pt-9 flex flex-col lg:flex-row justify-between items-center lg:items-end border-t border-neutral-300/10">
          <div>
            <h1 className="font-inter font-bold text-xl">ඞitty.</h1>
            <p className="mt-3 hidden lg:block max-w-[342px]">
              Let gitty, help you out as you find ways to make your code more clean, see your on the other side
            </p>
          </div>
          <div className="flex items-center gap-6 whitespace-nowrap">
            <a className="hidden lg:block -mx-1 px-1" href="tel:+1 (201) 500-2007">+1 (201) 500-2007</a>
            <a className="hidden lg:block -mx-1 px-1" href="mailto:hello@betterstack.com">hello@gitty.com</a>
            <div className="hidden lg:block h-4 border-l border-neutral-300/10"></div>
            <div className="hidden lg:flex">
              <div className="flex gap-4 text-neutral-300">
                <a aria-label="Better Stack on Instagram" href="https://www.instagram.com/betterstackhq/"
                  rel="nofollow noopener" target="_blank">
                  <FaInstagram />
                </a>
                <a aria-label="Better Stack on TikTok" href="https://www.tiktok.com/@betterstack" rel="nofollow noopener"
                  target="_blank">
                  <FaTiktok />
                </a>
                <a aria-label="Better Stack on LinkedIn" href="https://www.linkedin.com/company/betterstack"
                  rel="nofollow noopener" target="_blank">
                  <FaLinkedinIn />
                </a>
                <a aria-label="Better Stack on Twitter" href="https://twitter.com/betterstackhq" rel="nofollow noopener"
                  target="_blank">
                  <FaTwitter />
                </a>
                <a aria-label="Better Stack on Github" href="https://github.com/BetterStackHQ/" rel="nofollow noopener"
                  target="_blank">
                  <FaGithub />
                </a>
                <a aria-label="Better Stack on YouTube" href="https://www.youtube.com/@betterstack" rel="nofollow noopener"
                  target="_blank">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="px-5 lg:px-2 lg:mx-3 mt-5 py-3 lg:border-t flex flex-col lg:flex-row justify-between items-center border-neutral-300/10 dark:border-[#1F2433]/70 text-[12px] leading-[18px]">
          <div className="flex items-center gap-6 whitespace-nowrap dark:text-neutral-300">
            <a className="-mx-1 px-1" href="/terms">Terms of Use</a>
            <a className="-mx-1 px-1" href="/privacy">Privacy Policy</a>
          </div>
          <div className="mt-8 mb-2 flex lg:hidden">
            <div className="flex gap-4 text-neutral-300">
              <a aria-label="Better Stack on Instagram" href="https://www.instagram.com/betterstackhq/"
                rel="nofollow noopener" target="_blank">
                <FaInstagram />
              </a>
              <a aria-label="Better Stack on TikTok" href="https://www.tiktok.com/@betterstack" rel="nofollow noopener"
                target="_blank">
                <FaTiktok />
              </a>
              <a aria-label="Better Stack on LinkedIn" href="https://www.linkedin.com/company/betterstack"
                rel="nofollow noopener" target="_blank">
                <FaLinkedinIn />
              </a>
              <a aria-label="Better Stack on Twitter" href="https://twitter.com/betterstackhq" rel="nofollow noopener"
                target="_blank">
                <FaTwitter />
              </a>
              <a aria-label="Better Stack on Github" href="https://github.com/BetterStackHQ/" rel="nofollow noopener"
                target="_blank">
                <FaGithub />
              </a>
              <a aria-label="Better Stack on YouTube" href="https://www.youtube.com/@betterstack" rel="nofollow noopener"
                target="_blank">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="flex items-center text-neutral-300">
            © 2024 <span className="text-xl">.ඞ</span>, Inc. All rights reserved. <span>__</span><FaDragon />
          </div>
        </div>
      </div>
    </footer>
  );
}


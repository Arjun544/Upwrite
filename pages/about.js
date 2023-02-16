import Head from "next/head";
import Image from "next/image";
import { RiMapPin2Fill, RiInstagramFill, RiLinkedinBoxFill, RiGithubFill } from "react-icons/ri";
import { SiUpwork } from "react-icons/si";

export default function About() {
  return (
    <>
      <Head>
        <title>Upwrite</title>
        <meta name="description" content="Craft winning proposals with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-evenly py-4 pl-16 ml-2 md:ml-0 md:pl-28">
        <h1 className="text-xl md:text-3xl text-primary tracking-wider font-semibold">
          Say goodbye to proposal struggles
        </h1>

        <div className="flex flex-col items-center">
          <h1 className="text-xl text-dark tracking-wider pt-10 pb-4">
            What is Upwrite?
          </h1>
          <p className="w-full text-sm md:text-base first-letter:text-2xl md:first-letter:text-4xl md:w-3/5 tracking-wider pr-4">
            Upwrite is the Upwork Job Proposal Generator, the ultimate tool for
            freelancers looking to win more clients and projects on Upwork. Our
            app leverages the power of OpenAI natural language processing to
            help you quickly and easily generate customized job proposals that
            will stand out from the competition.
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center gap-6 pr-4">
          <h1 className="text-xl text-dark tracking-wider pt-10">
            About Developer
          </h1>

          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-10">
              <Image
                src={"/assets/developer.jpeg"}
                alt="Developer Image"
                width={100}
                height={100}
                className="rounded-full"
              ></Image>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mt-6">
                Arjun Mahar
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Top Rated on Upwork
              </span>
              <div className="flex gap-2 mt-6">
                <RiMapPin2Fill className="text-white" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Mithi, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-10 mt-10">
                <a
                  href="https://www.upwork.com/freelancers/~01adac79a876b58c7e"
                  target="_black"
                >
                  <SiUpwork
                    size={30}
                    className="text-green-500 cursor-pointer"
                  />
                </a>
                <a href="https://www.instagram.com/ak_codes/" target="_black">
                  <RiInstagramFill
                    size={30}
                    className="text-pink-500 cursor-pointer"
                  />
                </a>
                <a
                  href="https://linkedin.com/in/arjun-mahar-6067951b8"
                  target="_black"
                >
                  <RiLinkedinBoxFill
                    size={30}
                    className="text-blue-500 cursor-pointer"
                  />
                </a>
                <a href="https://github.com/Arjun544" target="_black">
                  <RiGithubFill
                    size={30}
                    className="text-white cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

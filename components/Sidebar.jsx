import React, { useState, useContext } from "react";
import Link from "next/link";
import { getSession, useSession, signIn, signOut } from "next-auth/react";


import {
  RiHome5Fill,
  RiChatHistoryFill,
  RiAddLine,
  RiInformationFill,
  RiLoginCircleFill,
  RiLogoutCircleFill,
} from "react-icons/ri";
import { SiUpwork } from "react-icons/si";
import SidebarTile from "./Sidebar_Tile";
import { AppContext } from "@/pages/_app";
import { useRouter } from "next/router";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    setCurrentStep,
    setProposal,
    setProposalInput,
    setAbout,
    setQuestions,
  } = useContext(AppContext);
  const [isShowingProposalToolTip, setisShowingProposalToolTip] =
    useState(false);
  const [isShowingLoginToolTip, setisShowingLoginToolTip] = useState(false);
  const [isShowingProfileToolTip, setisShowingProfileToolTip] = useState(false);

  const items = [
    {
      id: 1,
      link: "/",
      name: "Home",
      icon: <RiHome5Fill size={26} className="text-dark" />,
    },
    {
      id: 2,
      link: "/history",
      name: "History",
      icon: <RiChatHistoryFill size={26} className="text-dark" />,
    },
    {
      id: 3,
      link: "/about",
      name: "About",
      icon: <RiInformationFill size={26} className="text-dark" />,
    },
  ];

  const handleShowProposalToolTip = () => setisShowingProposalToolTip(true);
  const handleHideProposalToolTip = () => setisShowingProposalToolTip(false);
  const handleShowLoginToolTip = () => setisShowingLoginToolTip(true);
  const handleHideLoginToolTip = () => setisShowingLoginToolTip(false);
  const handleShowProfileToolTip = () => setisShowingProfileToolTip(true);
  const handleHideProfileToolTip = () => setisShowingProfileToolTip(false);

  const handleAddNewProposal = () => {
    setCurrentStep(1);
    setProposal({});
    setProposalInput("");
    setAbout("");
    setQuestions([]);
    if (router.asPath !== "/") {
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col fixed h-full items-center justify-between px-4 py-4 bg-white border-r-2">
      <div className="flex flex-col gap-10 ">
        <Link href="/" className="text-primary">
          <SiUpwork size={45} />
        </Link>
        {items.map((item) => (
          <SidebarTile key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-10">
        <div
          onClick={session ? () => signOut() : () => signIn("google")}
          onMouseEnter={handleShowLoginToolTip}
          onMouseLeave={handleHideLoginToolTip}
          className="flex items-center relative justify-around cursor-pointer transition-all duration-300"
        >
          {session ? (
            <RiLogoutCircleFill size={26} className="text-red-400" />
          ) : (
            <RiLoginCircleFill size={26} className="text-dark" />
          )}
          {isShowingLoginToolTip && (
            <div className="flex absolute items-center justify-center left-12 w-32 py-1 bg-dark rounded-lg">
              <span className="text-sm text-white">
                {session ? "Logout" : "Login"}
              </span>
            </div>
          )}
        </div>
        {session && (
          <div
            onMouseEnter={handleShowProfileToolTip}
            onMouseLeave={handleHideProfileToolTip}
            className="flex items-center relative justify-around cursor-pointer transition-all duration-300"
          >
            <Image
              src={session.user?.image || '/assets/placeholder.jpg'}
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full"
            ></Image>
            {isShowingProfileToolTip && (
              <div className="flex absolute items-center justify-center left-12 w-32 py-1 bg-dark rounded-lg">
                <span className="text-sm text-white">{session.user.name}</span>
              </div>
            )}
          </div>
        )}
        <div
          onClick={handleAddNewProposal}
          onMouseEnter={handleShowProposalToolTip}
          onMouseLeave={handleHideProposalToolTip}
          className="flex items-center relative justify-around h-12 rounded-xl gap-4 px-4 bg-primary cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          <RiAddLine size={26} className="text-white" />
          {isShowingProposalToolTip && (
            <div className="flex absolute items-center justify-center left-16 w-32 py-1 bg-dark rounded-lg">
              <span className="text-sm text-white">New Proposal</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

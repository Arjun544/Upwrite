import React, { useState, useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  RiHome5Fill,
  RiChatHistoryFill,
  RiInformationFill,
  RiLogoutCircleFill,
  RiLoginCircleFill,
  RiAddLine,
} from "react-icons/ri";
import { SiUpwork } from "react-icons/si";
import SidebarTile from "./Sidebar_Tile";
import { AppContext } from "../pages/_app";
import { useRouter } from "next/router";
import Image from "next/image";
import { AppContent } from "../utils/types";
import { navItems } from "../utils/data";

interface Props {}

const Sidebar = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    setCurrentStep,
    setProposal,
    setDescriptionInput,
    setAbout,
    setQuestions,
  } = useContext<AppContent>(AppContext);
  const [isShowingProposalToolTip, setisShowingProposalToolTip] =
    useState<boolean>(false);
  const [isShowingLoginToolTip, setisShowingLoginToolTip] =
    useState<boolean>(false);
  const [isShowingProfileToolTip, setisShowingProfileToolTip] =
    useState<boolean>(false);

  const handleShowProposalToolTip = () => setisShowingProposalToolTip(true);
  const handleHideProposalToolTip = () => setisShowingProposalToolTip(false);
  const handleShowLoginToolTip = () => setisShowingLoginToolTip(true);
  const handleHideLoginToolTip = () => setisShowingLoginToolTip(false);
  const handleShowProfileToolTip = () => setisShowingProfileToolTip(true);
  const handleHideProfileToolTip = () => setisShowingProfileToolTip(false);

  const handleAddNewProposal = () => {
    setCurrentStep(1);
    setProposal((Proposal) => Proposal);
    setDescriptionInput("");
    setAbout("");
    setQuestions([]);
    if (router.asPath !== "/") {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col fixed h-full items-center justify-between px-1 md:px-4 py-4 bg-white border-r-2">
      <div className="flex flex-col gap-6 ">
        <Link
          onClick={(e) => {
            setCurrentStep(1);
          }}
          href="/"
          aria-label="Home"
          className="text-primary"
        >
          <SiUpwork className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-4" />
        </Link>
        {navItems.map((item) => (
          <SidebarTile key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        <div
          onClick={session ? () => signOut() : () => signIn("google")}
          onMouseEnter={handleShowLoginToolTip}
          onMouseLeave={handleHideLoginToolTip}
          className="flex items-center relative justify-around cursor-pointer transition-all duration-300"
        >
          {session ? (
            <RiLogoutCircleFill className="text-red-400 h-8 w-8 md:h-9 md:w-9" />
          ) : (
            <RiLoginCircleFill className="text-dark h-8 w-8 md:h-9 md:w-9" />
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
              src={session.user?.image || "/assets/placeholder.jpg"}
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
          className="flex items-center relative justify-around h-11 rounded-xl gap-4 px-3 mx-1 md:mx-0 bg-primary cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          <RiAddLine className="text-white h-4 w-4 md:h-6 md:w-6" />
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

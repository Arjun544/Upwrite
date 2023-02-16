import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { RiGoogleFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { IoMdTrash } from "react-icons/io";
import { AppContext } from "./_app";
import { useRouter } from "next/router";
import Btn_Loader from "@/components/Btn_Loader";
import { toast } from "react-hot-toast";

export default function History() {
  const { setCurrentStep, setProposal, setIsOnlyViewingProposal } =
    useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getHistory = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("user_id", session.user.id);
      setHistory(data);
      setError(error);
      setIsLoading(false);

      console.log(data);
    };
    if (session) {
      getHistory();
    }
  }, [session?.user?.id, session]);

  const handleAddNew = () => {
    setCurrentStep(1);
    router.push("/");
  };

  const handleOnClick = (item) => {
    setProposal({
      text: item.proposal.text,
      answers: item.proposal.answers,
      description: item.proposal.description,
      about: item.proposal.about,
    });
    setIsOnlyViewingProposal(true);
    router.push("/");
    setCurrentStep(2);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const { error } = await supabase.from("proposals").delete().eq("id", id);
    if (error) {
      toast("Failed to delete", {
        icon: "🥺",
      });
    } else {
      toast("Successfully deleted", {
        icon: "🚀",
      });
      const filteredHistory = history.filter(function (e) {
        return e.id !== id;
      });
      setHistory(filteredHistory);
    }
  };

  const handleClearAll = async () => {
    const { error } = await supabase
      .from("proposals")
      .delete()
      .or(`user_id.eq.${session.user.id}`);

    if (error) {
      toast("Failed to clear", {
        icon: "🥺",
      });
    } else {
      toast("Successfully cleared", {
        icon: "🚀",
      });

      setHistory([]);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full pl-14 md:pl-0">
        <div className="flex flex-col items-center p-4 md:p-10 bg-[#ECF2FF] rounded-3xl gap-6 shadow-md">
          <h1>Sign in to see history</h1>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center bg-dark py-3 px-6 rounded-xl gap-2"
          >
            <RiGoogleFill size={24} className="text-blue-400" />
            <h1 className="text-white text-sm">Continue with Google</h1>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Upwrite</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col pl-14 md:pl-24 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="tracking-wider text-xl pl-4  md:pl-0">History</h1>
          <button
            onClick={handleClearAll}
            className="bg-red-400 tracking-wider text-sm px-6 py-2 rounded-xl mr-5 md:mr-10 hover:bg-red-500"
          >
            Clear All
          </button>
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center w-full pt-96 gap-4">
            <Btn_Loader text={"Loading"} />
          </div>
        )}
        {error && !isLoading && history.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full pt-96 gap-4">
            <h1 className="text-slate-500 tracking-wider">
              Failed to get history
            </h1>
          </div>
        )}
        {!isLoading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full pt-96 gap-4">
            <h1 className="text-slate-500 tracking-wider">No History</h1>
            <button
              onClick={handleAddNew}
              className="flex items-center justify-center gap-4 w-48 shadow-md text-sm rounded-xl py-3 px-8 bg-primary hover:bg-opacity-70"
            >
              Add New
            </button>
          </div>
        )}
        {!isLoading && !error && history.length !== 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 pr-4 ml-4 md:ml-0 md:pr-8">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={(e) => handleOnClick(item)}
                className="flex items-center bg-[#ECF2FF] pl-4 py-4 rounded-2xl cursor-pointer hover:shadow-md"
              >
                <div className="grid grid-cols-12 grow gap-4">
                  <h1 className="col-span-10 md:col-span-11 text-xs tracking-wider truncate text-ellipsis overflow-hidden">
                    {item.proposal.text}...
                  </h1>
                  <IoMdTrash
                    onClick={(e) => handleDelete(e, item.id)}
                    size={20}
                    className="text-red-400 hover:text-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

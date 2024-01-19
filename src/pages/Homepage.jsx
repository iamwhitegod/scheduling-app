import { ArrowRight, UserCircle } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export const styles = {
  backgroundImage:
    "linear-gradient(to bottom, rgb(255, 255, 255) 64%, rgba(51, 143, 192, 0.7)), url(https://s3-alpha-sig.figma.com/img/da17/98c2/b0957b1351283eef59e942311a4437ff?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OMV55-6DtiERIqXnCgG3zwS0QNUEukHdm09q0jfdFw09m06mm1mGZuvbDJdSUvJXTl2qbYD-dEMQoN-xvw4x1heXr04am3tVGBsEbHPLJNUX~v1uwl4WxI74gw7~KYmpog6DIq3BEGGiz~sSdwhLzVgKVEWa8c3sZwyJHeOUSlTFk6UsCz5jBfCwNFyPahYTWeeg7vaqM822~CeaKszBXWTP0lnZqz4pWdPwHFKoD-zoDhD~a3UFQkrOpimvioi6xtdnWviIRSM7oyTnzLXNTXdavXXfbFPd~4seduWkClsKlJRDk1NKw79QAlsXSmK1zOYFunamNAA-VASN7sKJnw__)",
  backgroundBlendMode: "lighten",
  mixBlendMode: "soft-light",
};

const Homepage = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <header className="header min-h-[100vh]" style={styles}>
      <nav className="py-8">
        <div className="max-w-[1140px] px-[24px] mx-auto flex justify-between items-center">
          <Link
            to={"/"}
            className="text-white bg-primaryDark px-6 py-4 text-[20px] cursor-pointer rounded-md"
          >
            Eventter
          </Link>

          <div className="flex gap-4 items-center cursor-pointer">
            {isAuthenticated ? (
              <Link to={"/events"}>
                <span className="text-[20px] font-sans font-medium text-primaryDark">
                  My Events
                </span>

                <UserCircle size={32} weight="fill" />
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-[20px] font-sans font-medium text-primaryDark"
              >
                SignIn
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="py-16 pt-[16vh]">
        <div className="max-w-[1140px] px-[24px] mx-auto flex flex-col justify-between items-center">
          <h1 className="text-primaryDark text-[64px] leading-[72px] text-center mb-4">
            Always nail your event scheduled-time goals
          </h1>
          <p className="text-primaryDark text-[18px] text-center font-sans font-medium mb-[56px]">
            Efficiently manage your event activities to be just right on time.
          </p>
          <button className="flex items-center bg-primaryLight px-[40px] py-[16px] gap-5 rounded-md">
            <span className="uppercase text-[16px] text-white font-sans font-bold">
              Plan your event
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
            >
              <path
                d="M15.3292 4.04685H0.585938C0.262354 4.04685 0 4.30921 0 4.63279V7.36717C0 7.69075 0.262354 7.9531 0.585938 7.9531H15.3292V10.2021C15.3292 11.2461 16.5914 11.769 17.3297 11.0307L21.5318 6.82864C21.9895 6.37098 21.9895 5.62898 21.5318 5.17137L17.3297 0.969266C16.5915 0.231033 15.3292 0.753885 15.3292 1.79793V4.04685Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Homepage;

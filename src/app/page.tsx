"use client";
import Image from "next/image";
import iconImage from "../../public/image.png";
import croppedImg from "../../public/cropped.png";
import ellipseImg from "../../public/ellipse.png";
import DatePickerCarousel from "@/components/DatePickerCarousel";
import TimePickerCarousel from "@/components/TimePickerCarousel";
import { useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return isMobile ? (
    <>
      <div className="relative z-0 bg-linear-to-bl from-[#AA580D] via-[#E28F11] to-[#AA580D] min-h-[50vh] flex items-center">
        <div className="ml-5">
          <h1
            className="
            w-[259px] h-[41px]
            font-poppins font-medium
            text-[27px] leading-10
            flex items-center
            text-white
          "
          >
            Cool session
          </h1>
          <h2
            className="
            w-[122px] h-5
            font-poppins font-normal
            text-[16px] leading-6
            flex items-center
            text-white/80
          "
          >
            Additional type
          </h2>
          <div
            className="
            mt-7
            flex flex-row justify-center items-center
            px-3 py-1 gap-2
            w-[93px] h-7
            bg-[rgba(255,255,255,0.16)]
            backdrop-blur-[6px]
            rounded-[80px]
            flex-none order-1 grow-0
          "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8571 6.85714C12.8571 8.44844 12.225 9.97456 11.0998 11.0998C9.97456 12.225 8.44844 12.8571 6.85714 12.8571C5.26584 12.8571 3.73972 12.225 2.6145 11.0998C1.48928 9.97456 0.857143 8.44844 0.857143 6.85714C0.857143 5.26584 1.48928 3.73972 2.6145 2.6145C3.73972 1.48928 5.26584 0.857143 6.85714 0.857143C8.44844 0.857143 9.97456 1.48928 11.0998 2.6145C12.225 3.73972 12.8571 5.26584 12.8571 6.85714ZM0 6.85714C0 8.67577 0.722447 10.4199 2.00841 11.7059C3.29437 12.9918 5.03852 13.7143 6.85714 13.7143C8.67577 13.7143 10.4199 12.9918 11.7059 11.7059C12.9918 10.4199 13.7143 8.67577 13.7143 6.85714C13.7143 5.03852 12.9918 3.29437 11.7059 2.00841C10.4199 0.722447 8.67577 0 6.85714 0C5.03852 0 3.29437 0.722447 2.00841 2.00841C0.722447 3.29437 0 5.03852 0 6.85714ZM6.42857 3V6.85714C6.42857 6.99911 6.50089 7.13304 6.61875 7.21339L9.19018 8.92768C9.38839 9.05893 9.65357 9.00536 9.78482 8.80982C9.91607 8.61429 9.8625 8.34643 9.66696 8.21518L7.28571 6.62679V3C7.28571 2.76429 7.09286 2.57143 6.85714 2.57143C6.62143 2.57143 6.42857 2.76429 6.42857 3Z"
                fill="white"
              />
            </svg>
            <span
              className="
              w-[45px] h-5
              font-poppins font-normal
              text-[13px] leading-5
              flex items-center
              text-white
            "
            >
              30 min
            </span>
          </div>
        </div>
        <Image
          className="absolute -bottom-10 right-0 w-[201px] h-[301px]"
          src={ellipseImg}
          alt=""
        />
        <Image
          className="absolute bottom-0 right-0 w-[173px] h-[290px]"
          src={croppedImg}
          alt=""
        />
      </div>
      <div
        className="
              relative
              -mt-10
              z-10
              w-full h-[55vh]
              bg-white
              rounded-2xl
              flex flex-col items-center
            "
      >
        <DatePickerCarousel
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />
        {selectedDate && (
          <TimePickerCarousel
            onTimeSelect={setSelectedTime}
            selectedTime={selectedTime}
          />
        )}
        <button
          className={`
              flex items-center justify-center
              px-2 py-[18px] gap-2
              w-[350px] h-[60px]
              ${
                !selectedDate || !selectedTime
                  ? "bg-[#DADBE8] cursor-not-allowed "
                  : "bg-[#16171B] hover:bg-[#2c2d33] cursor-pointer"
              }
              rounded-full
              font-poppins font-semibold text-[16px] leading-6
              tracking-[0.03em]
              text-white
              mt-auto mb-10
            `}
          disabled={!(selectedDate && selectedTime)}
          onClick={() => {
            if (!selectedDate || !selectedTime) return;

            const dateTime = new Date(selectedDate);

            dateTime.setHours(selectedTime.getHours());
            dateTime.setMinutes(selectedTime.getMinutes());
            dateTime.setSeconds(0);
            dateTime.setMilliseconds(0);

            console.log(dateTime.getTime());
          }}
        >
          Confirm
        </button>
      </div>
    </>
  ) : (
    <>
      <header
        className="
                box-border
                absolute left-0 top-0
                w-full h-20
                bg-[rgba(0,0,0,0.2)]
                border-b border-b-[rgba(255,255,255,0.4)]
                backdrop-blur-[34px]
              "
      >
        <h1
          className="
            w-[284px] h-[33px]
            font-poppins font-semibold not-italic
            text-[22px] leading-[33px]
            flex items-center
            text-white
            ml-[135px] mt-5
          "
        >
          6037 Venture Partnership
        </h1>
      </header>
      <div className="bg-linear-to-bl from-[#AA580D] via-[#E28F11] to-[#AA580D] min-h-screen">
        <div
          className="
              absolute
              w-[568px] h-[620px]
              left-1/2 top-1/2
              -translate-x-1/2 -translate-y-[calc(50%-5px)]
              bg-white
              rounded-2xl
              flex flex-col items-center
            "
        >
          <div className="flex items-center gap-5 mt-10">
            <Image src={iconImage} alt="" className="w-[120px] h-auto" />
            <div className="flex flex-col gap-2 items-start">
              <h2
                className="
                  w-[202px] h-[41px]
                  font-kaisei font-bold not-italic
                  text-[28px] leading-[41px]
                  flex items-center
                  text-[#16171B]
                "
              >
                Book a Session
              </h2>
              <p
                className="
                  w-[309px] h-[42px]
                  font-poppins font-normal not-italic
                  text-[14px] leading-[21px]
                  flex items-center
                  text-[#8F91A1]
                  order-1 grow-0 flex-none
                "
              >
                Choose a date and time that is convenient for you to e-meet your
                stylist
              </p>
            </div>
          </div>
          <DatePickerCarousel
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          {selectedDate && (
            <TimePickerCarousel
              onTimeSelect={setSelectedTime}
              selectedTime={selectedTime}
            />
          )}
          <button
            className={`
              flex items-center justify-center
              px-2 py-[18px] gap-2
              w-[370px] h-[60px]
              ${
                !selectedDate || !selectedTime
                  ? "bg-[#DADBE8] cursor-not-allowed "
                  : "bg-[#16171B] hover:bg-[#2c2d33] cursor-pointer"
              }
              rounded-full
              font-poppins font-semibold text-[16px] leading-6
              tracking-[0.03em]
              text-white
              mt-auto mb-10
            `}
            disabled={!(selectedDate && selectedTime)}
            onClick={() => {
              if (!selectedDate || !selectedTime) return;

              const dateTime = new Date(selectedDate);

              dateTime.setHours(selectedTime.getHours());
              dateTime.setMinutes(selectedTime.getMinutes());
              dateTime.setSeconds(0);
              dateTime.setMilliseconds(0);

              console.log(dateTime.getTime());
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

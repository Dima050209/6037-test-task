"use client";
import Image from "next/image";
import iconImage from "../../public/image.png";
import DatePickerCarousel from "@/components/DatePickerCarousel";
import TimePickerCarousel from "@/components/TimePickerCarousel";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
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
            className="
              flex items-center justify-center
              px-2 py-[18px] gap-2
              w-[370px] h-[60px]
              bg-[#16171B]
              rounded-full
              font-poppins font-semibold text-[16px] leading-6
              tracking-[0.03em]
              text-white
              mt-auto mb-10
            "
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

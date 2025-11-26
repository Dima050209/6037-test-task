"use client";
import React, { useEffect, useState } from "react";
import CarouselContainer from "./CarouselContainer";
import { isSameMinute } from "date-fns/fp";

const generateTimeDates = () => {
  const times = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);

  for (let i = 0; i <= 48; i++) {
    const d = new Date(base.getTime() + i * 15 * 60 * 1000);
    if (d.getHours() === 12 && d.getMinutes() > 0) break;
    times.push(d);
    console.log(d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }));
  }

  return times;
};

function formatToAmPm(date: Date) {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const timeSlots = generateTimeDates();

export default function TimePickerCarousel() {
  const [now, setNow] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContainer>
      {timeSlots.map((slot) => {
        return (
          <button
            key={slot.toISOString()}
            className="flex flex-col items-start"
            onClick={() => setSelectedTime(slot)}
          >
            <div
              className={`
                          embla__slide relative box-border flex flex-col justify-center items-center
                           w-[81px] h-[45px] p-0 rounded-full
                          font-poppins not-italic   text-[14px] leading-[21px] text-center
                          ${
                            selectedTime && isSameMinute(slot, selectedTime)
                              ? ` bg-[#F7F7FC] border border-[#F7F7FC] font-medium  text-[#DE3A6B]`
                              : `bg-white border border-[#E8EBF4] font-normal text-[#16171B]`
                          }
                          `}
            >
              <p className="text-xs">{formatToAmPm(slot)}</p>
            </div>
          </button>
        );
      })}
    </CarouselContainer>
  );
}

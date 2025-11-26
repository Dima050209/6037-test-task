"use client";
import React, { useEffect, useState } from "react";
import CarouselContainer from "./CarouselContainer";
import { isSameMinute } from "date-fns/fp";

function generateTimeSlots() {
  const slots: Date[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);

  for (let i = 0; i < 96; i++) {
    slots.push(new Date(base));
    base.setMinutes(base.getMinutes() + 15);
    console.log(base);
  }

  return slots;
}

function formatToAmPm(date: Date) {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const timeSlots = generateTimeSlots();

interface TimePickerCarouselProps {
    onTimeSelect: (date: Date | null) => void;
    selectedTime: Date | null;
}

export default function TimePickerCarousel({onTimeSelect, selectedTime}: TimePickerCarouselProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeSelect = (time: Date) => {
    if(selectedTime && isSameMinute(time, selectedTime)) {
        onTimeSelect(null);
        return;
    }
    onTimeSelect(time);
  }

  return (
    <CarouselContainer>
      {timeSlots.filter((slot) => slot > now).map((slot) => {
        return (
          <button
            key={slot.toISOString()}
            className="flex flex-col items-start"
            onClick={() => handleTimeSelect(slot)}
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

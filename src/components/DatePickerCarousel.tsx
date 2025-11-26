"use client";
import {
  addDays,
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
} from "date-fns";
import { useState, useEffect } from "react";
import CarouselContainer from "./CarouselContainer";

interface DatePickerCarouselProps {
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DatePickerCarousel({
  onDateSelect,
  selectedDate,
}: DatePickerCarouselProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDateSelect = (date: Date) => {
    if (selectedDate && isSameDay(date, selectedDate)) {
      onDateSelect(null);
      return;
    }
    onDateSelect(date);
  };

  const sixWeeksLater = addDays(now, 42);
  const dates = eachDayOfInterval({ start: now, end: sixWeeksLater });

  return (
    <CarouselContainer paddingY="4">
      {dates.map((date) => {
        const day = format(date, "dd");
        const weekday = daysOfWeek[getDay(date)];

        const isStartOfMonth = date.getDate() === 1;
        const isEndOfMonth =
          date.getDate() ===
          new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        return (
          <button
            key={date.toISOString()}
            className="flex flex-col items-start"
            onClick={() => handleDateSelect(date)}
          >
            <div
              className={`
                        embla__slide relative box-border flex flex-col justify-center items-center
                        w-16 h-16 p-0 rounded-lg
                        font-poppins not-italic text-[16px] leading-6 text-center
                        ${
                          selectedDate && isSameDay(date, selectedDate)
                            ? ` bg-[#F7F7FC] border border-[#F7F7FC] font-medium  text-[#DE3A6B]`
                            : `bg-white border border-[#E8EBF4] font-normal text-[#16171B]`
                        }
                        `}
            >
              {(isEndOfMonth || isStartOfMonth) && (
                <span
                  className="
                        absolute
                        -top-5 left-0
                        w-[25px] h-[21px]
                        font-poppins font-normal not-italic
                        text-[14px] leading-[21px]
                        flex items-center
                        text-[#8F91A1]
                        "
                >
                  {format(date, "MMM")}
                </span>
              )}
              <p className="text-xs">{weekday}</p>
              <p className="text-sm">{day}</p>
            </div>
          </button>
        );
      })}
    </CarouselContainer>
  );
}

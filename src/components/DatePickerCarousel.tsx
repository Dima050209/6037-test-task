"use client";
import {
  addDays,
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
} from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DatePickerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [now, setNow] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const sixWeeksLater = addDays(now, 42);
  const dates = eachDayOfInterval({ start: now, end: sixWeeksLater });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelectOrReInit = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelectOrReInit);
    emblaApi.on("reInit", onSelectOrReInit);

    requestAnimationFrame(() => onSelectOrReInit());

    return () => {
      emblaApi.off("select", onSelectOrReInit);
      emblaApi.off("reInit", onSelectOrReInit);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="flex w-full gap-6 items-center mt-10 px-10">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={`${!canScrollPrev ? "opacity-30 cursor-not-allowed" : ""}`}
      >
        <svg
          width="9"
          height="17"
          viewBox="0 0 9 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.186834 7.90112C-0.062273 8.15022 -0.062273 8.56005 0.186834 8.80915L7.90112 16.5234C8.15023 16.7725 8.56005 16.7725 8.80916 16.5234C9.05826 16.2743 9.05826 15.8645 8.80916 15.6154L1.54889 8.35513L8.80916 1.09487C9.05826 0.845759 9.05826 0.435938 8.80916 0.18683C8.56005 -0.0622768 8.15023 -0.0622768 7.90112 0.18683L0.186834 7.90112Z"
            fill="#16171B"
          />
        </svg>
      </button>
      <div className="embla w-full overflow-hidden py-4" ref={emblaRef}>
        <div className="embla__container flex gap-2 items-end">
          {dates.map((date, index) => {
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
                onClick={() => setSelectedDate(date)}
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
        </div>
      </div>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={`${!canScrollNext ? "opacity-30 cursor-not-allowed" : ""}`}
      >
        <svg
          width="9"
          height="17"
          viewBox="0 0 9 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.80915 7.90112C9.05826 8.15022 9.05826 8.56005 8.80915 8.80915L1.09487 16.5234C0.845759 16.7725 0.435938 16.7725 0.18683 16.5234C-0.0622768 16.2743 -0.0622768 15.8645 0.18683 15.6154L7.4471 8.35513L0.18683 1.09487C-0.0622768 0.845759 -0.0622768 0.435938 0.18683 0.18683C0.435938 -0.0622768 0.845759 -0.0622768 1.09487 0.18683L8.80915 7.90112Z"
            fill="#16171B"
          />
        </svg>
      </button>
    </div>
  );
}

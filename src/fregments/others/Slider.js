import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserInfo from "./UserInfo";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
export default function Slider({ dataCollection }) {
  return (
    <Swiper
      modules={[Navigation, A11y, Pagination]}
      spaceBetween={30}
      navigation
      slidesPerView={2}
      // pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log("")}
    >
      {dataCollection &&
        dataCollection.map((item) => (
          <SwiperSlide
            key={item?.slug}
            className="bg-listItem  rounded hover:bg-plum transition duration-300  p-2"
          >
            <UserInfo user={item} gap={"gap-2"} flex_dir={"flex-col"} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

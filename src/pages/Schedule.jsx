import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { Axios } from "../Api/Axios";
import useSchedule from "../hooks/Schedule/useSchedule";
import TopBar from "../Components/TopBar/TopBar";
import TableNavlinks from "../Components/TableNavlinks";
import plus from "../assets/Schedule/plus.svg";
import dateIcon from "../assets/Schedule/dateIcon.svg";
import Timeline from "../assets/Schedule/Timeline.svg";
import ModalSchedule from "../Components/modals/modalSchedule";
import { useEffect, useState } from "react";
import interactionPlugin from "@fullcalendar/interaction";

function Schedule() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [id, setId] = useState();

  const date = useSchedule();
  function handleDateClick(info) {
    setSelectedDate(info.dateStr);

    setShowModal(true);
  }
  useEffect(() => {
    if (!showModal) {
      setId("");
    }
  }, [showModal]);
  return (
    <>
      <TopBar title="Schedule" onCreate={() => setShowModal(true)} />

      <TableNavlinks
        tabs={[
          {
            label: "Calendar",
            icon: dateIcon,
          },
          {
            label: "Timeline",
            icon: Timeline,
          },
          {
            label: "Add",
            icon: plus,
          },
        ]}
      />

      <div className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          eventClick={(info) => {
            setShowModal(true);
            setId(info.event.id);
          }}
          events={date}
          dateClick={handleDateClick}
          dayMaxEvents={2}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
      <ModalSchedule
        setShowModal={setShowModal}
        showModal={showModal}
        selectedDate={selectedDate}
        id={id}
      />
    </>
  );
}

export default Schedule;

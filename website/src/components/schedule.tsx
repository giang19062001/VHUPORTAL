import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { getSignTeach } from "../redux/teach/tech.thunk";
import { useEffect, useState } from "react";
import moment from "moment";

// const events = [{ title: "Meeting", start: new Date() }];
function renderEventContent(eventInfo: any) {
  return (
    <div style={{ display: "block", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0D2461",
        }}
        className="rounded-xl text-white p-4 text-lg"
      >
        <p className="text-center">Môn học: {eventInfo.event.title}</p>
        <p className="text-center">
          Buổi:{" "}
          {eventInfo.event.extendedProps.session === "MORNING"
            ? "Sáng 7:15 - 11:15"
            : "Chiều 1:30 - 4:30"}
        </p>
        <p className="text-center">
          Lớp: {eventInfo.event.extendedProps.class}
        </p>
        <p className="text-center">
          Giảng viên: {eventInfo.event.extendedProps.teacher}
        </p>
      </div>
    </div>
  );
}
export const Schedule = () => {
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<any>();
  const student = useSelector((state: RootState) => state.auth.userInfo);
  const signs = useSelector((state: RootState) => state.teach.signs);

  useEffect(() => {
    const promise1 = dispatch(getSignTeach(student?.email!));
    return () => {
      promise1.abort();
    };
  }, [dispatch, student?.email]);

  useEffect(() => {
    let arrResult: any = [];
    let currentDay: string = "";
    signs.map(async function (obj) {
      for (let i = 1; i < 7; i++) {
        if (i === 1) {
          currentDay = obj.DAY;
          arrResult.push({
            title: obj.SUBJECT,
            start: obj.DAY,
            session: obj.SESSION,
            class: obj.CLASS,
            teacher: obj.TEACHER,
          });
        } else {
          arrResult.push({
            title: obj.SUBJECT,
            start: moment(currentDay)
              .add(7, "d")
              .format("YYYY-MM-DDTHH:mm:ss.000Z"),
            session: obj.SESSION,
            class: obj.CLASS,
            teacher: obj.TEACHER,
          });
          currentDay = moment(currentDay)
            .add(7, "d")
            .format("YYYY-MM-DDTHH:mm:ss.000Z");
        }
      }
    });
    setEvents(arrResult);
  }, [signs]);

  console.log(events);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        buttonText={{today:'Hôm nay'}}
        titleFormat={{year: 'numeric', month: 'numeric'}}
        eventContent={renderEventContent}
      />
    </div>
  );
};

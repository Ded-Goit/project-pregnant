// app/journey/[weekNumber]/page.tsx (server) або сторінка клієнта
import styles from "./journeypage.module.css"
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/WeekSelector/WeekSelector";


export default function Page() {
  return (
    <div className={styles.container}>
      <GreetingBlock/>
      <WeekSelector total={42} startAt={1}/>
    </div>
  );
}

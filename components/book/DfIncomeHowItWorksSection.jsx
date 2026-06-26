import { DF_INCOME_DEFAULT_HOW_STEPS } from "@/lib/book/dfIncomeHowItWorksContent";
import styles from "./df-2026-fixed-income.module.css";

export default function DfIncomeHowItWorksSection({ className = "" }) {
  return (
    <section id="how" className={`${styles.how} ${className}`.trim()}>
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.secHead}>
          <div className={styles.eyebrow}>The mechanics</div>
          <h2>Where the yield actually comes from.</h2>
        </div>
        <div className={styles.steps}>
          {DF_INCOME_DEFAULT_HOW_STEPS.map((step, index) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepIdx}>{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

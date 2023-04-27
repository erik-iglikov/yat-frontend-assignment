import { ReactElement } from "react";
import "./stat-card.module.scss";

type StateCardProps = {
  label: string;
  value: string | number;
  icon?: ReactElement;
};

export const StatCard = ({ label, value, icon }: StateCardProps) => {
  return (
    <article className="stat-card">
      <h6 className="label">
        {label}
      </h6>

      <div className="value">
        {icon}
        <h3>{value?.toLocaleString() || '---'}</h3>
      </div>
    </article>
  );
};

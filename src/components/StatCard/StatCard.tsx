import { ReactElement } from "react";
import "./stat-card.module.scss";
import { Spinner } from "components/Spinner";

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
        <h3>{value?.toLocaleString() || <Spinner size="small"/>}</h3>
      </div>
    </article>
  );
};

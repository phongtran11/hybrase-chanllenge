"use client";

type TSelectionCardProps = {
  id: string;
  cardTitle: string;
  cardDescription: string;
  icon: React.ReactNode;
  type: "standard" | "premium" | "basic";
};

export const SelectionCard = ({
  id,
  cardTitle,
  cardDescription,
  icon,
  type,
}: TSelectionCardProps) => {
  /**
   * Determines the button variant based on the type.
   */
  const btnVariant =
    type === "basic"
      ? "btn btn-primary"
      : type === "premium"
      ? "btn btn-secondary"
      : type === "standard"
      ? "btn btn-accent"
      : "btn";

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="h-20 flex items-center justify-between">{icon}</div>
        <h2 className="card-title">{cardTitle}</h2>
        <p className="mb-4">{cardDescription}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() =>
              (document.getElementById(id) as HTMLFormElement).showModal()
            }
            className={btnVariant}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

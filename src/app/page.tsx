import {
  BasicModal,
  SelectionCard,
  PremiumModal,
  StandardModal,
} from "@app/components";
import { selectionList } from "@app/assets";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-[url('../assets/images/background.jpg')] bg-no-repeat bg-cover bg-center">
      <h5 className="text-3xl font-bold uppercase m-8">Get In Touch Form!</h5>

      <div className="flex flex-1 flex-row flex-wrap items-center justify-center gap-8">
        {selectionList.map((selection) => (
          <SelectionCard
            key={selection.id}
            id={selection.id}
            cardTitle={selection.title}
            cardDescription={selection.description}
            icon={selection.icon}
            type={selection.type}
          />
        ))}
      </div>

      <BasicModal />
      <StandardModal />
      <PremiumModal />
    </main>
  );
}

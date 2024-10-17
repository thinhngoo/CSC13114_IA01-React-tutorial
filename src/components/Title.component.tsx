import clsx from "clsx";

export default function Title() {
  return (
    <h1
      className={clsx(
        "font-bold",
        "uppercase",
        "text-3xl text-center",
        "bg-foreground py-4 rounded"
      )}
    >
      tic tac toe
    </h1>
  );
}

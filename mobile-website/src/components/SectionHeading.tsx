type Props = {
  id: string;
  eyebrow: string;
  title: string;
  icon?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, icon, as: Heading = "h2", className = "" }: Props) {
  return (
    <div className={className}>
      <p className="m-eyebrow">
        {icon}
        {eyebrow}
      </p>
      <Heading id={id} className="m-title">
        {title}
      </Heading>
    </div>
  );
}

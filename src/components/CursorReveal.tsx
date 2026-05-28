interface CursorRevealProps {
  portrait: string;
  className?: string;
  imgClassName?: string;
}

const CursorReveal = ({ portrait, className = "", imgClassName = "" }: CursorRevealProps) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={portrait}
        className={`w-full ${imgClassName}`}
        alt=""
        decoding="async"
        fetchpriority="high"
      />
    </div>
  );
};

export default CursorReveal;
